from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or use ["http://<external-ip>:3000"]
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# Dependency: DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"status": "LLM Analytics API is up!"}

@app.post("/log")
def log_entry(log: schemas.LogRequest, db: Session = Depends(get_db)):
    saved = crud.create_log(db, log)
    return {"id": saved.id, "message": "Log saved"}

@app.get("/metrics")
def get_metrics(db: Session = Depends(get_db)):
    return crud.get_metrics(db)