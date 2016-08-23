/*
 * Angular - Directive "im-autocomplete"
 * im-autocomplete - v0.2.4 - 2016-07-22
 * https://github.com/ihormihal/IM-Framework
 * autocomplete.php
 * Ihor Mykhalchenko (http://mycode.in.ua/)
 */

angular.module('im-autocomplete', [])

.directive('imAutocompleteSingle', function() {
	return {
		restrict: 'E',
		scope: {
			name: '@',
			placeholder: '@',
			class: '@',
			output: '=',
			updated: '=',
			custom: '@',
			disabled: '=',
			onChangeClear: '='
		},
		template: '<div class="dropdown dropdown-select im-autocomplete-single" ng-class="{\'focus in\': select.visible}">'+
			'<input ng-model="select.selected" name="{{name}}" type="hidden">'+
			'<input ng-disabled="disabled" ng-model="select.search" class="full {{class}}" type="text" placeholder="{{placeholder}}">'+
			'<div class="collection">'+
				'<ul>'+
					'<li ng-repeat="result in select.results" ng-class="{\'selected\': result.value == select.selected.value}" ng-click="select.choose($index)">{{result.text}}</li>'+
				'</ul>'+
			'</div>'+
		'</div>',
		controller: [
			'$scope', '$element', '$attrs', '$http',
			function($scope, $element, $attrs, $http) {

				var input = $element[0].getElementsByTagName('input')[0];



				var config = {
					onfocus: false,
					minLength: parseInt($attrs.minLength) || 2
				};

				if(parseInt($attrs.minLength) == 0){
					config.onfocus = true;
				}

				$scope.updated = false;

				$scope.scrollmode = false;
				var selectedIndex = 0;

				var textInput = $element[0].getElementsByTagName('input')[1];


				function hideSelect() {
					$scope.select.visible = false;
					selectedIndex = 0;
					$scope.$apply();
				};
				var hideSelectDelay;

				$scope.select = {
					search: '',
					selected: {},
					results : [],
					visible: false,
					choose: function(index){
						$scope.select.selected = $scope.select.results[index];
						$scope.select.search = $scope.select.selected.text;

						clearTimeout(hideSelectDelay);
						$scope.select.visible = false;
						$scope.output = $scope.select.selected;
						$scope.select.value = angular.toJson($scope.select.selected);
						$scope.updated = true;
					}
				};

				//key commands
				$element[0].onkeyup = function(event) {
					event.preventDefault();
					event.stopPropagation()
					console.log(event.keyCode);
					//key down
					if(event.keyCode == 40){
						$scope.scrollmode = true;
						$scope.select.selected = $scope.select.results[selectedIndex];
						$scope.select.search = $scope.select.selected.text;
						$scope.$apply();
						if(selectedIndex < $scope.select.results.length - 1){
							selectedIndex++;
						}else{
							selectedIndex = 0;
						}
						
					}
					//key up
					else if(event.keyCode == 38){
						$scope.scrollmode = true;
						if(selectedIndex > 0){
							selectedIndex--;
						}else{
							selectedIndex = $scope.select.results.length - 1;
						}
						$scope.select.selected = $scope.select.results[selectedIndex];
						$scope.select.search = $scope.select.selected.text;
						$scope.$apply();
					}else if(event.keyCode == 13){
						textInput.blur();
					}else{
						$scope.scrollmode = false;
					}
				};


				//initialize
				if($attrs.value){
					$scope.select.selected = angular.fromJson($attrs.value);
					if($scope.select.selected.text){
						$scope.select.search = $scope.select.selected.text;
					}
					$scope.output = $scope.select.selected;
				}

				textInput.onblur = function(){
					hideSelectDelay = setTimeout(hideSelect, 200);
				};


				$scope.clear = function(param){
					console.log(param);
				};

				if(config.onfocus){
					textInput.onfocus = function(){
						$http({
							method: 'GET',
							url: $attrs.url
						}).then(function(response) {
							$scope.select.results = response.data;
							if($scope.select.results.length){
								$scope.select.visible = true;
							}
						}, function(error) {
							console.log(error);
						});
					}
				}

				$scope.$watch('select.search', function(val){
					if($scope.scrollmode){
						return false;
					}
					if($scope.onChangeClear){
						$scope.onChangeClear = {value:'', text: ''};
						console.log($scope.onChangeClear);
					}
					var chosen = true;
					if($scope.select.selected){
						if(val !== $scope.select.selected.text){
							chosen = false;
							$scope.select.selected = {text: val};
							$scope.output = $scope.select.selected;
						}
					}
					if(val == ''){
						$scope.select.selected = {};
						$scope.output = {};
					}
					if(val.length >= parseInt(config.minLength) && !chosen){

						var getUrl = $attrs.url;
						if(getUrl.indexOf('?') !== -1){
							getUrl += '&search='+val;
						}else{
							getUrl += '?search='+val;
						}


						$http({
							method: 'GET',
							url: getUrl
						}).then(function(response) {
							$scope.select.results = response.data;
							if($scope.select.results.length){
								$scope.select.visible = true;
							}
						}, function(error) {
							console.log(error);
						});
					}else{
						$scope.select.results = [];
					}
				});

				$scope.$watch('select.selected', function(val){
					input.value = angular.toJson(val);
				});
			}
		]
	};
})

.directive('imAutocompleteMultiple', function() {
	return {
		restrict: 'E',
		scope: {
			name: '@',
			placeholder: '@',
			class: '@',
			output: '=',
			updated: '=',
			custom: '@'
		},
		template: '<div class="dropdown dropdown-select im-autocomplete-multiple" ng-class="{\'focus in\': select.visible}">'+
			'<input ng-model="select.value" name="{{name}}" type="hidden">'+
			'<div class="select {{class}}" ng-class="{\'focus\': select.focus}" ng-click="makeFocus()">'+
				'<div ng-repeat="item in select.selected" class="item" ng-class="{\'custom\': !item.value}">{{item.text}}<i class="fa fa-times" ng-click="select.remove($index)"></i></div>'+
				'<input ng-model="select.search" type="text" placeholder="{{placeholder}}" ng-focus="select.focus = true">'+
			'</div>'+
			'<div class="collection">'+
				'<ul>'+
					'<li ng-repeat="result in select.results" ng-click="select.choose($index)">{{result.text}}</li>'+
				'</ul>'+
			'</div>'+
		'</div>',
		controller: [
			'$scope', '$element', '$attrs', '$http', '$filter',
			function($scope, $element, $attrs, $http, $filter) {

				var input = $element[0].getElementsByTagName('input')[0];

				var config = {
					onfocus: false,
					minLength: parseInt($attrs.minLength) || 2,
					customChar: ','
				};

				if(parseInt($attrs.minLength) == 0){
					config.onfocus = true;
				}
				var textInput = $element[0].getElementsByTagName('input')[1];
				
				$scope.updated = false;

				$scope.scrollmode = false;
				var selectedIndex = 0;

				function hideSelect() {
					$scope.select.visible = false;
					selectedIndex = 0;
					$scope.$apply();
				};
				var hideSelectDelay;

				$scope.select = {
					search: '',
					value: '',
					selected: [],
					results : [],
					visible: false,
					focus: false,
					choose: function(index){
						$scope.select.selected.push($scope.select.results[index]);
						$scope.select.search = '';
						clearTimeout(hideSelectDelay);
						textInput.focus();

						excludeSelected();
						$scope.output = $scope.select.selected;
						$scope.select.value = angular.toJson($scope.select.selected);
						$scope.updated = true;
					},
					remove: function(index){
						$scope.select.selected.splice(index,1);
					}
				};

				//initialize
				if($attrs.value){
					$scope.select.selected = angular.fromJson($attrs.value);
					$scope.output = $scope.select.selected;
				}

				//key commands
				// $element[0].onkeyup = function(event) {
				// 	event.preventDefault();
				// 	event.stopPropagation()
				// 	console.log(event.keyCode);
				// 	//key down
				// 	if(event.keyCode == 40){
				// 		$scope.scrollmode = true;
				// 		$scope.select.selected = $scope.select.results[selectedIndex];
				// 		$scope.select.search = $scope.select.selected.text;
				// 		$scope.$apply();
				// 		if(selectedIndex < $scope.select.results.length - 1){
				// 			selectedIndex++;
				// 		}else{
				// 			selectedIndex = 0;
				// 		}
				// 	}
				// 	//key up
				// 	else if(event.keyCode == 38){
				// 		$scope.scrollmode = true;
				// 		if(selectedIndex > 0){
				// 			selectedIndex--;
				// 		}else{
				// 			selectedIndex = $scope.select.results.length - 1;
				// 		}
				// 		$scope.select.selected = $scope.select.results[selectedIndex];
				// 		$scope.select.search = $scope.select.selected.text;
				// 		$scope.$apply();
				// 	}else if(event.keyCode == 13){
				// 		textInput.blur();
				// 	}else{
				// 		$scope.scrollmode = false;
				// 	}
				// };

				textInput.onblur = function(){
					$scope.select.focus = false;
					hideSelectDelay = setTimeout(hideSelect, 200);
				};

				$scope.makeFocus = function(){
					$scope.select.focus = true;
					textInput.focus();
				};

				function excludeSelected(){
					var temp = [];
					for(var i = 0; i < $scope.select.results.length; i++){
						var exists = false;
						for(var j = 0; j < $scope.select.selected.length; j++){
							if($scope.select.selected[j].value == $scope.select.results[i].value){
								exists = true;
							}
						}
						if(!exists){
							temp.push($scope.select.results[i]);
						}
					}
					$scope.select.results = temp;
					if($scope.select.results.length){
						$scope.select.visible = true;
					}
				};

				if(config.onfocus){
					textInput.onfocus = function(){
						$http({
							method: 'GET',
							url: $attrs.url
						}).then(function(response) {
							$scope.select.results = response.data;
							if($scope.select.results.length){
								$scope.select.visible = true;
							}
						}, function(error) {
							console.log(error);
						});
					}
				}

				$scope.$watch('select.search', function(val){
					if($scope.scrollmode){
						return false;
					}
					if(val.length >= parseInt(config.minLength)){
						//add custom

						if($attrs.custom !== 'false'){
							if(val == config.customChar){
								$scope.select.search = '';
							}else if(val.length > 1 && val.substr(val.length - 1) == config.customChar){
								$scope.select.selected.push({text: val.substring(0, val.length - 1)});
								$scope.select.search = '';
								$scope.output = $scope.select.selected;
								$scope.select.value = angular.toJson($scope.select.selected);
								$scope.updated = true;
							}
						}

						var getUrl = $attrs.url;
						if(getUrl.indexOf('?') !== -1){
							getUrl += '&search='+val;
						}else{
							getUrl += '?search='+val;
						}

						//ajax
						$http({
							method: 'GET',
							url: getUrl
						}).then(function(response) {
							$scope.select.results = response.data;
							excludeSelected();
						}, function(error) {
							console.log(error);
						});
					}
				});

				$scope.$watch('select.selected', function(val){
					input.value = angular.toJson(val);
				}, true);
			}
		]
	};
})

;