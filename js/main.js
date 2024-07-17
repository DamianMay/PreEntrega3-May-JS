function Pedido() {
    let nombre = prompt("Por favor, ingresa tu nombre:");

    while (!nombre) {
        alert("Nombre inválido, por favor ingresa un nombre...");
        nombre = prompt("Por favor, ingresa tu nombre:");
    }

    let total = 0;

    let pedido = prompt(nombre + ", a continuación te vamos a mostrar lo que tenemos para ofrecerte por el momento:\n(Selecciona con el número de fila que quieres agregar a tu carrito)\n1. Pantalones $4999 \n2. Buzos $5999 \n3. Remeras $3459 \n4. Conjuntos $7899 \n5. Vestidos $9999\n6. Finalizar compra");

    while (pedido !== '6') {
        switch (pedido) {
            case '1':
                alert("Has agregado 1 Pantalon a tu carrito.");
                total += 4999;
                break;
            case '2':
                alert("Has agregado 1 Buzo a tu carrito.");
                total +=5999;
                break;
            case '3':
                alert("Has agregado 1 Remera a tu carrito.");
                total +=3459;
                break;
            case '4':
                alert("Has agregado 1 Conjunto a tu carrito.");
                total +=7899;
                break;
            case '5':
                alert("Has agregado 1 Vestido a tu carrito.");
                total +=9999;
                break;
            default:
                alert("Opción inválida. Por favor, selecciona una opción válida.");
                break;
        }

        pedido = prompt(nombre + ", ¿quieres sumar alguna otra prenda?\n(Selecciona con el número de fila que quieres agregar a tu carrito)\n1. Pantalones $4999 \n2. Buzos $5999 \n3. Remeras $3459 \n4. Conjuntos $7899 \n5. Vestidos $9999\n6. Finalizar compra");
    }
    let cuotas6 = (total /6).toFixed(2);
    let pago10dto = (total *0.9).toFixed(2);
    let pago30dto = (total *0.7).toFixed(2);
    let mensajeFinal = "Tu total a abonar es de: $" + total + ". Gracias por tu compra, " + nombre + "!";
    let metodoPagoValido = false;

    while(!metodoPagoValido){
        let pago = prompt("Tu total a abonar es de: $"+ total + " ¿Como vas a abonarlo?(Selecciona con el número de fila el medio de pago que quieras)\n1. Tarjeta de credito (6 pagos de $"+ cuotas6 +") \n2. Tarjeta de debito (10% dto. "+pago10dto+") \n3. Transferencia (30% dto. "+pago30dto+" )")
        switch (pago){
            case '1':
                alert("Has seleccionado pagar con tarjeta de crédito.");
                mensajeFinal = "Tu total a abonar es de: 6 pagos de $" + cuotas6 + ". Gracias por tu compra, " + nombre + "!";
                metodoPagoValido = true;
                break;
            case '2':
                alert("Has seleccionado pagar con tarjeta de débito");
                total = pago10dto;
                mensajeFinal = "Tu total a abonar es de: $" + total + " con tarjeta de débito (10% de descuento). Gracias por tu compra, " + nombre + "!";
                metodoPagoValido = true;
                break;
            case '3':
                alert("Has seleccioando pagar por transferencia");
                total = pago30dto;
                mensajeFinal = "Tu total a abonar es de: $" + total + " con transferencia (30% de descuento). Gracias por tu compra, " + nombre + "!";
                metodoPagoValido = true;
                break;
            default:
                alert("Opción de pago invalida. Por favor, seleciona una opcion válida.");
            break;
        }
    } 
    alert(mensajeFinal);
}
Pedido();
