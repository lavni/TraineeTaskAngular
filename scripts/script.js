var myAppModule = angular.module('MyApp', []);

myAppModule.factory('Persons', function($http) {
    var fact = {};
    var urlBase = 'http://localhost:3000/persons/';

    fact.getPersons = function () {
        return $http.get(urlBase);
    };

    fact.getPerson = function (num) {
        return $http.get(urlBase + num);
    };
    fact.updatePerson = function (personEdit) {
        return $http.put(urlBase + personEdit.id, personEdit)
    };
    fact.insertPerson = function (newPerson) {
        return $http.post(urlBase, newPerson);
    };
    fact.deletePerson = function (id) {
        return $http.delete(urlBase + id);
    };

    return fact;
});

myAppModule.controller('PersonController',
    function(Persons, $scope, $http, $compile) {
        Persons.getPersons()
            .success(function (response) {
                $scope.persons = response;
            })
            .error(function (error) {
               alert('Unable to load data: ' + error.message);
            });


        $scope.boots = true;
        $scope.hide = true;
         $scope.toggleContent = function(){
            $scope.boots = !$scope.boots;
            $scope.hide = !$scope.hide;
            // if ($('header a').text() === 'Show Content') {
            //     $('header a').text('Hide Content');
            // } else {
            //     $('header a').text('Show Content');
            // }
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

       // $scope.showLast = false;
       //modal
       $('form').find('span').addClass('text-danger');
        $scope.openInfo = function(id){
            Persons.getPerson(id)
            .success(function (response) {
                $scope.personEdit = response;
            })
            .error(function (error) {
                alert('Unable to load data: ' + error.message);
            });
        }

        $scope.openDelete = function(id){
             Persons.getPerson(id)
            .success(function (response) {
                $scope.personDel = response;
            })
            .error(function (error) {
                alert('Unable to load data: ' + error.message);
            });
        }

        $scope.delete = function(id){
            Persons.deletePerson(id)
            .success(function () {
                for (var i = 0; i < $scope.persons.length; i++) {
                    var person = $scope.persons[i];
                    if (person.id === id) {
                        $scope.persons.splice(i, 1);
                        break;
                    }
                }
            })
            .error(function (error) {
                console.log('Unable to delete customer: ' + error.message);
            });
        }



        $scope.disableEdit = true;
        $scope.invalid = function(){
            $('.formEdit input.ng-invalid.ng-dirty').parent().addClass('has-error');
            $('.formEdit input.ng-valid').parent().removeClass('has-error');

            $scope.disableEdit = false;
        }
        $scope.invalidd = function(){
            $('.formNew input.ng-invalid.ng-dirty').parent().addClass('has-error');
            $('.formNew input.ng-valid.ng-dirty').parent().removeClass('has-error');
           //if ($(this).hasClass('ng-invalid')) {$(this).parent().addClass('has-error')};
           // console.log(this);
        }

        $scope.newP = {"phoneNumber":[{"type":"home"},{"type":"fax"}]};
        $scope.newPerson = angular.copy($scope.newP);
        $scope.onCancel = function(){
            $scope.personEdit = {};
            $('.formEdit').find('.has-error').removeClass('has-error');
            $scope.disableEdit = true;
        }
        $scope.onCancell = function(){
           $scope.reset();
        }

        $scope.alert = '<div class="alert alert-success alert-dismissible" role="alert">'+
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
          '<strong>Update was successful!</strong></div>'
        $scope.save = function(personEdit){
            //$scope.showLast = true;
            if ($('.formEdit').hasClass('ng-valid')){
                $('.formEdit .update').attr('data-dismiss','modal');
                Persons.updatePerson(personEdit)
                 .success(function () {
                    for (var i = 0; i < $scope.persons.length; i++) {
                        if ($scope.persons[i].id === personEdit.id) {
                        $scope.persons[i] = angular.copy(personEdit);
                        };
                    };
                  })
                  .error(function (error) {
                    alert('Unable to update customer: ' + error.message);
                  });

                  $('ng-view').prepend($scope.alert);
                  $('.formEdit').find('.has-error').removeClass('has-error');
                  $scope.personEdit = {};
                  $scope.disableEdit = true;
            } else{
                $('.formEdit .update').removeAttr('data-dismiss');
            } 
          //console.log(Persons.getPersons().success(function(r){console.log(r);}));
        }

        $scope.newId = function(){
            var newid = $scope.persons[0].id
            for (var i = 1; i < $scope.persons.length; i++) {
                if ($scope.persons[i].id > newid) {
                    newid = $scope.persons[i].id;
                };
            };
            newid++;
            console.log(newid);
            return newid;
        }
        $scope.saveNew = function(newPerson){
            $('.formNew input.ng-invalid').parent().addClass('has-error');
            $('.formNew input.ng-valid').parent().removeClass('has-error');
            if ($('.formNew').hasClass('ng-valid')){
                $('.formNew .update').attr('data-dismiss','modal');
                newPerson.id = $scope.newId();
                Persons.insertPerson(newPerson)
                    .success(function () {
                        $scope.persons.push(newPerson);
                    }).
                    error(function(error) {
                        $scope.status = 'Unable to insert customer: ' + error.message;
                    });
                $('ng-view').prepend($scope.alert);
                $scope.reset();
            } else {
                $('.formNew .update').removeAttr('data-dismiss');
            }; 
        }
        $scope.reset = function(){
             $scope.newPerson = angular.copy($scope.newP);
            $('.formNew').find('.has-error').removeClass('has-error');
            $scope.formNew.$setPristine();
            $('.formNew input').val('');
        }
 });

myAppModule.config(['$routeProvider', /*'$locationProvider',*/ function($routeProvider /*$locationProvider*/) {
    $routeProvider.
        // when('/', {
        //   templateUrl: 'list.html',
        //   controller: 'PersonController'
        // }).
        when('/list', {
          templateUrl: 'list.html',
          controller: 'PersonController'
        }).
        when('/person/:id', {
          templateUrl: 'template.html',
          controller: 'EditController'
        }).
        otherwise({
          redirectTo: '/list'
        });
    // //$locationProvider.html5Mode(true);
    // if(window.history && window.history.pushState){
    //     //$locationProvider.html5Mode(true);
    //     $locationProvider.html5Mode({
    //          enabled: true,
    //          requireBase: false
    //     });
    // }
}]);


myAppModule.controller('EditController', function(Persons, $scope, $routeParams){
    $scope.person_id = $routeParams.id;
    $scope.persons2 = angular.copy($scope.persons);

    $('form').find('span').addClass('text-danger');
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
