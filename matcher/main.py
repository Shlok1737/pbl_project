from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import numpy as np
from sentence_transformers import SentenceTransformer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = SentenceTransformer("all-MiniLM-L6-v2")
EXPRESS_URL = "http://localhost:5000/api/profile/all"

class SearchRequest(BaseModel):
    prompt: str

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

@app.post("/match")
def match_students(req: SearchRequest):
    response = requests.get(EXPRESS_URL)
    users = response.json()

    prompt_embedding = model.encode(req.prompt)
    results = []

    for user in users:
        best_score = -1
        best_skill = ""
        for skill in user["skills"]:
            skill_embedding = model.encode(skill)
            score = cosine_similarity(prompt_embedding, skill_embedding)
            if score > best_score:
                best_score = score
                best_skill = skill

        if best_score > 0.3:
            results.append({
                "name": user["name"],
                "contact": user["contact"],
                "matched_skill": best_skill,
                "score": round(float(best_score), 3)
            })

    results.sort(key=lambda x: x["score"], reverse=True)
    return {"matches": results[:5]}