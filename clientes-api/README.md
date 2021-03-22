# Criando uma API Node Rest

### 01 - Iniciar o arquivo package.json
```
npm init -y
```

### 02 - Instalar os pacotes do npm
```
npm i express cors nodemon morgan config mongoose node-restful @types/mongoose
```

### 03 - Configurar o arquivo package.json
```
"start": "npx nodemon src/server.js"
"main": "src/server.js",
```

### 04 - Configurar a estrutura de pastas e arquivos
```
config
  default.json
  express.js
src
  controllers
    ClienteController.js
  database
    db.js
  models
    clienteModel.js
  routes
    routes.js
  server.js
```

### 05 - Configurar o arquivo default.json que está em `config/default.json`
```
{
    "server": {
        "port": 3000,
        "database": "mongodb://localhost:27017/clientes"
    }
}
```

### 06 - Configurar o arquivo express.js que está em `config/express.js`
```
// Requires
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('config');
const router = require('../src/routes/routes')

module.exports = () => {
    // Setup App
    const app = express();
    app.set('port', process.env.PORT || config.get('server.port'));

    // Middleware
    app.use(morgan('dev'));
    app.use(cors({origin: '*', optionsSuccessStatus: 200})) 
    app.use(express.urlencoded({ extended: true })) 
    app.use(express.json())
    app.use(express.json({ type: 'application/json' })) 

    // Routes
    app.use(router);

    // Retun the app
    return app;
}
```

### 07 - Configurar o arquivo server.js que está em `src/server.js` 
```
// Requires 
const app = require('../config/express')() 
const port = app.get('port') 

// Listen Port 
app.listen(port, () => { 
    console.log(`server is running on port ${port}. http://localhost:${port}`) 
})
```

### 08 - Configurar o arquivo db.js que está em `src/database/db.js`
```
// Require 
const config = require('config') 
const restful = require('node-restful') 
const mongoose = restful.mongoose 

// Connect to database
mongoose.connect(process.env.DATABASE || config.get('server.database'), {useUnifiedTopology: true, useNewUrlParser: true})

// Export
module.exports = mongoose
```

### 09 - Configurar o arquivo clienteModel.js que está em `src/models/clienteModel.js`
```
// Requires 
const mongoose = require('../database/db') 

// Create Model Schema 
const ClienteSchema = mongoose.Schema({
    nome: { type: String, trim: true, require: true },
    cpf: { type: String, trim: true, require: true },
    idade: { type: Number }
}, { timestamps: true })

// Export 
module.exports = mongoose.model('Cliente', ClienteSchema) 
```

### 10 - Configurar o arquivo clienteController.js  que está em `src/controllers/clienteController.js`
```
// Require 
const ClienteModel = require('../models/ClienteModel')

// Config Routes 

// Read All 
exports.getAllClientes = async (req, res) =>{ 
    try{
        const clientes = await ClienteModel.find({}) 
        res.send(clientes) 
    }
    catch(err){
        res.status(400).send({'mensagem' : 'getAllClientes - Erro ao consultar os clientes'})
    }
}

// Read One (To read one is neccesary know who is) 
exports.getClienteById = async (req, res) =>{
    try{
        const {id} = req.params
        const cliente = await ClienteModel.find({_id: id})
        res.send(cliente)
    }
    catch(err){
        res.status(400).send({'mensagem' : 'getClienteById - Erro ao consultar o cliente'})
    }
}

// Create 
exports.postCliente = async (req, res) =>{
    try{
        const cliente = await ClienteModel.create(req.body)
        res.send({mensagem: 'cliente adicionado com sucesso'})
    }
    catch(err){
        ires.status(400).send({'mensagem' : 'postCliente - Erro ao cadastrar o cliente'})
    }
}

// Update (To update one is neccesary know who is)
exports.putCliente = async (req, res) =>{
    try{
        const {id} = req.params 
        await ClienteModel.updateOne({_id: id}, req.body)
        res.send({mensagem: 'cliente alterado com sucesso'})
    }
    catch(err){
        res.status(400).send({'mensagem' : 'putCliente - Erro ao atualizar o cliente'})
    }
}

// Remove (To remove one is neccesary know who is) 
exports.removeCliente = async (req, res) =>{
    try{
        const {id} = req.params 
        await ClienteModel.deleteOne({_id: id}) 
        res.send({mensagem: 'cliente removido com sucesso'}) 
    }
    catch(err){
        res.status(400).send({'mensagem' : 'removeCliente - Erro ao remover o cliente'})
    }
}
```

### 11 - Configurar o arquivo routes.js que está em `src/routes/routes.js`
```
// Requires 
const express = require('express') 
const router = express.Router(); 
const ClienteController = require('../controllers/ClienteController') 

// Routes 
router.get('/api/getClientes', ClienteController.getAllClientes) 
router.get('/api/getCliente/:id', ClienteController.getClienteById) 
router.post('/api/postCliente', ClienteController.postCliente) 
router.put('/api/putCliente/:id', ClienteController.putCliente) 
router.delete('/api/removeCliente/:id', ClienteController.removeCliente) 

// Export 
module.exports = router 
```



### 12 - Testar as rotas no postaMan
```
[get] http:/localhost:3000/api/getClientes', ClienteController.getAllClientes
[get] http:/localhost:3000/api/getCliente/:id', ClienteController.getClienteById
[post] http:/localhost:3000/api/postCliente', ClienteController.postCliente
[put] http:/localhost:3000/api/putCliente/:id', ClienteController.putCliente
[delete] http:/localhost:3000/api/removeCliente/:id', ClienteController.removeCliente
```
