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
        if(err != null)
            alert(err)
        else{
            alert("Uspješno su dodani podaci!")
        }

    })

}