from fastapi import FastAPI
from backend.database import Base, engine
from backend.routers import users, filmes, usuario_filmes
from backend.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(filmes.router)
app.include_router(usuario_filmes.router)

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