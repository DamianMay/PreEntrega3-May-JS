function Pedido() {
    let nombre = prompt("Por favor, ingresa tu nombre:");

    while (!nombre) {
        alert("Nombre inválido, por favor ingresa un nombre...");
        nombre = prompt("Por favor, ingresa tu nombre:");
        
    }
    console.log("Nombre de usuario: " + nombre)

    let total$ = 0;
    const productos = [
        {titulo: "Pantalones", precio: 4999, cantidad: 0, subtotal:0 },
        {titulo: "Buzos", precio: 5999, cantidad: 0, subtotal:0 },
        {titulo: "Remeras", precio: 3459, cantidad: 0, subtotal:0 },
        {titulo: "Conjuntos", precio: 7899, cantidad: 0, subtotal:0 },
        {titulo: "Vestidos", precio: 9999, cantidad: 0, subtotal:0 },
    ];

    const mostrarCarrito = () => {
        let totalUnidades = productos.reduce((acc, prod) => acc + prod.cantidad, 0);
        let detalleCarrito = productos.map((prod, index) => `${index + 1}. ${prod.titulo}: ${prod.cantidad} / $${prod.subtotal}`).join("\n");
        return `Tienes un total de:\n${detalleCarrito}\n TOTAL: ${totalUnidades} Unidades, $${total$}`;
    };

    let pedido = prompt(`${nombre}, a continuación te vamos a mostrar lo que tenemos para ofrecerte por el momento:\n(Selecciona con el número de fila que quieres agregar a tu carrito)\n${productos.map((prod, index) => `${index + 1}. ${prod.titulo} $${prod.precio}`).join("\n")}\n6. Ver mi carrito\n7. Finalizar compra`);

    while (pedido !== '7') {
        let indiceProducto = parseInt(pedido) - 1;

        if (indiceProducto >= 0 && indiceProducto < productos.length) {
            let cantidad = parseInt(prompt(`¿Cuántos ${productos[indiceProducto].titulo} quieres agregar? (si queres quitar prendas simplemente agrega el signo - delante de la cantidad)`));

            if (!isNaN(cantidad)) {
                if (cantidad > 0) {
                    alert(`Has agregado ${cantidad} ${productos[indiceProducto].titulo} a tu carrito.`);
                    console.log(`Agregado: ${cantidad} ${productos[indiceProducto].titulo}`);
                    productos[indiceProducto].subtotal += productos[indiceProducto].precio * cantidad;
                    total$ += productos[indiceProducto].precio * cantidad;
                    productos[indiceProducto].cantidad += cantidad;
                    
                } else if (cantidad < 0 && productos[indiceProducto].cantidad >= Math.abs(cantidad)) {
                    alert(`Has quitado ${Math.abs(cantidad)} ${productos[indiceProducto].titulo} de tu carrito.`);
                    console.log(`Quitado: ${Math.abs(cantidad)} ${productos[indiceProducto].titulo}`);
                    productos[indiceProducto].subtotal -= productos[indiceProducto].precio * Math.abs(cantidad);
                    total$ -= productos[indiceProducto].precio * Math.abs(cantidad);
                    productos[indiceProducto].cantidad -= Math.abs(cantidad);
                } else {
                    alert(`No tienes esa cantidad de ${productos[indiceProducto].titulo} para quitar`);
                }
                console.log(mostrarCarrito());
            } else {
                alert("Por favor, ingresa un número válido.");
            }
        } else if (pedido === '6') {
            alert(mostrarCarrito());
        } else {
            alert("Opción inválida. Por favor, selecciona una opción válida.");
        }

        pedido = prompt(`${nombre}, ¿Queres sumar alguna otra prenda?\n(Selecciona con el número de fila que quieres agregar a tu carrito)\n${productos.map((prod, index) => `${index + 1}. ${prod.titulo} $${prod.precio}`).join("\n")}\n6. Ver mi carrito\n7. Finalizar compra`);
    }

    let totalUnidades = productos.reduce((acc, prod) => acc + prod.cantidad, 0);
    let cuotas6 = (total$ / 6).toFixed(2);
    let pago10dto = (total$ * 0.9).toFixed(2);
    let pago30dto = (total$ * 0.7).toFixed(2);
    let mensajeFinal = `Tu total a abonar es de: $${total$}. Gracias por tu compra, ${nombre}!`;
    let metodoPagoValido = false;

    while (!metodoPagoValido) {
        let pago = prompt(`Tu total por llevar ${totalUnidades} unidades, vas abonar: $${total$} ¿Como vas a abonarlo?(Selecciona con el número de fila el medio de pago que quieras)\n1. Tarjeta de credito (6 pagos de $${cuotas6}) \n2. Tarjeta de debito (10% dto. $${pago10dto}) \n3. Transferencia (30% dto. $${pago30dto})`);
        switch (pago) {
            case '1':
                alert("Has seleccionado pagar con tarjeta de crédito.");
                mensajeFinal = `Tu total a abonar es de: 6 pagos de $${cuotas6}. Gracias por tu compra, ${nombre}!`;
                metodoPagoValido = true;
                break;
            case '2':
                alert("Has seleccionado pagar con tarjeta de débito");
                total$ = pago10dto;
                mensajeFinal = `Tu total a abonar es de: $${total$} con tarjeta de débito (10% de descuento). Gracias por tu compra, ${nombre}!`;
                metodoPagoValido = true;
                break;
            case '3':
                alert("Has seleccioando pagar por transferencia");
                total$ = pago30dto;
                mensajeFinal = `Tu total a abonar es de: $${total$} con transferencia (30% de descuento). Gracias por tu compra, ${nombre}!`;
                metodoPagoValido = true;
                break;
            default:
                alert("Opción de pago invalida. Por favor, selecciona una opcion válida.");
                break;
        }
    }
    console.log(mensajeFinal);
    alert(mensajeFinal);
}

Pedido();
