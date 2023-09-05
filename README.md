# GALEGO BEER

O projeto proposto é um sistema de gerenciamento de backend desenvolvido para enfrentar os desafios críticos no setor de adegas. O objetivo principal deste sistema é automatizar e otimizar os processos relacionados ao controle de estoque e à gestão de pedidos de reposição. Por meio dessa solução tecnológica no backend, almejamos simplificar as operações, eliminar erros e aprimorar a eficiência, garantindo uma resposta ágil às demandas do mercado.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão x.x.x)
- npm (versão x.x.x)
- postman ou insommia
- qualquer navegador

## Configuração do Arquivo .env

Este projeto requer um arquivo `.env` para armazenar informações sensíveis, como credenciais de autenticação. Você deve criar um arquivo `.env` na raiz do seu projeto e definir as seguintes variáveis de ambiente:

# Exemplo de variáveis de ambiente no arquivo .env

No arquivo raiz do seu projeto, crie um arquivo .env

```env
MONGO_URI=url_cloud_database+mongodb
JWT_SECRET=token_private_jwt
```

# Banco de dados - MongoDB Atlas Cloud Database

Irá precisar obter uma database configurada para trabalhar com dados do backend para back from front end (BFF) para que consiga obter credenciamento de login.

```env
https://cloud.mongodb.com
```

## Instalação

Para instalar e rodar o projeto, siga estas etapas:

1. Clone este repositório:

   ```bash
   git clone https://github.com/biancac-andrade/project-tcc-garantia-back.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd project-tcc-garantia-back
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## Uso

Para iniciar o projeto, execute o seguinte comando:

```bash
node index.js
```

Isso irá iniciar o servidor de desenvolvimento local e irá mostrar um URL de http:localhost:porta para utilizar o URL para frontend ou requisição de endpoint.

## Contribuição

Sinta-se à vontade para contribuir para este projeto. Basta seguir estas etapas:

1. Faça um fork do repositório
2. Crie uma branch para a sua feature: `git checkout -b minha-feature`
3. Faça commit das suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Faça push para a branch: `git push origin minha-feature`
5. Envie um pull request

## Licença

Este projeto está licenciado sob a licença GitHub,. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.
