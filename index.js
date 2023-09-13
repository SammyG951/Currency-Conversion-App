import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = 'https://www.frankfurter.app';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL + '/currencies');
        const data = {
            currencies: response.data,
        }
        res.render('index.ejs', data);
    } catch {
        
    }
});

app.post('/convert-currency', async(req, res) => {
    try{
        const request = {
            amount: req.body.currencyAmount,
            from: req.body.currencyOne,
            to: req.body.currencyTwo,
        }
        console.log(request);
        const currencies = await axios.get(API_URL + '/currencies');
        const conversion = await axios.get(API_URL + '/latest', {
            params: request,
        });
        const data = {
            currencies: currencies.data,
            conversion: conversion.data,
        }
        console.log(conversion.data);
        res.render('index.ejs', data);
    } catch {

    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
