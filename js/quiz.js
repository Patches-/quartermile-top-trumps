"use strict";

function Quiz(cars, players){
	this.cars = cars;
	this.players = players;
	this.carsSeen = 0;
	this.carsPerRound = 3;

	this.carOrder = [];
	for (var i = this.cars.length - 1; i >= 0; i--) {
		this.carOrder[i] = i;
	}
	this.carOrder.sort(function() {
		return .5 - Math.random();
	});
}

Quiz.prototype.getCar = function() {
	this.carsSeen++;
	return this.cars[this.carOrder[this.carsSeen]];
}

Quiz.prototype.addPlayers = function(players) {
	this.players = players;
}

Quiz.prototype.hasEnded = function() {
    return this.carsSeen >= this.cars.length;
};