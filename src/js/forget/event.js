import '../common/polyfill.js';
import {fetchPost , fetchJson} from '../common/fetch.js';
import{ $,addClass,removeClass} from '../common/utils.js';
import findTpl from './findTpl.js';

export default async (opts) => {
  const findInfo = await fetchJson('/security-info',{});
  const $chooseMobile = $('choose-mobile');
  const $chooseEamil = $('choose-eamail');
  const $dialog = $('forget-dialog');

  const forget = async (type) => {
    const sendVerifyCode = await fetchPost('/send-forget-verifycode',{
      type:type
    });
    const $verifyInput = $('forget-verify-input');
    const $forgetBtn = $('forget-confirm-btn');
    const $number = $('forget-verify-number');
    const $close = $('forget-dialog-close');

    if(sendVerifyCode.code === 200) {
      $dialog.style.display = 'block';
      $verifyInput.oninput = () => {
        const MSGLENGTH = 6;
        let value = $verifyInput.value;
        $verifyInput.value = value.replace(/\D/g, '');
        if ($verifyInput.value.length > (MSGLENGTH - 1)) {
          $forgetBtn.removeAttribute('disabled');
          removeClass($mobileBtn, 'disabled');
          addClass($mobileBtn, 'btn-primary');
          if (value.length > MSGLENGTH) {
            $verifyInput.value = value.substring(0, MSGLENGTH);
          }
        } else {
          $forgetBtn.setAttribute('disabled');
          addClass($forgetBtn, 'disabled');
          removeClass($forgetBtn, 'btn-primary');
        }
      }

      $forgetBtn.onclick = async ()=>{
        let data = await fetchPost('/forget',{
          number: $number.innerText,
          verifyCode: $verifyInput.value,
        });
        if(data.code === 200 ){
          opts.success && opts.success();
        }else{ 
          alert('验证码输入错误');
        }
      }
    }else {
      alert('验证信息发送失败');
    }

    $close.onclick= () =>{
      $dialog.style.display = 'none';
      $verifyInput.value = '';
      $number.innerHTML = '';
    }
    
  }
  
  $chooseMobile.onclick= () =>{
    $dialog.innerHTML=findTpl('手机',findInfo.data.mobile);
    forget('mobile');
  }

  $chooseEamil.onclick= () =>{
    $dialog.innerHTML = findTpl('邮箱',findInfo.data.email);
    forget('email');
  }

}