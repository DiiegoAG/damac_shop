<template>
    <div>
        <!-- Start Banner Area -->
	<section class="banner-area organic-breadcrumb">
		<div class="container">
			<div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
				<div class="col-first">
					<h1>{{product.name}}</h1>
					<nav class="d-flex align-items-center">
						<router-link to="/productos">Inicio<span class="lnr lnr-arrow-right"></span></router-link>
						<router-link to="/productos">Productos</router-link>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- End Banner Area -->

	<!--================Single Product Area =================-->
	<div class="product_image_area">
		<div class="container">
			<div class="row s_product_inner">
				<div class="col-lg-6">
					<div class="s_Product_carousel">
						<div class="single-prd-item">
							<img class="img-fluid" :src="product.gallery[0]" alt="">
						</div>
					</div>
				</div>
				<div class="col-lg-5 offset-lg-1">
					<div class="s_product_text">
						<h3>{{product.name}}</h3>
						<h2>${{product.price}}</h2>
						<ul class="list">
							<li><a class="active txt-md" href="#"><span>Categoría:</span> {{product.category.name}}</a></li>
							<li><a class="active txt-md" href="#"><span>Disponible:</span> Si</a></li>
						</ul>
                        <br>
                        <br>
						<div class="product_count">
							<label for="qty">Cantidad:</label>
							<input v-model="quantity" type="number" name="qty" id="sst" maxlength="20" placeholder="1" title="Quantity:" class="input-text qty">
						</div>
						<div class="card_area d-flex align-items-center">
							<a class="primary-btn" v-on:click="agregarAlCarrito">Añadir al Carrito</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--================End Single Product Area =================-->

	<!--================Product Description Area =================-->
	<section class="product_description_area">
		<div class="container">
			<ul class="nav nav-tabs" id="myTab" role="tablist">
				<li class="nav-item">
					<a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact"
					 aria-selected="false">Comentarios</a>
				</li>
				<li class="nav-item">
					<a class="nav-link active" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review"
					 aria-selected="false">Descripción</a>
				</li>
			</ul>
			<div class="tab-content" id="myTabContent">
				<div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
					<div class="row">
						<div class="col-lg-6">
							<div class="comment_list">
								<div class="review_item">
									<div class="media">
										<div class="d-flex">
											<img src="@/assets/img/product/review-1.png" alt="">
										</div>
										<div class="media-body">
											<h4>Blake Ruiz</h4>
											<h5>12th Feb, 2018 at 05:56 pm</h5>
											<a class="reply_btn" href="#">Reply</a>
										</div>
									</div>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
										dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
										commodo</p>
								</div>
								<div class="review_item reply">
									<div class="media">
										<div class="d-flex">
											<img src="@/assets/img/product/review-2.png" alt="">
										</div>
										<div class="media-body">
											<h4>Blake Ruiz</h4>
											<h5>12th Feb, 2018 at 05:56 pm</h5>
											<a class="reply_btn" href="#">Reply</a>
										</div>
									</div>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
										dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
										commodo</p>
								</div>
								<div class="review_item">
									<div class="media">
										<div class="d-flex">
											<img src="@/assets/img/product/review-3.png" alt="">
										</div>
										<div class="media-body">
											<h4>Blake Ruiz</h4>
											<h5>12th Feb, 2018 at 05:56 pm</h5>
											<a class="reply_btn" href="#">Reply</a>
										</div>
									</div>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
										dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
										commodo</p>
								</div>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="review_box">
								<h4>Post a comment</h4>
								<form class="row contact_form" action="contact_process.php" method="post" id="contactForm">
									<div class="col-md-12">
										<div class="form-group">
											<input type="text" class="form-control" id="name" name="name" placeholder="Your Full name">
										</div>
									</div>
									<div class="col-md-12">
										<div class="form-group">
											<input type="email" class="form-control" id="email" name="email" placeholder="Email Address">
										</div>
									</div>
									<div class="col-md-12">
										<div class="form-group">
											<input type="text" class="form-control" id="number" name="number" placeholder="Phone Number">
										</div>
									</div>
									<div class="col-md-12">
										<div class="form-group">
											<textarea class="form-control" name="message" id="message" rows="1" placeholder="Message"></textarea>
										</div>
									</div>
									<div class="col-md-12 text-right">
										<button type="submit" value="submit" class="btn primary-btn">Submit Now</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane fade show active" id="review" role="tabpanel" aria-labelledby="review-tab">
                    <img class="img-description" src="@/assets/img/logo.png" alt="">
                    <br>
                    <p>{{product.description}}</p>
				</div>
			</div>
		</div>
	</section>
	<!--================End Product Description Area =================-->
    </div>
</template>

<script>
	import router from '@/router';
	import { createToast } from 'mosha-vue-toastify';
	import 'mosha-vue-toastify/dist/style.css'
    import productService from '@/services/productService';
    export default{
        data (){
            return {
                id: this.$route.params.id,
                product: [],
                quantity: 1,
				cart: new Map()
            }
        },
        created(){
      		productService.getOne(this.id).then(product => this.product = product.data[0]);
		 	if(window.localStorage.getItem('cart')){
				const productsCart = JSON.parse(window.localStorage.getItem('cart'));		
				const cart = new Map (productsCart.map(product => [product._id, product]));
				console.log(cart)
				this.cart = cart;
			}
			else{
				console.log('limpio');
			}
    	},
		methods: {
			agregarAlCarrito(){
				this.updateStorage();
			},
			updateStorage(){
				if (this.quantity > 0) {
					this.product.quantityCar = this.quantity;
					this.cart.set(this.product._id, this.product);
					window.localStorage.setItem('cart', JSON.stringify(this.cartList));
					this.alertSuccess('Producto Agregado al Carrito');
					this.cart.delete(this.product._id);
					router.push({
						name: 'productos',
					});
				}else if(this.quantity < 1){
					this.alertError('Selecciona una cantidad valida.');
				}else{
					this.alertError('Selecciona una cantidad.');
				}
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
		},
		computed: {
			cartList(){
          		return Array.from(this.cart.values())
        	}
		}
    }
</script>

<style scoped>
.primary-btn {
    background: #d65a31;
    color: #fff !important;
    margin-top: 20px;
    border: none;
    border-radius: 15px;
}
    .owl-carousel .owl-item img {
    display: block;
    width: 100%;
    -webkit-transform-style: preserve-3d;
    }
    .tab-content>.active {
    display: block;
    text-align: center;
    }
    img.img-description {
    width: 30%;
    }
    
    a.active.txt-md {
    font-size: 17px !important;
}

.product_count label {
    font-size: 17px;
    color: #595654;
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    padding-right: 10px;
}

.gradient-bg, .primary-btn, .add-bag .add-btn, .single-product .product-details .prd-bottom .social-info span:after, .grid-btn:hover, .list-btn:hover, .grid-btn.active, .list-btn.active, .pagination a.active, .pagination a:hover, .s_Product_carousel .owl-dots div.active, .s_product_text .card_area .icon_btn:after, .product_description_area .nav.nav-tabs li a.active, .blog-pagination .page-item.active .page-link, .single-footer-widget .click-btn {
    background: linear-gradient(90deg, #212831 0%, #d65a31 100%);
}

.gradient-color, .s_product_text h2, .s_product_text .list li a.active, .product_description_area .tab-content .total_rate .box_total h4, .single-footer-widget .bb-btn {
    background: linear-gradient(90deg, #d65a31 0%, #212831 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>