# Weekly Worksheet

Este projeto é um sistema de planilha semanal projetado para gerenciar cursos, disciplinas, professores e seus horários. Ele é dividido em duas partes principais: um backend construído com Django e um frontend construído com React.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

  * Python (versão 3.10 ou superior)
  * Node.js (versão 18 ou superior)
  * npm (geralmente vem com o Node.js)
  * pip (gerenciador de pacotes do Python)

## Backend (Django)

### Configuração

1.  **Navegue até o diretório do backend:**

    ```bash
    cd back_end/django_api
    ```

2.  **Instale as dependências:**

    ```bash
    pip install django djangorestframework django-cors-headers
    ```

3.  **Crie e execute as migrações do banco de dados:**

    ```bash
    python manage.py makemigrations entities
    python manage.py migrate
    ```

### Executando o servidor de desenvolvimento

Depois que a configuração estiver concluída, você pode iniciar o servidor de desenvolvimento do Django:

```bash
python manage.py runserver
```

O backend agora estará em execução em `http://127.0.0.1:8000/`.

## Frontend (React)

### Configuração

1.  **Navegue até o diretório do frontend:**

    ```bash
    cd front_end
    ```

2.  **Instale as dependências do npm:**

    ```bash
    npm install
    ```

### Executando o servidor de desenvolvimento

1.  **Inicie o servidor de desenvolvimento do React:**
    ```bash
    npm start
    ```

A aplicação de frontend agora estará acessível em `http://localhost:3000`. Ele se conectará automaticamente ao servidor de backend em execução na porta 8000.
