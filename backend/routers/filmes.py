from fastapi import APIRouter

router = APIRouter()

@router.get("/filmes")
def listar_filmes():
    return {"mensagem": "Lista de filmes"}