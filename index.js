const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var cors = require('cors')
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors())
var tweets = [
    {
        id:1,
        name: "Geng",
        message: "Hello",
        created: "2018-07-20 12:07:02"
    },
    {
        id:2,
        name: "Geng",
        message: "my name is geng",
        created: "2018-07-20 12:15:02"
    }
]

app.get('/', (req, res) => {
    let result = {
        status : 200,
        message : "twitter api version 5.0"
    }
    res.json(result)
})

app.get('/api/tweets', (req,res) => {
    let result = {
        status : 200,
        datas: tweets
    }
    res.json(result)
})

app.post('/api/tweets', (req,res) => {
    let data = req.body
    tweets.push(data)
    let result = {
        status: 200,
        message: "success insert tweet"
    }
    res.json(result)
})

app.get('/api/search', (req,res) => {
    let q = req.query.q
    let result = {
        status : 200,
        datas: []
    }
    tweets.forEach( (tweet) => {
        if( tweet.message.indexOf(q) > -1 ){
            result.datas.push(tweet)
        }
    })
    res.json(result)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))