"use strict";

let express = require("express");
let app = express();

let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use(express.static(__dirname + "/../client"));

app.get("/types", (request, response) => {
    let types = mongoUtil.types();
    types.find().toArray((err, docs) => {
        console.log(JSON.stringify(docs));
        let typesNames = docs.map((type) => type.name);
        response.json(typesNames);
    });
});

app.get("/cards", (request, response) => {
    let cards = mongoUtil.cards();
    cards.find({}, {"_id": false}).toArray((err, docs) => {
        response.json(docs);
    });
});

app.listen(8181, () => {
    console.log("Listening on 8181")
});