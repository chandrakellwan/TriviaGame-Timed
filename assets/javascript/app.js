
//declare variables

var quizInterval;
var correctSound = new Audio ("assets/sounds/correct.mp3");
var wrongSound = new Audio ("assets/sounds/wrong.mp3");
var triviaQuestions = {
	numberQuestions : 5,
	questionCounter : 1,
	countdownTime : 12,
	numberCorrect : 0,
	numberIncorrect : 0,
	numberUnanswered : 0,

	//create questions and answers
	"questBank" : {
			"question1" : {
				"question" : "What is the study of beer, including the role ingredients play in the brewing process, called?",
				"answers"  :
					{
						"answer1" : "Brewology",
						"answer2" : "Beerology",
						"answer3" : "Zythology",
						"answer4" : "Hopsology"
					},
				 "correct" : "answer3"
			},
			"question2" : {
				"question" : "Due to adding extra alcohol and hops to preserve it on long voyages to India, what type of beer was invented?",
				"answers"  :
					{
						 "answer1" : "Lager",
						 "answer2" : "Pilsner",
						 "answer3" : "IPA",
						 "answer4" : "Stout"
					},
				 "correct" : "answer3"
			},
			"question3" : {
				"question" : "Vielle Bon Secours is a beer so expensive that it is only sold in one bar in what city?",
				 "answers" : 
				 	{
				 		"answer1" : "Barcelona",
						"answer2" : "Paris",
						"answer3" : "Verona",
						"answer4" : "London"
					},
				 "correct" : "answer4"
			},
			"question4" : {
				"question" : "What is the term for a woman who brews beer?",
				"answers"  :
					{
						"answer1" : "Brewster",
						"answer2" : "Wifester",
						"answer3" : "Hopster",
						"answer4" : "Thirster"
					},
				 "correct" : "answer1"
			},
			"question5" : {
				"question" : "When were the first beer cans produced?",
				 "answers" : 
				 	{   
				 		"answer1" : "1806",
				 		"answer2" : "1935",
						"answer3" : "1980",
						"answer4" : "600BC"
					},
				 "correct" : "answer2"
			},
	},
	
	//create question display function
	displayQuestion : function(currentQuestion) {
		
		var my = this;

		
		$('#countdownTimer').html(this.countdownTime);

		// Hide correct answer
		$('#displayCorrect').hide();
		
		// Variable to refer to the current question
		var thisQuestion = triviaQuestions.questBank[currentQuestion];
		
		// Variable to hold jquery DOM element so we only query for it once
		var $displayAnswers = $('#displayAnswers');
		
		// Display question
		$('#displayQuestion').html(thisQuestion.question);
		
		// clear the answer list
		$displayAnswers.empty();
		$displayAnswers.show();
		
		// show answers
		$.each(thisQuestion.answers, function( key, value) {			
			// Create jquery object		
		 	var $answer = ($('<button/>')
			 		.attr("type", "button")
			 		.html(value)
			 		.addClass("list-group-item")
			 		.attr("data-name", key)
			 		// On click function for the button
			 		.on('click', function() {			 			
			 				my.displayCorrectAnswer(currentQuestion, $(this).data('name'));
			 			})
		 			);
		 	// Append it to the element
		 	$displayAnswers.append($answer);
		});
		// Set interval for question timer countdown
		quizInterval = setInterval( triviaQuestions.questionTimer, 1000 );
	},
	
	displayCorrectAnswer : function(currentQuestion, currentAnswer) {		
		var my = triviaQuestions;
		
		$('#displayAnswers').hide();
		
		clearInterval(quizInterval);
		
		var correctAnswer = my.questBank[currentQuestion].answers[my.questBank[currentQuestion].correct];
		
		if (currentAnswer == my.questBank[currentQuestion].correct) {
			my.numberCorrect++;
			correctSound.play();
			$('#displayCorrect').html("You got it! <br />" + correctAnswer + " is correct.").show();			
		} else {
			
			$('#displayCorrect ').html("Nope! <br /> The correct answer is " + correctAnswer).show();
			wrongSound.play();
			
			if (currentAnswer == "unanswered" ) my.numberUnanswered++;

			else my.numberIncorrect++;
			wrongSound.play();
		}

		
		if (this.questionCounter < this.numberQuestions){			
			// Reset coutndownTime
			this.countdownTime = 12;
			// Increment questionCounter to display the next question
			this.questionCounter++;
			
			var nextQuestion = setTimeout(function() { 
											my.displayQuestion("question" + my.questionCounter);
										}, 3000);			
		} else {
			var gameResult = setTimeout(function() { 
											my.gameOver();
										}, 3000);	
		}
	},
	
	questionTimer : function() {
		// Create a variable 'my' to refer to the object
		var my = triviaQuestions;
		
		// Decrement the countdownTime counter
		my.countdownTime--;
		// Update the countdown timer display
		$('#countdownTimer').html(my.countdownTime);		
				
		// Check if the time has reached 0 if so, display correct answer
		if (my.countdownTime == 0) {
			//clearInterval(quizInterval);
			var currentQuestion = "question" + my.questionCounter;					
			var currentAnswer = "unanswered";
			
			my.displayCorrectAnswer(currentQuestion, currentAnswer);
		}
	},	
	
	gameOver : function() {
		var my = triviaQuestions;
		// Hide the answers and display correct
		$('#displayAnswers').hide();
		$('#displayCorrect').hide();

		$('#displayQuestion').html("<h1>Just the Beer Results</h1>");				

		
		var $playAgain = ($('<button/>')
			 		.attr("type", "button")
			 		.html("Play Again")
			 		.addClass("btn startButton")
			 		// On click function for the button
			 		.on('click', function() {

			 				// Reset variables
			 				my.resetQuiz();
							// Call startQuiz
			 				my.startQuiz();
			 				correctSound.play();
			 			})
		 			);
		$('#gameOverResults').html("You got " + this.numberCorrect + " question(s) right")
							.append("<br/> and " + this.numberIncorrect + "  question(s) wrong.")
							.append("<br/> You didn't answer " + this.numberUnanswered + " questions.")
							.append("<br/>")
							.append($playAgain)
							.show();
 //reset the game function

	},
	
	resetQuiz : function() {
		this.questionCounter = 1;
		this.countdownTime = 12;
		this.numberCorrect = 0;
		this.numberIncorrect = 0;
		this.numberUnanswered = 0;
	},
	
//start the game function

	startQuiz : function() {

		// When you click the 'Play' button, it disappears and the quesitons appear
		$('#startQuiz').hide();
		$('#gameOverResults').hide();
		correctSound.play();

		$('.showCorrectAnswer').hide();
		$('.showQuiz').show();
		// Set up a variable to pass as a parameter to refer to the first question
		this.currentQuestion = "question" + this.questionCounter;

		// Call function to display question, passing parameter for first quesiton
		this.displayQuestion(this.currentQuestion);
	},
} /* end triviaQuestions object */

$('#startQuiz').on('click', function() { 
	// Call the startQuiz function 
	triviaQuestions.startQuiz();
});