from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas
from backend.auth import verificar_token

router = APIRouter(
    prefix="/usuario-filmes",
    tags=["Usuário-Filmes"]
)

@router.post("/", response_model=schemas.UsuarioFilmeResponse)
def associar_filme_usuario(
    dados: schemas.UsuarioFilmeCreate,
    db: Session = Depends(get_db),
    usuario = Depends(verificar_token)
):
    usuario = db.query(models.Usuario).filter(
        models.Usuario.id == dados.usuario_id
        ).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    filme = db.query(models.Filme).filter(
        models.Filme.id == dados.filme_id
        ).first()
    if not filme:
        raise HTTPException(status_code=404, detail="Filme não encontrado")
    
    nova_associacao = models.UsuarioFilme(
    usuario_id=dados.usuario_id,
    filme_id=dados.filme_id,
    status=dados.status,
    nota=dados.nota
)
    db.add(nova_associacao)
    db.commit()
    db.refresh(nova_associacao)
    return nova_associacao

@router.get("/", response_model=list[schemas.UsuarioFilmeResponse])

def listar_associacoes(db: Session = Depends(get_db)):
    
    associacoes = db.query(models.UsuarioFilme).all()
    return associacoes

@router.get("/detalhado", response_model=list[schemas.UsuarioFilmeDetalhado])

def listar_associacoes_detalhadas(db: Session = Depends(get_db)):

    associacoes = db.query(models.UsuarioFilme).all()
    return associacoes