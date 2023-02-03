class ObjectMap {

    constructor(){
        this.index = 0
        this.stack = [];
    }

    /**
     * Map an object to an index
     * @param {*} object 
     * @returns 
     */
    map(object){
        this.index++;
        if (this.index === Number.MAX_VALUE) this.index = Number.MIN_VALUE;
        this.stack[this.index] = object;
        return this.index;
    }

    /**
     * Remove a mapped object
     * @param {*} index 
     * @returns 
     */
    unmap(index){
        let result = this.stack[index];
        delete this.stack[index];
        return result;
    }

}

export default ObjectMap;