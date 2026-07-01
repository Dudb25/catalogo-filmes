from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas
from backend.schemas import FilmeCreate, FilmeResponse
import math
from backend.auth import verificar_token

router = APIRouter(prefix="/filmes", tags=["Filmes"])


def obter_usuario_logado(payload: dict, db: Session):
    email = payload.get("sub")
    usuario = db.query(models.Usuario).filter(models.Usuario.email == email).first()

    if not usuario:
        raise HTTPException(status_code=401, detail="Usuario nao autenticado")

    return usuario


@router.post("/", response_model= schemas.FilmeBase)
def criar_filme(filme: schemas.FilmeCreate, db: Session = Depends(get_db), usuario = Depends(verificar_token)):
    usuario_logado = obter_usuario_logado(usuario, db)

    novo_filme = models.Filme(**filme.model_dump())
    db.add(novo_filme)
    db.commit()
    db.refresh(novo_filme)

    novo_usuario_filme = models.UsuarioFilme(
        usuario_id=usuario_logado.id,
        filme_id=novo_filme.id,
        status=novo_filme.status,
        nota=novo_filme.nota
    )
    db.add(novo_usuario_filme)
    db.commit()

    return novo_filme

@router.get("/")

def listar_filmes(
    titulo: str |None = None,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    usuario = Depends(verificar_token)
    ):
    usuario_logado = obter_usuario_logado(usuario, db)

    query = db.query(models.Filme).join(models.UsuarioFilme).filter(
        models.UsuarioFilme.usuario_id == usuario_logado.id
    )

    if titulo:
        query = query.filter(models.Filme.titulo.ilike(f"%{titulo}%"))

    total = query.count()
    offset = (page - 1) * limit
    filmes = query.offset(offset).limit(limit).all()
    pages = math.ceil(total / limit)
    
    return {
        "data": filmes,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": pages
    }


@router.get("/{filme_id}", response_model=schemas.FilmeBase)
def obter_filme(filme_id: int, db: Session = Depends(get_db)):
    filme = db.query(models.Filme).filter(models.Filme.id == filme_id).first()

    if not filme:
        raise HTTPException(status_code=404, detail="Filme não encontrado")
    return filme

@router.put("/{filme_id}", response_model=schemas.FilmeBase)
def atualizar_filme(filme_id: int, dados: schemas.FilmeCreate, db: Session = Depends(get_db), usuario = Depends(verificar_token)):
    usuario_logado = obter_usuario_logado(usuario, db)

    filme = db.query(models.Filme).join(models.UsuarioFilme).filter(
        models.Filme.id == filme_id,
        models.UsuarioFilme.usuario_id == usuario_logado.id
    ).first()

    if not filme:
        raise HTTPException(status_code=404, detail="Filme não encontrado")
    
    for key, value in dados.model_dump().items():
        setattr(filme, key, value)

    db.commit()
    db.refresh(filme)
    return filme

@router.delete("/{filme_id}")
def deletar_filme(filme_id: int, db: Session = Depends(get_db), usuario = Depends(verificar_token)):
    usuario_logado = obter_usuario_logado(usuario, db)

    filme = db.query(models.Filme).join(models.UsuarioFilme).filter(
        models.Filme.id == filme_id,
        models.UsuarioFilme.usuario_id == usuario_logado.id
    ).first()

    if not filme:
        raise HTTPException(status_code=404, detail="Filme não encontrado")
    
    db.delete(filme)
    db.commit()
    return {"msg": "Filme deletado com sucesso"}
