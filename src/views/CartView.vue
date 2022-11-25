<template>
    <!-- Start Banner Area -->
    <section class="banner-area organic-breadcrumb">
        <div class="container">
            <div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                <div class="col-first">
                    <h1>Carrito de Compras</h1>
                    <nav class="d-flex align-items-center">
                        <router-link to="/productos">Inicio<span class="lnr lnr-arrow-right"></span></router-link>
                        <router-link to="/productos">Productos</router-link>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <!-- End Banner Area -->

    <!--================Cart Area =================-->
    <section class="cart_area">
        <div class="container">
            <div class="cart_inner">
                <div class="table-responsive">
                    <table class="table">
                        <!-- Encabezados de la tabla -->
                        <thead v-if="allProducts.length > 0">
                            <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Total</th>
                                <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <thead v-else>
                            <tr>
                                <h1>No hay productos en el carrito</h1>
                                <br>
                                <br>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Listado de Productos -->
                            <tr v-for="product, $index in allProducts" :key="$index">
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img :src="product.gallery[0]" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>{{product.name}}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${{product.price}}</h5>
                                </td>
                                <td>
                                    <div class="product_count">
                                        <input type="text" name="qty" id="sst" maxlength="12" :value="product.quantityCar" title="Quantity:"
                                            class="input-text qty" disabled>
                                    </div>
                                </td>
                                <td>
                                    <h5>${{product.quantityCar * product.price}}</h5>
                                </td>
                                <td class="aling-mid">
                                    <a v-on:click.prevent="eliminarProducto(product._id)" href="#"><span class="ti-trash ico-trash"></span></a>
                                </td>
                            </tr>
                            <!-- Area del Cupón -->
                            <tr class="bottom_button">
                                <td>
                            
                                </td>
                                <td>
                            
                                </td>
                                <td>
                            
                                </td>
                                <td>
                                    <div class="cupon_text d-flex align-items-center" v-if="areProducts">
                                        <input type="text" placeholder="Código del Cupón" v-model="cupon">
                                        <a class="primary-btn" v-on:click.prevent="searchCupon" href="#">Aplicar Cupón</a>
                                    </div>
                                </td>
                            </tr>
                            <!-- Area de Total y Descuentos -->
                            <tr class="shipping_area">
                                <td>
                        
                                </td>
                                <td>
                        
                                </td>
                                <td>
                        
                                </td>
                                <td>
                                    <div class="shipping_box">
                                        <ul class="list">
                                            <li>
                                                <h5>Subtotal: ${{totalCart}}</h5>
                                            </li>
                                            <br>
                                            <li>
                                                <h5>Descuentos: ${{discount}}</h5>
                                            </li>
                                            <br>
                                            <li>
                                                <h4>Total: ${{total-discount}}</h4>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            <!-- Botones para Checkout -->
                            <tr class="out_button_area">
                                <td>
                        
                                </td>
                                <td>
                        
                                </td>
                                <td>
                        
                                </td>
                                <td>
                                    <div class="checkout_btn_inner d-flex align-items-center">
                                        <a class="gray_btn" href="#">Ir a Productos</a>
                                        <router-link to="/checkout" v-if="areProducts" class="primary-btn" v-on:click.prevent="updateTotal()">Proceder a Pagar</router-link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <!--================End Cart Area =================-->
</template>

<script>
import cuponService from '@/services/cuponService';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
export default {
    created() {
        this.loadCart();
    },
    mounted() {
        this.updateTotal();
    },
    data() {
        return {
            cart: new Map(),
            total: 0,
            cupon: null,
            percentaje: null,
            discount: 0,
            cupons: []
        }
    },
    computed: {
        cuponUppercased() {
            return this.cupon.toUpperCase();
        },
        allProducts() {
            return Array.from(this.cart.values());
        },
        totalCart() {
            this.allProducts.forEach(product => {
                this.total += (product.price * product.quantityCar);
            });
            return this.total;
        },
        totalDiscounted(){
            return this.total - this.discount;
        },
        areProducts(){
            var ban;
            if(this.allProducts.length > 0){
                ban = true;
            }
            else{
                ban = false;
            }
            return ban;
        },
    },
    methods: {
        loadCart() {
            if (window.localStorage.getItem('cart')) {
                const productsCart = JSON.parse(window.localStorage.getItem('cart'));
                //console.log(productsCart);
                const cart = new Map(productsCart.map(product => [product._id, product]));
                console.log(cart)
                this.cart = cart;
            }
            else {
                this.total = 0;
            }
        },
        eliminarProducto(id) {
            this.total = 0;
            this.cart.delete(id);
            this.updateStorage();
            this.loadCart();
            this.updateTotal();
        },
        updateStorage() {
            window.localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.values())));
        },
        updateTotal() {
            window.localStorage.setItem('total', this.totalDiscounted);
            window.localStorage.setItem('discount', this.discount);
        },
        searchCupon() {
            cuponService.getCupon(this.cuponUppercased).then(res => {
                this.percentaje = res.data[0].percentaje;
                console.log(this.percentaje);
                this.discount = (this.total * this.percentaje) / 100;
                console.log(this.discount);
                this.updateTotal();
                this.alertSuccess('Cupón Aplicado Correctamente');
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
    },
}
</script>

<style scoped>
h4.titulo-medio {
    text-align: center;
    text-transform: uppercase;
    font-size: 35px;
    color: #d65a31;
}
.gradient-bg, .primary-btn, .add-bag .add-btn, .single-product .product-details .prd-bottom .social-info span:after, .grid-btn:hover, .list-btn:hover, .grid-btn.active, .list-btn.active, .pagination a.active, .pagination a:hover, .s_Product_carousel .owl-dots div.active, .s_product_text .card_area .icon_btn:after, .product_description_area .nav.nav-tabs li a.active, .blog-pagination .page-item.active .page-link, .single-footer-widget .click-btn {
    background: linear-gradient(90deg, #212831 0%, #d65a31 100%);
}

.alineado-medio {
    text-align: center;
}

.row {
    width: 150em;
    max-width: 100%;
}

.cart_inner .table tbody tr.shipping_area .shipping_box .list li a:after {
    background: #d75c34;
}

.shipping_box {
    text-align: right;
}

.cart_inner .table tbody tr td .media .d-flex img {
    border: 1px solid #eeeeee;
    border-radius: 3px;
    max-width: 130px;
    height: 110px;
}

span.ti-trash.ico-trash {
    color: #d65a31;
    font-size: 40px;
}

td.aling-mid {
    text-align: center;
}

span.ti-trash.ico-trash:hover {
    color: #212831;
    font-size: 40px;
}

.cart_inner .table tbody tr.bottom_button td .cupon_text input {
    width: 300px;   
    border: 1px solid #dddddd;  
    color: #212831; 
    text-transform: uppercase;
}
.goCheckout{
    pointer-events: none;
}
</style>