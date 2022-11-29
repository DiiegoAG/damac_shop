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
                    <div v-if="purchases.length > 0">
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
                                            <router-link :to="'/producto/' + product.idProduct._id"><button class="buy_again">Comprar de
                                                    Nuevo</button></router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br><br>
                        </div>
                    </div>
                    <div v-else>
                        <h3>Por el momento no tienes compras registradas.</h3>
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
                    <div v-if="cards.length > 0">
                        <div class="row" v-for="card, $index in cards" :key="$index">
                            <h3>Tarjeta No. {{$index + 1}}</h3>
                            <form class="row contact_form">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <p>Número de Tarjeta</p>
                                        <input type="text" v-model="card.number" class="form-control" ç>
                                        <br>
                                        <p>CVV</p>
                                        <input type="password" class="form-control" v-model="card.cvv" placeholder="XXX"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'XXX'">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <p>Nombre en la Tarjeta</p>
                                        <input type="text" class="form-control" v-model="card.name" placeholder="Charlie Barber"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Charlie Barber'">
                                        <br>
                                        <p>Fecha de Expiración</p>
                                        <input type="text" class="form-control" v-model="card.expires_date" placeholder="12/25"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = '12/25'">
                                        <br>
                                    </div>
                                </div>
                                <div class="col-md-12 align-mid">
                                    <button class="primary-btn third-color col-md-6" v-on:click.prevent="updateCard($index)">Actualizar
                                        Datos</button>
                                    <button class="primary-btn second-color col-md-6" v-on:click.prevent="deleteCard(card._id)">Eliminar
                                        Tarjeta</button>
                                </div>
                            </form>
                            <br>
                            <br>
                        </div>
                    </div>
                    <div v-else>
                        <h3>Por el momento no tienes tarjetas registradas.</h3>
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
                    <div v-if="addresses.length > 0">
                        <div class="row" v-for="address, $index in addresses" :key="$index">
                            <h3>Dirección No. {{$index + 1}}</h3>
                            <br>
                            <form class="row contact_form">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <p>Alias de la Dirección</p>
                                        <input type="text" class="form-control" v-model="address.alias" placeholder="Alias de la Dirección"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Alias de la Dirección'">
                                        <br>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <p>Estado</p>
                                        <input type="text" class="form-control" v-model="address.state" placeholder="Estado"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Estado'">
                                        <br>
                                        <p>Ciudad</p>
                                        <input type="text" class="form-control" v-model="address.city" placeholder="Ciudad"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Ciudad'">
                                        <br>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <p>Colonia</p>
                                        <input type="text" class="form-control" v-model="address.suburb" placeholder="Colonia"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Colonia'">
                                        <br>
                                        <p>Calle</p>
                                        <input type="text" class="form-control" v-model="address.street" placeholder="Calle"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Calle'">
                                        <br>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <p>Número Exterior o Interior</p>
                                        <input type="text" class="form-control" v-model="address.number"
                                            placeholder="Número Exterior / Interior" onfocus="this.placeholder = ''"
                                            onblur="this.placeholder = 'Número Exterior / Interior'">
                                        <br>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <p>Código Postal</p>
                                        <input type="number" class="form-control" v-model="address.cp" placeholder="Código Postal"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Código Postal'">
                                        <br>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <p>Teléfono</p>
                                        <input type="number" class="form-control" v-model="address.phone" placeholder="Teléfono"
                                            onfocus="this.placeholder = ''" onblur="this.placeholder = 'Teléfono'">
                                        <br>
                                    </div>
                                </div>
                                <div class="col-md-12 align-mid">
                                    <button class="primary-btn third-color col-md-6" v-on:click.prevent="updateAddress($index)">Actualizar
                                        Datos</button>
                                    <button class="primary-btn second-color col-md-6"
                                        v-on:click.prevent="deleteAddress(address._id)">Eliminar Dirección</button>
                                </div>
                            </form>
                            <br>
                            <br>
                        </div>
                    </div>
                    <div v-else>
                        <h3>Por el momento no tienes tarjetas registradas.</h3>
                    </div>
                </div>
                <!-- Administración de Usuarios -->
                <div class="col-lg-8 posts-list" v-if="estadoUsuarios">
                    <br><br>
                    <h1>Buscar Usuario</h1>
                    <br>
                    <div class="row">
                        <div class="col-lg-12">
                            <input type="text" v-model="userToSearch" class="form-control" placeholder="Nombre del Usuario"
                                onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre del Usuario'">
                        </div>
                    </div>
                    <br>
                    <br>
                    <div v-for="user, index in userFiltered" :key="index">
                        <div class="row blog_right_sidebar middle">
                            <div class="col-lg-4 col-md-4 col-sm-12 midd">
                                <img class="avatars-user" :src="user.avatarId" alt="">
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-12">
                                <h3>{{user.name}}</h3>
                                <p>ID Usuario: {{user._id}}</p>
                                <p>Correo: {{user.email}}</p>
                                <p>Teléfono: {{user.phone}}</p>
                                <span v-if="personalData._id!=user._id"><input type="checkbox" v-model="user.isAdmin"
                                        v-on:click="patchUserToAdmin(user._id, user.isAdmin)"> ¿Administrador?</span>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 midd">
                                <button class="delete-user-btn" v-on:click.prevent="deleteUser(user._id)"><span class="ti-trash ico-trash">
                                        Eliminar Usuario</span></button>
                            </div>
                        </div>
                        <br>
                        <br>
                    </div>
                </div>
                <!-- Administración de Productos -->
                <div class="col-lg-8 posts-list" v-if="estadoProductos">
                    <br><br>
                    <h1>Administración de Productos</h1>
                    <br>
                    <button class="blue_btn" v-on:click="agregarProducto=true">Agregar Producto</button>
                    <br><br>
                    <!-- Nuevo producto form -->
                    <div v-if="agregarProducto">
                        <div class="row blog_right_sidebar middle">
                            <div class="col-lg-4 col-md-4 col-sm-12 midd-product-center">
                                <img class="avatars-user" :src="newProduct.gallery[0]" alt="">
                                <br>
                                <br>
                                <input type="text" class="form-control" v-model="newProduct.gallery[0]"
                                    placeholder="Primera imagen del producto" onfocus="this.placeholder = ''"
                                    onblur="this.placeholder = 'Primera imagen del producto'">
                                <br>
                                <br>
                                <input type="text" class="form-control" v-model="newProduct.gallery[1]"
                                    placeholder="Primera imagen del producto" onfocus="this.placeholder = ''"
                                    onblur="this.placeholder = 'Primera imagen del producto'">
                            </div>
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <label>Nombre</label>
                                <input type="text" class="form-control" v-model="newProduct.name" placeholder="Nombre del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre del producto'">
                                <br>
                                <label>Descripción</label>
                                <input type="text" class="form-control" v-model="newProduct.description"
                                    placeholder="Descripción del producto" onfocus="this.placeholder = ''"
                                    onblur="this.placeholder = 'Descripción del producto'">
                                <br>
                                <label>Precio</label>
                                <input type="number" class="form-control" v-model="newProduct.price" placeholder="Precio del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Precio del producto'">
                                <br>
                                <label>Categoría</label>
                                <select class="form-control" v-model="newProduct.category">
                                    <option v-for="category, $index in productsCategories" :key="$index" :value="category._id">
                                        {{category.name}}</option>
                                </select>
                                <a href="" v-on:click.prevent="agregarCategoria = true">Agregar Nueva Categoría</a>
                                <br>
                                <div v-if="agregarCategoria">
                                    <input type="text" class="form-control" v-model="newCategory" placeholder="Nombre de la Categoría"
                                        onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre de la Categoría'">
                                    <br>
                                    <button class="delete-user-btn full" v-on:click="createCategory()">Agregar Categoría</button>
                                    <br>
                                    <br>
                                    <button class="update-product-btn full" v-on:click="agregarCategoria=false">Cancelar</button>
                                    <br>
                                </div>
                                <label>Sabor</label>
                                <input type="text" class="form-control" v-model="newProduct.flavor" placeholder="Sabor del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Sabor del producto'">
                                <br>
                                <label>Medida (kg, lb, ml)</label>
                                <input type="text" class="form-control" v-model="newProduct.measure" placeholder="Medida del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Medida del producto'">
                                <br>
                                <label>Cantidad del contenido</label>
                                <input type="number" class="form-control" v-model="newProduct.quantity" placeholder="Cantidad del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Cantidad del producto'">
                                <br>
                                <label>Presentación del producto</label>
                                <input type="text" class="form-control" v-model="newProduct.filing" placeholder="Presentación del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Presentación del producto'">
                                <br>
                                <label>Marca</label>
                                <select class="form-control" v-model="newProduct.brand">
                                    <option v-for="brand, $index in productsBrands" :key="$index" :value="brand._id">{{brand.name}}
                                    </option>
                                </select>
                                <a href="" v-on:click.prevent="agregarMarca = true">Agregar Nueva Marca</a>
                                <br>
                                <div v-if="agregarMarca">
                                    <input type="text" class="form-control" v-model="newBrand" placeholder="Nombre de la Marca"
                                        onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre de la Marca'">
                                    <br>
                                    <button class="delete-user-btn full" v-on:click="createBrand()">Agregar Marca</button>
                                    <br>
                                    <br>
                                    <button class="update-product-btn full" v-on:click="agregarMarca=false">Cancelar</button>
                                    <br>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 midd-product">
                                <br>
                                <button class="delete-user-btn" v-on:click="createProduct()"> Agregar Producto</button>
                                        <br>
                                <button class="update-product-btn" v-on:click="agregarProducto=false"> Cancelar</button>
                            </div>
                        </div>
                    </div>
                    <br>
                    <br>
                    <h3>Buscar un Producto</h3>
                    <br>
                    <div class="row">
                        <div class="col-lg-12">
                            <input type="text" class="form-control" v-model="productToSearch" placeholder="Nombre del Producto"
                                onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre del Producto'">
                        </div>
                    </div>
                    <br>
                    <br>
                    <!-- Formulario de vista de productos -->
                    <div v-for="product, index in productFiltered" :key="index">
                        <div class="row blog_right_sidebar middle">
                            <div class="col-lg-4 col-md-4 col-sm-12 midd-product-center">
                                <img class="avatars-user" :src="product.gallery[0]" alt="">
                                <br>
                                <br>
                                <div v-for="photo, num in product.gallery" :key="num">
                                    <input type="text" class="form-control" v-model="product.gallery[num]"
                                        placeholder="Primera imagen del producto" onfocus="this.placeholder = ''"
                                        onblur="this.placeholder = 'Primera imagen del producto'">
                                    <br>
                                    <br>
                                </div>
                            </div>
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <label>Nombre</label>
                                <input type="text" class="form-control" v-model="product.name" placeholder="Nombre del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre del producto'">
                                <br>
                                <label>Descripción</label>
                                <input type="text" class="form-control" v-model="product.description"
                                    placeholder="Descripción del producto" onfocus="this.placeholder = ''"
                                    onblur="this.placeholder = 'Descripción del producto'">
                                <br>
                                <label>Precio</label>
                                <input type="text" class="form-control" v-model="product.price" placeholder="Precio del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Precio del producto'">
                                <br>
                                <label>Categoría</label>
                                <select class="form-control" v-model="product.category._id">
                                    <option v-for="category, $index in productsCategories" :key="$index" :value="category._id">
                                        {{category.name}}</option>
                                </select>
                                <br>
                                <label>Sabor</label>
                                <input type="text" class="form-control" v-model="product.flavor" placeholder="Sabor del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Sabor del producto'">
                                <br>
                                <label>Medida (kg, lb, ml)</label>
                                <input type="text" class="form-control" v-model="product.measure" placeholder="Medida del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Medida del producto'">
                                <br>
                                <label>Cantidad del contenido</label>
                                <input type="text" class="form-control" v-model="product.quantity" placeholder="Cantidad del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Cantidad del producto'">
                                <br>
                                <label>Presentación del producto</label>
                                <input type="text" class="form-control" v-model="product.filing" placeholder="Presentación del producto"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Presentación del producto'">
                                <br>
                                <label>Marca</label>
                                <select class="form-control" v-model="product.brand._id">
                                    <option v-for="brand, $index in productsBrands" :key="$index" :value="brand._id">{{brand.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 midd-product">
                                <br>
                                <button class="update-product-btn"><span class="fa fa-cart-arrow-down" v-on:click.prevent="updateProduct(product._id, 
                                                            product.name,
                                                            product.description, 
                                                            product.price, 
                                                            product.available_items, 
                                                            product.available, 
                                                            product.flavor, 
                                                            product.measure, 
                                                            product.quantity, 
                                                            product.filing, 
                                                            product.brand._id, 
                                                            product.category._id, 
                                                            product.gallery)"> Actualizar Producto</span></button>
                                <br>
                                <button class="delete-user-btn"><span class="ti-trash ico-trash"
                                        v-on:click="deleteProduct(product._id)"> Eliminar Producto</span></button>
                            </div>
                        </div>
                        <br>
                        <br>
                    </div>
                </div>
                <!-- Reportes -->
                <div class="col-lg-8 posts-list" v-show="estadoReportes">
                    <br><br>
                    <h1>Reportes</h1>
                    <br>
                    <Reports></Reports>
                </div>
                <!-- Cupones -->
                <div class="col-lg-8 posts-list" v-if="estadoCupones">
                    <br><br>
                    <h1>Administración de Productos</h1>
                    <br>
                    <button class="blue_btn" v-on:click="agregarCupon=true">Agregar Cupón</button>
                    <br><br>
                    <div class="row blog_right_sidebar middle" v-if="agregarCupon">
                        <div class="col-lg-4 col-md-4 col-sm-12 midd-product-center">
                            <img class="avatars-user" src="@/assets/img/user/cupon-ico.png" alt="">
                            <br>
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12">
                            <label>Nombre del Cupón</label>
                            <input type="text" class="form-control" v-model="newCupon.name" placeholder="Nombre del Cupón"
                                onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre del Cupón'">
                            <br>
                            <label>Porcentaje de Descuento</label>
                            <input type="num" class="form-control" v-model="newCupon.percentaje" placeholder="Porcentaje de Descuento"
                                onfocus="this.placeholder = ''" onblur="this.placeholder = 'Porcentaje de Descuento'">
                            <br>
                            <label>Fecha de Caducidad</label>
                            <input type="date" v-model="newCupon.expirate_date" class="form-control">
                            <br>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 midd-product">
                            <br>
                            <button class="delete-user-btn" v-on:click="createCupon()"> Agregar Cupón</button>
                            <br>
                            <button class="update-product-btn" v-on:click="agregarCupon=false"> Cancelar</button>
                        </div>
                    </div>
                    <br><br>
                    <h3>Buscar Cupón</h3>
                    <br>
                    <div class="row">
                        <div class="col-lg-12">
                            <input type="text" v-model="cuponToSearch" class="form-control" placeholder="Nombre del Cupón"
                                onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre del Cupón'">
                        </div>
                    </div>
                    <br>
                    <br>
                    <div v-for="cupon, index in cuponFiltered" :key="index">
                        <div class="row blog_right_sidebar middle">
                            <div class="col-lg-4 col-md-4 col-sm-12 midd-product-center">
                                <img class="avatars-user" src="@/assets/img/user/cupon-ico.png" alt="">
                                <br>
                            </div>
                            <div class="col-lg-8 col-md-8 col-sm-12">
                                <label>Nombre del Cupón</label>
                                <input type="text" class="form-control" v-model="cupon.name" placeholder="Nombre del Cupón"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nombre del Cupón'">
                                <br>
                                <label>Porcentaje de Descuento</label>
                                <input type="num" class="form-control" v-model="cupon.percentaje" placeholder="Porcentaje de Descuento"
                                    onfocus="this.placeholder = ''" onblur="this.placeholder = 'Porcentaje de Descuento'">
                                <br>
                                <label>Fecha de Caducidad</label>
                                <input type="date" v-model="cupon.expirate_date" class="form-control">
                                <br>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 midd-product">
                                <br>
                                <button class="delete-user-btn" v-on:click="updateCupon(cupon)"> Actualizar Cupón</button>
                                <br>
                                <button class="update-product-btn" v-on:click="deleteCupon(cupon._id)"> Eliminar Cupón</button>
                            </div>
                        </div>
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
                            <div class="media post_item" v-if="personalData.isAdmin">
                                <img class="user-ico-img" src="@/assets/img/user/users.png" alt="post">
                                <div class="media-body">
                                    <a href="" v-on:click.prevent="mostrarUsuarios">
                                        <h3>Administración de Usuarios</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="media post_item" v-if="personalData.isAdmin">
                                <img class="user-ico-img" src="@/assets/img/user/products.png" alt="post">
                                <div class="media-body">
                                    <a href="" v-on:click.prevent="mostrarProductos">
                                        <h3>Administración de Productos</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="media post_item" v-if="personalData.isAdmin">
                                <img class="user-ico-img" src="@/assets/img/user/cupons.png" alt="post">
                                <div class="media-body">
                                    <a href="" v-on:click.prevent="mostrarCupones">
                                        <h3>Administración de Cupones</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="media post_item" v-if="personalData.isAdmin">
                                <img class="user-ico-img" src="@/assets/img/user/reports.png" alt="post">
                                <div class="media-body">
                                    <a href="" v-on:click.prevent="mostrarReportes">
                                        <h3>Reportes de Ventas</h3>
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
import productService from '@/services/productService';
import categoryService from '@/services/categoryService';
import brandService from '@/services/brandService';
import cuponService from '@/services/cuponService';
import Reports from '@/components/reportCharts.vue'

export default {
    data() {
        return {
            estadoCompras: null,
            estadoDatos: null,
            estadoTarjeta: null,
            estadoDirecciones: null,
            estadoUsuarios: null,
            estadoProductos: null,
            estadoReportes: null,
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
            purchases: [],
            users: [],
            userToSearch: '',
            isAdmin: null,
            products: [],
            productToSearch: null,
            productsCategories: [],
            productsBrands: [],
            agregarProducto: null,
            newProduct: {
                name: null,
                description: null,
                price: null,
                available_items: 10,
                available: true,
                flavor: null,
                measure: null,
                quantity: null,
                filing: null,
                brand: null,
                category: null,
                gallery: []
            },
            agregarCategoria: null,
            newCategory: null,
            agregarMarca: null,
            newBrand: null,
            estadoCupones: null,
            newCupon: {
                name: null,
                percentaje: null,
                expirate_date: null
            },
            agregarCupon: null,
            cuponToSearch: '',
            cupons: [],
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
            router.push({
				name: 'login',
			});
            this.alertError('Primero logueate crack');
        }
    },
    components: {
        Reports,
    },
    computed: {
        userFiltered(){
                return this.users.filter(user => {
                    return user.name.includes(this.userToSearch);
                }); 
        },
        productFiltered(){
            var a = [];
            if(this.productToSearch == ''){
                a = [];
            }
            else{
                a = this.products.filter(product => {
                    return product.name.includes(this.productToSearch);
                }); 
            }
            return a;
        },
        cuponFiltered(){
            return this.cupons.filter(cupon => {
                    return cupon.name.includes(this.cuponToSearch);
            });
        },
    },
    methods: {
        mostrarCompras() {

            this.estadoCompras = true;
            this.estadoDatos = false;
            this.estadoTarjeta = false;
            this.estadoDirecciones = false;
            this.estadoProductos = false;
            this.estadoUsuarios = false;
            this.estadoReportes = false;
            this.estadoCupones = false;
        },
        mostrarDatos() {

            this.getAvatars();
            this.estadoCompras = false;
            this.estadoDatos = true;
            this.estadoTarjeta = false;
            this.estadoDirecciones = false;
            this.estadoProductos = false;
            this.estadoUsuarios = false;
            this.estadoReportes = false;
            this.estadoCupones = false;
        },
        mostrarPagos() {

            this.getCardsSaved();
            this.estadoCompras = false;
            this.estadoDatos = false;
            this.estadoTarjeta = true;
            this.estadoDirecciones = false;
            this.estadoProductos = false;
            this.estadoUsuarios = false;
            this.estadoReportes = false;
            this.estadoCupones = false;
        },
        mostrarDirecciones() {

            this.getAddresses();
            this.estadoCompras = false;
            this.estadoDatos = false;
            this.estadoTarjeta = false;
            this.estadoDirecciones = true;
            this.estadoProductos = false;
            this.estadoUsuarios = false;
            this.estadoReportes = false;
            this.estadoCupones = false;
        },
        mostrarProductos() {

            this.getProducts();
            this.estadoCompras = false;
            this.estadoDatos = false;
            this.estadoTarjeta = false;
            this.estadoDirecciones = false;
            this.estadoProductos = true;
            this.estadoUsuarios = false;
            this.estadoReportes = false;
            this.estadoCupones = false;
        },
        mostrarUsuarios() {

            this.getUsers();
            this.estadoCompras = false;
            this.estadoDatos = false;
            this.estadoTarjeta = false;
            this.estadoDirecciones = false;
            this.estadoProductos = false;
            this.estadoUsuarios = true;
            this.estadoReportes = false;
            this.estadoCupones = false;
        },
        mostrarReportes() {

            this.estadoCompras = false;
            this.estadoDatos = false;
            this.estadoTarjeta = false;
            this.estadoDirecciones = false;
            this.estadoProductos = false;
            this.estadoUsuarios = false;
            this.estadoReportes = true;
            this.estadoCupones = false;
        },
        mostrarCupones() {

            this.getCupons();
            this.estadoCompras = false;
            this.estadoDatos = false;
            this.estadoTarjeta = false;
            this.estadoDirecciones = false;
            this.estadoProductos = false;
            this.estadoUsuarios = false;
            this.estadoReportes = false;
            this.estadoCupones = true;
        },
        cerrarSesion(){
            window.localStorage.removeItem('tkn');
            if(window.localStorage.getItem('cart')){
                window.localStorage.removeItem('cart');
            }
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
        },
        getUsers(){
            userService.getAllUsers(window.localStorage.getItem('tkn')).then(res => {
                this.users = res.data;
            });
        },
        deleteUser(id){
            if (this.personalData._id == id){
                this.alertError('No te puedes borrar tu mismo gilipollas >:v');
            }
            else{
                userService.deleteUser(id, window.localStorage.getItem('tkn')).then(()=>{
                    this.alertSuccess('Usuario Eliminado correctamente');
                    this.users = [];
                    this.getUsers();
                })
            }
        },
        patchUserToAdmin(id, isAdmin){
            var a = null;
            if(isAdmin){
                a = false;
            }else{
                a = true;
            }
            userService.patchUserToAdmin(id, a, window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Rol Actualizado Correctamente');
            })
        },
        getProducts(){
            productService.get().then(res => {
                this.products = res.data;
            });
            categoryService.get().then(res => {
                this.productsCategories = res.data;
            });
            brandService.get().then(res => {
                this.productsBrands = res.data;
            })
        },
        updateProduct (id, name,description, price, available_items, available, flavor, measure, quantity, filing ,brand, category, gallery){
            productService.update(id,name,description, price, available_items, available, flavor, measure, quantity, filing ,brand, category, gallery,window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Producto Actualizado Correctamente');                
            })
        },
        deleteProduct(id){
            productService.delete(id, window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Producto Eliminado Correctamente');
                this.products = [];
                this.getProducts();
            })
        },
        createCategory(){
            categoryService.createCategory(this.newCategory, window.localStorage.getItem('tkn')).then(res => {
                this.newProduct.category = res.data._id;
                this.alertSuccess('Categoría Agregada Correctamente');
            })
        },
        createBrand(){
            brandService.createBrand(this.newBrand, window.localStorage.getItem('tkn')).then(res => {
                this.newProduct.brand = res.data._id;
                this.alertSuccess('Marca Agregada Correctamente');
            })
        },
        createProduct(){
            if(this.newProduct.available && this.newProduct.available_items && this.newProduct.brand 
            && this.newProduct.category && this.newProduct.description && this.newProduct.filing 
            && this.newProduct.flavor && this.newProduct.gallery && this.newProduct.measure 
            && this.newProduct.name && this.newProduct.price && this.newProduct.quantity){
                productService.createProduct(this.newProduct, window.localStorage.getItem('tkn')).then(() => {
                    this.alertSuccess('Producto Agregado Correctamente');
                    this.products = [];
                    this.getProducts();
                    this.agregarCategoria = null;
                    this.agregarMarca = null;
                    this.agregarProducto = null;
                    this.newProduct = {
                        name: null,
                        description: null,
                        price: null,
                        available_items: 10,
                        available: true,
                        flavor: null,
                        measure: null,
                        quantity: null,
                        filing: null,
                        brand: null,
                        category: null,
                        gallery: []
                    };
                })
            }else{
                this.alertError('Falta Algún Campo por Llenar');
            }
        },
        getCupons(){
            cuponService.get().then(res => {
                this.cupons = res.data;
            })
        },
        updateCupon(data){
            cuponService.updateCupon(data._id, data, window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Cupón Actualizado Correctamente');
            })
        },
        deleteCupon(id){
            cuponService.deleteCupon(id, window.localStorage.getItem('tkn')).then(() => {
                this.alertSuccess('Cupón Eliminado Correctamente');
                this.cupons = [];
                this.getCupons();
            })
        },
        createCupon(){
            if (this.newCupon.name && this.newCupon.expirate_date && this.newCupon.percentaje){
                cuponService.createCupon(this.newCupon, window.localStorage.getItem('tkn')).then(() => {
                    this.alertSuccess('Cupón Creado Correctamente');
                    this.cupons = [];
                    this.getCupons();
                    this.agregarCupon = false;
                    this.newCupon = {
                        name: null,
                        percentaje: null,
                        expirate_date: null
                    }
                })
            }else {
                this.alertError('Faltan Campos por Llenar');
            }
        },
        
    },
}
</script>

<style scoped>
.midd-product-center[data-v-4d74474a] {
    align-items: center;
    vertical-align: middle;
    text-align: center;
    display: flex;
}
.full {
    width: 100%;
}
.col-category {
    max-width: 45%;
    margin-right: 5px;
}
button.update-product-btn {
    color: white;
    background-color: #212831;
    border: none;
    border-radius: 15px;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
}
button.delete-user-btn {
    color: white;
    background-color: #d75a31;
    border: none;
    border-radius: 15px;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
}
img.avatars-user {
    width: 150px;
    transition-duration: 0.5s;
}
.row.blog_right_sidebar.middle {
    min-width: 50%;
}
.midd-product-center {
    align-items: center;
    vertical-align: middle;
    text-align: center;
}
.midd-product {
    align-items: center;
    vertical-align: middle;
    display: grid;
}
.midd {
    align-items: center;
    vertical-align: middle;
    display: flex;
}
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