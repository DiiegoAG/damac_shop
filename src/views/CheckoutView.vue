<template>
    <!-- Start Banner Area -->
    <section class="banner-area organic-breadcrumb">
        <div class="container">
            <div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                <div class="col-first">
                    <h1>Finalizar Compra</h1>
                    <nav class="d-flex align-items-center">
                        <a href="index.html">Home<span class="lnr lnr-arrow-right"></span></a>
                        <a href="single-product.html">Checkout</a>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <!-- End Banner Area -->

    <!--================Checkout Area =================-->
    <section class="checkout_area section_gap">
        <div class="container">
            <div class="billing_details">
                <div class="row">
                    <div class="col-lg-8">
                        <!-- Detalles Personales -->
                        <h2>Detalles del Receptor</h2>
                        <br>
                        <form class="row contact_form">
                            <div class="col-md-6 form-group p_star">
                                <input type="text" class="form-control" v-model="name" placeholder="Nombre Completo" onfocus="this.placeholder = ''"
                                    onblur="this.placeholder = 'Nombre Completo'">
                            </div>
                            <div class="col-md-6 form-group p_star">
                                <input type="text" class="form-control" placeholder="Compañía (Opcional)" onfocus="this.placeholder = ''"
                                    onblur="this.placeholder = 'Compañía (Opcional)'">
                            </div>
                            <div class="col-md-6 form-group p_star">
                                <input type="text" class="form-control" placeholder="Teléfono (Opcional)" onfocus="this.placeholder = ''"
                                    onblur="this.placeholder = 'Teléfono (Opcional)'">
                            </div>
                            <div class="col-md-6 form-group p_star">
                                <input type="text" class="form-control" placeholder="Correo de Facturacíon (Opcional)" onfocus="this.placeholder = ''"
                                    onblur="this.placeholder = 'Correo de Facturacíon (Opcional)'">
                            </div>
                        </form>
                        <br>
                        <!-- Detalles de Envio -->
                        <h2>Detalles de Envio</h2>
                        <br>
                        <form class="row contact_form" v-if="isLogged">
                            <div class="col-md-12 form-group p_star">
                                <h4>Selecciona Alguna Dirección Guardada.</h4>
                                <br>
                                <select class="form-control" v-model="addressSelected">
                                    <option value="">No seleccionar dirección guardada</option>
                                    <option v-for="address, $index in addresses" :key="$index" :value="address.street + ' #' + address.number + ', Col.' + address.suburb + ', cp.' + address.cp + ', ' + address.city + ', ' + address.state + '.'">{{address.alias}}</option>
                                </select>
                                <hr>
                            </div>
                            <br>
                        </form>
                        <form class="row contact_form" v-if="!addressSelected || newAddress.alias">
                            <div class="col-md-12">
                                <h4>Agregar Nueva Direccion</h4>
                                <br>
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
                            <div class="col-md-12 form-group">
                                <div class="creat_account">
                                    <span v-if="isLogged"><input type="checkbox" v-model="saveAddress"> ¿Guardar Dirección?</span>
                                </div>
                            </div>
                        </form>
                        <br>
                        <!-- Métodos de pago -->
                        <h2>Método de Pago</h2>
                        <br>
                        <form class="row contact_form" v-if="isLogged">
                            <div class="col-md-12 form-group p_star">
                                <h4>Selecciona Alguna Tarjeta Guardada.</h4>
                                <br>
                                <select class="form-control" v-model="cardSelected">
                                    <option :value="0">No seleccionar tarjeta guardada</option>
                                    <option v-for="card, $index in cards" :key="$index" :value="card.number">{{card.name + ' - ' + card.number}}</option>
                                </select>
                                <hr>
                            </div>
                            <br>
                        </form>
                        <form class="row contact_form" v-if="!cardSelected || newCard.name">
                            <div class="col-md-12 form-group p_star">
                                <h4>Agregar Nueva Tarjeta.</h4>
                                <br>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <p>Número de Tarjeta</p>
                                    <input type="number" v-model="newCard.number" class="form-control" placeholder="1245454545" onfocus="this.placeholder = ''"
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
                            <div class="col-md-12 form-group">
                                <div class="creat_account">
                                    <span v-if="isLogged"><input type="checkbox" v-model="saveCard"> ¿Guardar Tarjeta?</span>
                                </div>
                            </div>
                        </form>
                        <a class="primary-btn" v-on:click.prevent="newPurchase">Realizar Compra</a>
                    </div>
                    <div class="col-lg-4">
                        <div class="order_box">
                            <h2>Tu Orden</h2>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <h6>Producto</h6>
                                        </th>
                                        <th scope="col">
                                            <h6>Cantidad</h6>
                                        </th>
                                        <th scope="col">
                                            <h6>Total</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="product, $index in cart" :key="$index">
                                        <td>
                                            <p>{{product.name}}</p>
                                        </td>
                                        <td>
                                            <p>x{{product.quantityCar}}</p>
                                        </td>
                                        <td>
                                            <p>${{product.quantityCar * product.price}}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr>
                            <h6>Descuento: ${{discount}}</h6>
                            <br>
                            <h5>Total: ${{total}}</h5>
                            <br><br>
                            <div class="payment_item">
                                <p>En caso de devolución los gastos serán por parte del cliente, si fuese por algúna inconsistencia en el producto, 
                                    la tienda se hace responsable de los gastos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--================End Checkout Area =================-->
</template>

<script>
import router from '@/router';
import VueJwtDecode from 'vue-jwt-decode'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import addressService from '@/services/addressService';
import cardService from '@/services/cardService';
import purchaseService from '@/services/purchaseService';

export default {
    data() {
        return {
            cart: [],
            total: 0,
            discount: 0,
            addresses: [],
            cards: [],
            addressSelected: null,
            cardSelected: null,
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
            saveAddress: false,
            newCard: {
                number: null,
                name: null,
                cvv: null,
                expires_date: null
            },
            saveCard: false,
            name: null
        }
    },
    created() {
        this.getCart();
        this.getTotal();
        this.getDiscount();
        this.getData();
    },
    computed: {
        isLogged(){
            var ban = false;
            if (window.localStorage.getItem('tkn')) {
                ban = true;
            }

            return ban;
        },
        newAddressJoined(){
            //street lenght without data = 42 
            var street = this.newAddress.street + ' #' + this.newAddress.number + ', Col.' + this.newAddress.suburb + ', cp.' + this.newAddress.cp + ', ' + this.newAddress.city + ', ' + this.newAddress.state + '.';
            return street;
        }
    },
    methods: {
        getCart() {
            if (Object.keys(window.localStorage.getItem('cart')).length > 2) {
                this.cart = JSON.parse(window.localStorage.getItem('cart'));
            }
        },
        getTotal(){
            this.total = window.localStorage.getItem('total');
        },
        getDiscount(){
            this.discount = window.localStorage.getItem('discount');
        },
        getData(){
            if (window.localStorage.getItem('tkn')) {
                addressService.getAddresses(VueJwtDecode.decode(window.localStorage.getItem('tkn')).userId, window.localStorage.getItem('tkn')).then(res => {
                    this.addresses = res.data;
                });
                cardService.getCards(VueJwtDecode.decode(window.localStorage.getItem('tkn')).userId, window.localStorage.getItem('tkn')).then(res => {
                    this.cards = res.data;
                });
            }
        },
        selectAddress(street, number, suburb, cp, city, state){
            this.addressSelected = street + ' #' + number + ', Col.' + suburb + ', cp.' + cp + ', ' + city + ', ' + state + '.';
        },
        newPurchase(){
            if (this.addressSelected == "" || this.addressSelected === null){
                if(this.newAddressJoined.length > 42){
                    this.addressSelected = this.newAddressJoined;
                }
                else{
                    this.alertError('Falta ingresar una Dirección');
                }
            }
            if (this.cardSelected == 0 || this.cardSelected === null){
                if(this.newCard.number > 0){
                    this.cardSelected = this.newCard.number;
                }else{
                    this.alertError('Falta ingresar una Tarjeta');
                }
            }
            if (this.cardSelected > 0 && !this.addressSelected == "" && this.name) {
                const productsToSend = [];
                this.cart.forEach(pr => {
                    productsToSend.push({
                        idProduct: pr._id,
                        quantity: pr.quantityCar
                    })
                });
                if (window.localStorage.getItem('tkn')) {
                    const tiempoTranscurrido = new Date().toLocaleDateString('en-EU', { year: "numeric", month: "numeric", day: "numeric" });
                    purchaseService.newPurchase(VueJwtDecode.decode(window.localStorage.getItem('tkn')).userId, this.name, this.addressSelected, this.total, this.discount, tiempoTranscurrido, 'Card', productsToSend, this.cardSelected, window.localStorage.getItem('tkn')).then(res => {
                        this.alertSuccess('Compra Realizada Correctamente');
                        this.clearAllData();
                        router.push({
                            name: 'confirmacion',
                            params: { id: res.data._id }
                        });
                    });
                } else {
                    const tiempoTranscurrido = new Date().toLocaleDateString('es-MX', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
                    purchaseService.newPurchaseNameless(this.name, this.addressSelected, this.total, this.discount, tiempoTranscurrido, 'Card', productsToSend, this.cardSelected, window.localStorage.getItem('tkn')).then(res => {
                        this.alertSuccess('Compra Realizada Correctamente');
                        this.clearAllData();
                        router.push({
                            name: 'confirmacion',
                            params: { id: res.data._id }
                        });
                    });
                }
            } else{
                this.alertError('Falta ingresar Nombre del Receptor');
            }
        },
        clearAllData(){
            window.localStorage.removeItem('cart');
            window.localStorage.removeItem('discount');
            window.localStorage.removeItem('total');
            Object.assign(this.$data, this.$options.data());
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
    },
}
</script>

<style>
.primary-btn {
    background: #d65a31;
    color: #fff;
    margin-top: 20px;
    border: none;
    border-radius: 15px;
}
</style>