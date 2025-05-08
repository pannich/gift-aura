from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv

load_dotenv()  # This loads the .env file into os.environ


API_KEY = os.getenv("HUGGINGFACE_API_KEY")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
class GiftRequest(BaseModel):
    gender: str
    mbtiType: str
    auraColor: str

@app.get("/api/")
async def root():
    return {"message": "Welcome to the Gift Suggestion API!"}

@app.post("/api/generate-gifts")
async def generate_gifts_advanced(request: GiftRequest):

    try:
        gender = request.gender
        mbtiType = request.mbtiType
        auraColor = request.auraColor

        prompt = f"Suggest 3 birthday gifts for a {gender} {mbtiType} with a {auraColor} aura. Make them creative and meaningful."

        headers = {"Authorization": f"Bearer {API_KEY}"}
        API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"

        response = requests.post(API_URL, headers=headers, json={"inputs": prompt})

        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
