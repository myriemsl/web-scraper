const express = require('express');
const app = express();
const cheerio = require('cheerio');
const axios = require('axios');


// goal of this tutorial
/// get countries list
/// get name and iso code of each country

// website url page to scrape
const websiteURL = 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3'


// fetching data
app.get('/', (req, res) => {
    axios(websiteURL)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html) // load fetched data
            const countries = []; // storing data of all countries

            // select classname and use each method 
            $('.plainlist ul li', html).each(function () {

                // data of each country 
                const country = { name: "", iso3: "" };
                country.name = $(this).children("a").text();
                country.iso3 = $(this).children("span").text();

                 // populate countries with each country data
                countries.push({
                    country
                })
            })

            // get data
            res.json(countries)
        }).catch(err => console.log(err))

})


// set port
PORT = 8080

// running server
app.listen(PORT, async (req, res, err) => {
    if (err) return console.log(err)
    else console.log(`server is running on ${PORT}`)
});
