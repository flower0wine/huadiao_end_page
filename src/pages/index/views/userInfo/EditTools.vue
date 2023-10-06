<template>
  <div class="edit-tools-broad">
    <div class="edit-tools-header">
      <div class="edit-tools-title">编辑工具</div>
    </div>
    <div class="edit-tools"
         v-for="index in userCollectionsAmount"
         :key="index"
    >
      <div class="edit-tools-edit"
           @click="clickEditButton"
      >
        <svg t="1671861040545" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2698" width="200" height="200"><path d="M194.717696 279.69536h8.923136c135.837696 0 271.673344-0.006144 407.51104 0.01024 10.797056 0.528384 15.065088 8.0384 15.27808 13.1584-0.299008 6.486016-6.529024 12.587008-14.977024 12.955648-3.407872 0.147456-3.209216 0.01024-6.623232 0.01024-123.549696 0.004096-247.099392 0.004096-370.649088 0.004096h-13.334528v11.855872c0 145.73568-0.004096 291.469312 0.006144 437.204992 0 20.568064 6.346752 27.119616 26.650624 27.119616 195.56352 0.032768 391.129088 0.024576 586.692608 0 2.998272 0 5.996544-0.299008 10.305536-0.528384v-13.38368c0-104.439808-0.065536-212.400128 0.231424-316.837888 0.016384-5.154816 4.857856-12.713984 13.119488-12.886016 6.111232-0.129024 12.72832 6.100992 12.642304 12.75904-0.268288 20.81792 0 41.8304 0 62.650368V808.019968h-11.270144c-204.77952 0-409.55904 0.008192-614.33856-0.004096-30.99648-0.004096-50.163712-19.316736-50.16576-50.511872-0.01024-155.287552-0.004096-310.581248-0.004096-465.872896l0.002048-11.935744z" fill="" p-id="2699"></path><path d="M785.620992 162.793472l119.90016 92.536832c-9.078784 11.773952-17.719296 23.035904-26.417152 34.2528-86.706176 111.804416-173.406208 223.614976-260.22912 335.331328-2.357248 3.03104-5.728256 6.017024-9.254912 7.292928-38.367232 13.879296-76.859392 27.420672-115.326976 41.03168-1.2288 0.436224-2.531328 0.65536-4.89472 1.247232 1.103872-31.952896 2.17088-63.232 3.278848-94.507008 0.157696-4.427776 1.14688-8.073216 0.667648-13.264896-1.93536-20.963328 6.141952-36.440064 18.706432-52.48 89.786368-114.61632 178.76992-229.861376 268.023808-344.895488 1.644544-2.121728 3.469312-4.102144 5.545984-6.545408z m-42.6496 97.746944c-2.830336 3.319808-5.330944 6.027264-7.579648 8.927232-66.05824 85.133312-131.749888 170.553344-198.443008 255.186944-11.776 14.944256-18.896896 29.6448-18.151424 48.748544 0.815104 20.959232 0.186368 41.971712 0.186368 63.619072 22.857728-8.128512 46.645248-16.19968 70.078464-25.192448 5.931008-2.279424 11.956224-6.551552 15.859712-11.532288 46.686208-59.592704 92.983296-119.484416 139.372544-179.310592 25.655296-33.091584 51.288064-66.2016 77.305856-99.790848l-78.628864-60.655616z m94.593024 40.116224l31.449088-40.677376-79.036416-60.944384-31.430656 40.59136c26.447872 20.424704 52.297728 40.392704 79.017984 61.0304z" fill="" p-id="2700"></path></svg>
        <div class="edit-tools-name">编辑</div>
      </div>
      <div class="edit-tools-remove" @click="clickDeleteButton">
        <svg t="1671862695787" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2877" width="200" height="200"><path d="M202.666667 256h-42.666667a32 32 0 0 1 0-64h704a32 32 0 0 1 0 64H266.666667v565.333333a53.333333 53.333333 0 0 0 53.333333 53.333334h384a53.333333 53.333333 0 0 0 53.333333-53.333334V352a32 32 0 0 1 64 0v469.333333c0 64.8-52.533333 117.333333-117.333333 117.333334H320c-64.8 0-117.333333-52.533333-117.333333-117.333334V256z m224-106.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z m-32 288a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z m170.666666 0a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z" p-id="2878"></path></svg>
        <div class="edit-tools-name">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: "EditTools",
  props: ['userCollectionsAmount', 'getOneUserInfo', 'deleteUser'],
  data() {
    return {
    }
  },
  methods: {
    // 点击编辑
    clickEditButton (e) {
      let this_ = $(e.target).parents('.edit-tools');
      this.getOneUserInfo(this_.index());
    },
    // 点击删除
    clickDeleteButton(e) {
      let this_ = $(e.target).parents('.edit-tools');
      this.deleteUser(this_.index());
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
  .edit-tools-broad {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 25%;
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius)
  }

  .edit-tools-header {
    border-top-right-radius: var(--border-radius);
  }

  .edit-tools-title {
    padding: 20px 10px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  }

  .edit-tools {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-left: 15px;
  }

  .edit-tools-edit,
  .edit-tools-remove {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    text-align: center;
    line-height: 30px;
    margin-right: 15px;
    border-radius: var(--border-radius-min);
    cursor: pointer;
    transition: all 0.3s;
  }

  .edit-tools-edit:hover,
  .edit-tools-remove:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
  }

  /*工具图标*/
  .edit-tools-edit .icon {
    width: 24px;
    height: 24px;
    fill: #ded849;
  }

  .edit-tools-remove .icon {
    width: 18px;
    height: 18px;
    fill: #ec3838;
  }

  .edit-tools-name {
    margin-left: 4px;
  }

  .edit-tools-edit {
    color: #ded849;
    border: 1px solid #ded849;
  }

  .edit-tools-remove {
    color: #ec3838;
    border: 1px solid #ec3838;
  }
</style>