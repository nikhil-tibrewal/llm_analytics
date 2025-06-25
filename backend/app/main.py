from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

# Sample request/response model
class LogRequest(BaseModel):
    user_id: str
    prompt: str
    response: str
    model: str
    latency_ms: int

@app.get("/")
def root():
    return {"status": "LLM Analytics API is up!"}

@app.post("/log")
def log_entry(log: LogRequest):
    # This will be replaced later with a DB insert
    print(f"Received log at {datetime.utcnow()}:", log.dict())
    return {"message": "Log received"}