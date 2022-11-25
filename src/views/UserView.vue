<template>
    <!-- Start Banner Area -->
    <section class="banner-area organic-breadcrumb">
        <div class="container">
            <div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                <div class="col-first">
                    <h1>Bienvenid@ {{personalData.name}}</h1>
                    <nav class="d-flex align-items-center">
                        <router-link to="/">Inicio<span class="lnr lnr-arrow-right"></span></router-link>
                        <router-link to="/productos">Tienda</router-link>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <!-- End Banner Area -->

    <!--================ User Info =================-->
    <section class="blog_area single-post-area section_gap">
        <div class="container">
            <div class="row">
                <!-- Historial de Compras -->
                <div class="col-lg-8 posts-list" v-if="estadoCompras">
                    <h1>Mi Historial de Compras</h1>
                    <br><br>
                    <div class="table-responsive" v-for="purchase, $index in purchases" :key="$index">
                        <h3>Mi Compra No. {{$index + 1}}</h3>
                        <table class="table">
                            <thead>
                                <tr class="alinear-arriba">
                                    <th scope="col">
                                        <h5 class="orange-color">Fecha: <span class="black-color">{{purchase.date}}</span></h5>
                                    </th>
                                    <th scope="col">
                                        <h5 class="orange-color">Total: <span class="black-color">${{purchase.total}}</span></h5>
                                        <h5 class="green-color">Descuento: <span class="black-color">${{purchase.discount}}</span></h5>
                                    </th>
                                    <th scope="col">
                                        <h5 class="orange-color">Enviado a: <span class="black-color">{{purchase.address}}</span></h5>
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-for="product, $index2 in purchase.products" :key="$index2">
                                <tr>
                                    <td>
                                        <div class="media">
                                            <div class="d-flex">
                                                <img class="product-listed" :src="product.idProduct.gallery[0]" alt="">
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="media-body">
                                            <br>
                                            <h5>{{product.idProduct.name}}</h5>
                                            <br>
                                            <h6><strong>Precio:</strong> ${{product.idProduct.price}}</h6>
                                            <h6><strong>Cantidad:</strong> {{product.quantity}}</h6>
                                        </div>
                                    </td>
                                    <td class="buy-container">
                                        <router-link :to="'/producto/' + product.idProduct._id"><button class="buy_again">Comprar de Nuevo</button></router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br><br>
                    </div>
                </div>
                <!-- Detalles de la Cuenta -->
                <div class="col-lg-8 posts-list" v-if="estadoDatos">
                    <h1>Datos Personales</h1>
                    <br><br>
                    <h3>Imagen de Perfil</h3>
                    <br>
                    <div class="row" >
                        <a class="col-md-3" href="" v-for="image, $index in images" :key="$index" v-on:click.prevent="updateAvatar(image.url)">
                            <img :class="{avatar_selected: personalData.avatarId == image.url}" class="avatars-gallery" :src="image.url" :alt="image._id">
                        </a>
                    </div>
                    <br>
                    <br>
                    <h3>Datos de la Cuenta</h3>
                    <form class="row contact_form" action="contact_process.php" method="post" id="contactForm">
                        <div class="col-md-12">
							<div class="form-group">
                                <p>Nombre Completo</p>
								<input type="text" class="form-control" v-model="personalData.name" placeholder="Nombre Completo" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombres Completo'">
                                <br>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
                                <p>Correo</p>
								<input type="email" class="form-control" v-model="personalData.email" placeholder="tucorreo@damac.com" onfocus="this.placeholder = ''" onblur="this.placeholder = 'tucorreo@damac.com'">
                                <br>
                                <p>Teléfono</p>
								<input type="number" class="form-control" v-model="personalData.phone" placeholder="461 130 4763" onfocus="this.placeholder = ''" onblur="this.placeholder = '461 130 4763'">
							</div>
						</div>
						<div class="col-md-6">
                            <div class="form-group">
                                <p>Fecha de Nacimiento</p>
                                <input type="date" class="form-control" v-model="personalData.date">
                                <br>
                                <p>Cambiar Contraseña</p>
                                <input type="password" class="form-control" v-model="password" placeholder="Nueva Contraseña" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nueva Contraseña'">
                                <br>
                                <p class="color-red">En caso de no querer cambiar su contraseña, no llene este campo.</p>
                                <a href="#" v-on:click.prevent="updateData()"><button class="primary-btn">Actualizar Datos</button></a>
							</div>
						</div>
					</form>
                </div>
                <!-- Metodos de Pago -->
                <div class="col-lg-8 posts-list" v-if="estadoTarjeta">
                    <h1>Mis Tarjetas Guardadas</h1>
                    <br>
                    <button type="submit" class="blue_btn" v-on:click.prevent="agregarTarjeta=true">Agregar Tarjeta</button>
                    <br><br>
                    <div class="row" v-if="agregarTarjeta">
                        <br>
                        <h3>Agregar Nueva Tarjeta</h3>
                        <br>
                        <form class="row contact_form">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <p>Número de Tarjeta</p>
                                    <input type="text" v-model="newCard.number" class="form-control" placeholder="1245454545" onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = '1245454545'">
                                    <br>
                                    <p>CVV</p>
                                    <input type="password" class="form-control" v-model="newCard.cvv" placeholder="XXX" onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = 'XXX'">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <p>Nombre en la Tarjeta</p>
                                    <input type="text" class="form-control" v-model="newCard.name" placeholder="Charlie Barber" onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = 'Charlie Barber'">
                                    <br>
                                    <p>Fecha de Expiración</p>
                                    <input type="text" class="form-control" v-model="newCard.expires_date" placeholder="12/25" onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = '12/25'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-12 align-mid">
                                <button class="primary-btn primary-color col-md-6" v-on:click.prevent="agregarTarjeta=false">Cancelar</button>
                                <button class="primary-btn second-color col-md-6" v-on:click.prevent="saveCard()">Guardar Tarjeta</button>
                            </div>
                        </form>
                        <br>
                        <br>
                        <hr>
                    </div>
                    <br><br>
                    <hr>
                    <div class="row" v-for="card, $index in cards" :key="$index">
                        <h3>Tarjeta No. {{$index + 1}}</h3>
                        <form class="row contact_form">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <p>Número de Tarjeta</p>
                                    <input type="text" v-model="card.number" class="form-control" ç>
                                    <br>
                                    <p>CVV</p>
                                    <input type="password" class="form-control" v-model="card.cvv" placeholder="XXX" onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = 'XXX'">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <p>Nombre en la Tarjeta</p>
                                    <input type="text" class="form-control" v-model="card.name" placeholder="Charlie Barber" onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = 'Charlie Barber'">
                                    <br>
                                    <p>Fecha de Expiración</p>
                                    <input type="text" class="form-control" v-model="card.expires_date" placeholder="12/25" onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = '12/25'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-12 align-mid">
                                <button class="primary-btn third-color col-md-6" v-on:click.prevent="updateCard($index)">Actualizar Datos</button>
                                <button class="primary-btn second-color col-md-6" v-on:click.prevent="deleteCard(card._id)">Eliminar Tarjeta</button>
                            </div>
                        </form>
                        <br>
                        <br>
                    </div>
                </div>
                <!-- Direcciones de Envio -->
                <div class="col-lg-8 posts-list" v-if="estadoDirecciones">
                    <br><br>
                    <h1>Mis Direcciones Guardadas</h1>
                    <br>
                    <button class="blue_btn" v-on:click="agregarDireccion=true">Agregar Dirección</button>
                    <br><br>
                    <div class="row" v-if="agregarDireccion">
                        <h3>Agregar Nueva Dirección</h3>
                        <br>
                        <br>
                        <form class="row contact_form">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <p>Alias de la Dirección</p>
                                    <input type="text" class="form-control" v-model="newAddress.alias" placeholder="Alias de la Dirección" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Alias de la Dirección'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <p>Estado</p>
                                    <input type="text" class="form-control" v-model="newAddress.state" placeholder="Estado" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Estado'">
                                    <br>
                                    <p>Ciudad</p>
                                    <input type="text" class="form-control" v-model="newAddress.city" placeholder="Ciudad" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ciudad'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <p>Colonia</p>
                                    <input type="text" class="form-control" v-model="newAddress.suburb" placeholder="Colonia" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Colonia'">
                                    <br>
                                    <p>Calle</p>
                                    <input type="text" class="form-control" v-model="newAddress.street" placeholder="Calle" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Calle'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <p>Número Exterior o Interior</p>
                                    <input type="text" class="form-control" v-model="newAddress.number" placeholder="Número Exterior / Interior" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Número Exterior / Interior'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <p>Código Postal</p>
                                    <input type="number" class="form-control" v-model="newAddress.cp" placeholder="Código Postal" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Código Postal'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <p>Teléfono</p>
                                    <input type="number" class="form-control" v-model="newAddress.phone" placeholder="Teléfono" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Teléfono'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-12 align-mid">
                                <button class="primary-btn primary-color col-md-6" v-on:click.prevent="agregarDireccion=false">Cancelar</button>
                                <button class="primary-btn second-color col-md-6" v-on:click.prevent="saveAddress()">Guardar Direccion</button>
                            </div>
                        </form>
                        <br>
                        <br>
                    </div>
                    <br>
                    <br>
                    <hr>
                    <div class="row" v-for="address, $index in addresses" :key="$index">
                        <h3>Dirección No. {{$index + 1}}</h3>
                        <br>
                        <form class="row contact_form">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <p>Alias de la Dirección</p>
                                    <input type="text" class="form-control" v-model="address.alias" placeholder="Alias de la Dirección" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Alias de la Dirección'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <p>Estado</p>
                                    <input type="text" class="form-control" v-model="address.state" placeholder="Estado" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Estado'">
                                    <br>
                                    <p>Ciudad</p>
                                    <input type="text" class="form-control" v-model="address.city" placeholder="Ciudad" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ciudad'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <p>Colonia</p>
                                    <input type="text" class="form-control" v-model="address.suburb" placeholder="Colonia" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Colonia'">
                                    <br>
                                    <p>Calle</p>
                                    <input type="text" class="form-control" v-model="address.street" placeholder="Calle" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Calle'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <p>Número Exterior o Interior</p>
                                    <input type="text" class="form-control" v-model="address.number" placeholder="Número Exterior / Interior" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Número Exterior / Interior'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <p>Código Postal</p>
                                    <input type="number" class="form-control" v-model="address.cp" placeholder="Código Postal" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Código Postal'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <p>Teléfono</p>
                                    <input type="number" class="form-control" v-model="address.phone" placeholder="Teléfono" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Teléfono'">
                                    <br>
                                </div>
                            </div>
                            <div class="col-md-12 align-mid">
                                <button class="primary-btn third-color col-md-6" v-on:click.prevent="updateAddress($index)">Actualizar Datos</button>
                                <button class="primary-btn second-color col-md-6" v-on:click.prevent="deleteAddress(address._id)">Eliminar Dirección</button>
                            </div>
                        </form>
                        <br>
                        <br>
                    </div>
                </div>
                <!-- Right Area - Perfil Info -->
                <div class="col-lg-4">
                    <div class="blog_right_sidebar">
                        <aside class="single_sidebar_widget author_widget">
                            <img class="author_img rounded-circle" :src="personalData.avatarId" alt="">
                            <h4>{{personalData.name}}</h4>
                            <div class="social_icon">
                                <a class="cerrar-sesion" href="#" v-on:click.prevent="cerrarSesion"><i class="fa fa-sign-out" aria-hidden="true"></i> Cerrar Sesión</a>
                            </div>
                        </aside>
                        <aside class="single_sidebar_widget popular_post_widget">
                            <h3 class="widget_title">Accesos Directos</h3>
                            <div class="media post_item">
                                <img class="user-ico-img" src="@/assets/img/user/purchases.jpg" alt="post">
                                <div class="media-body">
                                    <a href="#" v-on:click.prevent="mostrarCompras">
                                        <h3>Historial de Compras</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="media post_item">
                                <img class="user-ico-img" src="@/assets/img/user/info.jpg" alt="post">
                                <div class="media-body">
                                    <a href="" v-on:click.prevent="mostrarDatos">
                                        <h3>Datos de la Cuenta</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="media post_item">
                                <img class="user-ico-img" src="@/assets/img/user/payments.jpg" alt="post">
                                <div class="media-body">
                                    <a href="" v-on:click.prevent="mostrarPagos">
                                        <h3>Tarjetas Guardadas</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="media post_item">
                                <img class="user-ico-img" src="@/assets/img/user/shipping.jpg" alt="post">
                                <div class="media-body">
                                    <a href="" v-on:click.prevent="mostrarDirecciones">
                                        <h3>Mis Direcciones de Facturación</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="br"></div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--================Blog Area =================-->
</template>

<script>
import router from '@/router';
import VueJwtDecode from 'vue-jwt-decode'
import userService from '@/services/userService';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import avatarService from '@/services/avatarService';
import cardService from '@/services/cardService';
import addressService from '@/services/addressService';
import purchaseService from '@/services/purchaseService';

export default {
    data() {
        return {
            estadoCompras: null,
            estadoDatos: null,
            estadoTarjeta: null,
            estadoDirecciones: null,
            personalData: [],
            images: [],
            cards: [],
            password: null,
            agregarTarjeta: false,
            newCard: {
                number: null,
                name: null,
                cvv: null,
                expires_date: null
            },
            addresses: [],
            newAddress: {
                alias: null,
                state: null,
                cp: null,
                phone: null,
                number: null,
                city: null,
                street: null,
                suburb: null
            },
            agregarDireccion: false,
            purchases: []
        }
    },
    created() {
        if(window.localStorage.getItem('tkn')){
            this.estadoCompras = true;
            userService.getInfo(VueJwtDecode.decode(window.localStorage.getItem('tkn')).userId, window.localStorage.getItem('tkn')).then(res => {
            this.personalData = res.data;
            this.getPurchases();
        });
        }else{
            console.log("NO")
            router.push({
				name: 'login',
			});
            this.alertError('Primero logueate crack');
        }
    },
    methods: {
        mostrarCompras() {
            this.estadoCompras = true;
            this.estadoDatos = false;
            this.estadoTarjeta = false;
            this.estadoDirecciones = false;
        },
        mostrarDatos() {
            this.getAvatars();
            this.estadoCompras = false;
            this.estadoDatos = true;
            this.estadoTarjeta = false;
            this.estadoDirecciones = false;
        },
        mostrarPagos() {
            this.getCardsSaved();
            this.estadoCompras = false;
            this.estadoDatos = false;
            this.estadoTarjeta = true;
            this.estadoDirecciones = false;
        },
        mostrarDirecciones() {
            this.getAddresses();
            this.estadoCompras = false;
            this.estadoDatos = false;
            this.estadoTarjeta = false;
            this.estadoDirecciones = true;
        },
        cerrarSesion(){
            window.localStorage.removeItem('tkn');
            router.push({
				name: 'login',
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
        getAvatars(){
            avatarService.getImages().then(images => {
                this.images = images.data;
            })
        },
        updateAvatar(url){
            this.personalData.avatarId = url;
        },
        updateData(){
            if(this.password){
                this.personalData.password = this.password;
            }
            userService.updateInfo(this.personalData._id, this.personalData ,window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Datos Actualizados Correctamente');
            })
        },
        getCardsSaved(){
            cardService.getCards(this.personalData._id, window.localStorage.getItem('tkn')).then(res => {
                this.cards = res.data;
            });
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
        deleteCard(id){
            cardService.deleteCard(id, window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Tarjeta Eliminada Correctamente');
                this.getCardsSaved();
            })
        },
        saveCard(){
            this.newCard.ownerId = this.personalData._id;
            cardService.newCard(this.newCard, window.localStorage.getItem('tkn')).then(() => {
                this.getCardsSaved();
                this.alertSuccess('Tarjeta Agregada Correctamente');
                this.agregarTarjeta = false;
            })
        },
        updateCard(index){
            cardService.updateCard(this.cards[index]._id, this.cards[index], window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Tarjeta Actualizada Correctamente');
            });
        },
        getAddresses(){
            addressService.getAddresses(this.personalData._id, window.localStorage.getItem('tkn')).then(res => {
                this.addresses = res.data;
            });
        },
        deleteAddress(id){
            addressService.deleteAddress(id, window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Dirección Eliminada Correctamente');
                this.getAddresses();
            });
        },
        updateAddress(index){
            addressService.updateAddress(this.addresses[index]._id, this.addresses[index], window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Dirección Actualizada Correctamente');
            })
        },
        saveAddress(){
            this.newAddress.idUser = this.personalData._id;
            addressService.newAddress(this.newAddress, window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Dirección Agregada Correctamente');
                this.agregarDireccion = false;
                this.getAddresses();
            })
        },
        getPurchases(){
            purchaseService.getPurchases(this.personalData._id, window.localStorage.getItem('tkn')).then(res => {
                this.purchases = res.data;
            })
        }
    },
}
</script>

<style scoped>
h5.green-color {
    color: #23a823;
}
span.black-color {
    color: black;
}
h5.orange-color {
    color: #d65a31;
}
.table thead th {
    vertical-align: top;
    border-bottom: 2px solid #d65a31;
}
button.buy_again {
    background: linear-gradient(90deg, #212831 0%, #d75a31 100%);
    transition-duration: 0.3s;
    color: white;
    cursor: pointer;
    padding: 5px;
    padding-left: 20px;
    padding-right: 20px;
    border: none;
    border-radius: 15px;
}

button.buy_again:hover {

    transition-duration: 0.3s;
    color: white;
    padding: 7px;
    padding-left: 25px;
    padding-right: 25px;
    border: none;
    border-radius: 15px;
}
img.product-listed {
    width: 150px;
}
p.color-red {
    color: red;
}
img.avatars-gallery {
    width: 130px;
    transition-duration: 0.5s;
}

.avatar_selected {
    width: 170px !important;
    transition-duration: 0.5s;
}
img.user-ico-img {
    width: 50px;
}

.blog_right_sidebar .widget_title {
    font-size: 18px;
    line-height: 25px;
    background: #d75a31;
    text-align: center;
    color: #fff;
    padding: 8px 0px;
    margin-bottom: 30px;
}

.blog_right_sidebar .popular_post_widget .post_item .media-body h3:hover {
    color: #d75a31;
}

.blog_right_sidebar {
    background-color: #ffffff;
    border: 1px solid #00000042;
    padding: 30px;
    box-shadow: 2px 2px 10px 5px rgb(0 0 0 / 20%);
    border-radius: 20px;
}

.primary-btn {
    min-width: 180px;
    font-size: 12px;
}

td.buy-container {
    vertical-align: middle;
}

.gradient-bg,
.primary-btn,
.add-bag .add-btn,
.single-product .product-details .prd-bottom .social-info span:after,
.grid-btn:hover,
.list-btn:hover,
.grid-btn.active,
.list-btn.active,
.pagination a.active,
.pagination a:hover,
.s_Product_carousel .owl-dots div.active,
.s_product_text .card_area .icon_btn:after,
.product_description_area .nav.nav-tabs li a.active,
.blog-pagination .page-item.active .page-link,
.single-footer-widget .click-btn {
    background: linear-gradient(90deg, #94472e 0%, #d75b31 100%);
}
button.primary-btn.second-color.col-md-6 {
    background: linear-gradient(90deg, #630000 0%, #a20404 100%);
}

button.primary-btn.third-color.col-md-6 {
    background: linear-gradient(90deg, #db3700 0%, #d75b31 100%);
}

.contact_form .primary-btn {
    margin-right: 20px;
    width: 200px;
}

.col-md-12.align-mid {
    text-align: center;
}
.blue_btn {
    line-height: 38px;
    background: #212831;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    padding: 0px 40px;
    display: inline-block;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: 500;
}
.blue_btn:hover {
    line-height: 38px;
    background: #ffffff;
    border: 1px solid #212831;
    border-radius: 5px;
    padding: 0px 40px;
    display: inline-block;
    color: #212831;
    text-transform: uppercase;
    font-weight: 500;
    transition: 50ms;
}

a.cerrar-sesion {
    font-size: 15px !important;
    color: #d65a31 !important;
}

a.cerrar-sesion:hover {
    font-size: 13px !important;
    color: #212831 !important;
}

img.author_img.rounded-circle {
    width: 180px;
}
</style>