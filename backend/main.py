from fastapi import FastAPI
from backend.database import Base, engine
from backend.routers import users, filmes
from backend.database import SessionLocal

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