var dugme = document.getElementById("dugme")
dugme.onclick = function(event){
    event.preventDefault()
    var obj = new Object()
    obj.ime = document.getElementById("ime").value
    obj.prezime = document.getElementById("prezime").value
    obj.index = document.getElementById("index").value
    obj.grupa = document.getElementById("grupa").value

    console.log(obj)
    StudentAjax.dodajStudenta(obj, function(err,data){
        if(err != null)
            alert(err)
        else{
            alert(data)
        }

    })

}