<style lang="less" src="./index.less" scoped></style>
<template>
    <div class="mobilecheck">
        <h2 class="mobilecheck__title">活动规则</h2>
        <div class="mobilecheck__form">
            <div class="mobilecheck__form-rule">
                <p><span>1、</span>您可通过登录beyond电竞平台来参与本次活动，在活动页面中选择您认为可以夺冠的国家；</p>
                <p><span>2、</span>本次预测包含WESG的四个主要游戏项目：DOTA2、CSGO、星际争霸II、炉石传说。您只需猜中其中一个项目的冠军国家即可获得1680贝壳作为奖励。贝壳可作为参与beyond电竞平台其他游戏活动的通用货币；</p>
                <p><span>3、</span>活动截止时间：2018年3月17日  12:00；</p>
                <p><span>4、</span>每个项目只可选择一个国家作为您预测的冠军国家，选定后不可更改；</p>
                <p><span>5、</span>所有活动奖励将在活动结束后7个工作日内统一发放，请留意公布的公告；</p>
                <p><span>6、</span>Beyond电竞保留本次活动的最终解释权。</p>
            </div>
        </div>
        <div class="mobilecheck__closeBtn" @click="close"></div>
    </div>
</template>

<script type="text/babel">
    import router from '@/vote-wesg/js/router';
    import axios from 'axios';
    import api from '@/vote-wesg/js/libs/urlHost';
    import {GetQueryString} from '@/vote-wesg/js/libs/dateHelper';
    import {Toast} from 'mint-ui';

    export default {
        props: {

        },
        data () {
            return {

            }
        },
        computed: {

        },
        methods: {

            close(){
                this.$emit('closeBox', true);
            }
        },
        created() {

        }
    }
</script>

