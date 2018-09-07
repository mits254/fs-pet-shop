const fs = require('fs');
const http = require('http');
const port = process.env.PORT || 8000


//GET POST DELETE UPDATE
//CRUD ---> POST GET UPDATE DELETE


//create a server
const server = http.createServer((req, res) => {

    fs.readFile('./pets.json', 'utf8', (err, data) => {
        res.setHeader('Content-Type', 'application/json');
        let pets = JSON.parse(data);
        let index = req.url.split("/");
        let num = parseInt(index[2]);
        //GET
        if (req.method === 'GET') {
            if (req.url === '/pets') {

                //let petdata = JSON.stringify(pets);

                res.end(data);
            }
            else if (typeof (num) === 'number' && num < pets.length && num > -1) {

                let petdata = JSON.stringify(pets[num]);
                res.end(petdata);
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Not Found');
            }
        }
        //POST CREATE
        else if (req.method === 'POST' && req.url === '/pets') {
            let body = " ";
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end',  ()=>{
                let myPets = JSON.parse(body);
                const age = parseInt(myPets.age);
                let kind = myPets.kind;
                let name = myPets.name;
                if (age && kind && name) {
                    pets.push(myPets);
                    fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
                        //res.writeHead(200,{'Content-Type':'application/json'});

                        res.end(JSON.stringify(myPets));

                    });
                } else {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Bad Request');
                }
            });

        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Bad Request');
        }


    })

})

server.listen(port, () => {
    console.log('hey, server is on!');
})


module.exports = server;