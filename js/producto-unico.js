let carrito =JSON.parse(localStorage.getItem("carrito"))|| [];

const contenedorProductos = document.querySelector("#productos");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

document.addEventListener('DOMContentLoaded', () => {
    const producto = JSON.parse(localStorage.getItem('productoSeleccionado'));

    if (!producto) {
        document.getElementById('producto-detalle').innerHTML = '<p>Producto no encontrado</p>';
        return;
    }

    const productoDetalle = document.getElementById('producto-detalle');
    productoDetalle.innerHTML = `
    <div class="producto-detalle-flex">
        <div class="producto-unico-container">
            <img class="ventaProductos" src="${producto.img}" alt="${producto.titulo}">
        </div>
        <div class="producto-info">
            <p class="tituloUnico">${producto.titulo}</p>
            <p class="price-unico">Precio: $${producto.precio}</p>
            <p class="talle-unico">${producto.talle}</p>
        </div>
    </div>
`;;
    const productoInfo = document.querySelector(".producto-info");
    let button = document.createElement("button");
    button.classList.add("botonCompra-unico");
    button.innerText = "Comprar";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });
    
    productoInfo.append(button);
});

const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.titulo === producto.titulo);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    actualizarCarrito();
    mostrarNotificacion(producto.titulo);
}

function actualizarCarrito(){
    carritoProductos.innerHTML = "";
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((producto) => {
        let div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
        <h3>${producto.titulo}</h3>
        <p><u class="precios-slice">$${producto.precio}</u></p>
        <p>${producto.cantidad}</p>
        `;

        let button = document.createElement("button");
        button.classList.add("boton-eliminar-carrito");
        button.innerText = "X";
        button.addEventListener("click", () =>{
            borrarDelcarrito(producto)
        })
        div.append(button);
        carritoProductos.append(div);
        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad; 
    })
    document.getElementById("carrito-total").innerText = `$${total.toFixed(2)}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const carritoCantidad = document.getElementById("carritoCantidad");
    if (cantidadTotal > 0) {
        carritoCantidad.textContent = cantidadTotal;
        document.getElementById("verCarrito").classList.add("show");
    } else {
        carritoCantidad.textContent = "";
        document.getElementById("verCarrito").classList.remove("show");
    }

    const vaciarCarritoButton = document.getElementById("vaciarCarrito");
    if (total > 0) {
        vaciarCarritoButton.style.display = "block";
    } else {
        vaciarCarritoButton.style.display = "none";
    }
}

document.getElementById("vaciarCarrito").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
    localStorage.removeItem("carrito");
});

actualizarCarrito();

function borrarDelcarrito(producto) {
    const index = carrito.findIndex(item => item.titulo === producto.titulo);
    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1; 
        } else {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
    }
}

document.getElementById('verCarrito').addEventListener('click', function() {
    document.getElementById('carritoSidebar').classList.add('open');
});

document.getElementById('cerrarCarrito').addEventListener('click', function() {
    document.getElementById('carritoSidebar').classList.remove('open');
});


const notificacionCarrito = document.createElement('div');
document.body.appendChild(notificacionCarrito);

const mostrarNotificacion = (tituloProducto) => {
    Swal.fire({
        position: "bottom-end",
        title: `${tituloProducto} Se agrego la prenda al carrito`,
        showConfirmButton: false,
        background: `#c8222c`,
        color: `white`,
        timer: 1500,
        backdrop:false,
        customClass: {
            popup: `custom-popup`
        }
    });
}

document.getElementById("confirmarPago").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire("No tienes nada en el carrito!");
    }else {
        let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
        Swal.fire({
            title: "Seguro que quieres confirmar la compra?",
            text: "Tu total es de $" + total.toFixed(2),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "NO",
            confirmButtonText: "SI"
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                title: "Muchas gracias por tu compra!",
                icon: "success"
            }).then(() => {
                carrito = []; 
                localStorage.removeItem("carrito"); localStorage
                actualizarCarrito(); 
            });
        }
        });
    }
});

