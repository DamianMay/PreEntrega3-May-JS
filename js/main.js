document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    mostrarProductos(productos);
});

const productos = [
    {
        "titulo": "Body beba mini",
        "precio": 5500 ,
        "talle": "Talle: 3,6,9,12 meses",
        "img": "./Imagenes/3801.webp",
        "genero": "femenino",
        "sku": 3801
    },
    {
        "titulo": "Conjunto beba mini",
        "precio": 5999 ,
        "talle": "Talle: 3,6,9,12 meses",
        "img": "./Imagenes/3805.webp",
        "genero": "femenino",
        "sku": 3805
    },
    {
        "titulo": "Remera de beba",
        "precio": 5650 ,
        "talle": "Talle: 12,18,24,36 meses",
        "img": "./Imagenes/3813.webp",
        "genero": "femenino",
        "sku": 3813
    },
    {
        "titulo": "Musuculosa de beba",
        "precio": 4999 ,
        "talle": "Talle: 12,18,24,36 meses",
        "img": "./Imagenes/3818.webp",
        "genero": "femenino",
        "sku": 3818
    },
    {
        "titulo": "Body bebe mini",
        "precio": 5650 ,
        "talle": "Talle: 3,6,9,12 meses",
        "img": "./Imagenes/3851.webp",
        "genero": "masculino",
        "sku": 3851
    },
    {
        "titulo": "Remera de bebe",
        "precio": 4900 ,
        "talle": "Talle: 12,18,24,36 meses",
        "img": "./Imagenes/3864.webp",
        "genero": "masculino",
        "sku": 3864
    },
    {
        "titulo": "Musculosa de bebe",
        "precio": 4999 ,
        "talle": "Talle: 12,18,24,36 meses",
        "img": "./Imagenes/3868.webp",
        "genero": "masculino",
        "sku": 3868
    },
    {
        "titulo": "Short de bebe",
        "precio": 4350 ,
        "talle": "Talle: 12,18,24,36 meses",
        "img": "./Imagenes/3871.webp",
        "genero": "masculino",
        "sku": 3871
    },
    {
        "titulo": "Remera de nena",
        "precio": 8900 ,
        "talle": "Talle: 6,8,10,12,14 años",
        "img": "./Imagenes/3901.webp",
        "genero": "femenino",
        "sku": 3901
    },
    {
        "titulo": "Musculosa con botones",
        "precio": 8900 ,
        "talle": "Talle: 4,6,8,10 años",
        "img": "./Imagenes/3911.webp",
        "genero": "femenino",
        "sku": 3911
    },
    {
        "titulo": "Musculosa de nena",
        "precio": 8499 ,
        "talle": "Talle: 4,6,8,10 años",
        "img": "./Imagenes/3914.webp",
        "genero": "femenino",
        "sku": 3914
    },
    {
        "titulo": "Vestido de nena",
        "precio": 8499 ,
        "talle": "Talle: 6,8,10,12 años",
        "img": "./Imagenes/3917.webp",
        "genero": "femenino",
        "sku": 3917
    },
    {
        "titulo": "Remera de niño",
        "precio": 11000 ,
        "talle": "Talle: 10,12,14 años",
        "img": "./Imagenes/3953.webp",
        "genero": "masculino",
        "sku": 3953
    },
    {
        "titulo": "Remera de niño",
        "precio": 9999,
        "talle": "Talle: 4,6,8,10 años",
        "img": "./Imagenes/3960.webp",
        "genero": "masculino",
        "sku": 3960
    },
    {
        "titulo": "Remera de niño",
        "precio": 11000 ,
        "talle": "Talle: 10,12,14,16 años",
        "img": "./Imagenes/3961.webp",
        "genero": "masculino",
        "sku": 3961
    },
    {
        "titulo": "Musculosa de niño",
        "precio": 10500 ,
        "talle": "Talle: 8,10,12,14 años",
        "img": "./Imagenes/3963.webp",
        "genero": "masculino",
        "sku": 3963
    }
]
let carrito =JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.querySelector("#productos");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

    
const mostrarProductos = (productos) => {
        productos.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("product");
            div.innerHTML = `
                <div class="productoIndex">
                    <img class="ventaProductos" src="${producto.img}">
                </div>
                <h2>${producto.titulo}</h2>
                <p class="price">$${producto.precio}</p>
                <p class="talle">${producto.talle}</p>
            `;
            let button = document.createElement("button");
            button.classList.add("botonCompra");
            button.innerText = "Comprar";
            button.addEventListener("click", () => {
                agregarAlCarrito(producto);
            });
            div.append(button);
            contenedorProductos.append(div);
        });
    };
const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.sku === producto.sku);
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
    const index = carrito.findIndex(item => item.sku === producto.sku);
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
        let total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
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

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const h1 = document.querySelector('h1');
    const h1Position = h1.getBoundingClientRect().top;

    if (h1Position <= header.offsetHeight) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
}});




