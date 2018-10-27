<style lang="less" src="./index.less" scoped></style>
<template>
  <div class="mobilecheck">
    <h2 class="mobilecheck__title">登录</h2>
    <div class="mobilecheck__form">
      <div class="mobilecheck__form-mobile">
        <input id="mobile"
               type="text"
               v-model="mobile"
               placeholder="请输入手机号"
               @input="isMobileOK">
      </div>
      <div class="mobilecheck__form-sessionid">
        <input id="sessionid"
               type="text"
               v-model.trim="sessionid"
               placeholder="短信验证码">
        <div class="mobilecheck__form-sessionid-btn"
                :disabled="mobileOK">
              <span v-if="startcount" @click="sendsms">短信验证</span>
              <span v-else>{{count}}s</span>
        </div>
      </div>
      <button class="mobilecheck__form-confirm"
              :disabled="mobileOK"
              @click="login"
              >登录</button>
    </div>
    <div class="mobilecheck__closeBtn" @click="close"></div>
  </div>
</template>

<script type="text/babel">
import router from '@/vote-wesg/js/router';
import axios from 'axios';
import api from '@/vote-wesg/js/libs/urlHost';
import { GetQueryString } from '@/vote-wesg/js/libs/dateHelper';
import { Toast } from 'mint-ui';

export default {
  props:{

  },
  data () {
    return {
      mobile: '',
      sessionid: '',
      mobileOK:true,
      sessionidOK:true,
      startcount:true,
      count:60,
    }
  },
  computed:{
      fromid(){
          return GetQueryString('ali_from') || '';
      },
  },
  methods: {
    login(){
      if(this.sessionid==''){
        Toast('验证码不能为空');
        return
      }
      let datas = 'phone='+this.mobile+'&'+'code='+this.sessionid;
      axios.post(api.apiURL.login,datas,{withCredentials:true})
        .then(response=>{
          console.log(response);
          if(response.data.res_code==1){
            Toast("手机号或验证码错误,请重新登录");
            this.$emit('closeBox',false);
            return
          }else if(response.data.res_code==0){
            Toast("登录成功");
              if(response.data.data.is_first && response.data.data.is_first == 1){
                  console.log(_czc.push);
                  _czc.push(["_trackEvent", "用户","H5注册", this.fromid]);
              };
            this.$emit('closeBox',true);
          }else{
              Toast("网络故障，请稍后尝试");
              this.$emit('closeBox',false);
          }
        })
        .catch(e=>{
          Toast("登录失败,请重新登录");
          this.$emit('closeBox',false);
        })
    },
    sendsms() {
      if(this.isMobileValid()){
        var self = this;
        let str = 'phone=' + this.mobile;
        axios.post(api.apiURL.sendsms,str)
          .then(response=> {
              if(response.data.res_code==1){
                  Toast(response.data.res_msg)
              }
            console.log(response);
          })
          .catch(error=> {
            console.log(error);
          });
        this.startcount = false;
        var timer = setInterval(function () {
          if(self.count==0){
            clearInterval(timer);
            self.count = 40;
            self.startcount = true;
          }else{
            self.count--
          }
        },1000)
      }else{
       Toast('请输入正确手机号');
      }
    },
    isMobileOK() {
      this.mobileOK = this.isMobileValid()? false : true;
    },
    isMobileValid() {
      let isValid = /^1[34578][0-9]{9}$/.test(this.mobile);
      return isValid;
    },
    close(){
        this.$emit('closeBox',false);
    }
  }
}
</script>

