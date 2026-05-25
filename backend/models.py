from pydantic import BaseModel

class Filme(BaseModel):
    id: int | None = None
    titulo: str
    ano: int
    genero: str
    descricao: str | None = None