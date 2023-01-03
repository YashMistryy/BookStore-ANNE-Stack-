// create Rest Api using express+node and mysql database
const express = require('express');
const booksRouter = require("./routes/books");
var cors = require('cors');
const app = express();
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.set('view engine', 'ejs');
app.listen(9001,() => {console.log("server started!")})

// create a router for books

app.use('/books',booksRouter);  




