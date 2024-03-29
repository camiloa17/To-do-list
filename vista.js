class Vista {
    constructor(negocio) {
        this.negocio = negocio;

        //Evento de Click en el boton agregar un task
        $('#submitTask').on("click", () => {
            let textoInput = $('#newTask').val();
            this.submitItem(textoInput);
        });
        //Evento enter
        $('#newTask').keydown((tecla) => {
            if (tecla.originalEvent.key === 'Enter') {
                let textoInput = $('#newTask').val();
                this.submitItem(textoInput);
            };
        });

        $('document').ready(()=>{
            if(localStorage.getItem("arr")){
                this.negocio.sacarDatos();
                this.crearArrayList();
            }
        });
        
    }

    submitItem(item) {
        if (item != '') {
            this.negocio.crearItem(item);
            $('#newTask').val('');
            this.crearArrayList()
        }
    }
    crearArrayList() {
        let array = this.negocio.ordenarArray()
        let newArray = [] ;
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
        $('#listCompleted').remove()
        $('#listArea h2').remove()
        let heading1 = '<h2>Not Completed</h2>';
        let heading2 = '<h2>Completed</h2>';
        let ul = '<ul id ="listParent"></ul>';
        let ulCompleted = '<ul id ="listCompleted"></ul>';
        $('#listArea').append([heading1, ul, heading2, ulCompleted]);

        newArray.forEach(li => {
            if ($(li).attr("class") === "hecho") {
                $('#listCompleted').append(li);
            } else {
                $('#listParent').append(li);
            }
        });
    }


    eliminarElementoDom(event) {
        let elementoAEliminar = $(event.target.parentElement);
        elementoAEliminar.remove();
        this.negocio.eliminarItem(elementoAEliminar.attr('id'));
        this.crearArrayList();
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
        this.crearArrayList();

    }
}


