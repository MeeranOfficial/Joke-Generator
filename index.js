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

    var categoryLists = req.body.category;
    var blacklists = req.body.blacklist;
    
    if(categoryLists !== undefined) {
        apiUrl += categoryLists.toString();
    } else {
        apiUrl += "Any";
    }

    apiUrl += "?format=txt";

    if(blacklists !== undefined) {
        apiUrl += "&blacklistFlags=" + blacklists.toString();
    }

    // console.log(apiUrl); 

    try {        
        const result = await axios.get(apiUrl);   
        res.render("index.ejs", {content: result.data, categoryLists: categoryLists, blacklists: blacklists, buttonClicked: true});
    } catch (error) { 
        console.log(error.response.data);
        res.send(500);
    }
});

app.listen(port, () => {
    console.log(`Server is listening to port ${port}.`);
});

