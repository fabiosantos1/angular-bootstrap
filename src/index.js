require('angular')  //import angular 1.6

const init = function() { //init the main function
    
  const app = angular.module('app',[]); //init the angular app

    app.controller('generalController', function ($scope) { //init the controller of the app

      const jsonPlans = require('./data/plans.json'); //declare plans
      const jsonCalls = require('./data/calls.json'); //declare calls

      $scope.plans = jsonPlans.data;
      $scope.calls = jsonCalls.data;
      
      $scope.calc = {};
      $scope.result = false;

      $scope.showResult = function() { //form call this function
        calcPrice(); //call function to calc the price
        $scope.result = true; //show table with results
      }

      $scope.clear = function() { //clear data
        $scope.result = false;
        $scope.calc = {};
      }

      function calcPrice() {

        $scope.resultPrices = []; 

        for (let i = 0; i < $scope.plans.length; i++) { //loop all the plans to calc
          let tax = { //set plan and price to var
            "plan": $scope.plans[i].name,
            "price": calcTax($scope.plans[i].time)
          };
          $scope.resultPrices.push(tax); //add var to array
        }
      }

      function calcTax(time) { 
        let balance = $scope.calc.time-time; //calc the minutes exced
        let tax = 0;
        
        if (balance > 0) { //if exceed
          let ddd = $scope.calls.filter((call) => call.ddd == $scope.calc.origin); //get the ddd origin
          let target = ddd[0].target.filter((dddTarget) => dddTarget.ddd == $scope.calc.target); //get the ddd target
          
          if (target.length > 0) { //if have output target, calc tax
            let exceeded = target[0].tax; 
            tax = exceeded*balance; //

            if (time !== 0) //if not is the normal plan, apply 10%
              tax = tax*1.1;

            tax = convertToMoney(tax); //convert to R$
            
          } else {
            tax = '-';
          }
        }
        return tax;
      }

      function convertToMoney(value) {
        let real = Number(value.toFixed(2)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); //convert to R$
        return real;
      }
      

  });
}

init();