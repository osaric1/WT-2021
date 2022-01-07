function myFunction(id) {
  var x = document.getElementById(id.toString().slice(-2).toLowerCase());
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} 

window.onload = function(){
  VjezbeAjax.dohvatiPodatke(function(err,data){
    if(err != null)
      alert(err)
    else{
      VjezbeAjax.iscrtajVjezbe(document.getElementById("odabirVjezbe"),JSON.parse(data))
      var dugmad = document.getElementById("odabirVjezbe").querySelectorAll("button")
      for(let i = 0; i < dugmad.length; i++){
        dugmad[i].onclick = function(e){
          var ime = this.id
          var numberPattern = /\d+/g;
          broj = ime.match(numberPattern)
          VjezbeAjax.iscrtajZadatke(document.getElementById("v" + broj),JSON.parse(data).brojZadataka[broj-1]) 
        }
      }
    }
  })
}

