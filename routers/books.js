const { Book }  = require("../models/books");
const { BookLog } = require("../models/booklog");

const express = require("express");
const router = express.Router();


// get all books 
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (err) {
        res.status(500).send(err);
    }
})

// get book by id
router.get('/:id', function (req,res) {
    Book.findById(req.params.id)
    .then(book => {
        res.send(book);
    })
    .catch(err => {
        res.send(err);
    })
})


// search book by like name
router.get('/search/:name', function (req,res) {
    Book.find(
        {
            $or : [
                {title: {$regex: req.params.name, $options: 'i'}},
                {authors: {$regex: req.params.name, $options: 'i'}},
                {publisher: {$regex: req.params.name, $options: 'i'}},

            ]
        }
    )
    .then(book => {
        if(book.length > 0) {
            res.send(book);
        } else {
            res.send([]);
        }
    })
    .catch(err => {
        res.send(err);
    })
   
})

// delete books by id
router.delete('/:id', function (req,res) {
    Book.findByIdAndDelete(req.params.id)
    .then(book => {
        res.send(book);
    })
    .catch(err => {
        res.send(err);
    })
})


// update books by id
router.put('/:id', function (req,res) {
    Book.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        authors: req.body.authors,
        year: req.body.year,
        publisher: req.body.publisher,
        isbn: req.body.isbn,
        count: req.body.count,
        page_count: req.body.page_count,
        language: req.body.language,
        book_number: req.body.book_number
    }, {new: true})
    .then(book => {
        res.send(book);
    })
    .catch(err => {
        res.send(err);
    })
})

// add books
router.post('/add', function (req,res) {
    const book = new Book({
        title: req.body.title,
        authors: req.body.authors,
        year: req.body.year,
        publisher: req.body.publisher,
        isbn: req.body.isbn,
        count: req.body.count,
        page_count: req.body.page_count,
        language: req.body.language,
        book_number: req.body.book_number
    })
 
    book.save()
    .then(book => {
       res.send({
            success: true,
            message: "Book added successfully",
        });
    })
    .catch(err => {
        console.log(err)
        res.send(err);
    })
})


// book log 
router.post('/log/:id', function (req,res) {
    const bookLog = BookLog({
        book_id: req.params.id,
        name: 'test user',
        book_name: req.body.title,
        book_case: 1,
    });

    bookLog.save()
    .then(bookLog => {
        res.send(bookLog);
    })
    .catch(err => {
        res.send(err);
    });
});


router.delete('/log/delete/:id',function (req,res) { 
    BookLog.findByIdAndDelete(req.params.id)
    .then(book => {
        res.send(book);
    })
    .catch(err => {
        res.send(err);
    })
 })


// get book logs
router.post('/logs', function (req,res) {
    console.log('work')
    BookLog.find()
    .then(bookLog => {
        res.send(bookLog);
    })
    .catch(err => {
        console.log(err)
        res.send(err);
    });
  
});



module.exports = router;