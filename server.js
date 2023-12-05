if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
// const bcrypt = require('bcrypt')
// const passport = require('passport')
// const flash = require('express-flash')
// const session = require('express-session')
// const methodOverride = require('method-override')
// const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

// const initializePassport = require('./passport-config')
// initializePassport(
//     passport,
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)
// )

// don't use this in production -- we store data in database
const users = [];

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

// app.use(express.urlencoded({ extended: false }))
// app.use(flash())
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride('_method'))
// app.use(expressLayouts)
// app.use(express.static('public'))

app.use('/', indexRouter)
//db
const connectDB = require('./config/database')
const port = process.env.PORT || 3000
connectDB
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running, you better catch it!`)
      })
})





// routes
// app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
// })
// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

// app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')
// })

// app.post('/register', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         users.push({
//             id: Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//         })
//         res.redirect('/login')
//     } catch {
//         res.redirect('/register')
//     }
//     console.log(users)
// })

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     return res.redirect('/login')
// })

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/')
//     }
//     next()
// }
