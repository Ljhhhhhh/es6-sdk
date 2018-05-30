import {
  fetchPost
} from '../common/fetch.js';
import {
  $,
  bindEvent
} from '../common/utils.js';
import {
  check
} from '../common/form-check.js';

export default (opts) => {
  const $saveBtn = $('#save-delivery-address');
  const $list = $('#delivery-address-list');
  const $form = $('#delivery-address-form');
  const tipMap = {
    'name': '收货人姓名',
    'region': '所在地信息',
    'detailAddress': '详细地址',
    'mobile': '手机号码'
  }

  $form.onsubmit = async (e) => {
    e.preventDefault();
    const checkResult = check($form);
    if (!checkResult.length) {
      let formValues = {};
      Array.from($form.elements).forEach(item => {
        if (item.name) {
          formValues[item.name] = item.value;
        }
      });
      let data = await fetchPost('/save-delivery', formValues);
      if (data.code === 200) {
        opts.success && opts.success();
      } else {
        alert('报存失败');
      }
    } else {
      const type = checkResult[0].type;
      const name = checkResult[0].name;
      if (type === 'present') {
        alert('请填写您的的' + tipMap[name]);
      } else {
        alert('请填写正确格式的' + tipMap[name]);
      }
    }
  }

  bindEvent($list, 'click', '.del-delivery-address', async (e) => {
    if (confirm('是否删除该地址？')) {
      let data = await fetchPost('/del-delivery', {
        addrId: e.target.getAttribute('data-id')
      });
      if (data.code === 200) {
        location.reload();
      } else {
        alert('收货地址删除失败');
      }
    }
  })
}