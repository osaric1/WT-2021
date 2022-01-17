var dugme = document.getElementById("dugme")
dugme.onclick = function(event){
    event.preventDefault()
    StudentAjax.postaviGrupu(document.getElementById("index").value.toString(), document.getElementById("grupa").value.toString(), function(err,data){
        if(err != null)
            alert(err)
        else{
            alert(data)
        }

    })

}