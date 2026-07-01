import os
import smtplib
import ssl
from email.message import EmailMessage


SYSTEM_NAME = "Catalogo de Filmes"


def _smtp_port() -> int:
    try:
        return int(os.getenv("SMTP_PORT", "465"))
    except ValueError:
        return 465


def _email_config() -> dict[str, str | int | None]:
    return {
        "host": os.getenv("SMTP_HOST", "smtp.gmail.com"),
        "port": _smtp_port(),
        "user": os.getenv("SMTP_USER"),
        "password": os.getenv("SMTP_PASSWORD"),
        "from": os.getenv("SMTP_FROM") or os.getenv("SMTP_USER"),
    }


def enviar_email_boas_vindas(nome: str, email_destino: str) -> None:
    try:
        _enviar_email_boas_vindas(nome, email_destino)
    except Exception as erro:
        print(f"Email de boas-vindas nao enviado: {erro}")


def _enviar_email_boas_vindas(nome: str, email_destino: str) -> None:
    config = _email_config()

    if not config["user"] or not config["password"] or not config["from"]:
        print("Email de boas-vindas nao enviado: configure SMTP_USER, SMTP_PASSWORD e SMTP_FROM.")
        return

    mensagem = EmailMessage()
    mensagem["Subject"] = f"Bem-vindo ao {SYSTEM_NAME}"
    mensagem["From"] = str(config["from"])
    mensagem["To"] = email_destino
    mensagem.set_content(
        f"Ola, {nome}!\n\n"
        f"Seu cadastro foi realizado com sucesso no {SYSTEM_NAME}.\n\n"
        "Agora voce ja pode acessar o sistema e organizar seu catalogo de filmes.\n\n"
        f"Atenciosamente,\nEquipe {SYSTEM_NAME}"
    )

    contexto = ssl.create_default_context()

    with smtplib.SMTP_SSL(str(config["host"]), int(config["port"]), context=contexto) as servidor:
        servidor.login(str(config["user"]), str(config["password"]))
        servidor.send_message(mensagem)
