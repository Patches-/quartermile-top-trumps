"use strict";

var QuizUI = {
	displayNextComparison: function() {
		if (quiz.hasEnded()) {
			console.log('hasEnded');
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
		this.populateById('quiz-info', 'Press Enter To Continue');
		document.getElementById('quiz-header').classList.add('player');
	},
	displayCar: function() {
		document.getElementById('quiz-header').classList.remove('player');
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
		this.populateById('quiz-info', 'Press Up for faster or Down for slower');
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
			quiz.hiddenqm = qm;
			qm = '??';
		}
		this.populateById('quartermile' + id, qm );
	},
	moveCarLeft: function() {
		this.clearCar(1);
		this.populateById('name1', document.getElementById('name2').innerHTML);
		this.populateById('image1', document.getElementById('image2').innerHTML);
		this.populateById('quartermile1', quiz.hiddenqm);
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
			    var arrow = 'f';
			}
			else if (e.keyCode == '40') {
			    var arrow = 's';
			}
			else if (e.keyCode == '13') {
				if(quiz.showAnswer || document.getElementById('quiz-header').classList.contains('player')){
					QuizUI.displayNextComparison();
				}
			}
			if (arrow){
				if(!document.getElementById('quiz-header').classList.contains('player')){
					quiz.answer(arrow);
				}
			}
		}
	},
	displayLeaderboard: function() {
		document.getElementById('compare-row').classList.add('hide');
		this.populateById('quiz-header', 'Finished!');
		this.populateById('quiz-info', '');
	}
}