<template>
    <!-- Start Banner Area -->
	<section class="banner-area organic-breadcrumb">
		<div class="container">
			<div class="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
				<div class="col-first">
					<h1>Contáctanos</h1>
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
			<div class="full-width">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.1780972436354!2d-100.81189750749078!3d20.539892714357812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x43466d991963afbe!2sDepartamento%20de%20Ingenier%C3%ADa%20en%20Sistemas%20Computacionales%20e%20Inform%C3%A1tica!5e0!3m2!1ses-419!2smx!4v1669682878777!5m2!1ses-419!2smx" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
			</div>
			<br>
			<div class="row">
				<div class="col-lg-3">
					<div class="contact_info">
						<div class="info_item">
							<i class="lnr lnr-home"></i>
							<h6>Celeaya, Guanajuato</h6>
							<p>Av. Ignacio Borunda 112, Fovissste, 38010 Celaya, Gto.</p>
						</div>
						<div class="info_item">
							<i class="lnr lnr-phone-handset"></i>
							<h6><a href="#">(461) 145 5878</a></h6>
							<p>Lunes a Viernes 7 AM a 9 PM</p>
						</div>
						<div class="info_item">
							<i class="lnr lnr-envelope"></i>
							<h6><a href="#">contacto@itcelaya.edu.mx</a></h6>
							<p>Contáctanos</p>
						</div>
					</div>
				</div>
				<div class="col-lg-9">
					<form class="row contact_form">
						<div class="col-md-6">
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Nombre" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre'">
							</div>
							<div class="form-group">
								<input type="email" class="form-control" placeholder="Correo" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Correo'">
							</div>
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Asunto" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Asunto'">
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<textarea class="form-control" rows="1" placeholder="Mensaje" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Mensaje'"></textarea>
							</div>
						</div>
						<div class="col-md-12 text-right">
							<button type="submit" class="primary-btn">Enviar Mensaje</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	<!--================Contact Area =================-->
</template>

<script>
    export default {
        name: 'contacto',
    }
</script>

<style scoped>
.contact_form .primary-btn {
    background: #d65a31;
    color: #fff;
    margin-top: 20px;
    border: none;
    border-radius: 0;
}
.contact_info .info_item i {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 20px;
    line-height: 24px;
    color: #d65a31;
    font-weight: 600;
}
</style>