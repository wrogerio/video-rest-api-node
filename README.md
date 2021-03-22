# Criando uma API Rest com Node
 
## clientes-api
Aqui você encontrará o fonte do projeto da criação da API. Esse projeto de criação da API foi desenvolvido utilizando o conceito de separação de responsabilidades, desde à escolha dos pacotes instalados até em relação à arquitetura de desenvolvimento.  

### Pacotes instalados:
A relação de pacotes instalados é:
- @types/mongoose
- config
- cors
- express
- mongoose
- morgan
- node-restful
- nodemon

### Estrutura de pastas
Segue abaixo a estrutra das pastas:
- config
- src
  - controllers
  - database
  - models
  - routes

--------

## clientes-web
Aqui você encontrará o fonte do projeto que faz uso da api desenvolvida acima. Seguindo o mesmo conceito, temos a separação das responsabilidades e as pastas foram divididas para deixar o projeto enxuto e o mais conciso possível.

### Pacotes instalados:
A relação de pacotes instalados é:
- config
- ejs
- express
- nodemon

### Estrutura de pastas
Segue abaixo a estrutra das pastas:
- config
- src
  - assets
    - css
    - img
    - js
  - routes
  - views
    - pages
      - clientes
    - partials