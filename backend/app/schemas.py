from pydantic import BaseModel
from typing import Optional

class LogRequest(BaseModel):
    user_id: str
    prompt: str
    response: str
    model: str
    latency_ms: int
    tokens_prompt: Optional[int] = None
    tokens_completion: Optional[int] = None
    error: Optional[str] = None