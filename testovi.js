var chai = require('chai')
chai.use(require('chai-http'))
const db = require('./db.js')
var app = require('./index.js')
var expect = chai.expect;
describe('/student', function(){
    it('Dodavanje novog studenta', (done) => {
        chai
        .request(app)
        .post('/student')
        .send({ime: 'Richard', prezime: 'Gere', index: '1', grupa: 'Grupa 2'})
        .then(function(res){
            expect(res.status).to.equal(200)
            expect(JSON.parse(res.text).status).to.equal("Kreiran student!")
            db.student.findOne({where: {index: '15151'}}).then(function(student){
              
                done()
            }).catch(err => done(err))
        }).catch(err => done(err))
    })

    it('Duplikat student', (done) => {
        chai
        .request('http://localhost:3000')
        .post('/student')
        .send({ime: 'Richard', prezime: 'Gere', index: '1', grupa: 'Grupa 2'})
        .then(function(res){
            expect(res.status).to.equal(400)
            expect(JSON.parse(res.text).status).to.equal('Student sa indexom 1 već postoji!')
            done()
        }).catch(err => done(err))
    })

    it('Dodavanje novog studenta i grupe', (done) => {
        chai
        .request('http://localhost:3000')
        .post('/student')
        .send({ime: 'Sam', prezime: 'Houser', index: '2', grupa: 'Grupa 3'})
        .then(function(res){
            expect(res.status).to.equal(200)
            expect(JSON.parse(res.text).status).to.equal("Kreiran student!")
            db.student.findOne({where: {index: '1'}}).then(function(student){
                expect(student).to.not.equal(null)
                db.grupa.findOne({where: {naziv: 'Grupa 3'}}).then(function(grupa){
                    expect(grupa).to.not.equal(null)
                    done()
                }).catch(err => done(err))
            }).catch(err => done(err))
        }).catch(err => done(err))
    })
})

describe('/student/:index', () => {
    it('Mijenjamo postojećem studentu grupu',  (done) => {
        chai
        .request('http://localhost:3000')
        .put('/student/1')
        .send({grupa: 'Grupa 3'})
        .then(function(res){
            expect(res.status).to.equal(200)
            expect(JSON.parse(res.text).status).to.equal("Promjenjena grupa studentu 1")
            db.student.findOne({where: {index: '1'}}).then(function(student){
                expect(student.grupa).to.equal('Grupa 3')
                done()
            }).catch(err => done(err))
        }).catch(err => done(err))
    })

    it('Studentu postavljamo nepostojecu grupu', () => {
        chai
        .request('http://localhost:3000')
        .put('/student/2')
        .send({grupa: 'Testna'})
        .then(function(res){
            expect(res.status).to.equal(200)
            expect(JSON.parse(res.text).status).to.equal("Promjenjena grupa studentu 2")
            db.student.findOne({where: {index: '2'}}).then(function(student){
                expect(student.grupa).to.equal('Testna')
                db.grupa.findOne({where: {naziv: 'Testna'}}).then(function(grupa){
                    expect(grupa).to.not.equal(null)
                    done()
                }).catch(err => done(err))
            }).catch(err => done(err))
        }).catch(err => done(err))
    })

    it('Nepostojeci student', (done) => {
        chai
        .request('http://localhost:3000')
        .put('/student/test')
        .send({grupa: 'Testna'})
        .then(function(res){
            expect(res.status).to.equal(400)
            expect(JSON.parse(res.text).status).to.equal("Student sa indexom test ne postoji")
            done()
        }).catch(err => done(err))
    })
    after(function(){
        db.sequelize.sync({force:true})
    })
})


/* previse traje ako imamo vise studenata */
describe('/batch/student', function(){
    it('Dodaj 1 studenata', function(done) {
        chai
        .request('http://localhost:3000')
        .post('/batch/student')
        .send([{ime: 'A', prezime: 'A', index: '5', grupa: 'A'}])
        .then(function(res){
            expect(res.status).to.equal(200)
            expect(JSON.parse(res.text).status).to.equal("Dodano 1 studenata!")
            done()
        }).catch(err => done(err))
    })

    it('Neke studente nece dodati', function(done){
        chai
        .request('http://localhost:3000')
        .post('/batch/student')
        .send([{ime: 'A', prezime: 'A', index: '5', grupa: 'A'}])
        .then(function(res){
            expect(res.status).to.equal(200)
            expect(JSON.parse(res.text).status).to.equal("Dodano 0 studenata!")
            done()
        }).catch(err => done(err))
    })
    after(function(){
        db.sequelize.sync({force:true})
    })
})
