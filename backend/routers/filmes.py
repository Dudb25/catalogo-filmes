from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import SessionLocal, get_db
from backend import models, schemas

router = APIRouter(prefix="/filmes", tags=["Filmes"])

@router.post("/", response_model=schemas.Filme)
def criar_filme(filme: schemas.FilmeCreate, db: Session = Depends(get_db)):
    db_filme = models.Filme(**filme.dict())
    db.add(db_filme)
    db.commit()
    db.refresh(db_filme)
    return db_filme