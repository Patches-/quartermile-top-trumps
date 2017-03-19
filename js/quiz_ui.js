"use strict";

var QuizUI = {
	displayNextComparison: function() {
		if (quiz.hasEnded()) {
			this.displayLeaderboard();
		} else if (quiz.roundStarting()) {
			this.displayPlayer();
			this.inputHandler();
		} else {
			this.displayCars();
			this.displayHeader();
			this.inputHandler();
		}
	},
	displayPlayer: function() {
		this.clearCar(1);
		this.clearCar(2);
		console.log('new round');
		this.populateById('quiz-header', quiz.getCurrentPlayer().name);
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
	clearCar: function(id){
		this.populateById('name' + id, '' );
		this.populateById('image' + id, '' );
		this.populateById('quartermile' + id, '' );
	},
	inputHandler: function (argument) {
		document.onkeydown = checkKey;

		function checkKey(e) {
			e = e || window.event;
			console.log(e.keyCode);
			if (e.keyCode == '38') {
			    var arrow = 'up';
			}
			else if (e.keyCode == '40') {
			    var arrow = 'down';
			}
			else if (e.keyCode == '13') {
				QuizUI.displayNextComparison();
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