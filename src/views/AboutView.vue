<template>
  <!-- Start Banner Area -->
	<section class="banner-area organic-breadcrumb">
		<div class="container">
			<div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
				<div class="col-first">
					<h1>Sobre Nosotros</h1>
					<nav class="d-flex align-items-center">
						<router-link to="/">Inicio<span class="lnr lnr-arrow-right"></span></router-link>
						<router-link to="/contacto">Contacto</router-link>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- End Banner Area -->
	<!-- Start Sample Area -->
	<section class="login_box_area section_gap">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="login_box_img">
						<img class="" src="@/assets/img/freskiz.jpg" alt="">
					</div>
				</div>
				<div class="col-lg-6">
					<div class="login_form_inner">
						<img src="@/assets/img/logo.png" width="70%" alt="">
						<br>
						<p class="sample-text">
							<strong>Diego, Andrés, Miguel, Alberto, Christian</strong>
							<br>
							<br>
							Somos 6 amigos que comenzaron un negocio para generar ingresos, nuestra principal característica es que a pesar
							de las circunstancias,
							las malas situaciones y mal humor, siempre seguiremos siendo amigos.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- End Sample Area -->
	<!-- Start Align Area -->
	<div class="whole-wrap pb-100">
		<div class="container">
			<div class="section-top-border">
				<div class="row">
					<div class="">
						<div class="section-title">
							<h1>Principales Paises Compradores</h1>
						</div>
					</div>
				</div>
				<div class="progress-table-wrap">
					<div class="progress-table">
						<div class="table-head">
							<div class="serial">#</div>
							<div class="country">Paises</div>
							<div class="visit">Envios</div>
							<div class="percentage">Satisfacción</div>
						</div>
						<div class="table-row">
							<div class="serial">01</div>
							<div class="country"> <img src="@/assets/img/elements/f1.jpg" alt="flag">Canada</div>
							<div class="visit">525</div>
							<div class="percentage">
								<div class="progress">
									<div class="progress-bar color-1" role="progressbar" style="width: 90%" aria-valuenow="80" aria-valuemin="0"
									 aria-valuemax="100"></div>
								</div>
							</div>
						</div>
						<div class="table-row">
							<div class="serial">02</div>
							<div class="country"> <img src="@/assets/img/elements/f2.jpg" alt="flag">EUA</div>
							<div class="visit">784</div>
							<div class="percentage">
								<div class="progress">
									<div class="progress-bar color-2" role="progressbar" style="width: 94%" aria-valuenow="90" aria-valuemin="0"
									 aria-valuemax="100"></div>
								</div>
							</div>
						</div>
						<div class="table-row">
							<div class="serial">03</div>
							<div class="country"> <img src="@/assets/img/elements/f3.jpg" alt="flag">Reino Unido</div>
							<div class="visit">12</div>
							<div class="percentage">
								<div class="progress">
									<div class="progress-bar color-3" role="progressbar" style="width: 89%" aria-valuenow="90" aria-valuemin="0"
									 aria-valuemax="100"></div>
								</div>
							</div>
						</div>
						<div class="table-row">
							<div class="serial">04</div>
							<div class="country"> <img src="@/assets/img/elements/f4.jpg" alt="flag">Alemania</div>
							<div class="visit">14</div>
							<div class="percentage">
								<div class="progress">
									<div class="progress-bar color-1" role="progressbar" style="width: 92%" aria-valuenow="80" aria-valuemin="0"
									 aria-valuemax="100"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br>
			<br>
		</div>
	</div>
	<!-- End Align Area -->
</template>

<script>
	export default {
		name: 'nosotros',
	}
</script>

<style scoped>
	h3{
		color: #222831;
	}
	p {
		font-size: 17px;
	}
	.login_box_area .login_box_img:before {
    	background: #18090900;
	}
	.sample-text{
		padding-left: 15px;
		padding-right: 15px;
	}
</style>