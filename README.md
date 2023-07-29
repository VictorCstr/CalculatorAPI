<p align="center">
 <a href="#computer-o-projeto">Sobre</a> •
 <a href="#computer-tecnologias">Tecnologias usadas</a> • 
 <a href="#mag_right-para-rodar-o-projeto-de-forma-local">Como rodar</a> • 
 <a href="#mag_right-rotas">Rotas</a> • 
</p>

## :computer: O projeto

- Sistema de simulação de empréstimo. Utilizando Clean Architecture com sua arquitetura desacoplada, são fornecidos dois endpoints, um com entrada de dados para calcular o valor que pode ser concedido para o consumidor baseado na quantidade de sacas de café. E outro endpoint para listagem dos ultimos 10 calculos feitos, que são ordenados pela data com maior vencimento.

## :computer: Tecnologias

- Node, Typescript, Express.
- Clean Architecture.
- SOLID, POO.
- Requisições com Axios.
- SQLServer, Prisma ORM.
- Docker.
- Jest e Supertest para testes
- Wiston para logs da aplicação
- Cluster e Compress para melhoria de desempenho.
- Azure SQL Server
- Azure Container Registry e Azure App Service para Hospedagem.

## :mag_right: Para rodar o projeto de forma local:

```bash
# Pré requisitos
- Docker instalado na máquina

# Faça o clone do repositório
$ git clone

# Acesse a pasta do projeto no terminal
$ cd pasta

# Criar as variaveis para o container.
$ Para melhorar o teste da aplicação, foi retirado o .env de dentro do gitignore, para início imediato
$ do sistema sem a necessidade de configuração

# Faça a instalação e execução do container
$ docker build -t calculatorapi .
$ docker run -d -it --name calculator-api-container -p 9090:9090 calculatorapi

# Para rodar os testes
$ npm test

```

## :mag_right: Rotas:

- Utilizar ferramentas como Postman ou Insomnia.

```bash
** Simular **

$ Path:  https://api-culttivo.azurewebsites.net/pedido http://localhost:9090/pedido
$ Método POST

$ Body:
#{
#	"nome": "Teste",
#	"cep": 37026550,
#	"sacasCafe": 10,
#	"vencimentoPagamento": "31-10-2025"
#}



** Listar **

$ Path: https://api-culttivo.azurewebsites.net/pedidos ou http://localhost:9090/pedidos
$ Método GET

```
