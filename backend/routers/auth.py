from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas
from backend.auth import create_access_token, verify_password

router = APIRouter(tags=["Autenticação"])

@router.post("/login", response_model=schemas.Token)
def login(dados: schemas.Login, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.email == dados.email).first()

    if not usuario:
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")
    
    if not verify_password(dados.senha, usuario.senha):
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")
    
    token = create_access_token({
        "sub": usuario.email
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }
