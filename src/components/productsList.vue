<template>
    <!-- single product -->
    <div :class="col" class="col-md-6 col-sm-6" v-for="product, $index in products" :key="$index">
        <div class="single-product">
            <span class="product-image-container">
                <router-link :to="'/producto/' + product._id"><img class="img-fluid-product" :src="product.gallery[0]" alt=""></router-link>
            </span>
            <div class="product-details">
                <h8 class="product-category">Categoría: {{ product.category.name }}</h8>
                <br>
                <router-link :to="'/producto/' + product._id"><h6>{{ product.name }}</h6></router-link>
                <div class="price">
                    <!-- <h6 v-for="image, $index in product.gallery" :key="$index">{{image[0]}}</h6> -->
                    <h6 class="product-price">${{ product.price }}</h6>
                    <br>
                    <h6 class="product-flavor">Cantidad: {{ product.available_items }}</h6>
                </div>
                <br>
                <br>
                <div>
                    <router-link :to="'/producto/' + product._id" class="social-info">
                        <!-- <span class="lnr lnr-move"></span>
                        <p class="hover-text">Ver Más</p> -->
                        <button class="primary-btn more-button">Ver Producto</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'Product',
        props: {
            column: Number,
            products: Array
        }, 
        computed: {
            col(){
                return {
                    'col-lg-4': this.column == 4, 
                    'col-lg-3': this.column == 3
                }
            }
        },
	}
</script>

<style scoped>
.img-fluid-product {
    max-width: 225px;
    height: 250px;
	}
	h6.product-price {
    color: #d65a31;
	}
	h6.product-flavor {
    color: #6f6f6f;
	}
	.single-product .product-details .prd-bottom .social-info span {
		background: #d65a31;
	}
    .gradient-bg, .primary-btn, .add-bag .add-btn, .single-product .product-details .prd-bottom .social-info span:after, .grid-btn:hover, .list-btn:hover, .grid-btn.active, .list-btn.active, .pagination a.active, .pagination a:hover, .s_Product_carousel .owl-dots div.active, .s_product_text .card_area .icon_btn:after, .product_description_area .nav.nav-tabs li a.active, .blog-pagination .page-item.active .page-link, .single-footer-widget .click-btn {
    background: linear-gradient(90deg, #212831 0%, #d65a31 100%);
    }
</style>