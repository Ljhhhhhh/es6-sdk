import '../common/polyfill.js';
import render from './render.js';
import event from './event.js';

const delivery = (opts = {}) => {
  var defaultOpts = {

  };
  var options = Object.assign(defaultOpts, opts);
  render(options).then(() => {
    event(options);
  });
}

export {
  delivery
}