from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from backend import models, schemas
from schemas import FilmeCreate, FilmeResponse

router = APIRouter(prefix="/filmes", tags=["Filmes"])

@router.post("/", response_model= schemas.FilmeBase)
def criar_filme(filme: schemas.FilmeCreate, db: Session = Depends(get_db)):
    novo_filme = models.Filme(**filme.model_dump())
    db.add(novo_filme)
    db.commit()
    db.refresh(novo_filme)
    return novo_filme

@router.get("/", response_model=list[schemas.FilmeBase])
def listar_filmes(db: Session = Depends(get_db)):
    filmes = db.query(models.Filme).all()
    return filmes

@router.get("/{filme_id}", response_model=schemas.FilmeBase)
def obter_filme(filme_id: int, db: Session = Depends(get_db)):
    filme = db.query(models.Filme).filter(models.Filme.id == filme_id).first()

    if not filme:
        raise HTTPException(status_code=404, detail="Filme não encontrado")
    return filme

@router.put("/{filme_id}", response_model=schemas.FilmeBase)
def atualizar_filme(filme_id: int, dados: schemas.FilmeCreate, db: Session = Depends(get_db)):
    filme = db.query(models.Filme).filter(models.Filme.id == filme_id).first()

    if not filme:
        raise HTTPException(status_code=404, detail="Filme não encontrado")
    
    for key, value in dados.model_dump().items():
        setattr(filme, key, value)

        db.commit()
        db.refresh(filme)
        return filme

@router.delete("/{filme_id}")
def deletar_filme(filme_id: int, db: Session = Depends(get_db)):
    filme = db.query(models.Filme).filter(models.Filme.id == filme_id).first()

    if not filme:
        raise HTTPException(status_code=404, detail="Filme não encontrado")
    
    db.delete(filme)
    db.commit()
    return {"msg": "Filme deletado com sucesso"}