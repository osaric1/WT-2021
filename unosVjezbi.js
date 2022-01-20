var object = document.getElementById("brojVjezbi")
object.onblur = function(){
    VjezbeAjax.dodajInputPolja(document.getElementById("zadaci"),object.value)
}
var dugme = document.getElementById("dugme")
dugme.onclick = function(event){
    event.preventDefault()
    var obj = new Object()
    obj.brojVjezbi = parseInt(object.value)
    obj.brojZadataka = []
    sviInputi = document.getElementById("zadaci").querySelectorAll("input")
    
    for(let i = 0; i < sviInputi.length; i++){
        obj.brojZadataka.push(parseInt(sviInputi[i].value))
    }
    VjezbeAjax.posaljiPodatke(obj, function(err,data){
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
            p.innerHTML = 'Uspješno su dodani podaci!'
        }

        div.appendChild(p)
        body.appendChild(div)

    })

}