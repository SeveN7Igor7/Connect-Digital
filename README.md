# Connect Digital Project

Este projeto foi desenvolvido por Igor Vinicius Leite de Carvalho.
## Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes itens instalados em sua máquina:

- **[Node.js](https://nodejs.org/)** (versão recomendada: LTS)
- **[npm](https://www.npmjs.com/)** (gerenciador de pacotes do Node.js, geralmente já vem com o Node)
- **[Git](https://git-scm.com/)** (para clonar o repositório)

## Configuração do Banco de Dados

As credenciais do banco de dados estão configuradas no arquivo `.env` localizado no diretório `connect-digital-backend`.

O host para conexão via navegador para o instrutor ver o banco de dados é: `pgsql.servidorprivadoigor.online`

## Como Rodar o Projeto

### Backend

1. Navegue até o diretório do backend:
   ```bash
   cd connect-digital-backend
   ```
2. Instale as dependências (forçando a instalação):
   ```bash
   npm install --force
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start run:dev
   ```

### Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd connect-digital-frontend
   ```
2. Instale as dependências (forçando a instalação):
   ```bash
   npm install --force
   ```
3. Inicie o aplicativo de desenvolvimento:
   ```bash
   npm run dev
   ```

**Observação:** O banco de dados já está conectado e funcionando normalmente em meu servidor privado na nuvem.

