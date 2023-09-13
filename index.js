import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = 'https://www.frankfurter.app';

app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL + '/currencies');
        const currencies = getCurrencyLabels(response.data);
        const data = {
            currencies: currencies,
        }
        res.render('index.ejs', data);
    } catch {
        
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function getCurrencyLabels(response){
    let currencies = [];
    for (let key in response){
        currencies.push(`${response[key]} (${key})`);
    }
    console.log(currencies);
    return currencies;
};