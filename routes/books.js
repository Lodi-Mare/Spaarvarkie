const express = require('express')
const router = express.Router()
const Book = require('../models/book')

// all books route
router.get('/', async (req, res) => {
    res.send('All Books')
})

// new books route
router.get('/new', (req, res) => {
    res.send('New Book')
})

// create books route
router.post('/', async (req, res) => {
    res.send('Create Book')
})

module.exports = router