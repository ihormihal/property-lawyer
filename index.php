<!DOCTYPE html>
<html lang="en">
		<head>
		<?php include 'components/head.php'; ?>
		</head>
		<body>
			<main>

				<section class="pb8 cover" style="background-image: url(design/images/background.jpg)">
					<div class="header mb8">
						<?php include 'components/header.php'; ?>
					</div>
					<div class="container">
						<div class="mb4">
							<h1>АДВОКАТ ПО НЕДВИЖИМОСТИ</h1>
							<h4>(юридическая проверка квартир, домов, нежилых помещений, земельных участков перед покупкой/продажей)</h4>
						</div>
						<div class="row">
							<div class="col-md-8">
								<h2 class="mb2">Вам обеспечивается:</h2>
								<ul class="list">
									<li><i class="fa fa-check"></i> полная юридическая проверка продавца недвижимости</li>
									<li><i class="fa fa-check"></i> профессиональный анализ алгоритма отчуждения объекта недвижимости</li>
									<li><i class="fa fa-check"></i> полная юридическая проверка объекта недвижимости</li>
									<li><i class="fa fa-check"></i> при необходимости, разработка наиболее выгодной модели проведения сделки</li>
								</ul>
							</div>
							<div class="col-md-4">
								<?php include 'components/form.php'; ?>
							</div>
						</div>
					</div>
					
				</section>

				<?php include 'components/risks.php'; ?>
				<?php include 'components/problems.php'; ?>
				<?php include 'components/why.php'; ?>
				<?php include 'components/attainments.php'; ?>
				<?php include 'components/video.php'; ?>
				<?php include 'components/recommendations.php'; ?>
				<?php include 'components/steps.php'; ?>
				<?php include 'components/packages.php'; ?>
				<?php include 'components/map.php'; ?>
			</main>
			<footer>
				<?php include 'components/footer.php'; ?>
			</footer>

			<div id="callback" class="hidden">
				<div class="p2">
					<h4 class="text-center mb2">Заказать звонок</h4>
					<form action="">
						<div class="form-group">
							<input type="text" class="full lg" placeholder="Имя">
						</div>
						<div class="form-group">
							<input type="text" class="full lg" placeholder="Телефон">
						</div>
						<div class="buttons">
							<input type="submit" class="btn btn-lg btn-danger up full" value="Заказать звонок">
						</div>    
					</form>
				</div>
			</div>

			<div id="order-package" class="hidden">
				<div class="p2">
					<h4 class="text-center mb2">Заказать проверку</h4>
					<form action="">
						<div class="form-group">
							<select id="package-select" class="full lg">
								<option value="package-1">Проверка (2800 грн)</option>
								<option value="package-2">Проверка + сопровождение (5000 грн)</option>
								<option value="package-3">Проверка + сопровождение + выезд на сделку (13000 грн)</option>
							</select>
						</div>
						<div class="form-group">
							<input type="text" class="full lg" placeholder="Имя">
						</div>
						<div class="form-group">
							<input type="text" class="full lg" placeholder="Телефон">
						</div>
						<div class="buttons">
							<input type="submit" class="btn btn-lg btn-danger up full" value="Заказать проверку">
						</div>    
					</form>
				</div>
			</div>
		</body>
</html>