from database import Base, engine
from models import Filme

Base.metadata.create_all(bind=engine)

print("Banco de dados criado com sucesso!")