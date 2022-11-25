<template>
  <!-- start banner Area -->
	<section class="banner-area">
		<div class="container">
			<div class="row fullscreen align-items-center justify-content-start">
				<div class="col-lg-12">
					<div class="active-banner-slider owl-carousel">
						<!-- single-slide -->
						<div class="row single-slide align-items-center d-flex">
							<div class="col-lg-5 col-md-6">
								<div class="banner-content">
									<h1>Proteinas, Creatinas, <br>Suplementos y Más.</h1>
									<p>Con nosotros encontrarás cualquier SUPLEMENTO que estés buscando, revisa nuestros productos 
										y si no lo encuentras, mándanos correo y lo conseguiremos.</p>
								</div>
							</div>
							<div class="col-lg-7">
								<div class="banner-img">
									<img class="img-fluid" src="@/assets/img/product/proteina.png" alt="" width="40%">
								</div>
							</div>
						</div>
						<!-- single-slide -->
						<div class="row single-slide align-items-center d-flex">
							<div class="col-lg-5 col-md-6">
								<div class="banner-content">
									<h1>Proteinas, Creatinas <br>Suplementos y Más.</h1>
									<p>Con nosotros encontrarás cualquier SUPLEMENTO que estés buscando, revisa nuestros productos 
										y si no lo encuentras, mándanos correo y lo conseguiremos.</p>
								</div>
							</div>
							<div class="col-lg-7">
								<div class="banner-img">
									<img class="img-fluid" src="@/assets/img/product/bote.png" alt="" width="40%">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- End banner Area -->

	<!-- start features Area -->
	<section class="features-area section_gap">
		<div class="container">
			<div class="row features-inner">
				<!-- single features -->
				<div class="col-lg-3 col-md-6 col-sm-6">
					<div class="single-features">
						<div class="f-icon">
							<img src="@/assets/img/features/f-icon1.png" alt="">
						</div>
						<h6>Envios Seguros</h6>
						<p>100% de envios exitosos.</p>
					</div>
				</div>
				<!-- single features -->
				<div class="col-lg-3 col-md-6 col-sm-6">
					<div class="single-features">
						<div class="f-icon">
							<img src="@/assets/img/features/f-icon2.png" alt="">
						</div>
						<h6>Productos de Calidad</h6>
						<p>Contamos con sellos de calidad.</p>
					</div>
				</div>
				<!-- single features -->
				<div class="col-lg-3 col-md-6 col-sm-6">
					<div class="single-features">
						<div class="f-icon">
							<img src="@/assets/img/features/f-icon3.png" alt="">
						</div>
						<h6>Atención a Clientes</h6>
						<p>09:00 AM a 06:00 PM</p>
					</div>
				</div>
				<!-- single features -->
				<div class="col-lg-3 col-md-6 col-sm-6">
					<div class="single-features">
						<div class="f-icon">
							<img src="@/assets/img/features/f-icon4.png" alt="">
						</div>
						<h6>Diversos Métodos de Pago</h6>
						<p>Paga con el método que gustes.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- end features Area -->

	<!-- Start category Area -->
	<section class="category-area">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-8 col-md-12">
					<div class="row">
						<div class="col-lg-8 col-md-8">
							<div class="single-deal">
								<div class="overlay"></div>
								<img class="img-fluid w-100" src="@/assets/img/gallery/p1.jpeg" alt="">
								
							</div>
						</div>
						<div class="col-lg-4 col-md-4">
							<div class="single-deal">
								<div class="overlay"></div>
								<img class="img-fluid w-100" src="@/assets/img/gallery/p3.jpeg" alt="">
							</div>
						</div>
						<div class="col-lg-12 col-md-12">
							<div class="single-deal">
								<div class="overlay"></div>
								<img class="img-fluid w-100" src="@/assets/img/gallery/p5.jpeg" alt="">
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6">
					<div class="single-deal">
						<div class="overlay"></div>
						<img class="img-fluid w-100" src="@/assets/img/gallery/p4.jpeg" alt="">
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- End category Area -->

	<!-- start product Area -->
	<section class=" section_gap">
		<!-- single product slide -->
		<div class="single-product-slider">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-lg-6 text-center">
						<div class="section-title">
							<h1>Algunos Productos</h1>
							<p>Revisa algunos de los productos que te ofrecemos, cuando quieras puedes visitar nuestra sección de <strong>Productos</strong> y revisar todos los que tenemos.</p>
						</div>
					</div>
				</div>
				<div class="row">
					<Product column=3 :products=products></Product>
				</div>
			</div>
		</div>
		<!-- single product slide -->
	</section>
	<!-- end product Area -->
	<!-- Start brand Area -->
	<section class="brand-area section_gap">
		<div class="row justify-content-center">
			<div class="col-lg-6 text-center">
				<div class="section-title">
					<h1>Principales Compradores</h1>
					<p>Las principales empresas que adquieren una gran cantidad de nuestros productos.</p>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<a class="col single-img" href="#">
					<img class="img-fluid d-block mx-auto" src="@/assets/img/brand/1.png" alt="">
				</a>
				<a class="col single-img" href="#">
					<img class="img-fluid d-block mx-auto" src="@/assets/img/brand/2.png" alt="">
				</a>
				<a class="col single-img" href="#">
					<img class="img-fluid d-block mx-auto" src="@/assets/img/brand/3.png" alt="">
				</a>
				<a class="col single-img" href="#">
					<img class="img-fluid d-block mx-auto" src="@/assets/img/brand/4.png" alt="">
				</a>
				<a class="col single-img" href="#">
					<img class="img-fluid d-block mx-auto" src="@/assets/img/brand/5.png" alt="">
				</a>
			</div>
		</div>
	</section>
	<!-- End brand Area -->
</template>

<script>
import Product from '@/components/productsList.vue';
import productService from '@/services/productService';

export default {
	name: 'home',
	components: {
		Product
	},
	data() {
		return {
			products: []
		}
	},
	created (){
		productService.get().then(products => this.products = products.data).then(console.table(this.products));
	}
}
</script>


