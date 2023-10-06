<template>
  <div class="pager-container" v-if="pageNumber !== 0">
    <ul>
      <li class="pager-prev"
          v-show="pagerItemActiveIndex !== 1"
          @click="prevPage">上一页
      </li>
      <li class="pager-item pager-item-active" v-if="pageNumber >= 1">1</li>
      <li class="pager-item" v-if="pageNumber >= 2">2</li>
      <li class="pager-item" v-if="pageNumber >= 3">3</li>
      <li class="pager-ellipsis" v-if="visible.beforePagerEllipsis">...</li>
      <template v-if="visible.middlePagerItemsVisible">
        <li class="pager-item"
            v-for="(item, index) in visible.visiblePagerRange.length"
            :key="visible.visiblePagerRange.start + index"
            @click="pagerItemClickEvent"
        >{{ visible.visiblePagerRange.start + index }}
        </li>
      </template>
      <li class="pager-ellipsis" v-if="visible.afterPagerEllipsis">...</li>
      <li class="pager-item" v-if="pageNumber >= 6">{{ pageNumber - 2 }}</li>
      <li class="pager-item" v-if="pageNumber >= 5">{{ pageNumber - 1 }}</li>
      <li class="pager-item" v-if="pageNumber >= 4">{{ pageNumber }}</li>
      <li class="pager-next"
          v-show="pagerItemActiveIndex !== pageNumber"
          @click="nextPage">下一页
      </li>
      <li class="pager-total">共 {{ pageNumber }} 页</li>
      <li class="pager-options-elevator" @keyup.enter="pagerOptionsElevator">
        <span>, 跳至</span>
        <input type="text" class="pager-input">
        <span>页</span>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: "UserCollectionsPager",
  props: ['pagerTotal', 'pageLimit'],
  data() {
    return {
      pagerItemActiveIndex: 1,
      visible: {
        beforePagerEllipsis: false,
        afterPagerEllipsis: false,
        middlePagerItemsVisible: false,
        visiblePagerRange: {
          start: undefined,
          length: 0
        },
      },
    }
  },
  mounted() {

  },
  computed: {
    pageNumber: {
      get() {
        return Math.ceil(this.pagerTotal / this.pageLimit);
      },
      set(value) {
      }
    },
  },
  watch: {
    pageNumber: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue) {
          if (this.pageNumber > 6) {
            this.visible.beforePagerEllipsis = true;
          }
          this.$nextTick(() => { // 这里必须使用 nextTick, 在 pageNumber 赋值后, 页面挂载后再执行下面代码
            $('.pager-item').click(this.pagerItemClickEvent);
          })
        }
      }
    },
    pagerItemActiveIndex: {
      handler(newValue, oldValue) {
        let start, length;
        let middlePagerItemsVisible = false, beforePagerEllipsis = false, afterPagerEllipsis = false;
        if (this.pagerItemActiveIndex <= 3 || this.pagerItemActiveIndex >= this.pageNumber - 2) { // 落在最左边或最右边
          if (this.pageNumber >= 7) {
            if (this.pagerItemActiveIndex === 3) {
              middlePagerItemsVisible = true;
              beforePagerEllipsis = false;
              afterPagerEllipsis = !(this.pageNumber === 7);
              start = 4;
              length = 1;
            } else if (this.pagerItemActiveIndex === this.pageNumber - 2) {
              middlePagerItemsVisible = true;
              beforePagerEllipsis = !(this.pageNumber === 7);
              afterPagerEllipsis = false;
              start = this.pageNumber - 3;
              length = 1;
            } else {
              middlePagerItemsVisible = false;
              beforePagerEllipsis = true;
              afterPagerEllipsis = false;
              length = 0;
            }
          } else {
            middlePagerItemsVisible = false;
            beforePagerEllipsis = afterPagerEllipsis = false;
          }
        } else if (this.pagerItemActiveIndex === 4 || this.pagerItemActiveIndex === this.pageNumber - 3) { // 落在靠左边或靠右边
          if (this.pageNumber - 3 === 4) { // 仅有七页
            start = 4;
            length = 1;
            beforePagerEllipsis = afterPagerEllipsis = false;
          } else if (this.pageNumber - 4 === 4) { // 仅有八页
            start = 4;
            length = 2;
            beforePagerEllipsis = afterPagerEllipsis = false;
          } else if (this.pagerItemActiveIndex === 4) {  // 九页或更多
            start = 4;
            length = 3;
            if (this.pageNumber >= 9) { // 九页以上后面的省略号显示
              afterPagerEllipsis = true;
            }
          } else if (this.pagerItemActiveIndex === this.pageNumber - 3) {
            start = this.pageNumber - 5;
            length = 3;
            if (this.pageNumber >= 9) {  // 九页以上前面的省略号显示
              beforePagerEllipsis = true;
            }
          }
          middlePagerItemsVisible = true;
        } else {  // 现在的范围在区间 [5, pagerNumber - 4], 且当前页数至少有九页
          if (this.pageNumber === 9) { // 仅有九页
            beforePagerEllipsis = afterPagerEllipsis = false;
            middlePagerItemsVisible = true;
            start = 4;
            length = 3;
          } else { // 十页及以上
            if (this.pagerItemActiveIndex === 5) {
              beforePagerEllipsis = false;
              afterPagerEllipsis = true;
              middlePagerItemsVisible = true;
              start = 4;
              length = 3;
            } else if (this.pagerItemActiveIndex === this.pageNumber - 4) {
              beforePagerEllipsis = true;
              afterPagerEllipsis = false;
              middlePagerItemsVisible = true;
              start = this.pageNumber - 5;
              length = 3;
            } else {
              beforePagerEllipsis = afterPagerEllipsis = true;
              middlePagerItemsVisible = true;
              start = this.pagerItemActiveIndex - 1;
              length = 3;
            }
          }
        }
        this.visible.visiblePagerRange.start = start;
        this.visible.visiblePagerRange.length = length;
        this.visible.middlePagerItemsVisible = middlePagerItemsVisible;
        this.visible.beforePagerEllipsis = beforePagerEllipsis;
        this.visible.afterPagerEllipsis = afterPagerEllipsis;
      }
    }
  },
  methods: {
    // 跳转上一页
    prevPage() {
      if (this.pagerItemActiveIndex > 1) {
        this.pagerItemActiveIndex--;
        this.$bus.$emit('modifySinglePagerIndex', this.pagerItemActiveIndex);
      } else {
        this.$bus.$emit('addWarningTip', '已经是第一页，无法跳转上一页！！！', 'warning');
      }
    },
    // 跳转下一页
    nextPage() {
      if (this.pagerItemActiveIndex < this.pageNumber) {
        this.pagerItemActiveIndex++;
        this.$bus.$emit('modifySinglePagerIndex', this.pagerItemActiveIndex);
      } else {
        this.$bus.$emit('addWarningTip', '已经是最后一页，无法跳转下一页！！！', 'warning');
      }
    },
    // 分页器点击事件
    pagerItemClickEvent(e) {
      let targetPagerItem = $(e.target);
      let targetPagerItemIndex = Number(targetPagerItem.text());
      let pagerItems = $('.pager-item');
      if (targetPagerItemIndex >= 1 && targetPagerItemIndex <= this.pageNumber) {
        this.pagerItemActiveIndex = targetPagerItemIndex;
        this.$bus.$emit('modifySinglePagerIndex', this.pagerItemActiveIndex);
      } else {
        this.$bus.$emit('addWarningTip', '第 ' + targetPagerItemIndex + ' 页不存在！！！', 'warning');
      }
      pagerItems.removeClass('pager-item-active');
      targetPagerItem.addClass('pager-item-active');
    },
    // 分页器输入框跳转电梯
    pagerOptionsElevator(e) {
      let pagerInput = $(e.target);
      let pagerInputValue = Math.ceil(Number(pagerInput.val()));
      pagerInput.val('').blur();
      if (pagerInputValue) {
        if (pagerInputValue < 1) {
          this.pagerItemActiveIndex = 1;
        } else if (pagerInputValue > this.pageNumber) {
          this.pagerItemActiveIndex = this.pageNumber;
        } else {
          this.pagerItemActiveIndex = pagerInputValue;
        }
        this.$bus.$emit('modifySinglePagerIndex', this.pagerItemActiveIndex);
      } else {
        this.$bus.$emit('addWarningTip', '输入的格式必须为数字！！！', 'warning');
      }
    }
  },
  beforeUpdate() {
    // console.log(this.pagerTotal / this.pageLimit)
  },
  beforeDestroy() {
    $('.pager-next').off('click');
    $('.pager-prev').off('click');
    $('.pager-item').off('click');
  },
}
</script>

<style scoped>
/*分页器*/
.pager-container {
  margin-top: 30px;
  height: 20px;
  text-align: center;
  user-select: none;
}

.pager-container > ul > li {
  display: inline-block;
}

.pager-item,
.pager-prev,
.pager-next {
  display: inline-block;
  text-align: center;
  padding: 0 19px;
  line-height: 40px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s;
}

.pager-ellipsis,
.pager-item,
.pager-prev,
.pager-next {
  margin-right: 10px;
}

.pager-container > ul > .pager-item-active {
  color: #ddd;
  background-color: #ec3838;
  border: 1px solid #ec3838;
}

.pager-item:hover {
  color: #ec3838;
  border: 1px solid #ec3838;
}

/*分页器总数*/
.pager-total,
  /*分页器电梯*/
.pager-options-elevator {
  font-size: 12px;
}

.pager-options-elevator .pager-input {
  width: 120px;
  height: 30px;
  margin: 0 15px;
  padding-left: 10px;
  border-radius: var(--border-radius-min);
  background-color: transparent;
  transition: all 0.3s;
}

.pager-options-elevator .pager-input:focus {
  border: 1px solid #ec3838;
}

.pager-next:hover,
.pager-prev:hover {
  color: #ec3838;
  border: 1px solid #ec3838;
}
</style>