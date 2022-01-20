var dugme = document.getElementById("dugme")
dugme.onclick = function(event){
    event.preventDefault()
    StudentAjax.postaviGrupu(document.getElementById("index").value.toString(), document.getElementById("grupa").value.toString(), function(err,data){
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