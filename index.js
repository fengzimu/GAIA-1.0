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
// http / https server
    // app.get('/abc', async function(req, res) {
    //     try {
    //         const data = await getJsonFile()
    //         //console.log(data)
    //         if(data) {
    //           res.json(data)
    //         } else {
    //           res.status(401)
    //         }
    //     } catch (err) {
    //         res.status(500)
    //         res.send(err)
    //     }
    // })

var getJsonFile = async function() {
    try {
        const contents =  await fs.readFileSync(path.resolve("./mockdata.json"), {
            encoding: "utf-8"
        })
        return JSON.parse(contents)
    } catch (err) {
     throw err
    }
}

app.get('/abc2', async function(req, res) {
    try {
        const data = await getJsonFile2()
        //console.log(data)
        if(data) {
          res.json(data)
        } else {
          res.status(401)
        }
    } catch (err) {
        res.status(500)
        res.send(err)
    }
})

var getJsonFile2 = async function() {
    try {
        const contents =  await fs.readFileSync(path.resolve("./mockdata1.json"), {
            encoding: "utf-8"
        })
        return JSON.parse(contents)
    } catch (err) {
     throw err
    }
}

app.get('/abc3', async function(req, res) {
    try {
        const data = await getJsonFile3()
        //console.log(data)
        if(data) {
          res.json(data)
        } else {
          res.status(401)
        }
    } catch (err) {
        res.status(500)
        res.send(err)
    }
})

var getJsonFile3 = async function() {
    try {
        const contents =  await fs.readFileSync(path.resolve("./mockdata2.json"), {
            encoding: "utf-8"
        })
        return JSON.parse(contents)
    } catch (err) {
     throw err
    }
}

app.get('/abc4', async function(req, res) {
    try {
        const data = await getJsonFile4()
        //console.log(data)
        if(data) {
          res.json(data)
        } else {
          res.status(401)
        }
    } catch (err) {
        res.status(500)
        res.send(err)
    }
})

var getJsonFile4 = async function() {
    try {
        const contents =  await fs.readFileSync(path.resolve("./mockdata3.json"), {
            encoding: "utf-8"
        })
        return JSON.parse(contents)
    } catch (err) {
     throw err
    }
}


app.get('/abc5', async function(req, res) {
    try {
        const data = await getJsonFile5()
        //console.log(data)
        if(data) {
          res.json(data)
        } else {
          res.status(401)
        }
    } catch (err) {
        res.status(500)
        res.send(err)
    }
})

var getJsonFile5 = async function() {
    try {
        const contents =  await fs.readFileSync(path.resolve("./mockdata4.json"), {
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


