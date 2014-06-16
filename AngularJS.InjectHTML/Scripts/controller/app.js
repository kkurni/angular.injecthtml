var AngularJSApp = angular.module("AngularJSApp", ["ngResource", "ngSanitize"])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider.
            when('/', { controller: NavigationCtrl, templateUrl: 'navigation.html' }).
            when('/feedback', { controller: FeedbackCtrl, templateUrl: 'feedback.html' }).

            otherwise({ redirectTo: '/' });

        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        
        
    });

var NavigationCtrl = function ($scope) {
    $scope.title = "Navigation";
};

AngularJSApp.factory('FeedbackResource', function ($resource) {
    return $resource('http://www.google.com');
});

var FeedbackCtrl = function ($scope, $http, FeedbackResource) {
    $scope.title = "Feedback";
    $scope.simpleHtmlSnippet = '<ul><li>this is simple html snippet</li></ul>';
    $scope.url = 'http://www.google.com';
    
    $scope.fetch = function () {
        
        $('form').live("submit", function () {
            //add site
            $scope.url = 'https://www.google.com' + $(this).attr('action');
            alert($scope.url);
            $scope.$apply();
            $scope.submitPost();
            return false;
        });

        $http.get($scope.url, {withCredentials : true}).
          success(function (data, status) {
              $scope.data = data;
              $scope.$apply();
          }).
          error(function (data, status) {
              $scope.data = data || "Request failed";
              $scope.$apply();
          }
        );

//        $.ajax({
//
//            // The 'type' property sets the HTTP method.
//            // A value of 'PUT' or 'DELETE' will trigger a preflight request.
//            type: 'GET',
//
//            // The URL to make the request to.
//            url: $scope.url,
//
//            // The 'contentType' property sets the 'Content-Type' header.
//            // The JQuery default for this property is
//            // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
//            // a preflight. If you set this value to anything other than
//            // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
//            // you will trigger a preflight request.
//            contentType: 'text/plain',
//
//            xhrFields: {
//                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
//                // This can be used to set the 'withCredentials' property.
//                // Set the value to 'true' if you'd like to pass cookies to the server.
//                // If this is enabled, your server must respond with the header
//                // 'Access-Control-Allow-Credentials: true'.
//                withCredentials: true
//            },
//
//            headers: {
//                // Set any custom headers here.
//                // If you set any non-simple headers, your server must include these
//                // headers in the 'Access-Control-Allow-Headers' response header.
//            },
//
//            success: function (data, textStatus, jqXHR) {
//                // Here's where you handle a successful response.
//                $scope.data = data;
//                $scope.$apply();
//            },
//
//            error: function (jqXHR, textStatus, errorThrown) {
//                // Here's where you handle an error response.
//                // Note that if the error was due to a CORS issue,
//                // this function will still fire, but there won't be any additional
//                // information about the error.
//                alert('Woops, there was an error making the request. - with status ' + errorThrown);
//            }
//        });


    };
    

    $scope.submitPost = function () {
        var $form = $('form');
        // serialize the data in the form
        var serializedData = $form.serialize();
        alert(serializedData);
        // Setup CSRF safety for AJAX:

        $http.post($scope.url, serializedData, { withCredentials: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded;'} }).
          success(function (data, status)
          {
              $scope.data = data;
              $scope.$apply();
          }).
          error(function (data, status) {
              $scope.data = data || "Request failed";
              $scope.$apply();
          }
        );

   
//        $.ajax({
//
//            // The 'type' property sets the HTTP method.
//            // A value of 'PUT' or 'DELETE' will trigger a preflight request.
//            type: 'POST',
//            data: serializedData,
//            
//            // The URL to make the request to.
//            url: $scope.url,
//
//            // The 'contentType' property sets the 'Content-Type' header.
//            // The JQuery default for this property is
//            // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
//            // a preflight. If you set this value to anything other than
//            // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
//            // you will trigger a preflight request.
//            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
//
//            xhrFields: {
//                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
//                // This can be used to set the 'withCredentials' property.
//                // Set the value to 'true' if you'd like to pass cookies to the server.
//                // If this is enabled, your server must respond with the header
//                // 'Access-Control-Allow-Credentials: true'.
//                withCredentials: true
//            },
//
//            headers: {
//                // Set any custom headers here.
//                // If you set any non-simple headers, your server must include these
//                // headers in the 'Access-Control-Allow-Headers' response header.
//            },
//
//            success: function (data, textStatus, jqXHR) {
//                // Here's where you handle a successful response.
//                $scope.data = data;
//                $scope.$apply();
//                alert('data on submit');
//            },
//
//            error: function (jqXHR, textStatus, errorThrown) {
//                // Here's where you handle an error response.
//                // Note that if the error was due to a CORS issue,
//                // this function will still fire, but there won't be any additional
//                // information about the error.
//                alert('Woops, there was an error making the request. - with status ' + textStatus + errorThrown);
//            }
//        });
       
    };
};

