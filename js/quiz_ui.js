"use strict";

var QuizUI = {
	displayNextComparison: function() {
		if (quiz.hasEnded()) {
			this.displayLeaderboard();
		} else if (quiz.roundStarting()) {
			this.displayPlayer();
			this.inputHandler();
		} else {
			this.displayCar();
			this.displayHeader();
			this.inputHandler();
		}
	},
	displayPlayer: function() {
		this.clearCar(1);
		this.clearCar(2);
		console.log('new round');
		this.populateById('quiz-header', quiz.getCurrentPlayer().name);
		document.getElementById('quiz-header').classList.add('player');
	},
	displayCar: function() {
		if(document.getElementById('name1').innerHTML === ''){
			this.populateCar(1);
			this.populateCar(2, true);
		} else {
			this.moveCarLeft();
			this.populateCar(2, true);
		}
	},
	displayHeader: function(){
		this.populateById('quiz-header', 'Faster or Slower?');
	},
	populateById: function(id, content) {
		var element = document.getElementById(id);
		element.innerHTML = content;
	},
	populateCar: function(id, hide = false) {
		console.log('getCar');
		var car = quiz.fetchCar();
		this.populateById('name' + id, car.name );
		this.populateById('image' + id, car.img );
		var qm = car.quartermile;
		if (hide) {
			qm = '??';
		}
		this.populateById('quartermile' + id, qm );
	},
	moveCarLeft: function() {
		this.clearCar(2);
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