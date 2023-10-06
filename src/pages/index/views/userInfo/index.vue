<template>
  <div class="manage-content-container">
    <div class="user-collection-broad" @click="users.pagerTotal++">
      <div class="user-collection-container">
        <div class="option-title">用户列表</div>
        <div class="user-collection-form"
             @wheel="scrollAutoShow"
        >
          <table class="user-collection-origin">
            <thead>
            <tr class="user-info-attribute">
              <th
                  v-for="(user_attr, index) in users.userInfoAttribute"
                  :key="index"
              >{{ user_attr }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(user_info) in users.singlePageUserInfo"
                :key="user_info.uid"
            >
              <td v-for="(info_entry, index) in user_info"
                  :key="index"
              >
                <template v-if="!info_entry || info_entry === ''">
                  <div>{{ invalidInfoSubstitutes.substitutes.nullValueSubstitute }}</div>
                </template>
                <template v-else-if="index === invalidInfoSubstitutes.judgeConditions.logoffField">
                  <div v-if="info_entry === invalidInfoSubstitutes.judgeConditions.logoff">
                    {{ invalidInfoSubstitutes.substitutes.logoff }}
                  </div>
                  <div v-else>
                    {{ invalidInfoSubstitutes.substitutes.noLogoff }}
                  </div>
                </template>
                <template v-else-if="invalidInfoSubstitutes.judgeConditions.dateFields.includes(index)">
                  <div>{{ formatDate(info_entry) }}</div>
                </template>
                <template v-else>{{ info_entry }}</template>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <edit-tools :userCollectionsAmount="users.singlePageUserInfo.length"
                    :getOneUserInfo="getOneUserInfo"
                    :deleteUser="deleteUser"
        ></edit-tools>
      </div>
    </div>
    <pager ref="pager"
           :pagerTotal="pagerConfig.pagerTotal"
           :pageLimit="pagerConfig.pageLimit"
    ></pager>
    <transition name="fade" appear>
      <user-details :userInfoAttribute="users.userInfoAttribute"
                    :editingUserInfo="users.editingUserInfo"
                    :shutdownUserDetails="shutdownUserDetails"
                    :commitUserDetails="commitUserDetails"
                    v-show="userDetailVisible"
      ></user-details>
    </transition>
  </div>
</template>

<script>
import $ from 'jquery';
import tip from '@/assets/js/tips';
import {Timer} from "@/assets/js/utilsClass";
import UserDetails from "@/pages/index/views/userInfo/UserDetails";
import EditTools from "@/pages/index/views/userInfo/EditTools";
import pager from "@/pages/index/views/userInfo/Pager";

export default {
  name: "UserCollection",
  data() {
    return {
      formData: null,
      timer: new Timer(),
      userDetailVisible: false,
      invalidInfoSubstitutes: { // 无效信息替代者
        judgeConditions: {  // 判断条件
          dateFields: ['log_off_date', 'update_username_date', 'login_time', 'register_time'],  // 日期字段
          logoffField: 'log_off', // 注销列的键名
          logoff: '1',  // 1 为已注销
        },
        substitutes: {
          nullValueSubstitute: '暂无信息',
          logoff: '是',
          noLogoff: '否',
        }
      },
      users: {
        userInfoAttribute: ['UID', '用户ID', '用户名', '最近用过的用户名', '更新用户名日期', '最近登陆日期', '注册日期', '是否注销', '注销时间'],
        userInfoDatabaseField: [],
        userInfo: [],
        singlePageUserInfo: [],
        editingUserInfo: null,
      },
      pagerConfig: {
        pagerTotal: undefined,
        pageLimit: 10,
        pagerCurrentIndex: 1,
      }
    }
  },
  components: {
    UserDetails,
    EditTools,
    pager
  },
  computed: {
    clickedUserIndex() {
      return Number(this.$route.query['clickedUserIndex']);
    }
  },
  created() {
    this.initUsersInfos();
  },
  mounted() {
    // 修改单页展示行数
    this.$bus.$on('modifySinglePagerIndex', this.modifySinglePagerIndex);
  },
  methods: {
    // 修改当前页码
    modifySinglePagerIndex(pagerIndex) {
      if(pagerIndex && pagerIndex >= 1 && pagerIndex <= this.pagerConfig.pagerTotal) {
        this.pagerConfig.pagerCurrentIndex = pagerIndex;
        this.divideUserInfosToPage();
      }
    },
    shutdownUserDetails() {
      this.userDetailVisible = false;
    },
    // 按照编辑工具组件给定的 index 从用户信息数组中取出那一项
    getOneUserInfo(index) {
      let start = (this.pagerConfig.pagerCurrentIndex - 1) * this.pagerConfig.pageLimit + index - 1;
      this.users.editingUserInfo = this.users.userInfo[start];  // 注意这是引用赋值
      // 展示用户信息面板
      this.userDetailVisible = true;
    },
    // 删除用户（真的删除了）
    deleteUser(index) {
      if(confirm(tip.unrecoverable) && confirm(tip.unrecoverable) && confirm(tip.unrecoverable)) {
        let start = (this.pagerConfig.pagerCurrentIndex - 1) * this.pagerConfig.pageLimit + index - 1;
        let deleteUserInfo = this.users.userInfo[start];  // 注意这是引用赋值

        let params = {
          requestType: "",
          operation: "deleteUser",
          uid: deleteUserInfo['uid'],
          userId: deleteUserInfo['user_id']
        };
        // 发送请求将用户删除
        this.sendRequest(params, {}, (response) => {
          let tip, type, res = response.data;
          if(res === 'deleteUserSucceed') {
            // 为了页面响应式
            this.users.singlePageUserInfo.splice(index - 1, 1);
            // 删除原数组内容
            this.users.userInfo.splice(start, 1);
            tip = '删除用户成功！';
            type = 'finished';
          } else {
            tip = '删除用户失败！';
            type = 'fail';
          }
          this.$bus.$emit('addWarningTip', tip, type);
        })
      }
    },
    // 提交修改的用户信息
    commitUserDetails(inputValues) {
      this.shutdownUserDetails();
      let index = 0;
      let originalValue;
      let currentValue;
      let dataField = this.users.userInfoDatabaseField;
      let modify = false;

      this.formData = new FormData();
      // 遍历查找不同的内容
      for(let key in this.users.editingUserInfo) {
        originalValue = this.users.editingUserInfo[key];
        currentValue = inputValues[index];

        currentValue = currentValue ? currentValue : null;
        // 如果发生改变就添加字段
        if(originalValue !== currentValue) {
          modify = true;
          this.formData.append(dataField[index], currentValue);
        } else if(['user_id', 'uid'].includes(dataField[index])) {
          this.formData.append(dataField[index], originalValue);
        }
        index++;
      }
      // 根据是否修改进行处理
      if(modify) {
        let params = {
          requestType: "",
          operation: "updateUserInfos"
        };
        // 发送请求修改数据库的数据
        this.sendRequest(params, {}, (response) => {
          let tip, type, res = response.data;
          switch (res) {
            case 'updateUserInfoSucceed' : {
              // 修改原数组
              this.users.editingUserInfo[dataField[index]] = currentValue;
              tip = '用户信息修改成功！';
              type = 'finished';
              break;
            }
            case 'hasSameUsername': {
              tip = '已存在相同用户名！';
              type = 'fail';
              break;
            }
            case 'databaseException': {
              tip = '数据库抛出未知异常！！！';
              type = 'fail';
              break;
            }
            default: {
              tip = '用户信息修改失败！';
              type = 'fail';
            }
          }
          this.$bus.$emit('addWarningTip', tip, type);
        })
      } else {
        this.$bus.$emit('addWarningTip', '请修改除 UID 和 用户名 之外的至少一项！！！', 'warning');
      }
    },
    // 将用户信息按照行数分页
    divideUserInfosToPage() {
      let start = (this.pagerConfig.pagerCurrentIndex - 1) * this.pagerConfig.pageLimit;
      let end = this.pagerConfig.pagerCurrentIndex * this.pagerConfig.pageLimit;
      this.users.singlePageUserInfo = this.users.userInfo.slice(start, end); // 返回新的数组
    },
    // 初始化用户基本信息
    initUsersInfos() {
      let params = {
        requestType: "",
        operation: "getUserAllInfo"
      };

      this.sendRequest(params, {}, (response) => {
        let usersInfos = response.data;
        if (typeof usersInfos === 'object') {
          this.users.userInfo = usersInfos;
          this.pagerConfig.pagerTotal = usersInfos.length;
          // 分割用户信息
          this.divideUserInfosToPage();
          // 存储数据库字段
          for (let key in usersInfos[0]) {
            this.users.userInfoDatabaseField.push(key);
          }
        } else {
          this.$bus.$emit('addWarningTip', '用户信息获取失败', 'fail');
        }
      })
    },
    // 滚动式自动显示滚动条
    scrollAutoShow() {
      $('.user-collection-form').css('overflow-x', 'auto');
      this.timer.timeout(function () {
        $('.user-collection-form').css('overflow-x', 'hidden');
      }, 1500);
    },
    // 将日期格式化
    formatDate(date) {
      if (date && date !== '') {
        date = date.split(/[\s-:.]/);
        return date[0] + '年' + date[1] + '月' + date[2] + '日 ' + date[3] + ':' + date[4] + ':' + date[5];
      }
      return this.invalidInfoSubstitutes.substitutes.nullValueSubstitute;
    },
    // 发起请求, axios
    sendRequest(params, data, fn) {
      this.$bus.$emit('sendRequest', params, data, fn);
    }
  },
  watch: {
    'users.userinfo.length': {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.users.pagerTotal = this.users.userInfo.length;
        }
      }
    }
  },
  beforeDestroy() {
    $('.user-collection-origin tr').off();
    this.$bus.$off('clickCommitModify')
  }
}
</script>

<style scoped>

/*用户列表面板——主要作用是中间层，为了方便样式的书写*/
.user-collection-broad {
  display: flex;
  /*侧轴顶对齐*/
  align-items: self-start;
}

/*用户列表容器*/
.user-collection-container {
  display: flex;
  position: relative;
  width: 100%;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

/*表格区域*/
.user-collection-form {
  width: 100%;
  height: 100%;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  overflow-x: hidden;
}

/*表格元素*/
.user-collection-origin {
  position: relative;
  z-index: 1;
  border: 0;
  /*由于 cellspacing 属性被弃用*/
  border-spacing: 0;
  overflow: hidden;
}

/*单元格*/
tr td {
  min-width: 120px;
  height: 50px;
  /*不换行*/
  white-space: nowrap;
  text-align: center;
  padding: 10px;
}

/*表头*/
.user-info-attribute {
  height: 40px;
}

/*表头单元格*/
.user-info-attribute th {
  min-width: 120px;
  font-size: 18px;
  padding: 20px 10px;
  white-space: nowrap;
}

/*选项标题*/
.option-title {
  position: absolute;
  z-index: 1;
  top: -32px;
  left: 32px;
  padding: 7px 13px;
  font-size: 14px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: var(--box-shadow);
}

/*表格下方的滚动条*/
.user-collection-form::-webkit-scrollbar {
  height: 10px;
}

/*轨道*/
.user-collection-form::-webkit-scrollbar-track {
  border-radius: 10px;
}

/*滑块*/
.user-collection-form::-webkit-scrollbar-thumb {
  border-radius: 10px;
}
</style>