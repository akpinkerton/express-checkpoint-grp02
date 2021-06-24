var express = require('express');
var router = express.Router();
const movies = require('../data/movies.json')
var fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(req.query.title)
  if (!req.query.title) {res.json(movies).end()}
  else {
    const title = movies.filter((movie) => movie.title === req.query.title)
    res.json(title[0]).end()
  }
});

router.get('/:id', function(req, res, next) {
  if (!parseInt(req.params.id)) {
    res.status(400).end()
  } else {
    const movie = movies.filter((movie) => movie.id === Number(req.params.id))
    if (movie.length === 0) {
      res.status(404).end()
    }
    // console.log("movie", movie)
    res.json(movie[0]).end()
  }
});

router.post('/', (req, res) => {
  req.body['id'] = movies.length + 1
  // console.log(req.body)
  //  let content = movies.push(req.body)
  let content = [...movies, req.body]
  fs.writeFile('./data/movies.json', JSON.stringify(content), (err) => {
    if(err) console.log(err)
  })
  res.send(content).end()
})

// ## Parameters
// 	{   "title": "From Paris With Love",
//       "runtime": 94,
//       "release_year": 2010,
//       "director": "Pierre Morel",
//       }

module.exports = router;
