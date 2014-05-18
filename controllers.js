// Create a module for our core AMail services
var artBunkServices = angular.module('ArtBunk', []);

// Set up our mappings between URLs, templates, and controllers
function emailRouteConfig($routeProvider) {
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

// Set up our route so the AMail service can find it
artBunkServices.config(emailRouteConfig);

// Some fake emails
images = [{"id":1,"name":"darshan","description":"idk","category":"painting","imageUrl":"http://localhost:8080/img/20140221_113157.jpeg","date_created":1399785181000,"last_updated":1399785181000,"imageCost":"222","userName":"darshan","medium":"water color","noOfLikes":null},{"id":2,"name":"Akshatha","description":"christmas hat","category":"painting","imageUrl":"http://localhost:8080/img/sketch.jpg","date_created":1399806471000,"last_updated":1399806471000,"imageCost":"200","userName":"Akshatha","medium":"sketch","noOfLikes":null}];

// Publish our messages for the list template
function ListController($scope) {
  $scope.images = images;
}

// Get the message id from the route (parsed from the URL) and use it to
// find the right message object.
function DetailController($scope, $routeParams) {
  $scope.image = images[$routeParams.id];
}
