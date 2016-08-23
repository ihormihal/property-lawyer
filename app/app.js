angular.module('app', ['im-dataTable', 'im-imgUpload', 'im-progress', 'im-autocomplete'])

.config([function () {

}])

.run([function (){

}])

.controller('mainController', ['$scope', function($scope){
	$scope.results = [
		{
			value: 'EN',
			text: 'England'
		},
		{
			value: 'UA',
			text: 'Ukraine'
		},
		{
			value: 'RU',
			text: 'Russia'
		},
		{
			value: 'FR',
			text: 'France'
		}
	];
}])

.directive('imAjaxSelect', function() {
	return {
		restrict: 'E',
		scope: {
			name: '@',
			placeholder: '@',
			splaceholder: '@',
			output: '=',
			updated: '='
		},
		templateUrl: 'app/modules/templates/ajax-select.html',
		controller: [
			'$scope', '$element', '$attrs', '$http',
			function($scope, $element, $attrs, $http) {

				$scope.updated = false;

				//initialize
				$http({
					method: 'GET',
					url: $attrs.url+'?value='+$attrs.value
				}).then(function(response) {
					if(response.data.length){
						$scope.select.selected = response.data[0];
						$scope.updated = true;
					}
				}, function(error) {
					console.log(error);
				});

				$scope.select = {
					search: '',
					selected: null,
					results : [],
					choose: function(index){
						$scope.select.selected = $scope.select.results[index];
						$scope.updated = true;
					}
				};

				$scope.$watch('select.search', function(val){
					if(val.length > 1){
						$http({
							method: 'GET',
							url: $attrs.url+'?search='+val
						}).then(function(response) {
							$scope.select.results = response.data;
						}, function(error) {
							console.log(error);
						});
					}else{
						$scope.select.results = [];
					}
				});
			}
		]
	};
})

;