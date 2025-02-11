const apiDolar = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
const tablaDolar = document.querySelector("#tablaDolar");
const fecha = new Date().toLocaleDateString();
function compra(valor) {
    if (valor == "No Cotiza") {
        return "---"
    }
    else if (valor.toString().length > 5) {
        return valor.toString().slice(0, 5);
    }
    else {
        return valor;
    }
}
function liqui(nombre) {
    if (nombre == "Dolar Contado con Liqui") {
        return "Contado con Liqui";
    }
    else {
        return nombre;
    }
}
function traerPreciosDolar() {
    fetch(apiDolar)
        .then((res) => res.json())
        .then((data) => {
            let dolarPrecio = data;
            let res = dolarPrecio.filter(precio =>
                precio.casa.nombre !== "Argentina" &&
                precio.casa.venta != 0 &&
                precio.casa.variacion)

            console.log(res.forEach(element => console.log(typeof(element.casa.variacion))));
            res.forEach(element =>

                tablaDolar.innerHTML += `
                <div class="col fw-bold p-0 m-1">
                    <div class="p-1 "> ${liqui(element.casa.nombre)}</div>
                    <div class="row fw-bold w-100 m-0" style="font-size:1rem">
                    <div class="col p-0">
                        Compra
                    </div>
                    <div class="col p-0">
                        Venta
                    </div>
                </div>
                <div class="row fw-bold  w-100 m-0">
                    <div class="col p-0">
                       $${compra(element.casa.compra)}
                    </div>
                    <div class="col p-0">
                       $${compra(element.casa.venta)}
                    </div>
                </div>
                <div style="font-size:15px" class=""> Variación ${element.casa.variacion}</div>
                <div style="font-size:10px" class="" > Actualización ${fecha}</div>
            </div>
                ` );
        })
}

window.onload = () => {
    traerPreciosDolar();
}