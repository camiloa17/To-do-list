class Vista {
    constructor(negocio) {
        this.negocio = negocio;

        //Evento de Click en el boton agregar un task
        $('#submitTask').on("click", () => {
            let textoInput = $('#newTask').val();
            if (textoInput != '') {
                let item = this.negocio.crearItem(textoInput);
                $('#newTask').val('');
                this.crearArrayLis(item);
            }
        });
    }

    crearArrayLis(array) {
        let newArray = [];
        array.forEach(item => {
            let botton = $('<button>X</button>');
            //Pasa el scope y evento en el click en el boton de la x
            botton.on('click', (event) => {
                this.eliminarElementoDom(event);
            });
            //Pasa el scope y evento en el click en el input checkbox
            let checkbox;
            if (item.hecho === true) {
                checkbox = $('<input type="checkbox" checked></input>');
            } else if (item.hecho === false) {
                checkbox = $('<input type="checkbox"></input>');
            }
            checkbox.on('click', (event) => {
                this.actualizarElementoDom(event);
            });
            let itemTodo = $(`<span>${item.tarea}</span>`);
            let itemNuevo;
            if (item.hecho === true) {
                itemNuevo = $(`<li class="hecho" id="${item.id}"></li>`);
            } else {
                itemNuevo = $(`<li id="${item.id}"></li>`);
            }
            newArray.push(itemNuevo.append([checkbox, itemTodo, botton]));
        });

        this.agregarDom(newArray);

    }



    agregarDom(newArray) {
        $('#listParent').remove()
        let ul = '<ul id ="listParent"></ul>'
        $('#listArea').append(ul);
        newArray.forEach(li => {
            $('#listParent').append(li)
        })
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
        let array = this.negocio.actualizarItem(elementoAActualizar.attr('id'), estado);
        this.crearArrayLis(array);

    }
}


