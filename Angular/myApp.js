var app = angular.module("myApp", ["ui.router"]);

app.config(  
  ["$stateProvider", "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/shopping");
	$stateProvider
	.state('shopping', {
		url:'/shopping',
		templateUrl:'shopping.html',
		controller: 'shopCtrl'
	});
	$stateProvider
	.state('cartPay', {
		url:'/cartPay/:cost',
		templateUrl:'cartPay.html',
		controller: 'cartCtrl'
	});
}]);


app.controller('shopCtrl',['$scope','$state',function($scope,$state) {
	$scope.mobiles = [
			{image: "oneplus.jpg",model: "OnePlus 8T",price: "₹42,999",cart: false,quantity:'1'},
			{image: "redmi.jpg",model: "Redmi Note 9",price: "₹11,999",cart: false,quantity:'1'},
			{image: "samsung.jpg",model: "Galaxy M31 prime",price: "₹16,499",cart: false,quantity:'1'},
			{image: "redmi9.png",model: "Redmi 9 Prime",price: "₹10,999",cart: false,quantity:'1'},
			{image: "mi.jpg",model: "Mi10",price: "₹44,999",cart: false,quantity:'1'},
			{image: "redmi8a.jpg",model: "Redmi 8A Dual",price: "₹6,999",cart: false,quantity:'1'}];
		$scope.cost = 0;
		$scope.quantity = "1";
		$scope.item = 'nil';
		$scope.classApply = true;
		//$scope.showMe = false;
		$scope.cartPrice = function(item_cost,item_quantity,x) {
			item_cost = item_cost.replace("₹","").replace(",","");
			$scope.cost += parseInt(item_cost,10)*item_quantity;
			x.cart = true;
			x.quantity = parseInt(item_quantity);
			$scope.classApply = false;
		};
		$scope.remove = function(x) {
			x.cart = false;
			temp = x.price;
			temp = temp.replace("₹","").replace(",","");
			$scope.cost -= parseInt(temp,10)*x.quantity; 
		};
		$scope.cart = function() {
			$state.go('cartPay', {
				cost: $scope.cost,
			});
		};
}]);

app.controller("cartCtrl",['$scope','$stateParams',
	function($scope,$stateParams) {
		if($stateParams.cost) {
			$scope.cost = $stateParams.cost;
		}
		$scope.result = $scope.cost;
}]);
