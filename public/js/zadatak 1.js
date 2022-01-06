let TestoviParser = (function(){
	var tacnost = "0%";
	var greske = [];
	var promjena = "0%"
	var dajTacnost = function(json){
		try {
        	var obj = JSON.parse(json);
        	var passes = obj.stats.passes;
			var failures = obj.stats.failures; //array of failures
			var fail_arr = obj.failures;
	    } catch (e) {
	        return {tacnost: "0%", greske: ["Testovi se ne mogu izvršiti"]}
	    }


	    if(fail_arr == null) return {tacnost: "0%", greske: ["Testovi se ne mogu izvršiti"]}

		tacnost = (Math.round(((passes/(passes + failures)* 100) + Number.EPSILON) * 100) / 100).toString() + "%";

		if(failures != 0){
			var failure_titles = [];
			for (let i = 0; i < fail_arr.length; i++){
				failure_titles.push(fail_arr[i].fullTitle)
			}
			greske = failure_titles;
		}

		return {tacnost: tacnost, greske: greske}
	}

	function imaIdenticanTest(test, rez2_tests){
		for(let j = 0; j < rez2_tests.length; j++){

			if(rez2_tests[j].fullTitle.trim() == test.fullTitle.trim())
				return true;
		}
		return false;
	}

	function pomocnaFun(rez1,rez2){
		let rez2_tests = rez2.tests;
		let padajuUPrvom = rez1.failures.filter(x => {return !rez2_tests.find(y => y.fullTitle == x.fullTitle);});

		console.log(padajuUPrvom.length);
		console.log(rez2_tests);
		console.log(rez2.failures.length);

		promjena =  (Math.round((((padajuUPrvom.length + rez2.failures.length)/(padajuUPrvom.length + rez2_tests.length)*100) + Number.EPSILON) * 100) / 100).toString() + "%";

		padajuUPrvom = padajuUPrvom.map(x => x.fullTitle).sort();
		let greskeUDrugom = rez2.failures.filter(x => {return !rez1.failures.find(y => y.fullTitle == x.fullTitle);}).map(x => x.fullTitle).sort();

		greske = padajuUPrvom.concat(greskeUDrugom);

		return {promjena: promjena, greske: greske}

	}



	var porediRezultate = function(rezultat1, rezultat2){
		try {
			var rez1 = JSON.parse(rezultat1);
			var rez2 = JSON.parse(rezultat2);
			var rez1_tests = rez1.tests;
			var rez2_tests = rez2.tests;

		} 
		catch (e) {
        return {promjena: "0%", greske: ["Rezultati se nisu mogli porediti"]}

	    }

		if(rez1_tests.length == rez2_tests.length){
	    	for(var i = 0; i < rez1_tests.length; i++){
	    		if(!imaIdenticanTest(rez1_tests[i], rez2_tests)){
	    			//radi ko i za ostalo
	    			return pomocnaFun(rez1,rez2);
    			}
	    	}

	    	const obj = dajTacnost(rezultat2);
	    	promjena = obj.tacnost;
	    	
	    	if(greske.length != 0) greske = [];

	    	if(rez2.failures.length != 0){
				for (let i = 0; i < rez2.failures.length; i++){
					greske.push(rez2.failures[i].fullTitle);
				}
			}

			greske.sort();

			console.log(greske);
			return {promjena: promjena, greske: greske}
		}
		else return pomocnaFun(rez1,rez2);
	}

	return{
		dajTacnost: dajTacnost,
		porediRezultate: porediRezultate
	}

}());