const express = require('express');
const path = require('path');

const app = express();

//Cors
const cors = require('cors');
app.use(cors());

//For dist for deployment
app.use(express.static(path.join(__dirname, 'dist/frontend')));

//Movies
let movies = require('./routes/movies');
app.use('/apis/movies',movies);

//Tv Shows
let shows = require('./routes/shows');
app.use('/apis/shows',shows);

//Cast
let cast = require('./routes/cast');
app.use('/apis/cast',cast);

//Any other routes
app.use('/*',function(req,res){
    res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});

// app.get('/', (req,res) =>{
//     res.send('Hello World!!!!');
// })

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = 8080;
app.listen(PORT, () =>{
    console.log(`Example app listening at http://localhost:${PORT}`);
})