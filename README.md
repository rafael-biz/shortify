# Shortify

Shortify é um serviço encurtador de urls de alto desempenho.

### Como funciona?

Para cada URL registrada na API, o serviço atribui um valor identificador único, sequencial e que começa com 1. Este valor, por sua vez, é convertido para o sistema de numeração de base 62 para diminuir a quantidade de caracteres que a sua representação decimal possui. Dessa forma, a bilionésima url encurtada pelo serviço pode ser representada pelo endereço **http://<domínio>/urls/15FTGg**. E toda vez que uma url encurtada é requisitada, o serviço decodifica o identificador, localiza as informações no banco de dados e retorna a url original.

### Instalação

1. Instale o Node.js versão 6.10.3 ou compatível.

2. Faça o checkout do projeto.
```sh
$ git clone https://github.com/rafael-biz/shortify
```

3. Instale as dependencias do projeto.
```sh
$ npm install --production
```

4. Em uma instância do PostgreSQL, versão 9.2 ou superior, execute o script create-schema.sql para a criação das tabelas do banco de dados. Se o PostgreSQL estiver recusando a conexão do Shortify, verifique no arquivo pg_hba.conf se o PostgreSQL está configurado para aceitar a autenticação via usuário e senha conforme o exemplo abaixo.
```sh
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             127.0.0.1/32            password
```

5. Dentro do diretório do projeto, altere as configurações do projeto em **/app/config.js**.

6. Dentro do diretório do projeto, inicie o serviço através da linha de comando.
```sh
$ node app/app.js
```

### TODO

 - Implementar GET /users/:userId/stats
 - Implementar GET /stats/:id
 - Implementar DELETE /urls/:id
 - Implemenatr DELETE /user/:userId
 - Criar script de instalação e configuração do serviço.
 - Criar script para inicialização do serviço.
 - Ampliar a cobertura dos testes.