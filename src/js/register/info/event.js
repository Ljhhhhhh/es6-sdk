import {
  fetchPost
} from '../../common/fetch.js';
import {
  $
} from '../../common/utils.js';
import {
  check
} from '../../common/form-check.js';

export default (opts = {}) => {
  const $form = $('register-info-form');
  const tipMap = {
    'nickName': '昵称',
    'email':'电子邮箱'
  }

  $form.onsubmit = async (e) => {
    e.preventDefault();
    let checkResults = check($form);
    let formValues = {};
    Array.from($form.elements).forEach((item) => {
      if (item.name) {
        formValues[item.name] = item.value;
      }
    });
    if (checkResults.length) {
      const name = checkResults[0].name;
      const type = checkResults[0].type;
      const message = checkResults[0].message;
      if(type='present'){
        alert(tipMap[name]+message);
      } else {
        alert(message);
      }
    } else {
      let data = await fetchPost('/register/info', formValues);
      if (data.code === 200) {
        opts.success && opts.success();
      } else {
        opts.error && opts.error(data);
      }
    }
  }
}