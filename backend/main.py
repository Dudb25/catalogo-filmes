from fastapi import FastAPI
from routers import filmes, users

app = FastAPI()

app.include_router(users.router)
app.include_router(filmes.router)

@app.get("/")
def home():
    return {"mensagem": "API do catálogo de filmes funcionando"}