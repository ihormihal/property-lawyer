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
						<div class="mb4 wow fadeInDown">
							<h1 class="bold dark up">Адвокат по недвижимости</h1>
							<h4 class="bold dark">(юридическая проверка квартир, домов, нежилых помещений, земельных участков перед покупкой/продажей)</h4>
						</div>
						<div class="row">
							<div class="col-md-8">
								<div class="garanties box rounded-5 wow fadeIn">
									<h2 class="mb2">Вам обеспечивается:</h2>
									<ul class="list">
										<li><i class="fa fa-check"></i> полная юридическая проверка продавца недвижимости</li>
										<li><i class="fa fa-check"></i> профессиональный анализ алгоритма отчуждения объекта недвижимости</li>
										<li><i class="fa fa-check"></i> полная юридическая проверка объекта недвижимости</li>
										<li><i class="fa fa-check"></i> при необходимости, разработка наиболее выгодной модели проведения сделки</li>
									</ul>
								</div>
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
				<?php include 'components/video.php'; ?>
				<?php include 'components/attainments.php'; ?>
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
					<form action="server/email.php">
						<div class="form-group">
							<input type="text" name="name" class="full lg" placeholder="Имя *" required>
						</div>
						<div class="form-group">
							<input type="text" name="phone" class="full lg" placeholder="Телефон *" required>
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
					<form action="server/email.php">
						<div class="form-group">
							<select id="package-select" name="package" class="full lg">
								<option value="package-1">Проверка (2800 грн)</option>
								<option value="package-2">Проверка + сопровождение (5000 грн)</option>
								<option value="package-3">Проверка + сопровождение + выезд на сделку (13000 грн)</option>
							</select>
						</div>
						<div class="form-group">
							<input type="text" name="name" class="full lg" placeholder="Имя *" required>
						</div>
						<div class="form-group">
							<input type="text" name="phone" class="full lg" placeholder="Телефон *" required>
						</div>
						<div class="buttons">
							<input type="submit" class="btn btn-lg btn-danger up full" value="Заказать проверку">
						</div>
					</form>
				</div>
			</div>

			<?php if(!empty($_GET['success'])): ?>
				<script>
					var box = '<div class="box"><h2>Спасибо за заявку!</h2><h3>Иы свяжемся с Вами в ближайшее время.</h3></div>';
					$(function() {

						$.fancybox.open({
							type: 'html',
							content: box,
							fitToView: true,
							autoSize: true,
							width: 'false',
							height: 'false',
							padding: 0,
							helpers     : {
								overlay : {
									opacity : 0.4,
									locked: true
								}
							},
							afterClose: function(){
								window.location.href = '<?php echo "http://".$_SERVER['HTTP_HOST']; ?>';
							}
						});

					})
				</script>
			<?php endif ?>

		</body>
</html>