/*jshint esversion: 6*/

require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
	const latitude = req.body.lat;
	const longitude = req. body.long;
	const url = "https://api.darksky.net/forecast/" + process.env.DARK_SKY_SECRET + "/" + latitude + "," + longitude;

	options = {
		uri: url
	};

	request(options, function(error, response, body) {
		res.send(JSON.parse(body));
	});
});

app.listen(3000, function() {
	console.log("Server is listening on 3000");
});