<style lang="less" src="@/index/js/styles/common.less"></style>
<style lang="css" src="mint-ui/lib/style.css"></style>
<template>
  <div class="app">
    <h4>摄影大赛投票</h4>
    <ul >
      <li v-for="(item, index) in showList" :key=index>
        <div class="card">
          <p class="head">摄影大赛作品 No.{{item.id}}</p>
          <p class="strong">当前票数: {{ticketList[index]?ticketList[index].Value:0}}</p>
          <p>作品名称:{{item.pname}};   姓名:{{item.name}};</p>
          <p>公司名称:{{item.cname}};   部门:{{item.depart}};  工号:{{item.workid}}</p>
          <p>作品说明: <span>{{item.desc}}</span>  </p>
        </div>
        <div class="pic">
          <img :src="pic" alt="" v-for="(pic,index) in item.img" :key="index">
        </div>
        <mt-button type="primary" @click.native="handleClick(index)">投票</mt-button>
      </li>
    </ul>
    <div style="text-align:center;padding-bottom:20px;" id="anchor" class="Chart">
      <!-- <bar-chart :width="360" :chartData="chartData"></bar-chart> -->
       <div id='myChart' style='width：600px;height:600px'></div>
    </div>
    <audio id="audio" style="display:none"></audio>
  </div>
</template>

<script>
import axios from "axios";
// import qs from "qs";
import { Toast } from "mint-ui";
import lockr from "lockr";
import api from "./libs/urlHost";
import echarts from "echarts";
// import BarChart from './BarChart'

export default {
  name: "app",
  components: {
    // BarChart
  },
  data() {
    return {
      isWechat: false,
      canVote: false,
      userid: "",
      IP: "",
      showList: [
        {
          id: 1,
          cname: "丰瑞实业",
          name: "李晴",
          workid: 80043188,
          depart: "印刷",
          pname: "故事与他",
          img: ["static/assets/1.png"],
          desc: "如初恋般热衷于你"
        },
        {
          id: 2,
          cname: "富祥塑胶",
          name: "张艳明",
          workid: 80039235,
          depart: "卓越运营",
          pname: "游弋",
          img: ["static/assets/2.png"],
          desc:
            "（代表:自由自在，拍摄于上海青浦工厂花园内的鱼池）。刚好锦鲤摆动尾巴瞬间水波纹…"
        },
        {
          id: 3,
          cname: "丰瑞实业",
          name: "于元元",
          workid: 80012394,
          depart: "品保",
          pname: "工作中的他",
          img: ["static/assets/3.png"],
          desc: "认真细心工作的你最美……"
        },
        {
          id: 4,
          cname: "藤兴工业",
          name: "唐廷花",
          workid: 80002541,
          depart: "NBD品保",
          pname: "蓝天下的水塔",
          img: ["static/assets/4.png"],
          desc:
            "它见证了HCP几十载的成长发展历程.尽管它经历了漫长岁月的风风雨雨.仍巍然耸立,与HCP人同在,守护着它的家人!"
        },
        {
          id: 5,
          cname: "藤兴工业",
          name: "唐廷花",
          workid: 80002541,
          depart: "NBD品保",
          pname: "学习的瞬间",
          img: ["static/assets/5-1.png", "static/assets/5-2.png"],
          desc:
            "在这里每个人都有好学的一面,环境和平台会改变一个人!接受更多的新知识,新思维 使自己更优秀.--记2017年NBDQA六西格玛培训讨论瞬间"
        },
        {
          id: 6,
          cname: "富祥塑胶",
          name: "Cindy Liu",
          workid: 80029057,
          depart: "人力资源部",
          pname: "小路",
          img: ["static/assets/6.png"],
          desc: "美不用寻找，它其实就在你身边。"
        },
        {
          id: 7,
          cname: "富祥塑胶",
          name: "李雷鸣",
          workid: 80008701,
          depart: "模具设计项目部",
          pname: "无悔的青春",
          img: ["static/assets/7.png"],
          desc:
            "模具设计项目部的一位同事正在指导其他几位同事学习模具设计，难能可贵的是他们都是自发自愿的组织学习，而且他们都毕业不长时间，他们在hcp留下的是无悔的青春。"
        },
        {
          id: 8,
          cname: "藤兴工业",
          name: "王晓静",
          workid: 80031863,
          depart: "备料",
          pname: "最可爱的人",
          img: ["static/assets/8.png"],
          desc:
            "对待工作，我们是认真的，哪怕是再生料，我们也要一把一把的检查，为公司节约每一颗料，每一笔资源"
        },
        {
          id: 9,
          cname: "藤兴工业",
          name: "高龙芳",
          workid: 80026392,
          depart: "涂装-II",
          pname: "生命在于劳动",
          img: ["static/assets/9.png"],
          desc:
            "世人总夸蜜蜂勤劳，蜻蜓也如此，你看它们像一架架小飞机，或盘旋在我们头顶，或守候在花丛中，不停地捕食飞虫，然后繁衍后代。我们劳动人民也是如此，只有通过自己的辛勤劳动，才能为自己，为下一代，创造美好未来！"
        },
        {
          id: 10,
          cname: "丰瑞实业",
          name: "姜科",
          workid: 80022165,
          depart: "成型",
          pname: "最可爱的人",
          img: ["static/assets/10.png"],
          desc:
            "在这烈日炎炎的夏日，面对持续高温的天气，总有一些默默无闻奋斗在生产一线的特殊群体，为了生产任务的完成，他们在高温的环境下汗流浃背地作业，汗水早已打湿了他们的衣襟，致敬生产一线辛苦劳动最可爱的人。"
        },
        {
          id: 11,
          cname: "丰瑞实业",
          name: "姜婷",
          workid: 80021933,
          depart: "人力资源",
          pname: "“星级”的意义",
          img: ["static/assets/11.png"],
          desc:
            "她们有着相同的名字“星级员工”，她们认真检验每一个产品，她们做到凡经我手必为良品，她们是品质尖兵，她们是学习标杆。"
        },
        {
          id: 12,
          cname: "藤兴工业",
          name: "徐建",
          workid: 80017139,
          depart: "行政",
          pname: "认真负责",
          img: ["static/assets/12.png"],
          desc:
            "膳食委员会成员认真检查食堂餐具，确保员工用的餐具安全卫生。体现了膳食委员会成员认真负责的姿态。"
        },
        {
          id: 13,
          cname: "藤兴工业",
          name: "唐永",
          workid: 80000980,
          depart: "涂装",
          pname: "藤兴腾飞",
          img: ["static/assets/13.png"],
          desc:
            "藤兴食堂环境好，今年又添新空调；窗明几净灯光亮，员工享乐福利高。"
        },
        {
          id: 14,
          cname: "藤兴工业",
          name: "李先云",
          workid: 80001826,
          depart: "专案",
          pname: "绿化与环保并存",
          img: ["static/assets/14.png"],
          desc: "针对装修后甲醛对人体危害，放置多种绿植，体现以人为本的理念！"
        },
        {
          id: 15,
          cname: "丰瑞实业",
          name: "赵国加",
          workid: 80000091,
          depart: "工程",
          pname: "设备人修机械手",
          img: ["static/assets/15.png"],
          desc:
            "2018年5月外招成型设备维修员，技术娴熟，兢兢业业，对技术很专研，技术难点不放过，那怕“上天”“入地！”"
        },
        {
          id: 16,
          cname: "丰瑞实业",
          name: "赵国加",
          workid: 80000091,
          depart: "工程",
          pname: "好好工作",
          img: ["static/assets/16-1.png", "static/assets/16-2.png"],
          desc:
            "成型作业员在35度高温下，额头汗水直流，但对品质坚恃一丝不苟，全心投入品质检验，为这群一线员工点赞！"
        },
        {
          id: 17,
          cname: "丰瑞实业",
          name: "赵国加",
          workid: 80000091,
          depart: "工程",
          pname: "整洁的停车场",
          img: ["static/assets/17.png"],
          desc:
            "丰瑞生活区整洁的停车场。车子多，地方少，HR动足脑筋，将绿化帶整修成停车场，解决停车难。员工珍惜这难得福利，自觉地停放整齐。整齐化一，风景如画！"
        },
        {
          id: 18,
          cname: "丰瑞实业",
          name: "葛志花",
          workid: 80014712,
          depart: "涂装",
          pname: "迷人的背影",
          img: ["static/assets/18.png"],
          desc: "涂装品质收箱员日常工作记录。"
        },
        {
          id: 19,
          cname: "丰瑞实业",
          name: "张雷",
          workid: 80008215,
          depart: "涂装",
          pname: "丰瑞扩建项目施工现场",
          img: ["static/assets/19-1.png", "static/assets/19-2.png"],
          desc:
            "近几年丰瑞业绩增长领先，得到集团总部认可，重点追加投资扩建丰瑞二期项目，丰瑞的明天会更好。"
        },
        {
          id: 20,
          cname: "富祥塑胶",
          name: "吴宏华",
          workid: 80005260,
          depart: "人力资源",
          pname: "四季富祥",
          img: [
            "static/assets/20-1.png",
            "static/assets/20-2.png",
            "static/assets/20-3.png",
            "static/assets/20-4.png",
            "static/assets/20-5.png"
          ],
          desc:
            "春夏秋冬，四季轮回，日出而作，日落而息，身边的风景总是在每一个不经意间展现。其实，人生走过的每一段路，都有一段或一处美景与你相约、相伴，只是我们学会停下自己的脚步，学会去发现和欣赏。"
        },
        {
          id: 21,
          cname: "藤兴工业",
          name: "王利",
          workid: 80030851,
          depart: "人力资源",
          pname: "他",
          img: ["static/assets/21.png"],
          desc:
            "他，是每天迎着第一缕晨曦，第一个奏响劳动乐章的人。他，是一位慈祥的老人。他，是一位清洁工。整洁宽敞的楼梯，干净明亮的洗手间，窗明几净的玻璃窗都出自他那双勤劳的双手。他—是可敬的人，是最美的风景。"
        }
      ],
      ticketList: [],
      chartData: []
    };
  },
  methods: {
    handleClick(index) {
      if (this.isWechat) {
        if (this.canVote) {
          this.postVote(index + 1);
          lockr.set("voted", true);
          this.canVote = false;
          this.getList(this.userid);
          Toast({
            message: "投票成功",
            duration: 5000
          });
        } else {
          Toast({
            message: "只能投票一次哦~",
            duration: 5000
          });
        }

        this.goAnchor("#anchor");
      } else {
        Toast({
          message: "请在微信中打开",
          duration: 5000
        });
      }
    },
    getList(userId) {
      let data = `?activityID=1&urUnioniD=${userId}`;
      axios
        .get(api.list + data)
        .then(res => {
          const data = res.data;
          console.log(data);
          this.ticketList = data.voteList;
          let newArr = []
          for (let i = 0; i < data.voteList.length; i++) {
            let d = data.voteList[i].Value;
            newArr.push(d)
          }
          this.drawLine(newArr)
        })
        .catch(err => {
          Toast({
            message: "网络异常,请稍后再试",
            duration: 5000
          });
        });
    },
    postVote(index) {
      let data = `activityID=1&urUnioniD=${this.userid}&voteNumber=pic${index}&IP=${this.IP}`;
      axios.post(api.vote, data).then(res => {
        console.log(res);
      });
    },
    goAnchor(selector) {
      this.$el.querySelector(selector).scrollIntoView();
    },
    music() {
      // const src = 'http://www.ytmp3.cn/down/53718.mp3'
      const src = '../../../static/assets/01.mp3';
      const audio = document.getElementById("audio");
      audio.src = src;
      audio.play();
      audio.loop = true; //歌曲循环
    },
    drawLine(vdata) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "目前得票情况"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 1]
        },
        yAxis: {
          type: "category",
          inverse:true,
          data: ['作品.1', '作品.2', '作品.3', '作品.4', '作品.5', '作品.6', '作品.7', '作品.8', '作品.9', '作品.10', '作品.11', '作品.12', '作品.13', '作品.14', '作品.15', '作品.16', '作品.17', '作品.18', '作品.19', '作品.20', '作品.21'],
        },
        series: [
          {
            name: "目前得票情况",
            type: "bar",
            data: vdata
          }
        ]
      });
    }
  },
  created() {
    var ua = navigator.userAgent.toLowerCase();
    var v_weixin = "";
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      v_weixin = ua.split("micromessenger")[1];
      v_weixin = v_weixin.substring(1, 6);
      v_weixin = v_weixin.split(" ")[0];
      if (v_weixin.split(".").length == 2) {
        v_weixin = v_weixin + ".0";
      }
      this.isWechat = true;
    } else {
    }
    var cip = returnCitySN["cip"],
      cname = returnCitySN["cname"];
    this.IP = cip;
    this.userid = `${v_weixin}${cip}`;

    if (lockr.get("voted")) {
      this.canVote = false;
    } else {
      this.canVote = true;
    }
  },
  mounted() {
    this.getList(this.userid);
    this.music();
  }
};
</script>
<style lang="less">
.app {
  h4 {
    font-size: 34px;
    line-height: 90px;
  }
  ul {
    padding: 20px 25px 40px;
    li {
      border-bottom: 1px solid #ddd; /*no*/
      text-align: center;

      p {
        margin: 10px 0;
      }
    }
    li:nth-last-of-type(1) {
      border-bottom: none;
    }
  }
  .card {
    text-align: left;
    span {
      color: blue;
      font-size: 28px;
    }
  }
  .head {
    font-size: 30px;
  }
  .mint-button {
    height: 50px;
    line-height: 50px;
    width: 150px;
    margin: 10px 0;
  }
  .strong {
    color: red;
    font-size: 28px;
  }
}
#anchor {
  width: 100%;
}
.Chart {
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.4);
  // border-radius: 20px;
}
</style>
