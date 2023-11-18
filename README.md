# Backend Challenge 20230105 - Products Parser

## Introdução

Nesse desafio o objetivo era desenvolver uma REST API para utilizar os dados do projeto Open Food Facts, que é um banco de dados aberto com informação nutricional de diversos produtos alimentícios.

O projeto visa dar suporte a equipe de nutricionistas da empresa Fitness Foods LC para que eles possam revisar de maneira rápida a informação nutricional dos alimentos que os usuários publicam pela aplicação móvel.

Foi um projeto bastante desafiador e realmente me sinto um dev melhor após conclui-lo. Trabalhei inúmeros pontos que não desenvolvia a tempos e me submergi em longas horas desenvolvendo todo o fluxo de importação de produtos para que ficasse o melhor que conseguisse entregar nesses 5 dias e com certeza ainda refinarei minha lógica após a correção.

## Apresentação

Link para a apresentação do projeto: []()

## Tecnologias utilizadas:

- NestJS
- MongoDB
- ElasticSearch
- Docker
- JavaScript
- NodeJS
- TypeScript

### Instruções para rodar o projeto:
- Criar um banco de dados MongoDB usando Atlas: https://www.mongodb.com/cloud/atlas;
- Criar uma instancia do elasticsearch em: https://cloud.elastic.co/
- Clone o projeto na sua maquina;
- Crie um arquivo `.env` com base no arquivo [.env.example](./.env.example);
- Se tiver o node instalado:
  - Rode `npm i` para instalar as dependências do projeto;
  - Rode `npm run start:dev` para iniciar o projeto;
- Caso prefira, existe um [docker-compose](./docker-compose.yml) e portanto, também funciona:
  - Rode `docker compose up --build` ou `docker-compose up --build` a depender da sua versão do docker.

## O desenvolvimento do projeto:

- Problema 1: Encontrar uma forma de baixar os arquivos dinâmicamente com base na lista disponível em: https://challenges.coode.sh/food/data/json/index.txt.
  - Solução: Requisitar a lista e iterar sobre ela baixando os arquivos a partir da outra url disponibilizada utilizando streams e um Promise.all() para baixar todos ao mesmo tempo: https://challenges.coode.sh/food/data/json/{filename}

- Problema 2: Descompactar os arquivos baixados.
  - Solução: Utilizei o zlib e novamente streams e o Promise.all() para descompactar tudo dinâmicamente.

- Problema 3: Salvar no banco de dados e elasticsearch.
  - Solução: Precisei criar um upsertMany para caso não exista a instancia, cria-la. Caso contrário, deveria atualiza-la.

- Problema 4: Criar um CRON para realizar todo esse fluxo diariamente com base em um horario configurado no .env.
  - Solução: Para isso, utilizei a lib cron nativa do node para executar o fluxo no horário indicado sempre verificando a ultima vez que realizou essa sincronização para não reexecuta-la em menos de 24 horas.

- Problema 5: Criar o CRUD com base nas instruções do desafio.
  - Solução: No geral, não teve grandes dificuldades aqui, apenas trabalhar com os dados da melhor maneira possível e finalizar o desenvolvimento.

### A REST API

Na REST API temos um CRUD com os seguintes endpoints, caso precise, há a [documentação](http://localhost:3000/api):

- `GET /`: Detalhes da API, se conexão leitura e escritura com a base de dados está OK, horário da última vez que o CRON foi executado, tempo online e uso de memória.
- `PUT /products/:code`: Será responsável por receber atualizações do Projeto Web
- `DELETE /products/:code`: Mudar o status do produto para `trash`
- `GET /products/:code`: Obter a informação somente de um produto da base de dados
- `GET /products`: Listar todos os produtos da base de dados, adicionar sistema de paginação para não sobrecarregar o `REQUEST`.
- `GET /search/products?search=rose`: Lista os produtos da base de dados com base na pesquisa por texto utilizando o elasticsearch.

## Extras Concluidos:

- [x] **Diferencial 1** Configuração de um endpoint de busca com Elastic Search ou similares;
- [x] **Diferencial 2** Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;
- [x] **Diferencial 3** Configurar um sistema de alerta se tem algum falho durante o Sync dos produtos;
- [x] **Diferencial 4** Descrever a documentação da API utilizando o conceito de Open API 3.0;
- [x] **Diferencial 5** Escrever Unit Tests para os endpoints GET e PUT do CRUD;
- [ ] **Diferencial 6** Escrever um esquema de segurança utilizando `API KEY` nos endpoints. Ref: https://learning.postman.com/docs/sending-requests/authorization/#api-key


>  This is a challenge by [Coodesh](https://coodesh.com/)