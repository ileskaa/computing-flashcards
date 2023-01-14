const express = require('express')
const router = express.Router()
const data = require('../data/data.json')

router.get('/', (req, res) => {
    const name = req.cookies.username
    //pug will automatically look into the views folder
    if(!name){
        res.redirect('/newuser')
    } else {
        const id = Math.floor(Math.random() * data.length)
        res.render('index', { name, id }) //won't work if name is not inside brackets
    }
})

router.get('/newuser', (req, res) => {
    res.render('newuser')
})
router.post('/newuser', (req, res) => {
    res.cookie('username', req.body.username) //set a username cookie
    res.redirect('/')
})

router.post('/card/:id', (req, res) => {
    let previousID = Number(req.params.id)
    let id
    function generateId() {
        id = Math.floor(Math.random() * data.length)
        if (previousID===id){
            generateId()
        } else return
    }
    generateId()
    res.redirect('/cards/' + id + '?side=question')
})

router.get('/cards/:id', (req, res) => {
    const name = req.cookies.username
    const { side } = req.query
    const { id } = req.params //we use object unpacking
    const text = data[id][side]
    let sideToShow = 'question'
    const template = {id, text, name, sideToShow}
    if(side==='question'){
        template.sideToShow = 'answer'
        template.question = 'q'
    }
    res.render('card', template)
})

router.post('/goodbye', (req, res) => {
    res.clearCookie('username')
    res.redirect('/newuser')
})

module.exports = router