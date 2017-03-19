"use strict";

var nameForm = document.getElementById("player-names");

var cars = [
	new Car("Nissan Skyline GTR", "gtr.png", 10.8),
	new Car("Porsche 911 Turbo S", "911.jpg", 10.5),
	new Car("Bugatti Veyron", "veyron.jpg", 10.175),
	new Car("McLaren 650s", "650s.jpg", 10.5),
	new Car("Toyota Supra", "supra.jpg", 10),
	new Car("Audi R8 V10 Plus", "r8.jpg", 10.6),
	new Car("Ferrari LaFerrari", "laferrari.jpg", 9.7),
	new Car("Pagani Zonda R", "zonda.jpg", 10.4),
	new Car("Lamborghini Aventador", "lambo.jpg", 10.7),
];

var quiz = new Quiz(cars);

function launchQuiz(e) {
    if (e.preventDefault) e.preventDefault();

	var players = [];
	for (var i = 0; i < 3; i++) {
		players[i] = new Player(this.elements[i].value);
	}
	quiz.addPlayers(players);
	QuizUI.displayNextComparison();
	nameForm.classList.add("hide");
}

nameForm.addEventListener("submit", launchQuiz);
