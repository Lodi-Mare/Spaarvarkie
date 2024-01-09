const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// all authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        });
    }

})

// new authors route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// create authors route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        res.redirect(`authors/${newAuthor.id}`)
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        });
    }
})

router.get('/:id', (req, res) => {
    res.send('Show Authr' + req.params.id)
})

router.get('/:id/edit', async (req, res) => {
    try{
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', {author: author})    
    }catch{
        res.redirect('author')
    }
})
router.put('/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        await author.save()
        res.redirect(`/authors/${author.id}`)
    } catch (err) {
        if(author == null){
            res.redirect('/')
        }else{
            res.render('authors/edit', {
                author: author,
                errorMessage: 'Error updating Author'
            });
        }
        
    }
})
router.delete('/:id', (req, res) => {
    res.send('Delete Author' + req.params.id)
})

module.exports = router