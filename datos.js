class Datos {
    constructor() {
        this.array = [];
        this.currentId = 0;
    }

    agregarTarea(tarea) {
        let item = new TodoItem(tarea, false, this.currentId++);
        this.array.push(item);
        this.ordenarArray();
        return this.array;
    }

    eliminarTarea(id) {
        let newArray = this.array.filter(element => element.id != id)
        this.array = newArray;
        return this.array;
    }

    actualizarTarea(id, estado) {
        for (let listItem of this.array) {
            if (listItem.id == id) {
                listItem.hecho = estado;
                this.ordenarArray();
                return this.array;
            }
        }
    }
    ordenarArray(){
        this.array = this.array.sort(function(a,b){
            if(a.hecho === b.hecho){
                return a = 0;
            }else if(a.hecho === true){
               return a = 1;
            }else if(a.hecho === false){
              return  a = -1;
            }
        });
        return this.array;
    }
}

