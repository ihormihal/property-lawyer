angular.module('app', [])

.config([function () {

}])

.run([function (){

}])

.controller('mainController', ['$scope', '$http', function($scope, $http){

	$scope.page = 1;

	$scope.results = [];

	$scope.search = function(){
		$.fancybox.showLoading();
		$http({
			method: 'POST',
			url: 'api/getlist.php',
			data: {page: $scope.page}
		}).then(function(response) {
			$.fancybox.hideLoading();
			$scope.results = response.data;
		}, function(error) {
			$.fancybox.hideLoading();
			console.log(error);
		});
	};

	$scope.filter = function(){
		for (var i = 0; i < $scope.results.length; i++) {
			(function(i){
				$scope.results[i].loading = true;
				$http({
					method: 'POST',
					url: 'api/filter.php',
					data: {url: $scope.results[i].url}
				}).then(function(response) {
					$scope.results[i].loading = false;
					$scope.results[i].ignore = response.data.ignore;
					$scope.results[i].reason = response.data.reason;
					$scope.results[i].phones = response.data.phones;
				}, function(error) {
					$scope.results[i].loading = false;
					console.log(error);
				});
			})(i);
		}
	};

	$scope.showPreview = function(url){
		$.fancybox.showLoading();
		$http({
			method: 'POST',
			url: 'api/getitem.php',
			data: {url: url}
		}).then(function(response) {
			$scope.preview = response.data;
			$.fancybox.hideLoading();
			$.fancybox.open({
				href: '#preview',
				fitToView: true,
				autoSize: true,
				width: false,
				height: false,
				padding: 0,
				wrapCSS: 'popup-preview',
				closeBtn: true,
				helpers     : {
					overlay : {
						opacity : 0.4,
						locked: true
					}
				}
			});
		}, function(error) {
			$.fancybox.hideLoading();
			console.log(error);
		});
		return false;
	};


}])



// .directive('searchPhone', function() {
// 	return {
// 		restrict: 'A',
// 		scope: {
// 			searchPhone: '='
// 		},
// 		controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

// 			console.log($scope.searchPhone);

// 			// $attrs.$observe('searchPhone', function(value) {
// 			// 	$element.attr('href','https://www.google.com.ua/search?q='+value+'&cr=countryUA');
// 			// });
			
// 		}]
// 	}
// })

;