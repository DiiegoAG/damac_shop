<template>
    <!-- Start Banner Area -->
	<section class="banner-area organic-breadcrumb">
		<div class="container">
			<div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
				<div class="col-first">
					<h1>Registro</h1>
					<nav class="d-flex align-items-center">
						<router-link to="/">Inicio<span class="lnr lnr-arrow-right"></span></router-link>
						<router-link to="/productos">Productos</router-link>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- End Banner Area -->

	<!--================Contact Area =================-->
	<section class="contact_area section_gap_bottom">
		<div class="container">
			<div class="row">
                <div class="col-lg-12 col-md-6">
                    <img src="@/assets/img/gallery/p5.jpeg" alt="">
                    <br>
                    <br>
                    <h1 style="text-align: center;">Bienvenid@ al Registro para Nuevos Usuarios</h1>
                    <br>
                    <br>
                </div>
				<div class="col-lg-3">
                    <h3>Selecciona Avatar</h3>
                    <br>
					<a href="" v-for="avatar, $index in avatars" :key="$index" v-on:click.prevent="userData.avatarId = avatar.url">
                            <img :class="{avatar_selected: userData.avatarId == avatar.url}" class="avatars-gallery" :src="avatar.url" :alt="avatar._id">
                        </a>
				</div>
				<div class="col-lg-9">
                    <h3>Ingresa tus Datos Personales</h3>
                    <br>
					<form class="row contact_form">
						<div class="col-md-12">
							<div class="form-group">
								<input type="text" class="form-control" v-model="userData.name" placeholder="Nombre Completo" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre Completo'">
                                <br>
							</div>
						</div>
                        <div class="col-md-6">
							<div class="form-group">
                                <input type="date" class="form-control" v-model="userData.date">
                                <br>
                                <input type="number" class="form-control" v-model="userData.phone" placeholder="Teléfono" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Teléfono'">
                                <br>
							</div>
						</div>
						<div class="col-md-6">
                            <div class="form-group">
                                <input type="email" class="form-control" v-model="userData.email" placeholder="Correo" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Correo'">
                                <br>
                                <input type="password" class="form-control" v-model="userData.password" placeholder="Contraseña" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Contraseña'">
                                <br>
                            </div>
						</div>
						<div class="col-md-12">
							<button type="submit" class="primary-btn" v-on:click.prevent="createUser">Registrarme</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	<!--================Contact Area =================-->
</template>

<script>
import router from '@/router';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import avatarService from '@/services/avatarService';
import userService from '@/services/userService';

export default {
    data() {
        return {
            avatars: [],
            userData: {
                name: null,
                email: null,
                password: null,
                date: null,
                phone: null,
                isAdmin: false,
                avatarId: null
            }
        }
    },
    created(){
        avatarService.getImages().then(res => {
            this.avatars = res.data;
        })
    },
    methods: {
        createUser(){
            if(this.userData.avatarId && this.userData.date && this.userData.email && this.userData.name && this.userData.password && this.userData.phone){
                userService.createUser(this.userData).then(() => {
                    this.alertSuccess('Usuario creado correctamente');
                    this.clearAllData;
                    router.push({
				        name: 'login',
			        });
                });             
            }else {
                this.alertError('Falta algún campo por llenar')
            }
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
        alertSuccess(message) {
			createToast(message,
				{
					timeout: 3000,
					hideProgressBar: 'true',
					position: 'top-right',
					type: 'success',
					transition: 'bounce',
					showIcon: 'true',
				}
			);
		},
        clearAllData(){
            Object.assign(this.$data, this.$options.data());
        },
    }
}
</script>

<style>
img.avatars-gallery {
    width: 100px;
    transition-duration: 0.5s;
}

.avatar_selected {
    width: 140px !important;
    transition-duration: 0.5s;
}
.contact_form .primary-btn {
    background: #d65a31;
    color: #fff;
    margin-top: 20px;
    border: none;
    border-radius: 15px;
}
</style>