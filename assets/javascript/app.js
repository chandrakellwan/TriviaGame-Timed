
var quizInterval;
var triviaQuestions = {
	numQuestions : 5,
	questionCounter : 1,
	countdownTime : 10,
	numCorrect : 0,
	numIncorrect : 0,
	numUnanswered : 0,
	"questionSet" : {
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
				"question" : "When were first beer cans were produced?",
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
	
	displayQuestion : function(currentQuestion) {
		
		var self = this;

		
		$('#countdownTimer').html(this.countdownTime);

		// Hide correct answer if it is displayed
		$('#displayCorrect').hide();
		
		// Variable to refer to the current question
		var thisQuestion = triviaQuestions.questionSet[currentQuestion];
		
		// Variable to hold jquery DOM element so we only query for it once
		var $displayAnswers = $('#displayAnswers');
		
		// Display question
		$('#displayQuestion').html(thisQuestion.question);
		
		// Empty answer list
		$displayAnswers.empty();
		$displayAnswers.show();
		
		// Display answers
		$.each(thisQuestion.answers, function( key, value) {			
			// Create jquery object		
		 	var $answer = ($('<button/>')
			 		.attr("type", "button")
			 		.html(value)
			 		.addClass("list-group-item")
			 		.attr("data-name", key)
			 		// On click function for the button
			 		.on('click', function() {			 			
			 				self.displayCorrectAnswer(currentQuestion, $(this).data('name'));
			 			})
		 			);
		 	// Append it to the element
		 	$displayAnswers.append($answer);
		});
		// Set interval for question timer countdown
		quizInterval = setInterval( triviaQuestions.questionTimer, 1000 );
	},
	
	displayCorrectAnswer : function(currentQuestion, currentAnswer) {		
		var self = triviaQuestions;
		
		
		$('#displayAnswers').hide();
		
		clearInterval(quizInterval);
		
		var correctAnswer = self.questionSet[currentQuestion].answers[self.questionSet[currentQuestion].correct];
		
				
		if (currentAnswer == self.questionSet[currentQuestion].correct) {
			self.numCorrect++;
			$('#displayCorrect').html("You got it! <br />" + correctAnswer + " was correct.").show();			
		} else {
			$('#displayCorrect ').html("Nope! <br /> The correct answer was " + correctAnswer).show();
			// Increment for incorrect or unanswered
			if (currentAnswer == "unanswered" ) self.numUnanswered++;
			else self.numIncorrect++;
		}

		
		if (this.questionCounter < this.numQuestions){			
			// Reset coutndownTime
			this.countdownTime = 10;
			// Increment questionCounter to display the next question
			this.questionCounter++;
			
			var nextQuestion = setTimeout(function() { 
											self.displayQuestion("question" + self.questionCounter);
										}, 3000);			
		} else {
			var gameResult = setTimeout(function() { 
											self.endGame();
										}, 3000);	
		}
	},
	
	questionTimer : function() {
		// Create a variable 'self' to refer to the object
		var self = triviaQuestions;
		
		// Decrement the countdownTime counter
		self.countdownTime--;
		// Update the countdown timer display
		$('#countdownTimer').html(self.countdownTime);		
				
		// Check if the time has reached 0 if so, display correct answer
		if (self.countdownTime == 0) {
			//clearInterval(quizInterval);
			var currentQuestion = "question" + self.questionCounter;					
			var currentAnswer = "unanswered";
			
			self.displayCorrectAnswer(currentQuestion, currentAnswer);
		}
	},	
	
	endGame : function() {
		var self = triviaQuestions;
		// Hide the answers and display correct
		$('#displayAnswers').hide();
		$('#displayCorrect').hide();

		$('#displayQuestion').html("<h1>Just the Beer Results</h1>");				

		// Play again button
		var $playAgain = ($('<button/>')
			 		.attr("type", "button")
			 		.html("Play Again")
			 		.addClass("btn startButton")
			 		// On click function for the button
			 		.on('click', function() {
			 				// Reset variables
			 				self.resetQuiz();
							// Call startQuiz
			 				self.startQuiz();
			 			})
		 			);
		$('#endGameResults').html("You got " + this.numCorrect + " question(s) right")
							.append("<br/> and " + this.numIncorrect + "  question(s) wrong.")
							.append("<br/> Number unanswered: " + this.numUnanswered)
							.append("<br/>")
							.append($playAgain)
							.show();
	},
	
	resetQuiz : function() {
		this.questionCounter = 1;
		this.countdownTime = 10;
		this.numCorrect = 0;
		this.numIncorrect = 0;
		this.numUnanswered = 0;
	},
	
	startQuiz : function() {		
		// When you click the 'Start Quiz' button, it is hidden and the quiz quesitons div is displayed
		$('#startQuiz').hide();
		$('#endGameResults').hide();

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