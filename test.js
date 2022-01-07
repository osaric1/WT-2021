chai.should()
var expect = chai.expect
var example = null;
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
        VjezbeAjax.iscrtajVjezbe(div,{brojVjezbi:4,brojZadataka:[5,5,5,5]})
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
        VjezbeAjax.iscrtajVjezbe(div,{brojVjezbi:-2,brojZadataka:[]})

        VjezbeAjax.iscrtajVjezbe(div,{brojVjezbi:16,brojZadataka:[]})
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

    it('dohvatiPodatke TEST 1 - GET zahtjev, sve u redu',function(done){
        var data = new Object()
        data.brojVjezbi = 5
        data.brojZadataka = [2,5,4,5,2]
        var dataJSON = JSON.stringify(data)

        VjezbeAjax.dohvatiPodatke(function(err,result){
            result.should.deep.equal(dataJSON)
            expect(err).to.be.null
            done()
        })

        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJSON);
    })

    it('dohvatiPodatke TEST 2 - GET zahtjev, neispravni podaci',function(done){
        var obj = new Object()
        obj.status = "err"
        obj.data = "Pogrešan parametar brojVjezbi"
        var objJSON = JSON.stringify(obj)

        VjezbeAjax.dohvatiPodatke(function(err,result){
            err.should.equal(obj.data)
            expect(result).to.be.null
            done()
        })
        this.requests[0].respond(400, { 'Content-Type': 'text/json' }, objJSON);
    })

    it('dohvatiPodatke TEST 3 - GET zahtjev, neispravni podaci', function(done){
        var obj = new Object()
        obj.status = "err"
        obj.data = "Pogrešan parametar brojVjezbi,z0,z1"
        var objJSON = JSON.stringify(obj)

        VjezbeAjax.dohvatiPodatke(function(err,result){
            err.should.equal(obj.data)
            expect(result).to.be.null
            done()
        })
        this.requests[0].respond(400, { 'Content-Type': 'text/json' }, objJSON);

    })

    it('dohvatiPodatke TEST 4 - GET zahtjev',function(done){
        var obj = new Object()
        obj.status = "err"
        obj.data = "Pogrešan parametar brojVjezbi"
        var objJSON = JSON.stringify(obj)

        VjezbeAjax.dohvatiPodatke(function(err,result){
            err.should.exist;
            expect(result).to.be.null
            expect(err).to.equal(obj.data)
            done()
        })
        this.requests[0].respond(500,  { 'Content-Type': 'text/json' }, objJSON);
    })

    it('posaljiPodatke TEST 1 - POST zahtjev', function(){
        var data = {brojVjezbi: 5, brojZadataka:[5,5,5,5,5]}
        var dataJSON = JSON.stringify(data)
        VjezbeAjax.posaljiPodatke(data, function(err,result) { 

        });
        this.requests[0].requestBody.should.equal(dataJSON)
    })
    
    it('posaljiPodatke TEST 2 - POST zahtjev', function(){
        var data = {brojVjezbi: -2, brojZadataka:[]}
        var dataJSON = JSON.stringify(data)
        VjezbeAjax.posaljiPodatke(data, function(err,result) { 

        });
        this.requests[0].requestBody.should.equal(dataJSON)
    })
});