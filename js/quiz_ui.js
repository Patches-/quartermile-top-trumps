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
		this.populateById('quiz-header', '<h2>Get ready ' + quiz.getPlayer().name + '</h2>');
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
		this.populateById('quiz-header', '<h2>Is the car on the right Faster or Slower?</h2>');
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
		console.log('moved car left');
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
				if(document.getElementById('leaderboard').classList.contains('hide') && !document.getElementById('quiz-header').classList.contains('player')){
					quiz.answer(arrow);
				}
			}
		}
	},
	displayLeaderboard: function() {
		var compareRow = document.getElementById('compare-row');
		if(!compareRow.classList.contains('hide')) {
			compareRow.classList.add('hide');
			this.populateById('quiz-header', '<h2>Finished!</h2>');
			this.populateById('quiz-info', '');
			var lb = document.getElementById('lb-body');

			for (var i = 0; i < quiz.players.length; i++) {
				var player = quiz.players[i];
				console.log(player);
				var row = lb.insertRow(i);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = player.name;
				cell2.innerHTML = player.score;
			}
			document.getElementById('leaderboard').classList.remove('hide');			
		}
	}
}