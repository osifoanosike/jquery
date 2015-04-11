function QuizApp() {
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

  chooseOperand: function() {
    return Math.ceil(Math.random() * this.TOTAL_NOS_OF_QUESTIONS);
  },

  chooseOperator: function() {
    return this.operators[Math.ceil(Math.random() * this.operators.length-1)];
  },

  createQuestion: function(operand1, operator, operand2) {
    var question = String(operand1).concat(operator, operand2);
    this.currentQuestion.count++; //increment the question nos
    this.currentQuestion.text = question; //update questionText

    return question;
  },

  getUserAnswer: function(){
    var response = parseInt($('#answerInput').val().trim())
    return isNaN(response) ? "No answer" : parseInt(response).toFixed(2);
  },

  evaluate: function() {
    //returns true or false and store incorrect questions separately
    var result = parseInt(eval(this.currentQuestion.text)).toFixed(2);
    var userResponse = this.getUserAnswer();

    if(result == userResponse) {
      this.saveResponse(userResponse, "correct");
    } else {
      this.saveResponse(userResponse, "wrong");
    }
  },

  saveResponse: function(answer, responseType) {
    //save wrongResponse
    var quizResponse = new QuizResponse(this.currentQuestion.count, this.currentQuestion.text, answer);
    this.responses[responseType].push(quizResponse);
  },

  //UI-related Methods
  createWelcomeScreen: function() {
    var welcomeText = $('<h1>', {text: 'Welcome to the  Arithmetic Quiz' })
                        .css({'color': '#444', 'margin': '8em 0 1em 0', 'font-weight': 'normal'});
    var startButton = $('<button>', { id: 'startQuizBtn', text: 'Start Now' })
                        .css({'color': 'red', 'border': '1px solid #c00', 'border-radius': '5px', 'padding': '0.6em 1em', 'font-size':'1.5em', 'background': '#fff'});
    var uiContainer = $('<div>').css({'width':'70%', 'margin':'3em auto', 'text-align': 'center'})
                        .append(welcomeText).append(startButton);

    return uiContainer;
  },

  showMainUI: function() {
    var that = this;
    var question = that.createQuestionLabelandText();
    $('#container div *').fadeOut(500, function(){
      $('#container div').empty()
        .append(question)
        .append(that.createInputBox())
        .append(that.createNoticeTxt())
        .append(that.createNextButton())
        .append(that.createScoreLabel());
    });
  },

  showExitScreen: function() {
    var that = this, uiContainer =  $('#container div');
    var completionNoticeTxt = $('<h1>', { id: 'completionHeaderTxt', text: 'Hi, you just completed The Arithmetic Quiz' })
                        .css({'color': '#444', 'margin': '8em 0 1em 0', 'font-weight': 'normal'})
                        .insertAfter('<p>Here is your result</p>');

    uiContainer.children().fadeOut(500, function(){
      uiContainer.empty()
        .append(completionNoticeTxt)
        .append(that.createScoreLabel());

      if(that.responses.wrong.length) {
        $('#completionHeaderTxt').css('margin', '2em 0 1em 0');
        uiContainer.append(that.createCorrectionUI(that.responses.wrong))
      }
    });
  },

  solveQuestion: function(question){
    return eval(question).toFixed(2);
  },

  createScoreLabel: function(){
    var currentScoreTxt = $('<span>', { id: 'currentScoreTxt', text: this.responses.correct.length  + ' out of ' + this.TOTAL_NOS_OF_QUESTIONS });

    return $('<p>', { id: 'currentScoreLbl', text: 'Score: ' })
      .css({'color': '#444', 'margin': '0 1em ', 'font-weight': 'normal'})
      .append(currentScoreTxt);
  },

  createCorrectionUI: function(wrongResponses) {
    var question = "", response = "", correctAnswer = "", responseItem = "";
    var correctionListUI = $('<ul>').css('list-style-type', 'none').prepend('<h3>Here are the corrections: </h3');
    var correctionItemUI = $('<li>', { id: 'correctionItem'})
                          .css({'color': '#454', 'border': '1px solid #ccc', 'border-radius': '3px',
                          'padding': '0.3em .4em', 'margin':'.5em auto', 'background': '#fff'});
   
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

  createNextButton: function() {
    var that = this;
    var nxtButton = $('<button>', { id: 'nextBtn', text: 'next >' })
            .css({'color':'#fff', 'margin':'1.5em auto', 'border':'1px solid #2d4d4d', 'border-radius':'5px', 'padding':'0.6em 0.9em', 'font-size':'1.4em', 'display':'block', 'background': '#2d4d4d'});  
    
    nxtButton.on('click', function(){
      that.evaluate();
      if (that.currentQuestion.count < that.TOTAL_NOS_OF_QUESTIONS) {
        that.updateQuestionLabel();
        that.updateCurrentScore();
      } else {
        that.showExitScreen();
      }    
    });

    return nxtButton;
  },

  createQuestionLabelandText: function() {
    this.createQuestion(this.chooseOperand(), this.chooseOperator(), this.chooseOperand());

    var questionText = this.currentQuestion.text;
    var label = $('<span>', { id:'questionLabel', text: 'Question ' + this.currentQuestion.count +'. ' })
                  .css('margin-right', '1em');
    var text = $('<span>', { id:'questionTxt', text: questionText }).css('font-weight', 'bold');
    
    return $('<h2>').append(label).append(text)
      .css({'color': '#444', 'margin': '8em 0 1em 0', 'font-weight': 'normal'});
  },

  updateQuestionLabel: function() {
    this.createQuestion(this.chooseOperand(), this.chooseOperator(), this.chooseOperand());

    $('#questionLabel').text('Question ' + this.currentQuestion.count);
    $('#questionTxt').text(this.currentQuestion.text);
  },

  updateCurrentScore: function() {
    console.log(this.responses.correct.length);
    $('#currentScoreTxt').text(this.responses.correct.length  + ' out of ' + this.TOTAL_NOS_OF_QUESTIONS);
  },

  createInputBox: function() {
    var input = $('<input/>', {
      type: 'text',
      placeholder: 'Enter your answer here',
      id: 'answerInput'
    }).css({'width': '70%', 'border': '1px solid #c00', 'border-radius': '5px', 'padding': '0.6em 1em', 'font-size':'1.5em', 'background': '#fff'});
    
    return input;
  },

  createNoticeTxt: function() {
    return $('<p>', { text: '**FYI: All input would be evaluated at two-decimal precision.' })
                  .css({'color':'red', 'font-size': '.8em'});
  },

  showWelcomeScreen: function() {
    $('#container').append(this.createWelcomeScreen());
  },

  startQuiz: function() {
    this.showMainUI();
  },

  // clickNextButton: function(){
  //   var that = this;
  //   var btn = $('#nextBtn').on('click', function(){
  //     that.updateQuestionLabel();
  //     that.updateCurrentScore();
  //   });
  // },

  clickStartButton: function() {
    var that = this;
    $('#startQuizBtn').on('click', function() {
      that.startQuiz();
    });
  },

  addEventHandlers: function() {
    this.clickStartButton();
    // this.clickNextButton();
  }
}

$(document).ready(function(){
  var quizApp = new QuizApp();
  quizApp.init();
});