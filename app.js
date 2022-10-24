const express = require('express');
const app = express();
const cheerio = require('cheerio');
const axios = require('axios');


const websiteURL = 'http://books.toscrape.com'


app.get('/', (req, res) => {
    axios(websiteURL)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const content = []

            $('.product_pod', html).each(function () { 
                const title = $(this).find('.star-rating Three').text()
                const websiteURL = $(this).find('a').attr('href')
                content.push({
                    title,
                    websiteURL
                 })
            })
            res.json(content)
        }).catch(err => console.log(err))

})


// set port
PORT = 8080

// running server
app.listen(PORT, async (req, res, err) => {
    if (err) return console.log(err)
    else console.log(`server is running on ${PORT}`)
});
