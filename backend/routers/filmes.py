from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from backend import models
from schemas import FilmeCreate, FilmeResponse

router = APIRouter(prefix="/filmes", tags=["Filmes"])
