class Datos {
    constructor() {
        this.array = [];
        this.currentId = 0;
    }

    agregarTarea(tarea) {
        let item = new TodoItem(tarea, false, this.currentId++);
        this.array.push(item);
        return item;
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
            }
        }
    }
}