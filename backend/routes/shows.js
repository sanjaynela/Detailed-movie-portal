const express = require('express');
const router = express.Router();

const api_key = "528c7719235e9afc46cfb2d2a23bb56a";

//Axois
const axios = require('axios');

//Get popular tv shows
router.get('/getPopular',function(req,res) {
    let url = `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}`;
    axios.get(url)
        .then(response => {
            //Create result list object
            let resultList = [];
            //Iterate through each obj in results of response and extract id,title and poster and add them to result list
            response.data.results.forEach(function(currentObj){
                //Create resultObj for current result entry
                let resultObj = new Object();
                resultObj.id = currentObj.id;
                resultObj.name = currentObj.name;
                if(currentObj.poster_path){
                    resultObj.poster_path = "https://image.tmdb.org/t/p/w500" + currentObj.poster_path;
                }
                else{
                    resultObj.poster_path = null;
                }
                resultList.push(resultObj);
            });
            let finalObj = new Object();
            finalObj.shows = resultList;
            //Convert result list object to json response
            res.json(finalObj);
        })
        .catch(err => res.send(err));
});

//Get top rated tv shows
router.get('/getTopRated',function(req,res) {
    let url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`;
    axios.get(url)
        .then(response => {
            //Create result list object
            let resultList = [];
            //Iterate through each obj in results of response and extract id,title and poster and add them to result list
            response.data.results.forEach(function(currentObj){
                //Create resultObj for current result entry
                let resultObj = new Object();
                resultObj.id = currentObj.id;
                resultObj.name = currentObj.name;
                if(currentObj.poster_path){
                    resultObj.poster_path = "https://image.tmdb.org/t/p/w500" + currentObj.poster_path;
                }
                else{
                    resultObj.poster_path = null;
                }
                resultList.push(resultObj);
            });
            let finalObj = new Object();
            finalObj.shows = resultList;
            //Convert result list object to json response
            res.json(finalObj);
        })
        .catch(err => res.send(err));
});

//Get trending tv shows
router.get('/getTrending',function(req,res) {
    let url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`;
    axios.get(url)
        .then(response => {
            //Create result list object
            let resultList = [];
            //Iterate through each obj in results of response and extract id,title and poster and add them to result list
            response.data.results.forEach(function(currentObj){
                //Create resultObj for current result entry
                let resultObj = new Object();
                resultObj.id = currentObj.id;
                resultObj.name = currentObj.name;
                if(currentObj.poster_path){
                    resultObj.poster_path = "https://image.tmdb.org/t/p/w500" + currentObj.poster_path;
                }
                else{
                    resultObj.poster_path = null;
                }
                resultList.push(resultObj);
            });
            let finalObj = new Object();
            finalObj.shows = resultList;
            //Convert result list object to json response
            res.json(finalObj);
        })
        .catch(err => res.send(err));
});

//Get Show Details
router.get('/getDetails/:showId',function(req,res){
    let url = `https://api.themoviedb.org/3/tv/${req.params.showId}?api_key=${api_key}&language=en-US&page=1`;
    axios.get(url)
        .then(response => {
            //Create resultObj
            let resultObj = new Object();
            //Store fields
            //id
            resultObj.id = req.params.showId;
            //Title
            resultObj.name = response.data.name;
            //Genre
            let genreList = [];
            response.data.genres.forEach(function(currentGenreObj){
                let genre = currentGenreObj.name;
                genreList.push(genre);
            });
            resultObj.genres = genreList;
            //Spoken languages
            let langList = [];
            response.data.spoken_languages.forEach(function(currentLangObj){
                let lang = currentLangObj.name;
                langList.push(lang);
            });
            resultObj.languages = langList;
            //First air date
            resultObj.first_air_date = response.data.first_air_date.substring(0,4);
            //Runtime - Convert to hrs and mins
            let hours = Math.floor(response.data.episode_run_time / 60);
            let minutes = (response.data.runtime % 60);
            if(isNaN(hours)){
                hours = 0;
            }
            if(isNaN(minutes)){
                minutes = 0;
            }
            let runtime = hours + "hrs " + minutes + "mins"
            resultObj.episode_run_time = runtime;
            //Overview
            resultObj.overview = response.data.overview;
            //Vote_average
            resultObj.vote_average = response.data.vote_average;
            //tagline
            resultObj.tagline = response.data.tagline;
            //Poster_path
            if(response.data.poster_path){
                resultObj.poster_path = "https://image.tmdb.org/t/p/w500" + response.data.poster_path;
            }
            else{
                resultObj.poster_path = null;
            }
            //media_type
            resultObj.type = "tv"
            
            
            //Convert result list object to json response
            res.json(resultObj)
        })
        .catch(err => res.send(err));
    });

//Get video details  
router.get('/getVideo/:showId',function(req,res){
    let url = `https://api.themoviedb.org/3/tv/${req.params.showId}/videos?api_key=${api_key}&language=en-US&page=1`;

    axios.get(url)
        .then(response => {
            let resultObj = new Object();
            //Check if video exists by checking results length. Otherwise use default video with key tzkWB85ULJY
            if(response.data.results.length>0){
                //Check for name===Official Trailer, otherwise use first
                let trailerStatus = false;
                response.data.results.forEach(function(currentResult){
                    if(currentResult.type==="Trailer"){
                        resultObj.url = "https://www.youtube.com/watch?v=" + currentResult.key;
                        resultObj.key = currentResult.key;
                        trailerStatus = true;
                    }
                })
                //No trailer,, so search for teaser
                if(!trailerStatus){
                    response.data.results.forEach(function(currentResult){
                        if(currentResult.type==="Teaser"){
                            resultObj.url = "https://www.youtube.com/watch?v=" + currentResult.key;
                            resultObj.key = currentResult.key;
                            trailerStatus = true;
                        }
                    })
                }
                //No trailer or teaser, so use first video
                if(!trailerStatus){
                    //Use first entry
                    resultObj.url = "https://www.youtube.com/watch?v=" + response.data.results[0].key;
                    resultObj.key = response.data.results[0].key;
                }
            }
            else{
                //Use default key since there is no trailer, teaser or video
                resultObj.url = "https://www.youtube.com/watch?v=" + "tzkWB85ULJY";
                resultObj.key = "tzkWB85ULJY";
            }
            //Convert result list object to json response
            res.json(resultObj)
        })
        .catch(err => res.send(err));
});

//Get show cast
router.get('/getCast/:showId',function(req,res){
    let url = `https://api.themoviedb.org/3/tv/${req.params.showId}/credits?api_key=${api_key}&language=en-US&page=1`;
    axios.get(url)
        .then(response => {
            //Create cast list object
            let castList = [];
            //Iterate through each obj in cast of response and extract id,name,character,path and add them to cast list
            response.data.cast.forEach(function(currentObj){
                //Create castObj for current cast entry
                let castObj = new Object();
                castObj.id = currentObj.id;
                castObj.name = currentObj.name;
                castObj.character = currentObj.character;
                if(currentObj.profile_path){
                    castObj.profile_path = "https://image.tmdb.org/t/p/w500/" + currentObj.profile_path;
                }
                else{
                    castObj.profile_path = null;
                }
                castList.push(castObj);
            });
            //Convert cast list object to json response
            res.json(castList)
        })
        .catch(err => res.send(err));
});

//Get show reviews
router.get('/getReviews/:showId',function(req,res){
    let url = `https://api.themoviedb.org/3/tv/${req.params.showId}/reviews?api_key=${api_key}&language=en-US&page=1`;
    axios.get(url)
        .then(response => {
            //Create review list object
            let reviewList = [];
            //Iterate through each obj in review of response and extract details and add them to review list
            response.data.results.forEach(function(resultObj){
                //Create reviewObj for current review entry
                let reviewObj = new Object();
                //author
                reviewObj.author = resultObj.author;
                //content
                reviewObj.content = resultObj.content;
                //created_at 
                    //Format
                let dateObj = new Date(resultObj.created_at);
                    //Month
                let month = dateObj.toLocaleString('default',{month: 'long'});
                    //Date
                let date = dateObj.getDate();
                    //Year
                let year = dateObj.getFullYear();
                    //time
                let hoursString = resultObj.created_at.substring(11,13);
                let hours = 0;
                if(hoursString.includes(":")){
                    hours = resultObj.created_at.substring(11,12);
                }
                else{
                    hours = resultObj.created_at.substring(11,13);
                }
                let mins = resultObj.created_at.substring(13,19);
                    //If more than 12, take remainder and put pm
                let time = "";
                if(hours>12){
                    hours = hours % 12;
                    time = hours + mins + " PM";
                }
                //If equal to 12, use hours and put pm
                else if(hours===12){
                    time = hours + ":" + mins + " PM";
                }
                //else, use hours and put am
                else{
                    time = hours + ":" + mins + " AM";
                }
                reviewObj.created_at = month + " " + date + ", " + year + ", " + time;
                // reviewObj.created_at_original = resultObj.created_at;
                //url
                reviewObj.url = resultObj.url;
                //rating
                if(resultObj.author_details.rating!=null){
                    reviewObj.rating = resultObj.author_details.rating;
                }
                else{
                    reviewObj.rating = 0;
                }
                //avatar_path
                if(resultObj.author_details.avatar_path!=null){
                    //Check if avatar_path includes http
                    if(resultObj.author_details.avatar_path.includes("http")){
                        reviewObj.avatar_path = resultObj.author_details.avatar_path.substring(1);
                    }
                    else{
                        reviewObj.avatar_path = "https://image.tmdb.org/t/p/original" + resultObj.author_details.avatar_path;
                    }
                }
                else{
                    reviewObj.avatar_path = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnPmUvFLjjmoYWAbLTEmLLIRCPpV_OgxCVA&usqp=CAU";
                }

                reviewList.push(reviewObj);
            });
            //Convert cast list object to json response
            res.json(reviewList)
        })
        .catch(err => res.send(err));
});

//Get Recommended shows
router.get('/getRecommended/:showId',function(req,res){
    let url = `https://api.themoviedb.org/3/tv/${req.params.showId}/recommendations?api_key=${api_key}&language=en-US&page=1`;
    axios.get(url)
        .then(response => {
            //Create recommendedList
            let recommendedList = [];
            response.data.results.forEach(function(currRecMovieObj){
                //Create recMovieObj
                let recMovieObj = new Object();
                //Store fields

                //id
                recMovieObj.id = currRecMovieObj.id;
                //name
                recMovieObj.name = currRecMovieObj.name;
                //poster_path
                if(currRecMovieObj.poster_path!=null){
                    recMovieObj.poster_path = "https://image.tmdb.org/t/p/w500" + currRecMovieObj.poster_path;
                }
                else{
                    recMovieObj.poster_path = null;
                }
                recommendedList.push(recMovieObj);
            })
            
            //Convert recommended list object to json response
            res.json(recommendedList)
        })
        .catch(err => res.send(err));
    });

//Get Similar shows
router.get('/getSimilar/:showId',function(req,res){
    let url = `https://api.themoviedb.org/3/tv/${req.params.showId}/similar?api_key=${api_key}&language=en-US&page=1`
    axios.get(url)
        .then(response => {
            //Create similarList
            let similarList = [];
            response.data.results.forEach(function(currSimilarMovieObj){
                //Create similarMovieObj
                let similarMovieObj = new Object();
                //Store fields

                //id
                similarMovieObj.id = currSimilarMovieObj.id;
                //name
                similarMovieObj.name = currSimilarMovieObj.name;
                //poster_path
                if(currSimilarMovieObj.poster_path!=null){
                    similarMovieObj.poster_path = "https://image.tmdb.org/t/p/w500" + currSimilarMovieObj.poster_path;
                }
                else{
                    similarMovieObj.poster_path = null;
                }
                similarList.push(similarMovieObj);
            })
            
            //Convert similarList object to json response
            res.json(similarList)
        })
        .catch(err => res.send(err));
    });


module.exports = router;