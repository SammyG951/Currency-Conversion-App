import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Creating express app
const app = express();

// Setting port number and api url
const port = 3000;
const API_URL = 'https://www.frankfurter.app';

let currencies;

// Setting public folder for static files
app.use(express.static('public'));

// Initializing body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Use axios to retrieve list of available currencies, then render and pass data to index.ejs
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL + '/currencies');
        currencies = response.data;
        const data = {
            currencies: currencies,
        }
        res.render('index.ejs', data);
    } catch(e) {
        console.log(e.response.data);
    }
});

// On submit use axios to retrieve conversion from given input, then render and pass data to index.ejs
app.post('/convert-currency', async(req, res) => {
    try{
        const request = {
            amount: req.body.currencyAmount,
            from: req.body.currencyOne,
            to: req.body.currencyTwo,
        }
        console.log(request);
        const conversion = await axios.get(API_URL + '/latest', {
            params: request,
        });
        const data = {
            currencies: currencies,
            conversion: conversion.data,
        }
        console.log(conversion.data);
        res.render('index.ejs', data);
    } catch {
        console.log(e.response.data);
    }
});

// Listen on predefined port to start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
