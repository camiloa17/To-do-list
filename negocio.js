class Negocio {
    constructor(datos) {
        this.datos = datos;
    }

    crearItem(texto) {

        if (texto != '') {
            return this.datos.agregarTarea(texto);
        } else {
            console.log("no es valido")
        }
    }

    eliminarItem(id) {
        return this.datos.eliminarTarea(id);
    }

    actualizarItem(id, estado) {
        return this.datos.actualizarTarea(id, estado);
    }

    ordenarArray() {

        let items = this.datos.devolverArray();
        return items.sort(function (a, b) {
            if (a.hecho === b.hecho) {
                return 0;
            } else if (items.hecho === true) {
                return 1;
            } else if (items.hecho === false) {
                return -1;
            }
        });

    }

    sacarDatos(){
        this.datos.sacarDatosWeb()
    }
}

