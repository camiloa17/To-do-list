class Negocio {
    constructor(datos) {
        this.datos = datos;
    }

    crearItem(texto) {

        if (texto != '') {
            return this.datos.agregarTarea(texto);
        } else{
            console.log("no es valido")
        }
    }

    eliminarItem(id) {
        return this.datos.eliminarTarea(id);
    }

    actualizarItem(id, estado) {
        return this.datos.actualizarTarea(id, estado);
    }
}