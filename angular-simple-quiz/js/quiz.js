(function() {
    /**
     * myQuiz Module
     *
     * Description
     */
    var app = angular.module('myQuiz', []);

    app.controller('QuizCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentage = 0;

        $http.get('quiz_data.json').then(function(quizData) {
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
        });

        $scope.selectAnswer = function (qIndex,aIndex) {
            //console.log(qIndex + ' and ' + aIndex);
            var questionState = $scope.myQuestions[qIndex].questionState;

            if ( questionState != 'answered') {

                $scope.myQuestions[qIndex].selectedAnswer = aIndex;

                var correctAnswer = $scope.myQuestions[qIndex].correct;

                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;


                if ( aIndex === correctAnswer ) {
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                } else {
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                }

                $scope.myQuestions[qIndex].questionState = 'answered';
            }

            $scope.percentage = ($scope.score / $scope.totalQuestions)*100;
        }


        $scope.isSelected = function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        }

        $scope.isCorrect = function(qIndex,aIndex){
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        }

        $scope.selectContinue = function() {
            return $scope.activeQuestion += 1;
        }

        $scope.createShareLinks = function(percentage) {

            var url = 'http://google.com';
            var emailLink = '<a class="btn email" href="mailto:?suject=Try to beat my score!&amp;body=I scored a '+ percentage +'% on '+ url +'">Email a friend</a>';
            var twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text=Beat me at&amp;hashtags=SaturnQuiz&amp;url='+ url +'" >Tweet your score</a>';
            var facebookLink = '<a class="btn facebook" href="#" >Share on Facebook</a>';

            var newMarkup = emailLink + twitterLink + facebookLink;

            return $sce.trustAsHtml(newMarkup);
        }


    }])


})();
