const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');
const { json } = require('express/lib/response');
const Sequelize = require('sequelize');
const db = require('./db.js');
const { resolve } = require('path');
db.sequelize.sync({force:true}).then(function(){
    inicijalizacija().then(function(){
        console.log("Mockup podaci spremni!")
    })
})

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname))
app.use(express.static('public'))
app.use(express.static('public/html'))

function inicijalizacija(){
    var vjezbeListaPromise = []
    var studentListaPromise = []
    var zadatakListaPromise = []
    var grupaListaPromise = []
    return new Promise(function(resolve,reject){
        vjezbeListaPromise.push(db.vjezba.create({naziv: 'Vjezba 1'}))
        vjezbeListaPromise.push(db.vjezba.create({naziv: 'Vjezba 2'}))
        vjezbeListaPromise.push(db.vjezba.create({naziv: 'Vjezba 3'}))
        vjezbeListaPromise.push(db.vjezba.create({naziv: 'Vjezba 4'}))
        vjezbeListaPromise.push(db.vjezba.create({naziv: 'Vjezba 5'}))
        
        Promise.all(vjezbeListaPromise).then(function(vjezbe){
            var v1 = vjezbe.filter(function(v){return v.id == 1})[0];
            var v2 = vjezbe.filter(function(v){return v.id == 2})[0];
            var v3 = vjezbe.filter(function(v){return v.id == 3})[0];
            var v4 = vjezbe.filter(function(v){return v.id == 4})[0];
            var v5 = vjezbe.filter(function(v){return v.id == 5})[0];

            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v1.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v1.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v1.id}))

            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v2.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v2.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v2.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v2.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v2.id}))

            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v3.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v3.id}))

            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v4.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v4.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v4.id}))

            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v5.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v5.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v5.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v5.id}))
            zadatakListaPromise.push(db.zadatak.create({vjezbaID: v5.id}))

            grupaListaPromise.push(db.grupa.create({naziv: 'Grupa 1'}))
            grupaListaPromise.push(db.grupa.create({naziv: 'Grupa 2'}))
            grupaListaPromise.push(db.grupa.create({naziv: 'Grupa 3'}))
            grupaListaPromise.push(db.grupa.create({naziv: 'Grupa 4'}))
            grupaListaPromise.push(db.grupa.create({naziv: 'Grupa 5'}))

            Promise.all(grupaListaPromise).then(function(){
               
                studentListaPromise.push(db.student.create({ime: 'Omar', prezime: 'Saric', index: '18717', grupa: 'Grupa 1'}))
                studentListaPromise.push(db.student.create({ime: 'Ivo', prezime: 'Ivic', index: '18722', grupa: 'Grupa 1'}))
                studentListaPromise.push(db.student.create({ime: 'Sajo', prezime: 'Sajic', index: '11243', grupa: 'Grupa 1'}))
                studentListaPromise.push(db.student.create({ime: 'Amer', prezime: 'Americ', index: '34532', grupa: 'Grupa 1'}))
                studentListaPromise.push(db.student.create({ime: 'Lucky', prezime: 'Luke', index: '88776', grupa: 'Grupa 1'}))

            
                Promise.all(studentListaPromise).then(function(){resolve()}).catch(err => console.log(err))
            }).catch(err => console.log(err))

        })
        
    })
}

app.get('/vjezbe', function(req,res){
    db.vjezba.findAndCountAll().then(function(results){
        var IDs = results.rows.map(function(r){return r.id})
        var suma=  0
        var listaPromise = []
        var brZadPoVjezbi = [] /* niz integer vrijednosti koje odgovaraju broju zadataka po svakoj od vjezbi gdje index i elemenata odgovara broju zadataka za (i+1)-vu vjezbu */
        for(i = 0; i < IDs.length;i++){
            listaPromise.push(db.zadatak.findAndCountAll({where: {vjezbaID: IDs[i]}}).then(function(red){
                suma += red.count
                if(red.count != 0)
                brZadPoVjezbi.push(red.count)
            }))
        }
        Promise.all(listaPromise).then(function(){
            var pogresniParametri = "Pogrešan parametar "
            var content = new Object()
            content.brojVjezbi = results.count
            content.brojZadataka = []
            content.brZadPoVjezbi = brZadPoVjezbi
            for(i = 0; i < suma; i++){
                content.brojZadataka.push("z" + i)
            }
            console.log(JSON.parse(JSON.stringify(content)))

            if(content.brojVjezbi <= 0 || content.brojVjezbi > 15){
                pogresniParametri += "brojVjezbi"
            }

            var brZadataka = []
            for(let i = 0; i < content.brojVjezbi; i++ ){
                var linija = content.brZadPoVjezbi[i]
                if(linija < 0 || linija > 10){
                    if(pogresniParametri == "Pogrešan parametar ")
                        pogresniParametri += "z" + i.toString() 
                    else
                        pogresniParametri += ",z" + i.toString() 
                }
                else brZadataka.push(parseInt(linija))
    
            }

            if(content.brojVjezbi != content.brZadPoVjezbi.length){
                if(pogresniParametri == "Pogrešan parametar ")
                    pogresniParametri += "brojZadataka"
                else
                    pogresniParametri += ",brojZadataka"
            }

            if(pogresniParametri != "Pogrešan parametar "){
                res.status(400)
                return res.json({status:"error", data: pogresniParametri})
            }
            res.json({brojVjezbi: content.brojVjezbi,brojZadataka: content.brZadPoVjezbi})
        })
    })
})
app.post('/vjezbe', function(req,res){
    let jsonObject = req.body;
    console.log("DE NAPISI NESTO VISE" + JSON.stringify(jsonObject))
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
    db.zadatak.destroy({ truncate: { cascade: true },restartIdentity: true }).then(function(){

        db.vjezba.destroy({ truncate: { cascade: true },restartIdentity: true}).then(function(){
            var vjezbePromise = []
            var zadaciPromise = []
            var br = 1
            for(let i = 0; i < jsonObject.brojVjezbi; i++){
                vjezbePromise.push(db.vjezba.create({id: br, naziv: 'Vjezba ' + (i+1).toString()}))
                br++
            }
            Promise.all(vjezbePromise).then(function(){
                br = 1
                for(let i = 0; i < jsonObject.brojZadataka.length; i++){
                    for(let j = 0; j < jsonObject.brojZadataka[i]; j++){
                        zadaciPromise.push(db.zadatak.create({id: br,vjezbaID: (i+1)}))
                        br++
                    }
                    br++
                }

                Promise.all(zadaciPromise).then(function(){
                    res.json(jsonObject)
                })
            })

        })
    })
})

app.post('/student', function(req,res){
    let jsonObject = req.body;
    db.student.findOne({where : {index: jsonObject.index}}).then(function(student){
        var jsonStudent = JSON.parse(JSON.stringify(student))
        if(student != null){
            res.status(400)
            res.json(JSON.parse(JSON.stringify({status:"Student sa indexom " + jsonObject.index + " već postoji!"})))
            res.end()
        }
        else{
            db.student.create({ime: jsonObject.ime, prezime: jsonObject.prezime, index: jsonObject.index, grupa: null}).then(function(student){
                db.grupa.findOne({where: {naziv: jsonObject.grupa}}).then(function(grupa){
                    var jsonGrupa = JSON.parse(JSON.stringify(grupa))
                    if(grupa == null){

                        db.grupa.create({naziv: jsonObject.grupa}).then(function(){
    
                            db.student.update({grupa: jsonObject.grupa}, {where: {index: jsonObject.index}}).then(function(){
                                res.json({status: "Kreiran student!"})
                                res.end()
                            })
                        })
                    }
                    else{
                        db.student.update({grupa: jsonObject.grupa}, {where: {index: jsonObject.index}}).then(function(){
                            res.json({status: "Kreiran student!"})
                            res.end()
                        })
                    }
                })
            })
        }
    })

})

app.put('/student/:index',function(req,res){
    var indexParam = req.params.index
    db.student.findOne({where: {index: indexParam}}).then(function(student){
        if(student != null){
            db.grupa.findOne({where: {naziv: req.body.grupa}}).then(function(grupa){
                if(grupa == null){
                    db.grupa.create({naziv:  req.body.grupa}).then(function(){
                        db.student.update({grupa: req.body.grupa}, {where : {index: indexParam}}).then(function(){
                            res.json(JSON.parse(JSON.stringify({status: "Promjenjena grupa studentu " + indexParam.toString()})))
                        })
                    })
                }
                else{
                    db.student.update({grupa: req.body.grupa}, {where : {index: indexParam}}).then(function(){
                        res.json(JSON.parse(JSON.stringify({status: "Promjenjena grupa studentu " + indexParam.toString()})))
                    })
                }
  
            })   
        }
        else{
            res.status(400)
            res.json({ status: "Student sa indexom " + indexParam.toString() + " ne postoji"})
        }
    })

})


app.post("/batch/student", function(req,res){
    var obj = req.body
    console.log(obj)
    for(let i = 0; i < obj.length; i++){
        
        if(Object.keys(obj[i]).length != 4){
            return res.json({status:"Nepravilan format"})
        }
    }

    var m = new Array(obj.length).fill(0)

    var promise = []
    for(let i = 0; i < obj.length; i++){
        if(obj[i].ime != 'undefined' && obj[i].prezime != 'undefined' && obj[i].index != 'undefined' && obj[i].grupa != 'undefined'){
            promise.push(new Promise(function(resolve,reject){
                db.student.findOne({where : {index: obj[i].index}}).then(function(student){
                    console.log("Usao sam u prvi promise")
                    if(student == null){
                            db.student.create({ime: obj[i].ime, prezime: obj[i].prezime, index: obj[i].index, grupa: null}).then(function(student){
                                console.log("Usao sam u drugi promise")
                                db.grupa.findOne({where: {naziv: obj[i].grupa}}).then(function(grupa){
                                    console.log("Usao sam u treci promise")
                                if(grupa == null){
                                        db.grupa.create({naziv: obj[i].grupa}).then(function(){
                                            console.log("Usao sam u cetvrti pod a")
                                            db.student.update({grupa: obj[i].grupa}, {where: {index: obj[i].index}}).then(function(){
                                                console.log("Usao sam u cetvrti pod b promise")
                                                m[i]++
                                                resolve()
                                        })
                                    })
                                }
                                else{
                                        db.student.update({grupa: obj[i].grupa}, {where: {index: obj[i].index}}).then(function(){
                                            console.log("Usao sam u cetvrti pod c promise")
                                            m[i]++
                                            resolve()
                                    })
                                }
    
                            })
                        })
                    }
                    else{
                        resolve()
                    }
                })
            }))
        }
    }
    Promise.all(promise).then(function(){
        var brojac = 0
        for(let i = 0; i < m.length; i++){
            if(m[i] == 1)
                brojac++
        }
        console.log(m)

        var novi = new Object()
        novi.status = "Dodano " + brojac + " studenata"

        if(brojac != obj.length){
            novi.status += ', a studenti '
        }

        if(brojac == obj.length){ /* svi su dodani */
            res.json({ status: "Dodano " + obj.length + " studenata!"})
        }

        brojac = 0

        if(brojac != obj.length){

            for(let i = 0; i < m.length; i++){
                if(m[i] == 0){
                    if(brojac != 0){
                        novi.status += ','
                    }
                    console.log("ispisi")
                    novi.status += obj[i].index
                    brojac++
                }
            }

        }

        if(brojac != 0){
            novi.status += ' već postoje!'
        }

        res.json(novi)
        res.end()
    })

    



})
app.listen(3000);
