# catalogo-filmes
Repositório para armazenar código de projeto da disciplina de Programação 4.

Como rodar:

instalar as dependencias

pip install -r requirements.txt

rodar

uvicorn main:app --reload 

Usuário de teste:
login: admin@email.com
senha: 123456

As senhas sao armazenadas com hash bcrypt. Apos atualizar esta versao,
recrie o banco ou atualize usuarios antigos que ainda tenham senha em texto puro.
