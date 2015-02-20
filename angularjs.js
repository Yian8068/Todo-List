app= angular.module("ChatApp",["firebase"]);
app.controller("ChatCtrl",function($scope,$firebase){
  var ref=new Firebase("https://chatapp-anjs.firebaseio.com/");
  var sync= $firebase(ref);
  $scope.messages=sync.$asArray();

  $scope.addmessage=function(m,txt){
    if(m.length===0){m="Anonymous";};
    if(txt.length===0){txt="(empty)";};
    $scope.messages.$add({text:txt,name:m});
    $scope.newMessage="";
  };
  
  $scope.deletemessage=function(msg){
    $scope.messages.$remove(msg);
  };
  $scope.editmessage=function(msg){
    msg.text=prompt("Edit Message",msg.text);
    $scope.messages.$save(msg);
  };
});
