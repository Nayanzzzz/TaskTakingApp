const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World ddfe')
})

app.get('/profile', function (req, res) {
    res.send('Hello profddsfefile vfjkbfkb')
  })

app.listen(3000);
console.log("server is running");