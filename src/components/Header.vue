<template>
    <header class="header_area sticky-header">
		<div class="main_menu">
			<nav class="navbar navbar-expand-lg navbar-light main_box">
				<div class="container">
					<!-- Brand and toggle get grouped for better mobile display -->
					<a class="navbar-brand logo_h" href="index.html"><img src="@/assets/img/logo.png" alt="" width="60%"></a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
					 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<!-- Collect the nav links, forms, and other content for toggling -->
					<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
						<ul class="nav navbar-nav menu_nav ml-auto">
							<li class="nav-item active"><router-link to="/">Inicio</router-link></li>
                            <li class="nav-item active"><router-link to="/sobre-nosotros">Sobre Nosotros</router-link></li>
							<li class="nav-item active"><router-link to="/productos">Productos</router-link></li>
							<li class="nav-item active"><router-link to="/contacto">Contacto</router-link></li>
                        </ul>
						<ul class="nav navbar-nav navbar-right">
							<li class="nav-item"><router-link to="/carrito"><span class="ti-shopping-cart"></span> Carrito</router-link></li>
							<li class="nav-item"><router-link to="/login"><span class="ti-user"></span> Mi Perfil</router-link></li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
		
	</header>
</template>

<style>
.header_area .navbar .nav.navbar-nav.navbar-right li span {
	line-height: 80px;
	font-size: 15px;
	font-weight: 500;
}
nav a {
    font-weight: bold;
    color: #222831;
}
nav a.router-link-exact-active {
    color: #d65a31;
}
</style>