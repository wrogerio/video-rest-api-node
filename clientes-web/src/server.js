// requires
const app = require('../config/express')()
const port = app.get('port')

app.listen(port, () => {
    console.log(`server is running on port ${port}. http://localhost:${port}`)
})