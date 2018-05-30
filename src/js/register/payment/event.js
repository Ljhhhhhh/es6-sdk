import {
  fetchPost
} from '../../common/fetch.js';
import {
  $
} from '../../common/utils.js';

export default (conf) => {
  const $form = $('register-payment-form');

  $form.onsubmit = async (e) => {
    e.preventDefault();
    let formValue = {};
    Array.from($form.elements).forEach((item) => {
      if (item.name) {
        formValue[item.name] = item.val;
      }
    })
    let data = await fetchPost('/register/payment', formValue);
    if(data.code === 200) {
      opts.success && opts.success();
    }else{
      
    }
  }
}