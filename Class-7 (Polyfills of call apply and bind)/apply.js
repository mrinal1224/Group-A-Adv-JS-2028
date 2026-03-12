Function.prototype.myCall = function (context, ...args) {

    context = context || globalThis
    context.tempFn = this;
    const result = context.tempFn(...args);
     delete context.tempFn;
    return result;
};


// Try converting this calls polyfill to apply's polyfill