

chai.should();
var expect = chai.expect
describe('VjezbaAjax', function(){
    beforeEach(function(){
        this.ajax = sinon.useFakeXMLHttpRequest();

        this.requests = [];
        this.ajax.onCreate = function(ajax){
            this.requests.push(ajax)
        }.bind(this)
    })

    afterEach(function() { 
        this.ajax.restore()
    })

    it('dodajInputPolja TEST 1 - broj vjezbi je 4, treba dodati 4 input polja',function(done){
        var div = document.createElement("div")
        div.id = "zadaci"
        VjezbeAjax.dodajInputPolja(div,4)
        div.children.should.have.lengthOf(1)
        div.firstChild.querySelectorAll("input").should.have.lengthOf(4)
        div.firstChild.querySelectorAll("label").should.have.lengthOf(4)
        let arr = div.firstChild.querySelectorAll("input")

        for(let i = 0; i < arr.length; i++){
            parseInt(arr[i].value).should.deep.equal(4)
            expect(arr[i].type).to.equal('number')
        }
        done()
    })

    it('dodajInputPolja TEST 2 - broj vjezbi je manje od 0 ili veće od 16, ne treba dodati polja ', function(done){
        var div = document.createElement("div")
        div.id = "zadaci"
        VjezbeAjax.dodajInputPolja(div,-2)
        div.children.should.have.lengthOf(1)
        div.firstChild.querySelectorAll("input").should.have.lengthOf(0)
        div.firstChild.querySelectorAll("label").should.have.lengthOf(0)

        VjezbeAjax.dodajInputPolja(div,16)
        div.children.should.have.lengthOf(1)
        div.firstChild.querySelectorAll("input").should.have.lengthOf(0)
        div.firstChild.querySelectorAll("label").should.have.lengthOf(0)
        done()
    })

    it('dodajInputPolja TEST 3', function(done){
        var div = document.createElement("div")
        div.id = "zadaci"
        VjezbeAjax.dodajInputPolja(div,15)
        div.children.should.have.lengthOf(1)
        div.firstChild.querySelectorAll("input").should.have.lengthOf(15)
        div.firstChild.querySelectorAll("label").should.have.lengthOf(15)
        let arr = div.firstChild.querySelectorAll("input")

        for(let i = 0; i < arr.length; i++){
            parseInt(arr[i].value).should.deep.equal(4)
            expect(arr[i].type).to.equal('number')
        }
        done()
    })

    it('iscrtajVjezbe TEST 1 - broj vjezbi je 4',function(done){
        var div = document.createElement("odabirVjezbe")
        VjezbeAjax.iscrtajVjezbe(div,JSON.stringify({brojVjezbi:4,brojZadataka:[5,5,5,5]}))
        div.querySelectorAll("button").should.have.lengthOf(4)
        div.querySelectorAll("div").should.have.lengthOf(4)
        let arr = div.querySelectorAll("button")

        for(let i = 0; i < arr.length; i++){
            expect(arr[i].id).to.equal("showV" + (i+1).toString())
            expect(arr[i].innerHTML).to.equal("Vjezba " + (i+1).toString())
        }
        done()
    })

    it('iscrtajVjezbe TEST 2 - broj vjezbi je neispravan', function(done){
        var div = document.createElement("odabirVjezbe")
        VjezbeAjax.iscrtajVjezbe(div,JSON.stringify({brojVjezbi:-2,brojZadataka:[]}))

        VjezbeAjax.iscrtajVjezbe(div,JSON.stringify({brojVjezbi:16,brojZadataka:[]}))
        div.querySelectorAll("button").should.have.lengthOf(0)
        div.querySelectorAll("div").should.have.lengthOf(0)
        done()
    })

    it('iscrtajZadatke TEST 1 - kliknemo na sve vjezbe, trebaju se iscrtati zadaci za svaku vjezbu',function(done){
        var div = document.createElement("odabirVjezbe")
        var v1 = document.createElement("div")
        v1.id = "v1"
        var v2 = document.createElement("div")
        v2.id = "v2"
        var v3 = document.createElement("div")
        v3.id = "v3"
        var v4 = document.createElement("div")
        v4.id = "v4"

        VjezbeAjax.iscrtajZadatke(v1, 4)
        VjezbeAjax.iscrtajZadatke(v2, 4)
        VjezbeAjax.iscrtajZadatke(v3, 4)
        VjezbeAjax.iscrtajZadatke(v4, 4)

        v1.querySelectorAll("button").should.have.lengthOf(4)
        v2.querySelectorAll("button").should.have.lengthOf(4)
        v3.querySelectorAll("button").should.have.lengthOf(4)
        v4.querySelectorAll("button").should.have.lengthOf(4)
        var arr = div.querySelectorAll("button")

        for(let i = 0; i < arr; i++){
            expect(arr[i].id).to.equal("zadatak" + (i+1).toString())
            expect(arr[i].innerHTML).to.equal("Zadatak " + (i+1).toString())
        }

        v1.style.display = 'none'
        v2.style.display = 'none'
        v3.style.display = 'none'
        v4.style.display = 'none'

        // Ne treba dodavati nove zadatke 

        VjezbeAjax.iscrtajZadatke(v1, 4)
        VjezbeAjax.iscrtajZadatke(v2, 4)
        VjezbeAjax.iscrtajZadatke(v3, 4)
        VjezbeAjax.iscrtajZadatke(v4, 4)

        v1.querySelectorAll("button").should.have.lengthOf(4)
        v2.querySelectorAll("button").should.have.lengthOf(4)
        v3.querySelectorAll("button").should.have.lengthOf(4)
        v4.querySelectorAll("button").should.have.lengthOf(4)
        done()
    })

    it('posaljiPodatke TEST 1 - GET zahtjev, sve u redu',function(done){
        var data = {brojVjezbi: 5, brojZadataka:[2,5,4,5,2]}
        var dataJSON = JSON.stringify(data)

        VjezbeAjax.dohvatiPodatke(function(err,result){
            result.should.deep.equal(dataJSON)
            done()
        })

        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJSON);
    })

    it('posaljiPodatke TEST 2 - GET zahtjev, neispravni podaci',function(done){
        var data = {brojVjezbi: 16, brojZadataka:[]}
        var dataJSON = JSON.stringify(data)

        VjezbeAjax.dohvatiPodatke(function(err,result){
            console.log(result)
            console.log(err)
            err.should.exist
            result.should.equal(null)
            done()
        })
        this.requests[0].respond(500)
    })
});