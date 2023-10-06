<template>
  <div class="decoration-container">
    <div class="decoration-collections">
      <img src="/img/trunk.png" class="decoration-trunk" alt="">
      <img src="/img/leaves.png" class="decoration-leaves" usemap="#leavesMap" alt="">
      <img src="/img/logo.png" class="decoration-logo" alt="">
      <!--时间指示器-->
      <div class="decoration-timer-container">
        <img src="/img/timer.png" class="decoration-timer" alt="">
        <div class="timer-clock-container">
          <transition name="push" appear tag="div" mode="out-in">
            <!--年月日-->
            <div class="year-month-day"
                 v-if="isMouseEnter.isMouseEnterTimer"
                 key="yearMonthDay"
            >
              <img v-for="(item, index) in realTime.yearMonthDay"
                   :src="`/img/${item}.png`"
                   :key="item + index"
                   alt=""
              >
            </div>
            <!--时分秒-->
            <div class="hour-minute-second"
                 v-if="!isMouseEnter.isMouseEnterTimer"
                 key="hourMinuteSecond"
            >
              <img v-for="(item, index) in realTime.hourMinuteSecond"
                   :src="`/img/${item}.png`"
                   :key="item + index"
                   alt=""
              >
            </div>
          </transition>
        </div>
      </div>
      <!--节日指示器-->
      <div class="decoration-love-container">
        <img src="/img/vine.png" class="decoration-vine" alt="">
        <img src="/img/love.png" class="decoration-love" alt="">
        <transition name="fade">
          <div class="love-festival-container" v-show="isDecorationsCompleted.isLoveRotateCompleted">
            <div class="today-festival-index"
                 v-show="!isMouseEnter.isMouseEnterLove"
            >
              <div class="today-festival-title">
                <div v-if="!festivalInfo.nextFestival">今天是：</div>
                <div v-if="festivalInfo.nextFestival">即将到来：</div>
              </div>
              <div class="festival-name">{{festivalInfo.festivalChineseName}}</div>
            </div>
            <div class="festival-description"
                 v-show="isMouseEnter.isMouseEnterLove"
            >
              <div class="festival-description-title">节日简介</div>
              <div class="festival-description-content">
                <div class="festival-description-row" v-if="festivalInfo.festivalMean">
                  <div class="festival-description-row-head">节日意义：</div>
                  <div class="festival-description-row-body">{{festivalInfo.festivalMean}}</div>
                </div>
                <div class="festival-description-row" v-if="festivalInfo.festivalOrigin">
                  <div class="festival-description-row-head">节日源自：</div>
                  <div class="festival-description-row-body">{{festivalInfo.festivalOrigin}}</div>
                </div>
                <div class="festival-description-row" v-if="festivalInfo.festivalActivity">
                  <div class="festival-description-row-head">节日活动：</div>
                  <div class="festival-description-row-body">{{festivalInfo.festivalActivity}}</div>
                </div>
                <div class="festival-description-row" v-else-if="festivalInfo.festivalDiet">
                  <div class="festival-description-row-head">节日活动：</div>
                  <div class="festival-description-row-body">{{festivalInfo.festivalDiet}}</div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <map name="leavesMap" id="leavesMap">
      <!--节日指示器藤条区域-->
      <area shape="rect" coords="578,248,621,558" id="area-decoration-love-vine" alt=""/>
      <!--节日指示器区域-->
      <area shape="rect" :coords="loveAreaCoords" id="area-decoration-love" alt="" :title="loveAreaTitle"/>
      <!--时间指示器区域-->
      <area shape="rect"
            coords="901,618,1081,708"
            id="area-decoration-timer"
            alt=""
            @mouseenter="isMouseEnter.isMouseEnterTimer = true"
            @mouseleave="isMouseEnter.isMouseEnterTimer = false"
      />
      <area shape="rect" coords="291,638,391,798" id="area-decoration-logo" alt=""/>
      <!--logo 藤条区域-->
      <area shape="rect" coords="321,568,351,638" id="area-decoration-logo-vine" alt=""/>
    </map>
  </div>
</template>

<script>
import $ from 'jquery';
import {Timer} from "@/assets/js/utilsClass";
import Constants from "@/assets/js/constants/universal";

export default {
  name: "LoginDecoration",
  data() {
    return {
      loveAreaCoords: '491,428,711,618',
      loveAreaTitle: '',
      // 节日信息
      festivalInfo: {
        festivalActivity: null,
        festivalChineseName: null,
        festivalDate: null,
        festivalEnglishName: null,
        festivalEstablishTime: null,
        festivalMean: null,
        festivalOrigin: null,
        festivalDiet: null,
        nextFestival: null,
      },
      // 装饰品动画是否完成
      isDecorationsCompleted: {
        isLogoCompleted: true,
        isTimerCompleted: true,
        isLoveCompleted: true,
        isLoveRotateCompleted: false,
      },
      // 实时时间
      realTime: {
        watchingField: ['year', 'month', 'day'],
        yearMonthDay: [],
        hourMinuteSecond: []
      },
      // 鼠标进入与否
      isMouseEnter: {
        isMouseEnterLove: false,
        isMouseEnterTimer: false,
      },
      // 计时器
      timer: {
        logoTimer: new Timer(),
        loveTimer: new Timer(),
        timerTimer: new Timer(),
        realTimeTimer: new Timer()
      },
      // DOM 元素, jquery 包装
      DOMElements: {
        decorationLeaves: null,
        decorationLogo: null,
        decorationTimer: null,
        decorationLove: null,
        decorationLoveContainer: null,
        areaDecorationLove: null,
        areaDecorationLoveVine: null,
        areaDecorationTimer: null,
        areaDecorationLogo: null,
        areaDecorationLogoVine: null,
        loveFestivalContainer: null,
      }
    }
  },
  beforeMount() {
    // 获取节日信息
    this.getAllFestivalInfo();
  },
  mounted() {
    // 初始化变量
    this.initialVariable();
    // 节日指示器的一次旋转
    this.decorationLoveRotate();
    // logo 和 timer 的动画
    this.logoAndTimerAnimation();
    // 实时时间
    this.showRealTime();
  },
  methods: {
    // 初始化变量
    initialVariable() {
      this.DOMElements.decorationLeaves = $('.decoration-leaves');
      this.DOMElements.decorationLogo = $('.decoration-logo');
      this.DOMElements.decorationTimer = $('.decoration-timer-container');
      this.DOMElements.decorationLove = $('.decoration-love');
      this.DOMElements.decorationLoveContainer = $('.decoration-love-container');
      this.DOMElements.areaDecorationLove = $('#area-decoration-love');
      this.DOMElements.areaDecorationLoveVine = $('#area-decoration-love-vine');
      this.DOMElements.areaDecorationTimer = $('#area-decoration-timer');
      this.DOMElements.areaDecorationLogo = $('#area-decoration-logo');
      this.DOMElements.areaDecorationLogoVine = $('#area-decoration-logo-vine');
      this.DOMElements.loveFestivalContainer = $('.love-festival-container');
    },
    // 获取节日信息
    getAllFestivalInfo() {
      let params = {
        requestType: "",
        operation: "getFestivalInfo"
      };
      this.$bus.$emit('sendRequest', params, {}, (response) => {
        this.festivalInfo = response.data;
      });
    },
    // 爱心的旋转带动其他组件抖动
    decorationLoveRotate() {
      let decorationLove = this.DOMElements.decorationLove;
      let decorationLoveContainer = this.DOMElements.decorationLoveContainer;
      let decorationLogo = this.DOMElements.decorationLogo;
      let decorationTimer = this.DOMElements.decorationTimer;
      let areaDecorationLove = this.DOMElements.areaDecorationLove;
      let loveFestivalContainer = this.DOMElements.loveFestivalContainer;

      // 鼠标移入节日指示器框, 添加动画
      areaDecorationLove.one('mouseenter', () => {
        // 改变树叶 img 热区 love 区域的位置
        this.loveAreaCoords = '491,548,711,758';
        // 添加动画类名
        decorationLove.addClass('decoration-love-rotate');
        decorationTimer.addClass('decoration-timer-shake animation-delay-300ms');
        decorationLogo.addClass('decoration-logo-shake animation-delay-400ms');
      });
      // 鼠标移出触发一次
      areaDecorationLove.one('mouseleave', () => {
        this.timer.loveTimer.timeout(() => {
          // love 旋转记为完成
          this.isDecorationsCompleted.isLoveRotateCompleted = true;
          this.loveAreaTitle = '点击了解圣诞节';

          // 动画结束删除动画类名
          decorationLove.removeClass('decoration-love-rotate').css('transform', 'rotate(0deg)');
          decorationTimer.removeClass('decoration-timer-shake animation-delay-300ms');
          decorationLogo.removeClass('decoration-logo-shake animation-delay-400ms');

          // 节日指示器旋转后给 节日指示器容器 添加抖动动画
          this.decorationsAnimation(decorationLoveContainer, 'love', 'Love', 1000, 'LoveVine');
          this.decorationsAnimation(decorationLoveContainer, 'love', 'Love', 1000, undefined, () => {
            this.isMouseEnter.isMouseEnterLove = true;
            loveFestivalContainer.addClass('rotate-transition');
          }, () => {
            this.isMouseEnter.isMouseEnterLove = false;
            loveFestivalContainer.removeClass('rotate-transition');
          });

          // 给 love 区域添加点击事件, 点击后跳转节日的百度百科, 打开新标签页
          areaDecorationLove.on('click', () => {
            window.open('https://baike.baidu.com/item/' + '圣诞节', '_blank');
          });
        }, 1300);
      });
    },
    // logo 和 Timer 的动画
    logoAndTimerAnimation() {
      let decorationLogo = this.DOMElements.decorationLogo;
      let decorationTimer = this.DOMElements.decorationTimer;

      // 添加抖动动画
      this.decorationsAnimation(decorationLogo, 'logo', 'Logo', 1500);
      this.decorationsAnimation(decorationTimer, 'timer', 'Timer', 1000);
    },
    /**
     * @function 所有装饰品的抖动动画，当鼠标移至它们上方时会有抖动动画
     * @param decorationComponent 装饰品组件，即给该装饰品添加动画
     * @param lowerCaseDecorationName 装饰品小写名, 如 love
     * @param camelCaseDecorationName 装饰品驼峰命名, 如 Love
     * @param delay 移除动画延时， 毫秒
     * @param subDecorationCamCaseName 其他装饰品驼峰命名，如 LoveVine，在这里的功能是增加 img 热区区域
     * @param mouseenterCallback 鼠标进入回调函数
     * @param mouseleaveCallback 鼠标离开回调函数
     * @description 方法需要准备：
     *    1. img 的热区（ areaDecorationXxxx 命名的 jquery 对象）在 this.DOMElements 中
     *    2. 带有动画属性的类名（ decoration-Xxxx-shake）在 css 中
     *    3. 装饰品动画是否完成的标志（ isXxxxCompleted ）在 this.isDecorationsCompleted 中
     *    4. 一个定时器（ xxxTimer 由 new Timer() 生成）在 this.timer 中
     */
    decorationsAnimation(decorationComponent, lowerCaseDecorationName, camelCaseDecorationName, delay, subDecorationCamCaseName, mouseenterCallback, mouseleaveCallback) {
      // 热区组件，subDecorationCamCaseName 为 undefined 时情况不同
      let areaDecorationComponent = this.DOMElements[`areaDecoration${subDecorationCamCaseName ? subDecorationCamCaseName : camelCaseDecorationName}`];

      areaDecorationComponent.off('mouseenter').on('mouseenter', () => {
        // 鼠标进入回调
        mouseenterCallback && mouseenterCallback();
        // 添加动画类名
        decorationComponent.addClass(`decoration-${lowerCaseDecorationName}-shake`);
        // 使用节流阀
        if (this.isDecorationsCompleted[`is${camelCaseDecorationName}Completed`]) {
          this.isDecorationsCompleted[`is${camelCaseDecorationName}Completed`] = false;
          // 动画完成后删除动画类名
          this.timer[`${lowerCaseDecorationName}Timer`].timeout(() => {
            decorationComponent.removeClass(`decoration-${lowerCaseDecorationName}-shake`);
            this.isDecorationsCompleted[`is${camelCaseDecorationName}Completed`] = true;
          }, delay)
        }
      });

      areaDecorationComponent.off('mouseleave').on('mouseleave', () => {
        mouseleaveCallback && mouseleaveCallback();
      })
    },
    // 实时时间
    showRealTime() {
      this.timer.realTimeTimer.interval(() => {
        // 获取时间
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // 月份加一
        let day = currentDate.getDate();
        let hour = currentDate.getHours();
        let minute = currentDate.getMinutes();
        let second = currentDate.getSeconds();

        // 日期格式化
        currentDate = year + '年' + this.formatDateNumber(month) + '月' + this.formatDateNumber(day) + '日 ' +
            this.formatDateNumber(hour) + ':' + this.formatDateNumber(minute) + ':' + this.formatDateNumber(second);

        let c;
        let replaceStr;
        let pushArray = this.realTime.yearMonthDay;
        let pushArrayIndex = 0, currentDateIndex = 0;

        for (; currentDateIndex < currentDate.length; currentDateIndex++) {
          c = currentDate.charAt(currentDateIndex);
          switch (c) {
            // 字符匹配
            case '0': replaceStr = 'numberZero';break;
            case '1': replaceStr = 'numberOne';break;
            case '2': replaceStr = 'numberTwo';break;
            case '3': replaceStr = 'numberThree';break;
            case '4': replaceStr = 'numberFour';break;
            case '5': replaceStr = 'numberFive';break;
            case '6': replaceStr = 'numberSix';break;
            case '7': replaceStr = 'numberSeven';break;
            case '8': replaceStr = 'numberEight';break;
            case '9': replaceStr = 'numberNine';break;
            case '年': replaceStr = 'year';break;
            case '月': replaceStr = 'month';break;
            case '日': replaceStr = 'day';break;
            case ':': replaceStr = 'colon';break;
            default: {
              // 改变数组容器
              pushArray = this.realTime.hourMinuteSecond;
              // pushArrayIndex 下标重置
              pushArrayIndex = 0;
              continue;
            }
          }
          // 数组为 0，选择 push，否则 splice 删除并替换
          if(pushArray.length === 0) {
            pushArray.push(replaceStr);
          } else {
            // 不同才替换, splice() 在删除时指定的第三个参数会添加到删除的位置
            if(pushArray[pushArrayIndex] !== replaceStr) {
              pushArray.splice(pushArrayIndex, 1, replaceStr);
            }
          }
          // pushArrayIndex 变量必须放在这，因为前面有 continue，可选的增加
          pushArrayIndex++;
        }
      }, 1000);
    },
    // 日期数字格式化
    formatDateNumber(number) {
      return number < 10 ? '0' + number : number;
    }
  },
  beforeDestroy() {
    // 移除事件
    for (let ele in this.DOMElements) {
      this.DOMElements[ele].off();
    }
    // 移除定时器
    for (let timer in this.timer) {
      this.timer[timer].destroy();
    }
  }
}
</script>

<style scoped>

.decoration-container {
  position: relative;
  z-index: 10;
  width: 0;
  height: 100vh;
}

/*树*/
.decoration-collections .decoration-vine,
.decoration-collections .decoration-love,
.decoration-collections .decoration-timer,
.decoration-collections .decoration-logo,
.decoration-collections .decoration-leaves,
.decoration-collections .decoration-trunk {
  position: absolute;
  transition: var(--transition-1000ms);
}

.decoration-collections > div {
  position: absolute;
}

/*树干*/
.decoration-trunk {
  z-index: 1;
  bottom: -28px;
  left: 6px;
}

/*树叶*/
.decoration-leaves {
  z-index: 10;
  bottom: 130px;
  left: -178px;
}

.decoration-logo {
  width: 106px;
  z-index: 3;
  bottom: 126px;
  left: 111px;
  transform-origin: 53px 10px;
}

/*时间指示器*/
.decoration-timer {
  width: 200px;
  z-index: 3;
}

/*藤蔓*/
.decoration-vine {
  width: 50px;
  bottom: 171px;
  left: 80px;
}

/*节日指示器框*/
.decoration-love {
  width: 218px;
  bottom: 0;
  transform-origin: 109px 35px;
  transform: rotate(180deg);
}

/*节日指示器*/
.decoration-love-container {
  width: 218px;
  height: 450px;
  z-index: 3;
  left: 316px;
  bottom: 111px;
  transform-origin: 109px 20px;
}

/*时间指示器*/
.decoration-timer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 112px;
  z-index: 3;
  bottom: 151px;
  left: 707px;
  transform-origin: 100px 20px;
}

/*时间框*/
.timer-clock-container {
  position: relative;
  z-index: 4;
  margin: 6px 0 0 25px;
  overflow: hidden;
}

/*自定义字体*/
.timer-clock-container img {
  height: 18px;
  transition: var(--transition-1000ms);
}

.year-month-day,
.hour-minute-second {
  transition: all 0.5s;
}

.year-month-day {
  margin-left: 10px;
  width: 160px;
}

.hour-minute-second {
  width: 98px;
}

/*节日框*/
.love-festival-container {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 200px;
  transition: all 0.4s;
}

/*旋转过渡*/
.rotate-transition {
  transform: rotateY(180deg);
}

.today-festival-index,
.festival-description {
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 0.4s;
}

/*今天是.. 节日的标题*/
.today-festival-title {
  position: absolute;
  top: 46px;
  left: 45px;
  font-size: 14px;
  font-family: '宋体',serif;
}

/*节日名称*/
.festival-name {
  position: absolute;
  top: 39%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  font-family: '华文行楷',serif;
}

/*节日描述*/
.festival-description {
  display: flex;
  justify-content: center;
  transform: rotateY(180deg);
  font-size: 12px;
}

/*节日描述的标题*/
.festival-description-title {
  position: absolute;
  top: 40px;
  left: 38px;
  font-size: 16px;
}

.festival-description-content {
  margin-top: 65px;
}

.festival-description-row-head,
.festival-description-row-body {
  display: inline-block;
}

.festival-description-row {
  margin-top: 1px;
}
</style>