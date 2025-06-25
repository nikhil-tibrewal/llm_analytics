from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, func
from .database import Base

class LogEntry(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String)
    prompt = Column(Text)
    response = Column(Text)
    model = Column(String)
    latency_ms = Column(Integer)
    tokens_prompt = Column(Integer, nullable=True)
    tokens_completion = Column(Integer, nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now())
    error = Column(Text, nullable=True)