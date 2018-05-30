import '../common/polyfill.js';
import render from './render';
import event from "./event.js";

const forget = (opts = {}) =>{
  const defaultOpts = {};
  const options = Object.assign(defaultOpts,opts);
  render(options);
  event(options);
}

export default forget;