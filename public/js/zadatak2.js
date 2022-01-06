let assert = chai.assert;
describe('TestoviParser', function() {
 describe('dajTacnost()', function() {
   it('Treba tacnost biti 100%, nema gresaka', function() {
     let tacnost = TestoviParser.dajTacnost("{\"stats\":{\"suites\":2,\"tests\":4,\"passes\":4,\"pending\":0,\"failures\":0,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Prolaziprvitest\",\"fullTitle\":\"Prolaziprvitest\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Prolazidrugitest\",\"fullTitle\":\"Prolazidrugitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Prolazitrecitest\",\"fullTitle\":\"Prolazitrecitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Prolazicetvrtitest\",\"fullTitle\":\"Prolazicetvrtitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[],\"passes\":[{\"title\":\"Prolaziprvitest\",\"fullTitle\":\"Prolaziprvitest\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Prolazidrugitest\",\"fullTitle\":\"Prolazidrugitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Prolazitrecitest\",\"fullTitle\":\"Prolazitrecitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Prolazicetvrtitest\",\"fullTitle\":\"Prolazicetvrtitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
     assert.equal(tacnost.tacnost, "100%");
     assert.equal(tacnost.greske.length, 0);
   });

   it('Treba tacnost biti 0%, 4 greske ', function() {
     let tacnost = TestoviParser.dajTacnost("{\"stats\":{\"suites\":2,\"tests\":4,\"passes\":0,\"pending\":0,\"failures\":4,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Padaprvitest\",\"fullTitle\":\"Padaprvitest\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padadrugitest\",\"fullTitle\":\"Padadrugitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padatrecitest\",\"fullTitle\":\"Padatrecitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padacetvrtitest\",\"fullTitle\":\"Padacetvrtitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Padaprvitest\",\"fullTitle\":\"Padaprvitest\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padadrugitest\",\"fullTitle\":\"Padadrugitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padatrecitest\",\"fullTitle\":\"Padatrecitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padacetvrtitest\",\"fullTitle\":\"Padacetvrtitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[]}");
     assert.equal(tacnost.tacnost, "0%");
     assert.equal(tacnost.greske.length, 4);
   });

   it('Treba tacnost biti 25%, 3 greske ', function() {
     let tacnost = TestoviParser.dajTacnost("{\"stats\":{\"suites\":2,\"tests\":4,\"passes\":1,\"pending\":0,\"failures\":3,\"start\":\"2021-11-05T15:00:26.343Z\",\"end\":\"2021-11-05T15:00:26.352Z\",\"duration\":9},\"tests\":[{\"title\":\"Prolaziprvitest\",\"fullTitle\":\"Prolaziprvitest\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padadrugitest\",\"fullTitle\":\"Padadrugitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padatrecitest\",\"fullTitle\":\"Padatrecitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padacetvrtitest\",\"fullTitle\":\"Padacetvrtitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Padadrugitest\",\"fullTitle\":\"Padadrugitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padatrecitest\",\"fullTitle\":\"Padatrecitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padacetvrtitest\",\"fullTitle\":\"Padacetvrtitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"Prolaziprvitest\",\"fullTitle\":\"Prolaziprvitest\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
     assert.equal(tacnost.tacnost, "25%");
     assert.equal(tacnost.greske.length, 3);
   });

   it('Ne moze se izvrsiti jer je nepravilan format testova', function() {
     let tacnost = TestoviParser.dajTacnost("Ovo ne treba biti ispravan format");
     assert.equal(tacnost.tacnost, "0%");
     assert.equal(tacnost.greske.length, 1);
   });

   it('Nepotpun izvjestaj', function() {
     let tacnost = TestoviParser.dajTacnost("\"tests\":[{\"title\":\"Prolaziprvitest\",\"fullTitle\":\"Prolaziprvitest\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padadrugitest\",\"fullTitle\":\"Padadrugitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padatrecitest\",\"fullTitle\":\"Padatrecitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padacetvrtitest\",\"fullTitle\":\"Padacetvrtitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"pending\":[],\"failures\":[{\"title\":\"Padadrugitest\",\"fullTitle\":\"Padadrugitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padatrecitest\",\"fullTitle\":\"Padatrecitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}},{\"title\":\"Padacetvrtitest\",\"fullTitle\":\"Padacetvrtitest\",\"file\":null,\"duration\":0,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}],\"passes\":[{\"title\":\"Prolaziprvitest\",\"fullTitle\":\"Prolaziprvitest\",\"file\":null,\"duration\":1,\"currentRetry\":0,\"speed\":\"fast\",\"err\":{}}]}");
     assert.equal(tacnost.tacnost, "0%");
     assert.equal(tacnost.greske.length, 1);
   });
   
  });
});


