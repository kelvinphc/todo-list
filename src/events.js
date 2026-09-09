const listeners = [];

function onChange(callback) {
    listeners.push(callback);
}

function notifyChange() {
    for (const callback of listeners) {
        callback();
    }
}

export { onChange, notifyChange };