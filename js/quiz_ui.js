"use strict";

var QuizUI = {
	startRound: function() {

	},
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
		console.log('getCar');
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
			    var arrow = 'up';
			}
			else if (e.keyCode == '40') {
			    var arrow = 'down';
			}
			if (arrow){
				quiz.answer(arrow);
				QuizUI.displayNextComparison();
			}
		}
	},
	displayLeaderboard: function() {
		document.getElementById('compare-row').classList.add('hide');
		this.populateById('quiz-header', 'Finished!');
	}
}