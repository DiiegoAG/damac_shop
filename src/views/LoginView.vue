<template>
    <!-- Start Banner Area -->
	<section class="banner-area organic-breadcrumb">
		<div class="container">
			<div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
				<div class="col-first">
					<h1>Login - Registro</h1>
					<nav class="d-flex align-items-center">
						<router-link to="/">Inicio<span class="lnr lnr-arrow-right"></span></router-link>
                        <router-link to="/productos">Productos</router-link>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- End Banner Area -->

	<!--================Login Box Area =================-->
	<section class="login_box_area section_gap">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="login_box_img">
						<img class="img-fluid" src="@/assets/img/login.jpg" alt="">
						<div class="hover">
							<h4>¿No tienes cuenta aún?</h4>
							<p>Si realizas compras con una cuenta, podrás ver tu historial de compras y obtener algunos cupones de descuento.</p>
							<a class="primary-btn" href="registration.html">Crear una Cuenta</a>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="login_form_inner">
						<h3>Ingresa tus datos</h3>
						<form class="row login_form">
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" v-model="email" placeholder="Correo" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Correo'">
							</div>
							<div class="col-md-12 form-group">
								<input type="password" class="form-control" v-model="password" placeholder="Contraseña" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
							</div>
							<div class="col-md-12 form-group">
								<div class="creat_account">
									<input type="checkbox" id="f-option2" name="selector">
									<label for="f-option2">Mantenerme Logeado</label>
								</div>
							</div>
							<div class="col-md-12 form-group">
								<button class="primary-btn" v-on:click.prevent="checkUser()">Entrar</button>
								<a href="#">¿Olvidaste tu contraseña?</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!--================End Login Box Area =================-->
</template>

<script>
import router from '@/router';
import userService from '@/services/userService';
import VueJwtDecode from 'vue-jwt-decode'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'


export default {
	data() {
		return {
			email: null,
			password: null
		}
	},
	created() {
		if(window.localStorage.getItem('tkn')){
			router.push({
				name: 'admin',
			});
		}
	},
	methods: {
		checkUser (){
			userService.check(this.email, this.password).then(res => {
				console.log(res.data.token);
				console.log(VueJwtDecode.decode(res.data.token));
				this.email = '';
				this.password = '';
				window.localStorage.setItem('tkn', res.data.token);
				router.push({
					name: 'admin',
				});
			}).catch(error => {
				if(error.response.data == "User not found"){
					this.alertWarning('Correo incorrecto');
				}
				else if(error.response.data == "Password is wrong!"){
					this.alertWarning('Contraseña incorrecta');
				}
				else{
					this.alertError('Correo o Contraseña incorrectos');
				}
			});
		},
		alertError(message) {
			createToast(message,
				{
					timeout: 3000,
					toastBackgroundColor: '#c00000',
					hideProgressBar: 'true',
					position: 'top-right',
					type: 'danger',
					transition: 'bounce',
					showIcon: 'true',
				}
			);
		},
		alertWarning(message) {
			createToast(message,
				{
					timeout: 3000,
					hideProgressBar: 'true',
					position: 'top-right',
					type: 'warning',
					transition: 'bounce',
					showIcon: 'true',
				}
			);
		},
	},
}
</script>

<style>
.gradient-bg, .primary-btn, .add-bag .add-btn, .single-product .product-details .prd-bottom .social-info span:after, .grid-btn:hover, .list-btn:hover, .grid-btn.active, .list-btn.active, .pagination a.active, .pagination a:hover, .s_Product_carousel .owl-dots div.active, .s_product_text .card_area .icon_btn:after, .product_description_area .nav.nav-tabs li a.active, .blog-pagination .page-item.active .page-link, .single-footer-widget .click-btn {
    background: linear-gradient(90deg, #d73131 0%, #222831 100%);
}

</style>