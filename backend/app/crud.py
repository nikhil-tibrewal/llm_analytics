from sqlalchemy.orm import Session
from . import models, schemas

def create_log(db: Session, log: schemas.LogRequest):
    db_log = models.LogEntry(**log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log