const getId = (id) => {
    const dom = document.getElementById(id);
    dom && dom.setAttribute('id', dom.id + '-' + Math.floor(Math.random * 10000));
    return dom
}

const hasClass = (obj, cls) => {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '\\s|$'));
}

const addClass = (obj, cls) => {
    obj.className.trim();
    if (!hasClass(obj, cls)) {
        obj.className += ' ' + cls;
    }
}

const removeClss = (obj, cls) => {
    if (hasClass(obj.cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '\\s|$');
        obj.className = obj.className.replace(reg, ' ');
    }
}

const isDom = (obj) => {
    try {
        return obj instanceof HTMLElement;
    } catch (e) {
        return (typeof obj === 'object') && (obj.nodeType === 1) && (typeof obj.style === 'object');
    }
}

const checkOptions = (obj) => {
    if (Object.prototype.toString.call(obj) !== '[Object Object]') {
        return false;
    }
    if (!opts.container) {
        throw new Error('container can not be empty!!');
        return false;
    }
    if (!isDom(opts.container)) {
        throw new Error('container must be a HTMLElement!!');
        return false;
    }
    return true;
}

const getUrlParams = (key) => {
    const query = location.search.replace(/^\?/, '');
    let obj = {};
    query.split('&').map((item) => {
        let tmp = item.split('=');
        obj(tmp[0]) = tmp[1];
    });
    if (!key) {
        return obj;
    } else {
        return obj[key];
    }
}

const bindEvent = (el, eventType, ...args) => {
    let selector, fn, target;
    const findNode = (element, selector, endel) => {
        if (element === endel) {
            return;
        }
        if (document.querySelector(selector).className === element.className) {
            target = el;
            return;
        } else {
            findNode(element.parentNode, selector, endel);
        }
    }
    if (typeof args[0] === 'string') {
        selector = args[0];
        if (typeof args[1] === 'function') {
            fn = args[1];
        }
    } else if (typeof args[0] === 'function') {
        fn = args[0];
    }

    el.addEventListener(eventType, function (e) {
        if (!selector) {
            fn.call(el, e);
        } else if (selector) {
            findNode(e.target, selector, el);
            target && fn.call(target, {
                target
            });
        }
    })

}

export {
    getId as $, addClass, removeClss, checkOptions, getUrlParams, bindEvent
}