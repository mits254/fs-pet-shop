'use strict';
let fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 8000;
const petsPath = path.join(__dirname, 'pets.json');

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/pets', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
        if (err) {
            console.error(err);
            res.sendStatus(400);

        }
        let pets = JSON.parse(petsJSON);
        res.send(pets);
    });
})

app.get('/pets/:id', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
        if (err) {
            console.error(err);
            res.sendStatus(400);

        }
        let id = parseInt(req.params.id);
        let pets = JSON.parse(petsJSON)
        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }
        res.send(pets[id]);
    });
})

app.post('/pets', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
        if (err) {
            console.error(err);
            res.sendStatus(400);

        }
        if(req.body.age && req.body.kind && req.body.name){
            let pets = JSON.parse(petsJSON);
            req.body.age = parseInt(req.body.age);
            pets.push(req.body);
    
            fs.writeFile('pets.json', JSON.stringify(pets), (err) => {
                res.send(req.body);
            });
        } else {
            res.sendStatus(400);
        }
        
    })
})


app.patch('/pets/:id',(req, res)=>{
    fs.readFile(petsPath, 'utf8', (err,petsJSON)=>{
        let id = parseInt(req.params.id);
        if (id) {
            let pets = JSON.parse(petsJSON);
            let newPet = new Object();
            newPet.age = req.body.age ? parseInt(req.body.age) : pets[id].age;
            newPet.kind = req.body.kind ? req.body.kind : pets[id].kind;
            newPet.name = req.body.name ? req.body.name : pets[id].name;
            pets[id]=newPet;
            fs.writeFile('pets.json',JSON.stringify(pets),(err)=>{

                res.send(pets[id]);
            })
        }
    })
})

app.delete('/pets/:id',(req,res)=>{
    fs.readFile(petsPath,'utf8',(err,petsJSON)=>{
      let id = parseInt(req.params.id);
      let pets = JSON.parse(petsJSON);
      let destroy = pets.splice(id,1);
      fs.writeFile('pets.json',JSON.stringify(pets),(err)=>{

        res.send(destroy[0]);
      })  
    })
    
})

    app.use((req, res) => {
        res.sendStatus(400)
    })

    app.listen(port, () => {
        console.log('Listening on port', port)
    })

    module.exports = app;