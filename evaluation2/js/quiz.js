function QuizApp(uiContainer) {
  this.uiContainer = uiContainer;
  this.TOTAL_NOS_OF_QUESTIONS = 20;
  this.responses = { wrong: [], correct: []};
  this.currentQuestion = { count: 0, text: "" };
  this.operators = [' + ', ' - ', ' * ', ' / '];
}


QuizApp.prototype = {
  init: function(){
    this.showWelcomeScreen();
    this.addEventHandlers();
  },

  /////-----Setup and display welceom screen to users-----///
  showWelcomeScreen: function() {
    $('#container').append(this.createWelcomeScreen());
  },

  createWelcomeScreen: function() {
    var welcomeText = $('<h1>', { 'class': 'headerText', text: 'Welcome to the  Arithmetic Quiz' });
    var startButton = $('<button>', { id: 'startQuizBtn', text: 'Start Now' });
    var welcomeUI = $('<div>', { id: 'uiContainer' })
                        .append(welcomeText).append(startButton);

    return welcomeUI;
  },


  /////-----Setup the quiz-----/////
  showMainUI: function() {
    var that = this;
    var containerDiv = this.uiContainer.find('div');
    var question = that.createQuestionLabelandText();
    containerDiv.children().fadeOut(500, function(){
       containerDiv.empty()
        .append(question)
        .append(that.createInputBox())
        .append(that.createNoticeTxt())
        .append(that.createNextButton())
        .append(that.createScoreLabel());
    });
  },

  createQuestionLabelandText: function() {
    this.createQuestion(this.chooseOperand(), this.chooseOperator(), this.chooseOperand());

    var questionText = this.currentQuestion.text;
    var label = $('<span>', { id:'questionLabel', text: 'Question ' + this.currentQuestion.count +'. ' });
    var text = $('<span>', { id:'questionTxt', text: questionText });
    
    return $('<h2>').append(label).append(text)
  },

  createInputBox: function() {
    return $('<input/>', {
      type: 'text',
      placeholder: 'Enter your answer here',
      id: 'answerInput'
    });
  },

  createNoticeTxt: function() {
    return $('<p>', { id: 'noticeTxt', text: '**FYI: All input would be evaluated at two-decimal precision.' });
  },

  createNextButton: function() {
    var that = this;
    var nxtButton = $('<button>', { id: 'nextBtn', text: 'next >' }) 

    return nxtButton;
  },

  createScoreLabel: function(){
    var currentScoreTxt = $('<span>', { id: 'currentScoreTxt', text: this.responses.correct.length  + ' out of ' + this.TOTAL_NOS_OF_QUESTIONS });

    return $('<p>', { id: 'currentScoreLbl', text: 'Score: ' })
      .append(currentScoreTxt);
  },


  /////----question setup----/////
  createQuestion: function(operand1, operator, operand2) {
    var question = String(operand1).concat(operator, operand2);
    this.currentQuestion.count++; //increment the question nos
    this.currentQuestion.text = question; //update questionText

    return question;
  },

  chooseOperand: function() {
    return Math.ceil(Math.random() * this.TOTAL_NOS_OF_QUESTIONS);
  },

  chooseOperator: function() {
    return this.operators[Math.ceil(Math.random() * (this.operators.length - 1))];
  },


  /////----process user imput----/////
  getUserAnswer: function(){
    var response = parseFloat($('#answerInput').val().trim())
    return isNaN(response) ? "No answer" : response.toFixed(2);
  },

  evaluate: function() {
    //returns true or false and store incorrect questions separately
    var result = this.solveQuestion(this.currentQuestion.text);
    var userResponse = this.getUserAnswer();

    if(result == userResponse) {
      this.saveResponse(userResponse, "correct");
    } else {
      this.saveResponse(userResponse, "wrong");
    }
  },

  solveQuestion: function(question){
    return eval(question).toFixed(2);
  },

  saveResponse: function(answer, responseType) {
    //save wrongResponse
    var quizResponse = new QuizResponse(this.currentQuestion.count, this.currentQuestion.text, answer);
    this.responses[responseType].push(quizResponse);
  },



  /////----setup subsequent questions-----/////
  updateQuestionLabel: function() {
    this.createQuestion(this.chooseOperand(), this.chooseOperator(), this.chooseOperand());

    $('#questionLabel').text('Question ' + this.currentQuestion.count);
    $('#questionTxt').text(this.currentQuestion.text);
  },

  updateCurrentScore: function() {
    console.log(this.responses.correct.length);
    $('#currentScoreTxt').text(this.responses.correct.length  + ' out of ' + this.TOTAL_NOS_OF_QUESTIONS);
  },
  

  /////----ahow final exit view ------/////
  showExitScreen: function() {
    var that = this, uiContainer =  $('#container div');
    var completionNoticeTxt = $('<h1>', { id: 'completionHeaderTxt', 'class': 'headerText', text: 'Hi, you just completed The Arithmetic Quiz' })
                        .insertAfter('<p>Here is your result</p>');

    uiContainer.children().fadeOut(500, function(){
      uiContainer.empty()
        .append(completionNoticeTxt)
        .append(that.createScoreLabel());

      if(that.responses.wrong.length) {
        completionNoticeTxt.switchClass('headerText', 'correctionNoticeHeader', '500');
        uiContainer.append(that.createCorrectionUI(that.responses.wrong))
      }
    });
  },
  
  createCorrectionUI: function(wrongResponses) {
    var question = "", response = "", correctAnswer = "", responseItem = "";
    var correctionListUI = $('<ul>').prepend('<h3>Here are the corrections: </h3');
    var correctionItemUI = $('<li>', { id: 'correctionItem'});
   
    for(var i = 0; i < wrongResponses.length; i++) {
      responseItem = wrongResponses[i];
      question = 'Question ' + responseItem.number + '. ' + responseItem.question;
      response = responseItem.responseValue;
      correctAnswer = this.solveQuestion(responseItem.question);

      correctionItemUI.clone().html('<p>' + question + '</p>' +
        '<p> Your answer: ' + response + '</p>' +
        '<p> Correct answer: ' + correctAnswer + '</p>').appendTo(correctionListUI);
    }

    return correctionListUI;
  },

    /////----ahow final exit view ------/////
  ///manage event handling 
  addEventHandlers: function() {
    var that = this;
    
    $('#startQuizBtn').on('click', function() {
      that.showMainUI();
    });

    $('#container').on('click', '#nextBtn', function(){
      that.evaluate();
      if (that.currentQuestion.count < 20) {
        that.updateQuestionLabel();
        that.updateCurrentScore();
      } else {
        that.showExitScreen();
      }    
    });
  }
}

$(document).ready(function(){
  var uiContainer = $('#container');
  var quizApp = new QuizApp(uiContainer);
  quizApp.init();
});