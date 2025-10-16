import initialRender from "./initial-render.js";
import listener from "./listener.js";
import observer from "./observer.js";

class ToDo {
    init(){
        observer();
        initialRender();
        listener();
    }
}
export default ToDo;