import '../../common/polyfill.js';
import render from './render.js';
import event from './event.js';
import {checkOptions} from '../../common/utils.js';

const regPayment = (opts = {}) => {
  if (!checkOptions(opts)) {
    return;
  }
  var defaultOpts = {
    paymentPlaceholder: '请输入您的XX宝账号',
    paymentPasswordPlaceholder: '请输入您的XX宝密码'
  };
  var options = Object.assign(defaultOpts, opts);

  render(options);
  event(options);
}

export {regPayment}