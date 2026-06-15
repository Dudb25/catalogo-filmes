from pydantic import BaseModel

class FilmeBase(BaseModel):
    titulo: str
    genero: str | None = None
    nota: float | None = None
    status: str | None = None

class FilmeCreate(FilmeBase):
    pass

class FilmeResponse(FilmeBase):
    id: int

    class Config:
        from_attributes = True


class UsuarioBase(BaseModel):
    nome: str
    email: str

class UsuarioCreate(UsuarioBase):
    senha: str

class UsuarioResponse(UsuarioBase):
    id: int

    class Config:
        from_attributes = True

class UsuarioFilmeCreate(BaseModel):
    usuario_id: int
    filme_id: int
    status: str | None = None
    nota: float | None = None

class UsuarioFilmeResponse(UsuarioFilmeCreate):
    id: int

    class Config:
        from_attributes = True

class UsuarioResumo(BaseModel):
    id: int
    nome: str

    class Config:
        from_attributes = True

class FilmeResumo(BaseModel):
    id: int
    titulo: str

    class Config:
        from_attributes = True

class UsuarioFilmeDetalhado(BaseModel):

    id: int
    status: str | None = None
    nota: float | None = None

    usuario: UsuarioResumo
    filme: FilmeResumo

    class Config:
        from_attributes = True

class Login(BaseModel):
    email: str
    senha: str

class Token(BaseModel):
    access_token: str
    token_type: str
    