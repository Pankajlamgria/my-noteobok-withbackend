const connect_database = require('./db.js');
var cors=require('cors');
const express = require('express')
connect_database();
const app = express()
const port = 4000
app.use(cors())


app.use(express.json())

// Routes to perform CRUD operations while hitting /api/auth,/api/notes url and even after that
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})