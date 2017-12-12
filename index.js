// Server configuration

const html = `<img src="/image.svg" />`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="400" height="180">
<rect x="50" y="20" rx="20" ry="20" width="150" height="150" style="fill:red;stroke: black;stroke-width:5;opacity:0.5" />
</svg>`;

const express = require('express');
const request = require('request');
const app = express();

app.get('/', function (req, res) {
    console.log('Server: HTML requested');
    res.send(html);
});

app.get('/image.svg', function (req, res) {
    console.log('Server: image requested');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
    res.end();
});

// jsdom API tests

function newApi() {
    const jsdom = require('jsdom');
    const { JSDOM } = jsdom;
    console.log('---------------');
    console.log('Testing new API\n');

    JSDOM.fromURL('http://localhost:3000', {
        resources: 'usable'
    });
}

function req() {
    request.get('http://localhost:3000/image.svg', (err, res, body) => {
        console.log('---------------');
        console.log('Testing request\n');

        console.log(body);

        newApi();
    })
}


app.listen(3000, req);