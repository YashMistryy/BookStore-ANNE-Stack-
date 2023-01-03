// here write all the routes for books
const express= require('express');
const app = express()
const routerBooks = express.Router();
var bodyParser = require('body-parser')
routerBooks.use(bodyParser.json());
 routerBooks.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.urlencoded({ extended: false }))
const neo4j = require('neo4j-driver')
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "1111"))
// const session = driver.session()

routerBooks.get('/book-list' , (req,res)=>{
    const session = driver.session()

   console.log('book-list called')
 session
    .run('MATCH (n) RETURN n')
    .then(function(result){
        var bookArrr = [];
        result.records.forEach(function(record){
            bookArrr.push({
                title:record._fields[0].properties.title,
                isbn:record._fields[0].properties.isbn,
                price:record._fields[0].properties.price,
                dateOfRelease:record._fields[0].properties.dateOfRelease
            });
            // console.log(record._fields[0].properties);
          });
        //   res.render("index",{
        //     books:bookArrr
        // });
        res.json(bookArrr)
    })
    .catch(function(err){console.log(err)})
    
     
   

//   console.log(node.properties.name)

process.on("exit", async (code) => {
	await driver.close();
});
// on application exit:
// await driver.close()
})

routerBooks.post('/add-book',function(req,res){
    const session = driver.session()

   console.log("add book was called");
   console.log(req.body)
    var title  = req.body.title;
    var isbn = req.body.isbn;
    var price = req.body.price;
    var dateOfRelease = req.body.dateOfRelease;
    console.log(req.body.isbn)
   if(isbn!=undefined || isbn!="" ){
     session
        .run(`CREATE (n:BOOK {title: '${title}', isbn: '${isbn}', price: '${price}',dateOfRelease:'${dateOfRelease}'})
        RETURN n`)
        .then(function(result){
            // res.redirect('/books/book-list');
            // res.json('this work')
        })
        .catch(function(err){
            console.log(err)
        });}else{console.log("book data was not present")}
       
    process.on("exit", async (code) => {
        await driver.close();
    });
   

});

routerBooks.put('/update-book/:isbn',function(req,res){
    const session = driver.session()
    var title  = req.body.title;
    var isbn = req.body.isbn;
    var price = req.body.price;
    var dateOfRelease = req.body.dateOfRelease;
    console.log(isbn)
    console.log("update-book called")
    
    session
        .run(`MATCH (n:BOOK) where n.isbn ='${isbn}' SET n.title= '${title}',n.isbn= '${isbn}',n.price= '${price}',n.dateOfRelease= '${dateOfRelease}' return n`)
        .then(function(result){
           console.log(result.records[0])
            if(result.records.length){
                // singleRecord = result.records[0];
                console.log()
                var book = {
                    title:result.records[0]._fields[0].properties.title,
                    isbn:result.records[0]._fields[0].properties.isbn,
                    price:result.records[0]._fields[0].properties.price,
                    dateOfRelease:result.records[0]._fields[0].properties.dateOfRelease
                };
                console.log(book)
                // res.render('searchResult',{bookSearched:book});
                
            }
            else{
                console.log("book not present")
                // res.render('error');

            }
        })
        .catch();
        process.on("exit", async (code) => {
            await driver.close();
        });
    
});

routerBooks.get(`/get-book/:isbn`,function(req,res){
    console.log("get book called")
    const session = driver.session()
    var isbn = (req.params.isbn);
    // console.log(isbn)
    session
        .run(`MATCH (n:BOOK)where n.isbn ='${isbn}' return n`)
        .then(function(result){
        //    console.log(result.records[0])
            if(result.records.length){
                // singleRecord = result.records[0];
                console.log()
                var book = {
                    title:result.records[0]._fields[0].properties.title,
                    isbn:result.records[0]._fields[0].properties.isbn,
                    price:result.records[0]._fields[0].properties.price,
                    dateOfRelease:result.records[0]._fields[0].properties.dateOfRelease
                };
                res.json(book)
                // res.render('searchResult',{bookSearched:book});
            }
            else{
                res.json("book not present");
                console.log("book not present");
            }
        })
        .catch(function(err){
            console.log(err)
        });
        process.on("exit", async (code) => {
            await driver.close();
        });
});

routerBooks.delete(`/delete-book/:isbn`,function(req,res){
    const session = driver.session()
    var isbn = (req.params.isbn);
    console.log("delte-book called")
    console.log(isbn)
    session
        .run(`MATCH (n:BOOK)where n.isbn ='${isbn}' delete n`)
        .then(function(result){
        //    console.log(result.records[0])
            if(result.records.length){
                // singleRecord = result.records[0];
                console.log()
                // var book = {
                //     title:result.records[0]._fields[0].properties.title,
                //     isbn:result.records[0]._fields[0].properties.isbn,
                //     price:result.records[0]._fields[0].properties.price,
                //     dateOfRelease:result.records[0]._fields[0].properties.dateOfRelease
                // };
                // res.json(book)
                // res.render('searchResult',{bookSearched:book});
            }
            else{
                // res.json("book not present");
                console.log("book not present");
            }
            console.log("book deleted")
        })
        .catch(function(err){
            console.log(err)
        });
        process.on("exit", async (code) => {
            await driver.close();
        });
});

module.exports = routerBooks;