"use strict";

function Quiz(cars, players){
	this.cars = cars;
	this.players = players;
	this.carsSeen = 0;
	this.carsPerRound = 3;
	this.currentRound = 0;

	this.carOrder = [];
	for (var i = this.cars.length - 1; i >= 0; i--) {
		this.carOrder[i] = i;
	}
	this.carOrder.sort(function() {
		return .5 - Math.random();
	});
}

Quiz.prototype.answer = function(arrow) {
	var higher = true;
	if(document.getElementById('quartermile1').innerHTML > this.cars[this.carsSeen].quartermile){
		var higher = false;
	}
	if(arrow = higher){
		console.log('correct!');
	}
	console.log(higher);
}

Quiz.prototype.getCurrentPlayer = function(){
	return this.players[this.currentRound];
}

Quiz.prototype.fetchCar = function(){
	var carToReturn = this.getCar();
	this.carsSeen++;
	return carToReturn;
}

Quiz.prototype.getCar = function() {
	return this.cars[this.carOrder[this.carsSeen]];
}


Quiz.prototype.getAnswer = function() {

}

Quiz.prototype.addPlayers = function(players) {
	this.players = players;
}

Quiz.prototype.roundStarting = function() {
	console.log('this.carsSeen % this.carsPerRound = ' + this.carsSeen % this.carsPerRound);
	if(!document.getElementById('quiz-header').classList.contains('player') && (this.carsSeen % this.carsPerRound) == 0){
		return true;
	}
	return false;
}

Quiz.prototype.hasEnded = function() {
    return this.carsSeen >= this.cars.length;
};