from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas
from .models import LogEntry

def create_log(db: Session, log: schemas.LogRequest):
    db_log = models.LogEntry(**log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log


def get_metrics(db: Session):
    total_calls = db.query(func.count(LogEntry.id)).scalar()
    avg_latency = db.query(func.avg(LogEntry.latency_ms)).scalar()
    tokens_prompt = db.query(func.sum(LogEntry.tokens_prompt)).scalar() or 0
    tokens_completion = db.query(func.sum(LogEntry.tokens_completion)).scalar() or 0

    # Estimated cost (e.g., GPT-4 pricing $0.03 per 1k prompt, $0.06 per 1k completion)
    cost_usd = (tokens_prompt / 1000 * 0.03) + (tokens_completion / 1000 * 0.06)

    # Top models
    model_counts = (
        db.query(LogEntry.model, func.count(LogEntry.id))
        .group_by(LogEntry.model)
        .all()
    )
    top_models = [{"model": m, "count": c} for m, c in model_counts]

    return {
        "total_calls": total_calls,
        "avg_latency_ms": round(avg_latency or 0, 2),
        "total_tokens_prompt": tokens_prompt,
        "total_tokens_completion": tokens_completion,
        "total_tokens": tokens_prompt + tokens_completion,
        "estimated_cost_usd": round(cost_usd, 4),
        "top_models": top_models,
    }
