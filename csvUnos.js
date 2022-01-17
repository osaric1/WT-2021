var dugme = document.getElementById("dugme")
dugme.onclick = function(event){
    event.preventDefault()
    StudentAjax.dodajBatch(document.getElementById("csv").value, function(err,data){
        if(err != null)
            alert(err)
        else{
            alert(data)
        }

    })

}