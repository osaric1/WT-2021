
let StudentAjax = (function(){
    var dodajStudenta = function(student,fnCallback){
        var ajax = new XMLHttpRequest()
        ajax.onreadystatechange = function() {// Anonimna funkcija
            
            if (ajax.readyState == 4 && ajax.status == 200 && ajax.response != ''){
                fnCallback(null,JSON.parse(ajax.response).status)
            }
            else if(ajax.readyState == 4){
                fnCallback(JSON.parse(ajax.response).status, null)
            }
        }
        ajax.open("POST", "http://localhost:3000/student", true)
        ajax.setRequestHeader("Content-Type", "application/json")
        ajax.send(JSON.stringify(student))
    }

    var postaviGrupu = function(index,grupa,fnCallback){
        var ajax = new XMLHttpRequest()
        ajax.onreadystatechange = function() {// Anonimna funkcija

            if (ajax.readyState == 4 && ajax.status == 200 && ajax.response != ''){
                fnCallback(null,JSON.parse(ajax.response).status)
            }
            else if(ajax.readyState == 4){
                fnCallback(JSON.parse(ajax.response).status, null)
            }
        }
        ajax.open("PUT", "http://localhost:3000/student/" + index, true)
        ajax.setRequestHeader("Content-Type", "application/json")
        ajax.send(JSON.stringify(JSON.parse(JSON.stringify({grupa: grupa}))))
    }

    var dodajBatch = function(csvStudenti, fnCallback){
        var ajax = new XMLHttpRequest()
        ajax.onreadystatechange = function() {// Anonimna funkcija

            if (ajax.readyState == 4 && ajax.status == 200 && ajax.response != ''){
                fnCallback(null,JSON.parse(ajax.response).status)
            }
            else if(ajax.readyState == 4){
                fnCallback(JSON.parse(ajax.response).status, null)
            }
        }

        var arr = csvStudenti.split('\n')
        var jsonArray = []
        for(let i = 0; i < arr.length; i++){
            var linija = arr[i].split(',')
            jsonArray.push({ime: linija[0], prezime: linija[1],index: linija[2], grupa: linija[3]})
        }
        ajax.open("POST", "http://localhost:3000/batch/student", true)
        ajax.setRequestHeader("Content-Type", "application/json")
        ajax.send(JSON.stringify(jsonArray))
    }

    return{
        dodajStudenta: dodajStudenta,
        postaviGrupu: postaviGrupu,
        dodajBatch: dodajBatch
    }
}())