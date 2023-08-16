//JOKE API

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {content: "No Jokes"});
})

app.post("/", async (req, res) => {
    var apiUrl = "https://v2.jokeapi.dev/joke/";

    var categoryList = [
        req.body.programming,
        req.body.misc,
        req.body.dark,
        req.body.pun,
        req.body.spooky,
        req.body.christmas 
    ];
    
    var blacklistFlagsList = [
        req.body.nsfw,
        req.body.religious,
        req.body.political,
        req.body.racist,
        req.body.sexist,
        req.body.explicit
    ];
    
    //Removing undefined from unchecked values
    categoryList = categoryList.filter(function(elem) {
        return elem !== undefined
    });

    blacklistFlagsList = blacklistFlagsList.filter(function(elem) {
        return elem !== undefined
    });

    if(categoryList.length === 0) {
        categoryList.push("Any");
    }

    apiUrl += categoryList.toString() + "?format=txt";

    if(blacklistFlagsList.length !== 0) {
        apiUrl += "&blacklistFlags=" + blacklistFlagsList.toString();
    }

    try {        
        const result = await axios.get(apiUrl);   
        res.render("index.ejs", {content: result.data, buttonClicked: true});
    } catch (error) {
        console.log(error.response.data);
        res.send(500);
    }
});

app.listen(port, () => {
    console.log(`Server is listening to port ${port}.`);
});

