class Vista {
    constructor(negocio) {
        this.negocio = negocio;

        //Evento de Click en el boton agregar un task
        $('#submitTask').on("click", () => {
            let textoInput = $('#newTask').val();
            if (textoInput != '') {
                let item = this.negocio.crearItem(textoInput);
                $('#newTask').val('');
                this.agregarElementoDom(item);
            }
        });

    }

    agregarElementoDom(item) {
        let botton = $('<button>X</button>');
        //Pasa el scope y evento en el click en el boton de la x
        botton.on('click', (event) => {
            this.eliminarElementoDom(event);
        });
        //Pasa el scope y evento en el click en el input checkbox
        let checkbox = $('<input type="checkbox"></input>');
        checkbox.on('click', (event) => {
            this.actualizarElementoDom(event);
        });
        let itemTodo = $(`<span>${item.tarea}</span>`);
        let itemNuevo = $(`<li id="${item.id}"></li>`);
        itemNuevo.append([checkbox, itemTodo, botton]);
        $("#listParent").append(itemNuevo);
    }

    eliminarElementoDom(event) {
        let elementoAEliminar = $(event.target.parentElement);
        elementoAEliminar.remove();
        this.negocio.eliminarItem(elementoAEliminar.attr('id'));
    }

    actualizarElementoDom(checkbox) {
        let elementoAActualizar = $(checkbox.target.parentElement);
        let estado = checkbox.target.checked;
        if (estado == true) {
            elementoAActualizar.addClass('hecho');
        } else {
            elementoAActualizar.removeClass('hecho');
        }
        this.negocio.actualizarItem(elementoAActualizar.attr('id'), estado);
    }

}


