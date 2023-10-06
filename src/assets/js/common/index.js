/**
 * 功能描述：
 * 创建日期：2023 年 01 月 28 日
 */

// 使用严格模式
'use strict';

import axios from "axios";
import Constants from "@/assets/js/constants/universal";

// 发起请求, axios
export let sendRequest = function (headers = {}, params, data = {}, fn) {
    axios({
        url: Constants.URL + "dispatcherServlet",
        method: "post",
        headers,
        params,
        data,
    }).then(fn);
}
