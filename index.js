const express = require("express");
const bodyParser = require("body-parser");

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');


// ssl cert
// const credentials = {
//     key: fs.readFileSync('./cert/private.pem', 'utf8'),
//     cert: fs.readFileSync('./cert/client.crt', 'utf8')
// };

const app = express();
app.use(bodyParser.json({ limit: '20mb' }));

// static files
app.use('/', express.static('./'));
//app.use('/Mercuryindex.html', express.static('./Mercuryindex.html'));

app.get('/mockdata', (req, res) => {
    try {
        const data = await getJsonFile()
        if(data) {
          res.json(data)
        } else {
          res.status(401)
        }
    } catch (err) {
        res.status(500)
        res.send(err)
    }
});

app.post('/Home',urlencodedParser, function (req, res) {
    console.log(req.body["form-email"], req.body)
    var response = {
        "form-email":req.body["form-email"],
        "form-password":req.body["form-password"],
        "form-checkbox":req.body["form-checkbox"]
    };
    if(response["form-email"] == "Sherry")
    {
        res.sendFile( __dirname + "/" + "home.html" );
    }
    else if(response["form-email"] == "Jack")
    {
        res.sendFile( __dirname + "/" + "employeeHome.html" );
    }
 })

var getJsonFile = async function(fileName) {
    try {
        const contents =  await fs.readFileSync(path.resolve("./mockdata/" + fileName), {
            encoding: "utf-8"
        })
        return JSON.parse(contents)
    } catch (err) {
     throw err
    }
}

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

const PORT = 9000;
// const SSLPORT = 9080;

httpServer.listen(PORT, () => {
    console.log('HTTP Server is running on port %s', PORT);
    console.log('-'.repeat(100));
});


