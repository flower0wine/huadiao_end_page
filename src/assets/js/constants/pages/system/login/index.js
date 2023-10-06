/**
 * path: login 登录页面, path 详见 index 目录
 */

'use strict';

const $ = require("jquery");

// freeze 方法使得对象属性不能被修改、扩展和删除
const CONSTANTS = Object.freeze({
    // 主题 css label
    THEME_CSS_LABEL: {
        LIGHT_CSS_LABEL: $(`<link rel="stylesheet" href="/login/theme/light.css">`),
        DARK_CSS_LABEL: $(`<link rel="stylesheet" href="/login/theme/dark.css">`)
    },
    // 浏览器本地存储用户名和密码, 记住账号
    REMEMBER_ACCOUNT: {
        ADMINISTRATOR_ACCOUNT: 'ADMINISTRATOR_ACCOUNT',
        ADMINISTRATOR_PASSWORD: 'ADMINISTRATOR_PASSWORD'
    }
});

module.exports = CONSTANTS;
