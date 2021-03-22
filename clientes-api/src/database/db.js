// require
const config = require('config')
const restful = require('node-restful')
const mongoose = restful.mongoose

// connect to database
mongoose.connect(process.env.DATABASE || config.get('server.database'), {useUnifiedTopology: true, useNewUrlParser: true})

// export
module.exports = mongoose