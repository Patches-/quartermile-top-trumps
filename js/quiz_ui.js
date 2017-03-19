"use strict";

var QuizUI = {
	displayNextComparison: function() {
		if (quiz.hasEnded()){
			this.displayLeaderboard();
		} else {
			this.displayCars();
			this.displayHeader();
			this.inputHandler();
		}
	},
	displayCars: function() {
		for (var i = 1; i < 3; i++) {
			this.populateCar(i);
		}
	},
	displayHeader: function(){
		this.populateById('quiz-header', 'Faster or Slower?');
	},
	populateById: function(id, content) {
		var element = document.getElementById(id);
		element.innerHTML = content;
	},
	populateCar: function(i) {
		var car = quiz.getCar();
		this.populateById('name' + i, car.name );
		this.populateById('image' + i, car.img );
		if (i == 2) {
			car.quartermile = '??';
		}
		this.populateById('quartermile' + i, car.quartermile );
	},
	inputHandler: function (argument) {
		document.onkeydown = checkKey;

		function checkKey(e) {
			e = e || window.event;
			if (e.keyCode == '38') {
			    console.log('up arrow');
			}
			else if (e.keyCode == '40') {
			    console.log('down arrow');
			}
		}
	},
	displayLeaderboard: function() {

	}
}