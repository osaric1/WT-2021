let VjezbeAjax = (function(){
    var dodajInputPolja = function(DOMelementDIVauFormi,brojVjezbi){
        DOMelementDIVauFormi.innerHTML = '';
        var divForm = document.createElement("form")
        DOMelementDIVauFormi.appendChild(divForm)

        if(brojVjezbi < 16){
            for(let i = 0; i < brojVjezbi; i++){
                var novaLabela = document.createElement("label")
                var string = "Broj zadataka u vjezbi " + (i+1).toString() + ": "
                novaLabela.innerHTML = string

                var noviInput = document.createElement("input")
                noviInput.type = "number"
                noviInput.id = string
                noviInput.value = 4 
                linebreak = document.createElement("br");
                divForm.appendChild(novaLabela)
                divForm.appendChild(noviInput)
                divForm.appendChild(linebreak)
            }
        }
    }
    var posaljiPodatke = function(vjezbeObjekat,callbackFja){
        var ajax = new XMLHttpRequest()
        ajax.onreadystatechange = function() {// Anonimna funkcija
            if (ajax.readyState == 4 && ajax.status == 200){
                callbackFja(null,ajax.response)
            }
            else if(ajax.readyState == 4){
                callbackFja(JSON.parse(ajax.response).data, null)
            }
        }
        ajax.open("POST", "http://localhost:3000/vjezbe", true)
        ajax.setRequestHeader("Content-Type", "application/json")
        ajax.send(JSON.stringify(vjezbeObjekat))
    }
    var dohvatiPodatke = function(callbackFja){
        var ajax = new XMLHttpRequest()
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200)
                callbackFja(null,ajax.response)
            else if(ajax.readyState == 4){
                callbackFja(JSON.parse(ajax.response).data, null)
            }
        }
        ajax.open("GET", "http://localhost:3000/vjezbe", true)
        ajax.send()
        
    }
    var iscrtajVjezbe = function(divDOMelement,vjezbeObjekat){
        brojVjezbi = vjezbeObjekat.brojVjezbi

        if(brojVjezbi < 16){
            for(let i = 0; i < brojVjezbi; i++){
                var button = document.createElement("button")
                button.id = "showV" + (i+1).toString()
                button.innerHTML = "Vjezba " + (i+1).toString()
                button.style.backgroundColor = "#e3ebed"
                button.style.color = "black"
                button.style.width = "100%"

                var div = document.createElement("div")
                div.id = "v" + (i+1).toString()
                div.style.backgroundColor = "#58a5b8";
                div.style.padding = "5px"
                div.style.display = 'none'
                divDOMelement.appendChild(button)
                divDOMelement.appendChild(div)
            }
        }


    }
    var iscrtajZadatke = function(vjezbaDOMelement,brojZadataka){
        if(vjezbaDOMelement.style.display == 'none')
            vjezbaDOMelement.style.display = "block";
        else vjezbaDOMelement.style.display = "none";

        if(vjezbaDOMelement.children.length == 0){
            for(let i = 0; i < brojZadataka; i++){
                var dugme = document.createElement("button")
                dugme.id = "zadatak" + (i+1).toString()
                dugme.innerHTML = "Zadatak " + (i+1).toString()
                vjezbaDOMelement.appendChild(dugme)
            }
        }
    }

    return {
        dodajInputPolja: dodajInputPolja,
        posaljiPodatke: posaljiPodatke,
        dohvatiPodatke: dohvatiPodatke,
        iscrtajVjezbe: iscrtajVjezbe,
        iscrtajZadatke: iscrtajZadatke
    }
}())