import ObjectMap from "./ObjectMap";

const objectMap = new ObjectMap();

function call(data){
    return new Promise((resolve, reject) => {
        window.ipc.send('command', {__id: objectMap.map({ resolve, reject }), ...JSON.parse(JSON.stringify(data))});
    })
}

window.ipc.on('command', (data) => {
    const promise = objectMap.unmap(data.__id);
    if (data.result) {
        promise.resolve(data.result)
    } else {
        promise.reject(data.error)
    }
});

export default {
    call
}