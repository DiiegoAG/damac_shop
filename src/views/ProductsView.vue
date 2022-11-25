<template>
	<!-- Start Banner Area -->
	<section class="banner-area organic-breadcrumb">
		<div class="container">
			<div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
				<div class="col-first">
					<h1>Productos</h1>
					<nav class="d-flex align-items-center">
						<router-link to="/productos">Inicio<span class="lnr lnr-arrow-right"></span></router-link>
						<router-link to="/contacto">Contacto</router-link>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- End Banner Area -->
	<div class="container">
		<div class="row">
			<div class="col-xl-3 col-lg-4 col-md-5">
				<div class="sidebar-categories">
					<div class="head">Filtrar por Categoría</div>
					<ul class="main-categories">
						<li class="main-nav-list" v-for="category, $index in categories" :key="$index">
							<a v-on:click="filterByCategory(category._id)" class="category-item">{{ category.name }}</a>
						</li>
					</ul>
				</div>
				<br>
				<br>
				<div class="sidebar-categories">
					<div class="head">Filtrar por Marca</div>
					<ul class="main-categories">
						<li class="main-nav-list" v-for="brand, $index in brands" :key="$index">
							<a v-on:click="filterByBrand(brand._id)" class="category-item">{{brand.name}}</a>
						</li>
					</ul>
				</div>
				</div>
			<div class="col-xl-9 col-lg-8 col-md-7">
				<!-- Start Filter Bar -->
				<div class="filter-bar d-flex flex-wrap align-items-center">
					<div class="sorting">
						<h3>Productos</h3>
					</div>
				</div>
				<!-- End Filter Bar -->
				<!-- Start Best Seller -->
				<section class="lattest-product-area pb-40 category-list">
					<div class="row">
						<Product column=4 :products=products></Product>
					</div>
				</section>
				<!-- End Best Seller -->
			</div>
		</div>
	</div>
</template>

<script>
import productService from '@/services/productService';
import brandService from '@/services/brandService';
import categoryService from '@/services/categoryService';
import Product from '@/components/productsList.vue';
export default {
	name: 'productsView',
	components: {
		Product,
	},
	created() {
		categoryService.get().then(categories => this.categories = categories.data).then(console.table(this.categories));
		brandService.get().then(brands => this.brands = brands.data).then(console.table(this.brands));
		productService.get().then(products => this.products = products.data).then(console.table(this.products));
	},
	data() {
		return {
			categories: [],
			brands: [],
			products: []
		}
	},
	methods: {
            filterByCategory ($category){
				this.products = null;
                this.products = productService.getByCategory($category).then(products => this.products = products.data).then(console.table(this.products));
            },
			filterByBrand ($brand){
				this.products = null;
                this.products = productService.getByBrand($brand).then(products => this.products = products.data).then(console.table(this.products));
            }
        },
}
</script>

<style>
.filter-bar {
	padding: 10px 20px 10px 20px;
	background: #828bb3;
}

h3 {
	color: white;
}

.filter-bar {
	padding: 10px 20px 10px 20px;
	background: #d75a31;
}

.sidebar-categories .head {
	line-height: 60px;
	background: #222831;
	padding: 0 30px;
	font-size: 16px;
	font-weight: 400;
	color: #fff;
}

.sidebar-filter .top-filter-head {
	line-height: 60px;
	background: #222831;
	padding: 0 30px;
	font-size: 16px;
	font-weight: 400;
	color: #fff;
}

a.category-item {
	cursor: pointer;
}

.sidebar-categories .main-nav-list a:hover {
	color: #d75a31;
}
</style>