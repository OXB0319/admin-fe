<template>
  <div v-if="toastVisible || toastText" @click="hide" class="toast-back" v-bind:class="{toastbg}" v-loading="true"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--<div v-if="toastVisible || toastText" class="toast">-->
      <!--&lt;!&ndash;<div v-if="toastImg" :class="'toast-img '+toastImg"></div>&ndash;&gt;-->
      <!--<div v-if="toastText" class="toastText">-->
        <!--<p v-html="toastText"></p>-->
      <!--</div>-->
      <!--&lt;!&ndash;<div v-if="loading" class="loading" ></div>&ndash;&gt;-->
    <!--</div>-->
  </div>

</template>

<script>
  export default {
    props: {
      toastImg:{
        type: String,
        default: "",
      },
      loading:{
        type: Boolean,
        default: false,
      },
      toastText: {
        type: String,
        default:"",
      },
      toastVisible: {
        type: Boolean,
        default: false,
      },
      toastbg: {
        type: Boolean,
        default: false,
      },
      clickHide:{
        type:Boolean,
        default:false,
      }
    },
    methods: {
      hide() {
        if(this.clickHide){
          this.$emit('hide')
        }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss"scoped>
  .toast-back{
    position: fixed;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0);
    z-index: 9999;
    top:0;
    left:0;
  }
  .toast{
    background-color: #000;
    opacity: 0.8;
    border-radius: .18rem;
    position: absolute;
    max-width: 4.2rem;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    top: 50%;
    left: 50%;
    padding: .2rem;
    z-index: 10000;

    &:after{
      position: fixed;
      width:7.5rem;
      height:100%;
      background-color: #ff0000;
      background-size: 100%;
    }
    .toast-img{
      width: .58rem;
      height: .58rem;
      display: block;
      margin: .05rem auto .25rem;
    }
    .success{
      /*background:url(../assets/components/toast/success.png) no-repeat;*/
      background-size: .58rem;
    }
    .warning{
      /*background:url(../assets/components/toast/warning.png) no-repeat;*/
      background-size: .58rem;
    }
    .failure{
      /*background:url(../assets/components/toast/failure.png) no-repeat;*/
      background-size: .58rem;
    }
    .toastText{
      img{
        width: .58rem;
        height: .58rem;
        display: block;
        margin: .45rem auto .25rem;
      }
      p{
        text-align: center;
        font-size: .32rem;
        line-height: .45rem;
        color: #fff;
        margin: 0;
      }
    }
    .loading{
      height: .6rem;
      width: .6rem;
      /*background:url(../assets/components/toast/loading.gif) no-repeat;*/
      background-size: contain;
    }
  }
  .toastbg{
    .toast{
      padding: .5rem 0.82rem;
      width: 2.56rem;
    }
  }
</style>
