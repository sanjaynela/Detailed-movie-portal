const express = require('express');
const router = express.Router();

const api_key = "528c7719235e9afc46cfb2d2a23bb56a";

//Axois
const axios = require('axios');

//Get movie cast
router.get('/getDetails/:personId',function(req,res){
    let url = `https://api.themoviedb.org/3/person/${req.params.personId}?api_key=${api_key}&language=en-US&page=1`;
    axios.get(url)
        .then(response => {
            //Create castObj
            let castObj = new Object();
            //birthday
            castObj.birthday = response.data.birthday;
            //birth place
            castObj.place_of_birth = response.data.place_of_birth;
            //gender
            if(response.data.gender===1){
                castObj.gender = "female";
            }
            else if(response.data.gender===2){
                castObj.gender = "male"
            }
            else{
                castObj.gender = null;
            }
            //name
            castObj.name = response.data.name;
            //homepage
            castObj.homepage = response.data.homepage;
            //also known as
            castObj.also_known_as = response.data.also_known_as;
            //Known for departments
            castObj.known_for_department = response.data.known_for_department;
            //Biography
            castObj.biography = response.data.biography;
            //Profile_path
            castObj.profile_path = "https://image.tmdb.org/t/p/w500" + response.data.profile_path;
            //Convert cast object to json response
            res.json(castObj)
        })
        .catch(err => res.send(err));
});

//Get Movie cast external ids
router.get('/getExternals/:personId',function(req,res){
    let url = `https://api.themoviedb.org/3/person/${req.params.personId}/external_ids?api_key=${api_key}&language=en-US&page=1`;
    axios.get(url)
        .then(response => {
            //Create castObj
            let castObj = new Object();
            //imdb_id 
            if(response.data.imdb_id!=null){
                castObj.imdb_id = "https://www.imdb.com/name/" + response.data.imdb_id;
            }
            else{
                castObj.imdb_id = null;
            }
            //facebook_id
            if(response.data.facebook_id!=null){
                castObj.facebook_id = "https://www.facebook.com/" + response.data.facebook_id;
            }
            else{
                castObj.facebook_id = null;
            }
            //instagram_id
            if(response.data.instagram_id!=null){
                castObj.instagram_id = "https://www.instagram.com/" + response.data.instagram_id;
            }
            else{
                castObj.instagram_id = null;
            }
            //twitter_id
            if(response.data.twitter_id!=null){
                castObj.twitter_id = "https://www.twitter.com/" + response.data.twitter_id;
            }
            else{
                castObj.twitter_id = null;
            }
            //Convert cast object to json response
            res.json(castObj)
        })
        .catch(err => res.send(err));
});

module.exports = router;