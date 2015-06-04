var myAppModule = angular.module('MyApp', []);

myAppModule.factory('Persons', function() {
    var persons = {};
    persons.query = function() {
        return [
            {
                "id": 13457,
                "firstName": "John",
                "lastName": "Smith",
                "age": 25,
                "address":
                {
                    "streetAddress": "21 2nd Street",
                    "city": "New York",
                    "state": "NY",
                    "postalCode": "10021"
                },
                "phoneNumber":
                    [
                        {
                            "type": "home",
                            "number": "212 555-1234"
                        },
                        {
                            "type": "fax",
                            "number": "646 555-4567"
                        }
                    ]
            },
            {
                "id": 76578,
                "firstName": "Simona",
                "lastName": "Morasca",
                "age": 22,
                "address":
                {
                    "streetAddress": "3 Mcauley Dr",
                    "city": "Ashland",
                    "state": "OH",
                    "postalCode": "44805"
                },
                "phoneNumber":
                    [
                        {
                            "type": "home",
                            "number": "419-503-2484"
                        },
                        {
                            "type": "fax",
                            "number": "419-800-6759"
                        }
                    ]
            },
            {
                "id": 12583,
                "firstName": "Josephine",
                "lastName": "Darakjy",
                "age": 33,
                "address":
                {
                    "streetAddress": "4 B Blue Ridge Blvd",
                    "city": "Brighton",
                    "state": "MI",
                    "postalCode": "48116"
                },
                "phoneNumber":
                    [
                        {
                            "type": "home",
                            "number": "973-605-6492"
                        },
                        {
                            "type": "fax",
                            "number": "602-919-4211"
                        }
                    ]
            }
        ];
    };
    return persons;
});

myAppModule.controller('PersonController',
    function(Persons, $scope) {
        if (!$scope.persons) {
            $scope.persons = Persons.query();
        }
        
        
         $scope.toggleContent = function(){
             
             $('header a').toggleClass('btn-primary');
             $('header a').toggleClass('btn-default');
             if ($('header a').text() === 'Show Content') {
                $('header a').text('Hide Content');
                $('header a').attr('href', '#/list');
            } else {
                $('header a').text('Show Content');
                $('header a').attr('href', '#/');
             }
         };

        $scope.sort = {
          active: '',
          descending: undefined
        }  

        $scope.changeSorting = function(column) {
          var sort = $scope.sort;
          if (sort.active == column) {
             sort.descending = !sort.descending;
          } 
          else {
            sort.active = column;
            sort.descending = false;
          }
        };

        $scope.getIcon = function(column) {
          var sort = $scope.sort;
          if (sort.active == column) {
            return sort.descending
              ? 'glyphicon-chevron-down'
              : 'glyphicon-chevron-up';
            }
        }
        
        $scope.n = 0;
        $scope.setNumber = function(){
           $( "#selectNumber" ).change(function() {
                var a = $('#selectNumber option:selected').val();
                if (a === 'fax') {
                    $scope.n = 1;
                } else {
                   $scope.n = 0;
                }
            });
           return $scope.n;
        }

        $scope.showLast = false;
        $scope.openInfo = function(id){
            for (var i=0; i < $scope.persons.length; i++){
                if ($scope.persons[i].id === id){
                    $scope.person = $scope.persons[i];
                    $scope.showLast = false;
                }
            }
        }
        $scope.save = function(){
            $scope.showLast = true;
        }

 });

myAppModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/list', {
          templateUrl: 'list.html',
          controller: 'PersonController'
        }).
        when('/person/:id', {
          templateUrl: 'template.html',
          controller: 'EditController'
        }).
        otherwise({
          redirectTo: '/'
        });
}]);

myAppModule.controller('EditController', function(Persons, $scope, $routeParams){
    $scope.person_id = $routeParams.id;
    $scope.persons2 = angular.copy($scope.persons);

    $scope.num = 4;
    function search(){
        for (var i=0; i < $scope.persons2.length; i++){
            if (+$scope.persons2[i].id === +$scope.person_id){
            $scope.editPerson = $scope.persons2[i];
            $scope.num = i;
            }
        }
    }
    search();
    $scope.cancel = function(){
        $('a.cancel').attr('href', '#/list');
    }
    $scope.update = function(){
        if ($('.formEdit').hasClass('ng-valid')) {
            $scope.persons[$scope.num] = $scope.persons2[$scope.num];//angular.copy(editPerson);
            $('a.update').attr('href', '#/list');
        }   
    }

    $scope.invalid = function(){
        $('input.ng-invalid').parent().addClass('has-error');
        $('input.ng-valid').parent().removeClass('has-error');
        $('.formEdit').find('span').addClass('text-danger');
    }
});

// myAppModule.directive('canceltext', function(){
//     return {
//        link: function postLink($scope, iElement, iAttrs){
//         iElement.text(iAttrs.canceltext);
//        }
//     }
// });
// myAppModule.directive('submittext', function(){
//     return {
//        link: function postLink($scope, iElement, iAttrs){
//         iElement.text(iAttrs.submittext);
//        }
//     }
// });
// myAppModule.directive('oncancel', function(){
//     return {
//        link: function postLink($scope, iElement, iAttrs){
//         iElement.attr('data-dismiss','modal' );
//        }
//     }
// });
// myAppModule.directive('onsubmit', function(){
//     return {
//         link: function postLink($scope, iElement, iAttrs){
//         iElement.attr('data-dismiss','modal');
//         }
//     }
// });