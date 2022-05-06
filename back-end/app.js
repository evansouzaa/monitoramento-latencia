const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const ping = require('ping');

const app = express();

app.use(express.json(), cors());

const options = {
    key: fs.readFileSync('../../../etc/letsencrypt/live/altarede.duckdns.org/privkey.pem'),
    cert: fs.readFileSync('../../../etc/letsencrypt/live/altarede.duckdns.org/fullchain.pem')
};
// cria get na raiz
app.get("/", (req, res) => {
    return res.json("API Monitoramento 2013~2021");
});

app.post("/ping", function(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*'); //permite para todos os hosts
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    ping.promise.probe(req.body.host)
        .then(function(res) {
            return res
        }).then(function(latencia) {
            response(latencia)
        })

    function response(latencia) {
        return res.status(200).json({...req.body, ...latencia });
    }
});

https.createServer(options, app, function(req, res) {
    res.writeHead(200, console.log("Servidor https://localhost:3001/"));
}).listen(3001);