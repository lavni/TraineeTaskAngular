// function hide(){
//     $('section').toggleClass('hide');
//     $('header button').toggleClass('btn-primary');
//     $('header button').toggleClass('btn-default');
// }

var myAppModule = angular.module('MyApp', []);

myAppModule.factory('Persons', function() {
    var persons = {};
    persons.query = function() {
        return [
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
    };
    return persons;
});

myAppModule.controller('PersonController',
    function(Persons, $scope) {
        $scope.persons = Persons.query();

        $scope.hide = false;
        $scope.toggleContent = function(){
            $scope.hide = !$scope.hide;
            $('header button').toggleClass('btn-primary');
            $('header button').toggleClass('btn-default');
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
                    //$('#num').html('{{person.phoneNumber[1].number}}')
                    $scope.n = 1;
                } else {
                   // $('#num').html('{{person.phoneNumber[0].number}}')
                   $scope.n = 0;
                }
            });
           return $scope.n;
        }

        $scope.showLast = false;
        $scope.openInfo = function(index){
            $scope.person = $scope.persons[index];
            $scope.showLast = false;
        }
        $scope.save = function(){
            $scope.showLast = true;
        }

 });


