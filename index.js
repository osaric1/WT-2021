const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');
const { json } = require('express/lib/response');

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname))
app.use(express.static('public'))
app.use(express.static('public/html'))

app.get('/vjezbe', function(req,res){
    fs.readFile('vjezbe.csv', function(err, data){
        if(err) throw err;
        var pogresniParametri = "Pogrešan parametar "

        var content = data.toString().split('\n')
        if(content.length == 0 || content.length > 15){
            pogresniParametri += "brojVjezbi"
        }

        var brZadataka = []
        for(let i = 0; i < content.length; i++ ){
            var linija = content[i].split(',');
            if(linija[i] < 0 || linija[i] > 10){
                if(pogresniParametri == "Pogrešan parametar ")
                    pogresniParametri += "z" + i.toString() 
                else
                    pogresniParametri += ",z" + i.toString() 
            }
            else brZadataka.push(parseInt(linija[1]))

        }

        if(content.length != brZadataka.length){
            if(pogresniParametri == "Pogrešan parametar ")
                pogresniParametri += "brojZadataka"
            else
                pogresniParametri += ",brojZadataka"
        }

        if(pogresniParametri != "Pogrešan parametar "){
            res.status(400)
            return res.json({status:"error", data: pogresniParametri})
        }
        res.json({brojVjezbi: content.length,brojZadataka:brZadataka})
    })
})
app.post('/vjezbe', function(req,res){
    let jsonObject = req.body;
    //provjera 
    var pogresniParametri = "Pogrešan parametar "
    if(jsonObject.brojVjezbi <= 0 || jsonObject.brojVjezbi > 15){
        pogresniParametri += "brojVjezbi"
    }

    for(let i = 0; i < jsonObject.brojZadataka.length; i++){
        if(jsonObject.brojZadataka[i] < 0 || jsonObject.brojZadataka[i] > 10){
            if(pogresniParametri == "Pogrešan parametar ")
                pogresniParametri += "z" + i.toString() 
            else
                pogresniParametri += ",z" + i.toString() 

        }
    }

    if(jsonObject.brojVjezbi != jsonObject.brojZadataka.length){
        if(pogresniParametri == "Pogrešan parametar ")
            pogresniParametri += "brojZadataka"
        else
            pogresniParametri += ",brojZadataka"
    }

    if(pogresniParametri != "Pogrešan parametar "){
        res.status(400)
        return res.json({status:"error", data: pogresniParametri})
    }
    res.status(200)

    var podaci = ""
    for(let i = 0; i < jsonObject.brojVjezbi; i++){
        if(i != 0)
            podaci += "\n"
        podaci +=  (i+1).toString() + "," + jsonObject.brojZadataka[i].toString()
    }

    fs.writeFile("vjezbe.csv",podaci,  function(err){
        if(err) throw err
     
    })
    res.json(jsonObject)
})
app.listen(3000);