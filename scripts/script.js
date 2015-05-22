// function hide(){
//     $('section').toggleClass('hide');
//     $('header button').toggleClass('btn-primary');
//     $('header button').toggleClass('btn-default');
// }

var myAppModule = angular.module('MyApp', []);

myAppModule.controller('PersonController',
    function($scope) {
        $scope.persons = [
        {
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

        $scope.hide = false;
        $scope.toggleContent = function(){
            $scope.hide = !$scope.hide;
            $('header button').toggleClass('btn-primary');
            $('header button').toggleClass('btn-default');
        };

        // $scope.getIcon = function(column){
        //     if 
        // }

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

          //return 'glyphicon';
        }
});


 