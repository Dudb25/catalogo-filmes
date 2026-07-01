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

Envio de email de boas-vindas:

O cadastro em POST /usuarios envia um email usando SMTP. Configure as variaveis
de ambiente antes de iniciar a API:

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app
SMTP_FROM=seu-email@gmail.com

No Gmail, ative a verificacao em duas etapas e crie uma senha de app em
Conta Google > Seguranca > Senhas de app. Use essa senha em SMTP_PASSWORD,
em vez da senha normal da conta.
