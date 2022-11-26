<template>
    <!-- Start Banner Area -->
	<section class="banner-area organic-breadcrumb">
		<div class="container">
			<div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
				<div class="col-first">
					<h1>Confirmación de Pedido</h1>
					<nav class="d-flex align-items-center">
						<router-link to="/">Inicio<span class="lnr lnr-arrow-right"></span></router-link>
                        <router-link to="/productos">Productos</router-link>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- End Banner Area -->

	<!--================Order Details Area =================-->
	<section class="order_details section_gap">
		<div class="container">
			<h3 class="title_confirmation">Gracias por tu compra!, Tu orden ha sido recibida 💪🏻.</h3>
			<div class="row order_d_inner">
				<div class="col-lg-6">
					<div class="details_item">
						<h4>Información de la Compra</h4>
						<ul class="list">
							<li><strong>ID de rastreo: </strong>{{purchaseInfo._id}}</li>
							<li><strong>Fecha de Compra: </strong>{{purchaseInfo.date}}</li>
							<li><strong>Total: </strong>${{purchaseInfo.total}}</li>
							<li><strong>Descuento: </strong>${{purchaseInfo.discount}}</li>
							<li><strong>Pagado con Tarjeta con Terminación: </strong>*******{{cardNumberHidden}}</li>
						</ul>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="details_item">
						<h4>Información de Envio</h4>
						<ul class="list">
							<li><strong>Nombre del Receptor: </strong>{{purchaseInfo.name}}</li>
							<li><strong>Dirección de Envio: </strong>{{purchaseInfo.address}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="order_details_table">
				<h2>Detalles del Pedido</h2>
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Producto</th>
								<th scope="col">Cantidad</th>
								<th scope="col">Total</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="product, index in purchaseInfo.products" :key="index">
								<td>
									<p>{{product.idProduct.name}}</p>
								</td>
								<td>
									<h5>x {{product.quantity}}</h5>
								</td>
								<td>
									<p>${{product.idProduct.price}}</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>
	<!--================End Order Details Area =================-->
</template>

<script>
import purchaseService from '@/services/purchaseService';

export default {
	data() {
		return {
			purchaseInfo: []
		}
	},
	computed: {
		cardNumberHidden(){
			var hidden = '';
			hidden = this.purchaseInfo.cardNumber?.toString();
			hidden = hidden?.slice(-4);
			return hidden;
		}
	},	
	created() {
		purchaseService.getOnePurchase(this.$route.params.id).then(res => {
			this.purchaseInfo = res.data;
		})
	},
}
</script>

<style scoped>
.order_details .title_confirmation {
    text-align: center;
    color: #d65a31;
    font-size: 30px;
    margin-bottom: 80px;
}
b, strong {
    font-weight: 600;
    color: #d65a31;
}
.order_d_inner .details_item .list li {
    margin-bottom: 8px;
    color: black;
    font-size: 15px;
}
</style>