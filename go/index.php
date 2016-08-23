<!DOCTYPE html>
<html lang="en">
	<head>
	<?php include 'components/head.php'; ?>
	</head>
	<body ng-app="app">
		<header>
		  <?php include 'components/header.php'; ?>
		</header>
		<main ng-controller="mainController">


			<div class="container mt2">

				<div class="form mb1">
					<input class="input-btn" type="number" ng-model="page" min="0" max="10">
					<button class="btn-mt blue-bg up" ng-click="search();"><i class="fa fa-search"></i> Search</button>
					<button class="btn-mt orange-bg up" ng-show="results.length" ng-click="filter();"><i class="fa fa-filter"></i> Filter</button>
				</div>

				<div class="row thin tile results">
					<div class="col-md-4" ng-repeat="result in results">
						<div class="result" ng-class="{'loading': result.loading, 'ignore': result.ignore}">
							<div class="row">
								<div class="col-xs-4">
									<a ng-href="{{result.url}}" target="_blabk">
										<div class="image">
											<img ng-src="http://kiev.ukrgo.com/{{result.image}}" alt="">
										</div>
										<div class="mt1 reason" ng-show="result.reason">{{result.reason}}</div>
									</a>
								</div>
								<div class="col-xs-8">
									<a ng-href="{{result.url}}" target="_blabk">
										<div class="title">{{result.title}}</div>
									</a>
									<div class="phones" ng-show="result.phones.length">
										<a class="btn-mt flat phone" ng-repeat="phone in result.phones" ng-href="tel:{{phone}}">{{phone}}</a>
									</div>
									<div>
										<a class="btn-mt white-bg flat up preview" ng-click="showPreview(result.url)">Preview</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="preview" class="hidden">
					<div class="content">
						<div class="title">{{preview.title}}</div>
						<div class="mb1" ng-show="preview.info">
							{{preview.info}}
						</div>
						<div class="mb1" ng-show="preview.images.length">
							<div class="image" ng-if="preview.images.length == 1">
								<img ng-src="http://kiev.ukrgo.com/{{preview.images[0]}}" alt="">
							</div>
							<div class="row thin tile" ng-if="preview.images.length > 1">
								<div class="col-sm-6" ng-repeat="image in preview.images">
									<div class="image">
										<img ng-src="http://kiev.ukrgo.com/{{image}}" alt="">
									</div>
								</div>
							</div>
						</div>
						<div class="mb1">
							<div class="text">{{preview.text}}</div>
						</div>
						<div class="phones" ng-show="preview.phones.length">
							<div class="phone" ng-repeat="phone in preview.phones">
								<a ng-href="tel:{{phone}}" class="btn-mt flat">{{phone}}</a>
								<a ng-href="https://www.google.com.ua/search?q={{phone}}&cr=countryUA" target="_blank" class="btn-mt flat">Search this phone</a>
							</div>
						</div>
					</div>
				</div>
				
			</div>




		</main>
		
		<footer>
			<?php include 'components/footer.php'; ?>
		</footer>

	</body>
</html>