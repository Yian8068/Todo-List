app= angular.module("ChatApp",["firebase","infinitescrollModule"]);
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
  $scope.oneceToShow = 5;
  $scope.datasource = [];
            $scope.init = function () {//第一次加入0~20
                $scope.sourcePush(0, $scope.oneceToShow)
            };
            $scope.doLoadMore = function () {//分批載入
                var start = $scope.messages.length;
                var end = start + $scope.oneceToShow;
                $scope.sourcePush(start, end);
            };
            $scope.sourcePush = function (start, end) {
                for (var i = start; i < end; i++) {
                    $scope.messages.push();
                }
            };
            $scope.init();
});
