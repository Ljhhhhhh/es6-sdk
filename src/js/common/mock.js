import FetchMock from 'fetch-mock';
import regionData from './data/region-data.js';

FetchMock.mock('/login', (url, opts) => {
  const params = opts.params;
  if (params.account === '13216698987') {
    if (params.password === '123456') {
      return {
        code: 200,
        message: 'success'
      };
    } else {
      return {
        code: 401,
        message: '密码错误 '
      }
    }
  } else {
    return {
      code: 400,
      message: '用户名错误'
    }
  }
});

FetchMock.mock('/getMobileVerifyToken', (url, opts) => {
  return {
    code: 200,
    message: 'success',
    mobileVerifyToken: '123456'
  };
});

FetchMock.mock('/register/getVerifyCode', (url, opts) => {
  const params = opts.params;
  return {
    code: 200,
    message: 'success',
    mobile: params.mobile
  };
});

FetchMock.mock('/register/mobile', (url, opts) => {
  const params = opts.params;
  if (params.verifyCode === '123456') {
    return {
      code: 200,
      message: 'success',
      token: '123456789'
    };
  } else {
    return {
      code: 400,
      message: '验证码错误'
    };
  }
});

FetchMock.mock('/region-data', {
  code:200,
  message: 'success',
  data: regionData
});

FetchMock.mock('/register-info', {
  code: 200,
  message: 'success'
});

FetchMock.mock('/register/payment', {
  code: 200,
  message: 'success'
});

FetchMock.mock('/profile', {
  code: 200,
  message: 'success',
  data: {
    nicename: 'lujiehui',
    mobile: '13216698987',
    email: '13216698987@163.com',
    realname: '卢洁辉',
    sex: 1,
    birthday: '1996-06-15',
    regionCode: '9,73,723',
    regionString: '宁波市慈溪市'
  }
});

FetchMock.mock('/save-delivery', {
  code: 200,
  message: 'success'
});

FetchMock.mock('/del-delivery', {
  code: 200,
  message: 'success'
});

FetchMock.mock('/security-info', {
  code: 200,
  message: 'success',
  data: {
    nicename: 'lujiehui',
    mobile: '13216698987',
    email: '13216698987@163.com',
    password: 1,
    identity: 1,
    secretQuestion: 0
  }
});

FetchMock.mock('/forget', {
  code: 200,
  message: 'success'
});

FetchMock.mock('/send-forget-verifycode', {
  code: 200,
  message: 'success'
});