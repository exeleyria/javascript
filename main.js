let producto = 0;
let cantidadProducto = 0;
let precio = 0;
let monto = 0;
let cuotas = 0;
let valorCuota = 0;
let interes = 0;


const productos = [{id:1, articulo:"Zapatillas", precio:5000, stock:150}, 
                {id:2, articulo:"Camisa", precio:1800, stock:100},
                {id:3, articulo:"Pantalón", precio:2000, stock:200},
                {id:4, articulo:"Campera", precio:7300, stock:50}];


                          
        
class Pedido {
    constructor(producto, precio, cantidad){
        this.producto = producto,
        this.precio = precio,
        this.cantidad = cantidad,
        this.envio = 0,
        this.subTotal = 0,
        this.total = 0
    }
    calcularSubTotal() {
        this.subTotal = this.precio * this.cantidad;
    }
    calcularIva() {
        return this.subTotal * 0.21;
    }
    calcularEnvio() {
        if(this.subTotal >= 5000) {
            this.envio = 0;
        } else {
            this.envio = 650;
        }
    }
    calcularTotal() {
        this.total = this.subTotal + this.envio + this.calcularIva();
    }
    actualizarStock() {
        productos.map(articulo => {
            if(articulo.articulo == this.producto) {
                articulo.stock = articulo.stock - this.cantidad;
            }
        });
    }
   
}


function pedidoProducto() {
    while(!producto || producto == 0 || producto > 4) {
        producto = parseInt(prompt("¿Qué producto desea comprar?:\n 1: Zapatillas ($5000)\n 2: Camisa ($1800)\n 3: Pantalón ($2000)\n 4: Campera ($7300)"));
    }
    switch(producto){
        case 1:
            producto = "Zapatillas";
            precio = 5000;
            break;
        case 2:
            producto = "Camisa";
            precio = 1800;
            break;
        case 3:
            producto = "Pantalón";
            precio = 2000;
            break;
        case 4:
            producto = "Campera";
            precio = 7300;
            break;
    }
    while(!cantidadProducto || cantidadProducto == 0){
        cantidadProducto = parseInt(prompt("Producto elegido: "+ producto + "\n Introduzca la cantidad deseada.(sólo números)"));
    }
    return new Pedido(producto, precio, cantidadProducto)
}


class Pago extends Pedido {
    constructor(cuotas, interes){
        super(),
        this.precio = precio,
        this.cantidad = cantidadProducto,    
        this.cuotas = cuotas,
        this.valorCuota = valorCuota,
        this.interes = interes,
        this.Final = 0,
        this.envio = 0,
        this.monto = 0
    }
    calcularMonto(){
        this.envio = pedido.envio;
        this.monto = pedido.total;
    }
     calcularCuota() {
        this.valorCuota = this.monto * this.interes / this.cuotas;
     }
     calcularMontoTotal() {
        this.Final = this.monto * this.interes;
     }
}

function pagar() {
    while(cuotas !== 3 && cuotas !== 6 && cuotas !== 1) {
        cuotas = parseInt(prompt("¿Como lo va a pagar?:\n 1 cuota (sin interes)\n 3 Cuotas (5% interes)\n 6 cuotas (10% interes)"));
    }
    switch(cuotas){
        case 1:
            cuotas = 1;
            interes = 1;
            break;
        case 3:
            cuotas = 3;
            interes = 1.05;
            break;
        case 6:
            cuotas = 6;
            interes = 1.1;
            break;
    }
    return new Pago(cuotas, interes)
}

alert("Bienvenida/o a la tienda");



const pedido = pedidoProducto();
pedido.calcularSubTotal();
pedido.calcularIva();
pedido.calcularEnvio();
pedido.calcularTotal();
pedido.actualizarStock();



alert("Detalle del pedido:\n\n"+
    "- " + pedido.producto + " x " + pedido.cantidad + ": $" + pedido.precio * pedido.cantidad +"\n" +
    "- IVA 21%: $" + pedido.calcularIva() + "\n" +
    "- Costo de envío: $" + pedido.envio + "\n\n" +
    "Total = $" + pedido.total
);

const pago = pagar();
pago.calcularMonto();
pago.calcularCuota();
pago.calcularMontoTotal();

console.log(pedido);
console.log(pago);
console.log(productos);    


alert("eligio pagar en "+ pago.cuotas + " cuotas.\nEl monto final a pagar es $ "+pago.Final+"\nEl valor de la cuota es de $"+ pago.valorCuota)

let padre = document.getElementById("productos");    

let borrar = document.getElementById("productos1");    
borrar.remove();


for (const producto of productos) {
    let li = document.createElement("li");
    li.innerHTML = producto.articulo + ": $" + producto.precio + " - Stock: " + producto.stock;
    padre.appendChild(li);
}


document.getElementById("titulo").innerHTML = "Su pedido es de $" + pago.Final;
document.getElementById("carrito").innerHTML = "Has comprado" +pedido.cantidad +" "+ pedido.producto;
