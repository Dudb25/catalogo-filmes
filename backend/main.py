from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Filme
from database import SessionLocal, engine, Base
from routers import users, filmes

app = FastAPI()

app.include_router(users.router)
app.include_router(filmes.router)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"msg": "API de Catálogo de Filmes funcionando!"}