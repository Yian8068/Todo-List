todo=angular.module("TodoApp",["firebase"]);

todo.controller("todoCtrl",function($scope,$firebase){
  var ref=new Firebase("https://todoapp-yian8068.firebaseio.com/");
  var sync=$firebase(ref);
  $scope.todos=sync.$asArray();

  $scope.addtodo=function(newtodo){
    $scope.todos.$add({thing: newtodo,done:false});
    $scope.newTodo="";
  };
	$scope.change=function(t){

    $scope.todos.$save(t);
  };
  $scope.remain=function(){
    var count=0;
    angular.forEach($scope.todos,function(todo){
      count+= todo.done? 0 : 1;
    });
    return count;
  };
  $scope.donetodo=function(){
    angular.forEach($scope.todos,function(todo){
      if(todo.done){$scope.todos.$remove(todo);}
    });
  };
});

    $(document).ready(function(){
        $("li").click(function(){
             
             
            if($(this).find(":checkbox").attr("checked")==true)
            {
                $(this).find(":checkbox").attr("checked",false);
            }
            else
            {
                $(this).find(":checkbox").attr("checked",true);
                 
                }
          })
        })
         
