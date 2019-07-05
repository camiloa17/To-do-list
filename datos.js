class Datos {
    constructor() {
        this.array = [];
        this.currentId = 0;
        
    }

    agregarTarea(tarea) {
        let item = new TodoItem(tarea, false, this.currentId++);
        this.array.push(item);
        this.guardarDatosWeb();
        return item;
    }

    eliminarTarea(id) {
        let newArray = this.array.filter(element => element.id != id)
        this.array = newArray;
        this.guardarDatosWeb();
    }

    devolverArray(){
        return [...this.array];
    }

    actualizarTarea(id, estado) {
        for (let listItem of this.array) {
            if (listItem.id == id) {
                listItem.hecho = estado;
            }
        }
        
    }

    guardarDatosWeb(){
        localStorage.setItem ('arr', JSON.stringify(this.array));
    }

    sacarDatosWeb() {
        let array = JSON.parse(localStorage.getItem('arr'));
        let count=array.length;
        this.currentId=count;
        this.array = array ;
    }

}

