var dugme = document.getElementById("dugme")
dugme.onclick = function(event){
    event.preventDefault()
    var obj = new Object()
    obj.ime = document.getElementById("ime").value
    obj.prezime = document.getElementById("prezime").value
    obj.index = document.getElementById("index").value
    obj.grupa = document.getElementById("grupa").value

    StudentAjax.dodajStudenta(obj, function(err,data){
        var body = document.getElementsByTagName('body')[0]
        var div = document.getElementById('ajaxstatus')
        var p = document.getElementById('rezultat')

        if(div == null){
            var div = document.createElement('div')
            div.id = 'ajaxstatus'
        }

        if(p == null){
            var p = document.createElement('p')
            p.id = 'rezultat'
        }

        if(err != null)
            p.innerHTML = err
        else{
            p.innerHTML = data
        }

        div.appendChild(p)
        body.appendChild(div)

    })

}