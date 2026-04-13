from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

EXPRESS_URL = "https://uniconnect-backend-r5zb.onrender.com/api/profile/all"

class SearchRequest(BaseModel):
    prompt: str

def keyword_score(prompt: str, skill: str) -> float:
    prompt_words = set(prompt.lower().split())
    skill_words = set(skill.lower().split())
    if not skill_words:
        return 0
    matches = prompt_words.intersection(skill_words)
    return len(matches) / len(skill_words)

@app.post("/match")
def match_students(req: SearchRequest):
    response = requests.get(EXPRESS_URL)
    users = response.json()

    results = []

    for user in users:
        best_score = 0
        best_skill = ""
        for skill in user["skills"]:
            score = keyword_score(req.prompt, skill)
            if score > best_score:
                best_score = score
                best_skill = skill

        if best_score > 0:
            results.append({
                "name": user["name"],
                "contact": user["contact"],
                "matched_skill": best_skill,
                "score": round(best_score, 3)
            })

    results.sort(key=lambda x: x["score"], reverse=True)
    return {"matches": results[:5]}