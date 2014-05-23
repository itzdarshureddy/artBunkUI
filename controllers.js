// Create a module for our core ArtBunk services
var artBunkServices = angular.module('ArtBunk', []);

// Set up our mappings between URLs, templates, and controllers
function artBunkRouteConfig($routeProvider) {
  $routeProvider.
  when('/', {
    controller: ListController,
    templateUrl: 'list.html'
  }).
// Notice that for the detail view, we specify a parameterized URL component
// by placing a colon in front of the id
  when('/view/:id', {
    controller: DetailController,
    templateUrl: 'detail.html'
  }).
  otherwise({
    redirectTo: '/'
  });
}

// Set up our route so the service can find it
artBunkServices.config(artBunkRouteConfig);

artBunkServices.factory('Images', function($http) {
    var images = {};
    var data = [];
    images.getAllImages = function() {

        return $http({  //returns a promise object which can have error , success and the status
            dataType: 'json',
            method  : 'GET',
            url     : 'http://localhost:8080/allImages'
        }) .success(function(images){ // you can skip this success as u have this in List Controller but because you need to save allImages you have success defined here.
             data = images;
             console.log(data);
            });
    };

    images.getImage = function(id){
      for (var i in data) {
          if(data[i].id == id){
            return data[i];
          }
      }
    };

    /*images.getImageById = function(id,callback) {
        $http({  //returns a promise object which can have error , success and the status
            dataType: 'json',
            method  : 'GET',
            url     : 'http://localhost:8080/images/'+id
        }).success(callback);
    };*/

    return images;
});


function ListController(Images,$scope) {
    Images.getAllImages().success(function(images) {
            $scope.images = images;
    });
}

// Get the image id from the route (parsed from the URL) and use it to
// find the right image object.
function DetailController($scope, $routeParams,Images) {
    $scope.image = Images.getImage($routeParams.id);
    console.log($scope.image);

}