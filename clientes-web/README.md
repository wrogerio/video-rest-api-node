# Criando um site para consumir API Node Rest

### 01 - Iniciar arquivo package.json
```
npm init -y
```

### 02 - Instalar os pacotes do npm
```
npm i express nodemon ejs config
```

### 03 - Configurar o arquivo package.json
```
"start": "npx nodemon src/server.js"
"main": "src/server.js",
```

### 04 - Criar a estrutura de pastas e arquivos
```
config
  default.json
  express.js
src
  assets
    css
      style.css
    img
    js
      adicionar.js
      clientes.js
      editar.js
      funcoes.js
  routes
    routes.js
  views
    pages
      clientes
        adicionar.ejs
        editar.ejs
        index.ejs
      index.ejs
    partials
      footer.ejs
      header.ejs
      nav.ejs
```

### 05 - Configurar o arquivo default.json que está em `config/default.json`
```
{ 
    "server": { 
        "port": 8081
    }
}
```
### 06 - Configurar o arquivo express.js que está em `config/express.js`.
```
const express = require('express') 
const config = require('config') 
const path = require('path') 
const router = require('../src/routes/routes') 

module.exports = () => { 
    // Setup App 
    const app = express() 
    app.set('port', process.env.PORT || config.get('server.port')) 

    // Midlewares 
    app.use(express.urlencoded({ extended: true })) 
    app.use(express.json()) 
    app.use(express.json({ type: 'application/json' })) 

    // Routes 
    app.use(router) 

    // Static Routes 
    app.use('/estilos', express.static(path.join(__dirname, '../src/assets/css'))) 
    app.use('/scripts', express.static(path.join(__dirname, '../src/assets/js'))) 
    app.use('/imagens', express.static(path.join(__dirname, '../src/assets/img'))) 

    // View Engine 
    app.set('view engine', 'ejs') 
    app.set('views', path.join(__dirname, '../src/views')) 

    return app 
}
```
### 07 - Configurar o arquivo server.js que esta em `src/server.js`
```
const app = require('../config/express')() 
const port = app.get('port') 

app.listen(port, () => { 
    console.log(`server is running on port ${port}. http://localhost:${port}`) 
}) 
```
### 08 - Configurar o arquivo routes que está em `src/routes/routes`
```
const express = require('express') 
const router = express.Router(); 

router.get('/', (req, res) => { 
    res.render('pages/index') 
})

router.get('/clientes', (req, res) => { 
    res.render('pages/clientes/index') 
})

router.get('/clientes/adicionar', (req, res) => { 
    res.render('pages/clientes/adicionar') 
})

router.get('/clientes/editar/:id', (req, res) => { 
    res.render('pages/clientes/editar') 
})

module.exports = router 
```
a partir desse momento, o server já está disponível e pode ser startado com o comando `npm start` e podemos ter acesso em nossas rotas, porém, as páginas ainda não foram configuradas

### 09 - Configurar a partial view nav.ejs que está em `src/views/partials/nav.ejs`
```
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Rest API</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNav"> 
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="myNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"> 
                <li class="nav-item">
                    <a class="nav-link active" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/clientes">Clientes</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

### 10 - Configurar a partial view header.ejs que esta em `src/views/partials/header.ejs`
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consuming rest API</title>

    <!-- bootstrap style -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- fontawesome style -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />

    <!-- user styles -->
    <link rel="stylesheet" href="/estilos/style.css"> 
</head>
<body>
<%- include('./nav')  %>
```

### 11 - Configurar a partial view footer.ejs que esta em `src/views/partials/footer.ejs`
```
<!-- bootstrap script -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### 12 - Configurar a page index.ejs que está em `src/views/pages/index.ejs`
```
<%- include('../partials/header') %>
<div class="row">
	<div class="col">
		<div class="jumbo azul5">
			<h1>Consumindo Rest API com Node</h1>
			<p class="lead">Aqui veremos como consumir uma Rest API com Node</p>
		</div>
	</div>
</div>

<div class="row">
	<div class="col">
		<div class="jumbo azul3 text-black">
			<div class="motivos d-flex">
				<section class="me-3">
					<header class="d-flex justify-content-center">
						<div class="circulo mb-2">
							<span class="mb-2">Fácil</span>
							<i class="fas fa-graduation-cap fa-2x"></i>
						</div>
					</header>
					<article>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae metus sed dui</article>
				</section>
				<section class="me-3">
					<header class="d-flex justify-content-center">
						<div class="circulo mb-2">
							<span class="mb-2">Rápido</span>
							<i class="fas fa-fighter-jet fa-2x"></i>
						</div>
					</header>
					<article>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae metus sed dui</article>
				</section>
				<section class="me-3">
					<header class="d-flex justify-content-center">
						<div class="circulo mb-2">
							<span class="mb-2">Seguro</span>
							<i class="fas fa-shield-alt fa-2x"> </i>
						</div>
					</header>
					<article>Lorem i psum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae metus sed dui</article>
				</section>
			</div>
		</div>
	</div>
</div>

<div class="row">
    <div class="col"><div class="jumbo azul1 py-5">
        <h5>Wellington Rogerio</h5>
        &copy; todos os direitos reservados
    </div>
</div>
```

### 13 - Configurar os estilos, alterando o arquivo style.css que está em `src/assets/css/style.css`
```
a { 
    text-decoration: none; 
}

body { 
    background: #fbfbfb; 
}

th{ 
    background: #0A6CFF !important; 
    color: white !important; 
    padding: 0.5rem 0.1rem !important; 
}

table img{ 
    width: 25px; 
    height: 25px; 
    cursor: pointer; 
}

.w90{ 
    width: 90px; 
}

.w150{ 
    width: 150px; 
}

.jumbo { 
    padding: 6rem 3rem; 
    text-align: center; 
}

.azul5 { 
    background: #EBF3FF; 
}

.azul3 { 
    background: #C2DAFF; 
}

.azul1 { 
    background: #70A9FF; 
}

.motivos header{ 
    font-size: 1.2rem; 
    font-weight: 600; 
}

.motivos article{ 
    text-align: justify; 
}

.circulo{ 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    background: #0d6efd; 
    width: 120px; 
    height: 120px; 
    border-radius: 60px; 
    color: white 
}
```

### 14 - Configurar a tela index.ejs dos clientes, que está em `src/views/pages/clientes/index.ejs`
```
<%- include('../../partials/header') %>
<div class="container pt-3">
    <div class="row mb-3">
        <div class="col">
            <div class="d-flex justify-content-between">
                <h2 class="mb-0">Cadastro de Clientes</h2>
                <a class="btn btn-primary" href="/clientes/adicionar">Adicionar</a>
            </div>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-10">
            <table class="table table-bordered table-sm table-hover">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Idade</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody id='bodyClientes'></tbody>
            </table>
        </div>
    </div>
</div>

<script src="/scripts/funcoes.js"></script>
<script src="/scripts/clientes.js"></script>
<%- include('../../partials/footer') %>
```

### 15 - Configurar a tela adicionar.ejs dos clientes, que está em `src/views/pages/clientes/adicionar.ejs`
```
<%- include('../../partials/header') %>
<div class="container pt-3">
    <div class="row mb-3">
        <div class="col">
            <div class="d-flex justify-content-between">
                <h2 class="mb-0">Cadastro de Clientes</h2>
                <a class="btn btn-success" href="/clientes/">Voltar</a>
            </div>
        </div>
    </div>
    <form id='formAdicionar'>
        <div class="row">
            <div class="col-4 pe-1">
                <div class="form-group">
                    <label for="nome" class="form-label">nome</label>
                    <input type="text" name='nome' id='nome' class="form-control" autocomplete="off" />
                </div>
            </div>
            <div class="col-2 ps-1 pe-1">
                <div class="form-group">
                    <label for="cpf" class="form-label">cpf</label>
                    <input type="text" name='cpf' id='cpf' class="form-control" autocomplete="off" />
                </div>
            </div>
            <div class="col-2 ps-1 pe-1">
                <div class="form-group">
                    <label for="idade" class="form-label">idade</label>
                    <input type="number" name='idade' id='idade' class="form-control" autocomplete="off" />
                </div>
            </div>
            <div class="col-2 ps-1">
                <div class="form-group">
                    <label for="idade" class="form-label">nbsp;</label>&
                    <input type="submit" class="form-control btn-danger" value='Cadastrar' />
                </div>
            </div>
        </div>
    </form>
</div>

<script src="/scripts/funcoes.js"></script>
<script src="/scripts/adicionar.js"></script>
```

### 16 - Configurar a tela editar.ejs dos clientes, que está em `src/views/pages/clientes/editar.ejs`
```
<%- include('../../partials/header') %>
<div class="container pt-3">
    <div class="row mb-3">
        <div class="col">
            <div class="d-flex justify-content-between">
                <h2 class="mb-0">Alteração de Clientes</h2>
                <a class="btn btn-success" href="/clientes/">Voltar</a>
            </div>
        </div>
    </div>
    <form id='formEditar'>
        <input type="hidden" name='_id' id='_id'>
        <div class="row">
            <div class="col-4 pe-1">
                <div class="form-group">
                    <label for="nome" class="form-label">nome</label>
                    <input type="text" name='nome' id='nome' class="form-control" autocomplete="off" />
                </div>
            </div>
            <div class="col-2 ps-1 pe-1">
                <div class="form-group">
                    <label for="cpf" class="form-label">cpf</label>
                    <input type="text" name='cpf' id='cpf' class="form-control" autocomplete="off" />
                </div>
            </div>
            <div class="col-2 ps-1 pe-1">
                <div class="form-group">
                    <label for="idade" class="form-label">idade</label>
                    <input type="number" name='idade' id='idade' class="form-control" autocomplete="off" />
                </div>
            </div>
            <div class="col-2 ps-1">
                <div class="form-group">
                    <label for="" class="form-label">&nbsp;</label>
                    <input type="submit" class="form-control btn-info" value='Alterar' />
                </div>
            </div>
        </div>
    </form>
</div>

<script src="/scripts/funcoes.js"></script>
<script src="/scripts/editar.js"></script>
<%- include('../../partials/footer') %>
```

### 17 - Configurar o script de funções que está em `src/assets/js/funcoes.js`
```
const getClientes = async () => {
    const res = await fetch('http://localhost:3000/api/getclientes')
    const dados = await res.json();
    return dados;
}

const getClienteById = async (id) => {
    const res = await fetch('http://localhost:3000/api/getcliente/' + id)
    const cliente = await res.json();
    return cliente[0];
}

const postCliente = async (cliente) => {
    fetch('http://localhost:3000/api/postCliente', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(cliente)
    }).then(x => {
        return 1
    }).catch(x => {
        return x
    })
}

const putCliente = async (cliente) => {
    fetch('http://localhost:3000/api/putCliente/' + cliente._id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(cliente)
    }).then(x => {
        return 1
    }).catch(x => {
        return x
    })
}

const deleteCliente = async (id) => {
    fetch('http://localhost:3000/api/removeCliente/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }).then(x => {
        return 1
    }).catch(x => {
        return x
    })
}
```

### 18 - Configurar o script utilizado na tela de clientes, que está em `src/assets/js/clientes.js`
```
const bodyClientes = document.getElementById('bodyClientes');

getClientes().then((dados) => {
    bodyClientes.innerHTML = '';
    dados.map((x) => {
        bodyClientes.innerHTML += `<tr>
            <td>${x.nome}</td>
            <td class='w150'>${x.cpf}</td>
            <td class='text-center w90'>${x.idade}</td>
            <td class='text-center w90'>
                <a href='/clientes/editar/${x._id}'><img src="/imagens/edit.svg" alt="edit" class='me-2'></a>
                <img onclick='removerCliente("${x._id}")' src="/imagens/remove.svg" alt="edit" />
            </td>
        </tr>`
    })
})

function removerCliente(id) {
    const resp = confirm('deseja realmente excluir o cliente?');
    if (resp) {
        deleteCliente(id)
        .then((x) => window.location.reload())
        .catch((x) => console.log(x));
    }
}
```

### 19 - Configurar o script utilizado para adicionar clientes, que está em `src/assets/js/adicionar.js`
```
const formAdicionar = document.getElementById('formAdicionar');
const nome = document.getElementById('nome');
const idade = document.getElementById('idade');
const cpf = document.getElementById('cpf');

formAdicionar.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        nome: nome.value,
        idade: idade.value,
        cpf: cpf.value,
    }
    postCliente(data)
    .then((x) => (window.location.href = '/clientes'))
    .catch((err) => console.log(err));
})
```

### 20 - Configurar o script utilizado para editar clientes, que está em `src/assets/js/editar.js`
```
const formEditar = document.getElementById('formEditar');
const _id = document.getElementById('_id');
const nome = document.getElementById('nome');
const idade = document.getElementById('idade');
const cpf = document.getElementById('cpf');
const id = window.location.href.split('editar/')[1];

// Get Cliente
getClienteById(id).then((x) => {
    nome.value = x.nome;
    idade.value = x.idade;
    cpf.value = x.cpf;
    _id.value = x._id;
})

formEditar.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        _id: _id.value,
        nome: nome.value,
        idade: idade.value,
        cpf: cpf.value,
    }
    putCliente(data)
    .then((x) => (window.location.href = '/clientes'))
    .catch((err) => console.log(err));
})
```

### 21 - dentro da pasta `src/assets/img`, colocar as imagens que representam a edição e exclusão dos registros
```
edit.svg
remove.svg
```
