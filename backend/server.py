from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Orii-O1 API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

class DemoRequest(BaseModel):
    prompt: str
    max_tokens: Optional[int] = 100

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "model": "Orii-O1", "version": "1.0.0"}

@app.get("/api/model-info")
async def get_model_info():
    return {
        "name": "Orii-O1",
        "company": "Orii-Gen",
        "version": "1.0.0",
        "capabilities": [
            "Advanced Natural Language Understanding",
            "Code Generation and Review",
            "Complex Reasoning and Problem Solving",
            "Multi-language Support",
            "Context-aware Conversations",
            "Creative Writing and Content Generation"
        ],
        "specifications": {
            "parameters": "Advanced Architecture",
            "context_length": "Extended Context Window",
            "training_data": "Diverse, High-quality Dataset",
            "performance": "State-of-the-art Benchmarks"
        }
    }

@app.post("/api/contact")
async def submit_contact(contact: ContactForm):
    # In a real implementation, you would save this to database
    # For now, we'll just return a success response
    return {
        "status": "success",
        "message": "Thank you for your interest in Orii-O1! We'll get back to you soon."
    }

@app.post("/api/demo")
async def demo_request(demo: DemoRequest):
    # This would typically call the actual Orii-O1 model
    # For demo purposes, returning a mock response
    return {
        "model": "Orii-O1",
        "response": f"This is a demo response from Orii-O1 for your prompt: '{demo.prompt}'. Our advanced LLM provides intelligent, contextual responses with superior reasoning capabilities.",
        "tokens_used": min(demo.max_tokens, 50)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)