// require
const app = require('../config/express')()
const port = app.get('port')

// listen
app.listen(port, () => {
    console.log(`server is running on port ${port}. http://localhost:${port}`)
})