var app=angular.module('app',['angular-loading-bar']);


app.service('tweets',function ($http) {
  var factory={};



  return{
    getTweets:function () {

   var promise=$http({
     method:'GET',
     url:'https://fossasia.herokuapp.com/tweets/fossasia'
   }).then(function (response) {
     return response;
   });
  return promise;
},
nextTweets:function (id) {
  console.log(id);
  var promise=$http({
    method:'GET',
    url:'https://fossasia.herokuapp.com/tweets/fossasia/'+id
  }).then(function (response) {
    return response;
  });
 return promise;
}
}
})
app.controller('first',['$scope','tweets',function ($scope,tweets) {
    $scope.button="btn";
    $scope.over="hide";
  tweets.getTweets().then(function (response) {

    $scope.tweets=response.data.tweets;
    $scope.last_id=response.data.last_id;
  });
  $scope.next=function () {
    tweets.nextTweets($scope.last_id).then(function (response) {
      console.log(response);
      if(response.data.more===false)
      {
        $scope.button="hide";
        $scope.over="";
        console.log("over da");
      }
      else {
        for(var i=0;i<response.data.tweets.length;i++)
        {

          $scope.tweets.push(response.data.tweets[i]);
        }
        $scope.last_id=response.data.last_id;
      }

    })
    //console.log('clicked');
  }
}]);
