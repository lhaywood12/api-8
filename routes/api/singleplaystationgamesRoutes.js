const express = require('express')
const router = express.Router()
const fetch =(...args)=> import('node-fetch').then(({default:fetch}) => fetch(...args))

//All Games
router.get('/',(req, res)=> {
    const URL = `https://api.sampleapis.com/playstation/games`

    fetch(URL)
    .then(res => res.json())
    .then(data => {
        res.render('pages/playstationGames', {
            title:'All playstationGames',
            name: 'Playstation Games list',
            data
        })
    })
})

//Single Games
router.get('/:id', (req, res)=> {
    const id= req.params.id
    const URL = `https://api.sampleapis.com/playstation/games/${id}`

    fetch(URL)
    .then(res => res.json())
    .then(data => {

        if(Object.keys(data).length >= 1){
            res.render('pages/single-playstationGame', {
                title:`${data.title}`,
                name:`${data.title}`,
                data
            })
        } else {
            res.render('pages/404', {
                title: '404 - Error',
                name: '404-Error'
            })
        }
    })
    .catch(error => {
        console.log('ERROR', error)
    })
})

module.exports = router