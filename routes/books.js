const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Book = require('../models/book')
const uploadPath = path.join('public', Book.coverImageBasePath)
const Author = require('../models/author')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

// all books route
router.get('/', async (req, res) => {
    res.send('All Books')
    let searchOptions = {}
    
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const books = await Book.find(searchOptions)
        res.render('books/index', {
            books: books,
            searchOptions: req.query
        })
    } catch (err) {
        res.render('authors/new', {
            books: books,
            errorMessage: 'Error creating Author'
        });
    }
})

// new books route
router.get('/new',  async (req, res) => {
    renderNewPage(res, new Book())
})

// create books route
router.post('/', upload.single('cover'), async (req, res) => {
    req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description,
        coverImageName: fileName,
    })

    try {
        const newBook = await book.save()
        // res.redirect(`books/${newBook.id}`)
        res.redirect(`books`)
    } catch{
        renderNewPage(res, new Book(), hasError)
    }
    
})

async function renderNewPage(res, book, hasError = false){
    try{
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if(hasError) params.errorMessage = 'Error Creating Book'
        res.render('books/new', params)
    } catch{
        res.redirect('/books')
    }
}

module.exports = router