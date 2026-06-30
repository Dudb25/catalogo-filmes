from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models, schemas
from backend.auth import hash_password, verificar_token

router = APIRouter(prefix="/usuarios", tags=["Usuários"])

@router.post("", response_model=schemas.UsuarioResponse, status_code=status.HTTP_201_CREATED)
def criar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):

    db_usuario = db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first()

    if db_usuario:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email ja esta em uso"
        )
    
    novo_usuario = models.Usuario(
        nome = usuario.nome,
        email = usuario.email, 
        senha = hash_password(usuario.senha)
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return novo_usuario

@router.get("/", response_model=list[schemas.UsuarioResponse])
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(models.Usuario).all()

@router.get("/{usuario_id}", response_model=schemas.UsuarioResponse)
def buscar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    return usuario

@router.put("/{usuario_id}", response_model=schemas.UsuarioResponse)
def atualizar_usuario(usuario_id: int, dados: schemas.UsuarioCreate, db: Session = Depends(get_db), usuario_logado = Depends(verificar_token)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    
    usuario.nome = dados.nome
    usuario.email = dados.email
    usuario.senha = hash_password(dados.senha)

    db.commit()
    db.refresh(usuario)

    return usuario

@router.delete("/{usuario_id}")
def deletar_usuario(usuario_id: int, db: Session = Depends(get_db), usuario_logado = Depends(verificar_token)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    db.delete(usuario)
    db.commit()
    
    return {"msg": "Usuário deletado com sucesso"}
