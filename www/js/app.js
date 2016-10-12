// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'btford.socket-io'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($urlRouterProvider, $stateProvider){

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl',
      controllerAs: 'login'
    })

    .state('chat', {
      url: '/chat/:nickname',
      templateUrl: 'templates/chat.html',
      controller: 'chatCtrl',
      controllerAs: 'chat'
    });

    $urlRouterProvider.otherwise('/login');
})

.factory('Socket', function (socketFactory) {
  var myIoSocket = io.connect('https://gupshup-adda-rockypro92.c9users.io');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})

.controller('loginCtrl', function($scope, $state){

  var login = this;
  login.join = function(nickname){
    if(nickname) {
      $state.go('chat', {nickname: nickname});
    }
  }
})

.controller('chatCtrl', function($scope, $stateParams, Socket){

  var chat = this;
  chat.nickname = $stateParams.nickname;
  chat.messages = [];

  var data = {message: "User has joined!", sender: chat.nickname};

  Socket.on("connect", function(){
    Socket.emit("Message", data);
  });

  Socket.on("Message", function(data){
    chat.messages.push(data);
  })

})