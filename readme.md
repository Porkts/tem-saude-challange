- [1. Desafio Fullstack Tem Saúde](#1-desafio-fullstack-tem-saúde)
  - [1.1. Instalação](#11-instalação)
      - [1.1.0.1. Obtendo o projeto](#1101-obtendo-o-projeto)
      - [1.1.0.2. Instalando as dependências](#1102-instalando-as-dependências)
      - [1.1.0.3. Configurando as variáveis de ambiente](#1103-configurando-as-variáveis-de-ambiente)
      - [1.1.0.4. Configurando o banco de dados](#1104-configurando-o-banco-de-dados)
      - [1.1.0.5. Rodando a aplicação](#1105-rodando-a-aplicação)

# 1. Desafio Fullstack Tem Saúde

Este projeto foi desenvolvido com objetivo de solucionar o desafio proposto no [Desafio Fullstack da Tem Saúde ](https://github.com/tem-saude/challange-fullstack)

## 1.1. Instalação

#### 1.1.0.1. Obtendo o projeto

Para rodar a aplicação clone o projeto na sua máquina usando o seguinte comando:

```bash
  git clone https://github.com/Porkts/tem-saude-challange.git
```

Após isso navege até a pasta recém criada:

#### 1.1.0.2. Instalando as dependências

```bash
  cd tem-saude-challange
```

Instale as dependências do projeto usando o yarn:

```bash
  yarn
```

#### 1.1.0.3. Configurando as variáveis de ambiente

Após isso copie o arquivo .env.example para .env e preencha as variáveis de ambiente:

```bash
  cp .env.example .env
```


| variável         | Default | Referência                                                                                                                |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| APPLICATION_PORT | 3005    | Porta na qual a aplicação irá rodar                                                                                       |
| MAPBOX_API_KEY   |         | Chave da Api do mapbox para o mapa ([Pode ser obtido aqui](hhttps://www.mapbox.com/studio/account/tokens/))               |
| GOOGLE_API_KEY   |         | Chave da API de Geocoding do Google ([Documentação](https://developers.google.com/maps/documentation/geocoding/overview)) |

#### 1.1.0.4. Configurando o banco de dados

Para configurar o acesso ao banco de dados deve-se preencher as variáveis de acesso no arquivo:
```bash
./config/config.json
```

Após isso execute as migrações para que sejam criadas as tabelas que a aplicação irá usar:
```bash
yarn sequelize db:migrate
```

#### 1.1.0.5. Rodando a aplicação
Depois de configurar as variáveis de ambiente e o acesso ao banco execute a aplicação com este comando:

```bash
yarn start
```

Agora basta acessar a aplicação do seu navegador pela url:

```
http://localhost:3005/
```

De acordo com a variável APPLICATION_PORT configurada posteriormente
