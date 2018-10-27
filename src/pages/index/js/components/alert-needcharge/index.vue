<style lang="less" src="./index.less" scoped></style>
<template>
    <!--<div class="needCharge">-->
    <!--<div class="needCharge__title">-->
    <!--<div class="img"><img v-lazy="img"></div>很遗憾-->
    <!--</div>-->
    <!--<div class="needCharge__text">-->
    <!--当前票数不足-->
    <!--</div>-->
    <!--<button class="needCharge__confirm"-->
    <!--@click="goBack">获取更多票数</button>-->
    <!--</div>-->

    <div class="mobilecheck">
        <h2 class="mobilecheck__title">投票</h2>
        <div class="mobilecheck__form">
            <div class="mobilecheck__form-mobile">很遗憾</div>
            <div class="mobilecheck__form-sessionid">当前票数不足</div>
            <button class="mobilecheck__form-confirm"
                    @click="goBack">获取更多票数
            </button>
        </div>
        <div class="mobilecheck__closeBtn" @click="close"></div>
    </div>
</template>

<script type="text/babel">
    import router from '@/vote-wesg/js/router';

    export default {
        data () {
            return {
                img: 'https://gw.alicdn.com/tfs/TB1NUtLRVXXXXcdXVXXXXXXXXXX-122-90.png'
            }
        },
        methods: {
            goBack(){
                this.$emit('goBack', 'hohoho');
            },
            close() {
                this.$emit('closeBox',false);
            }
        }
    }
</script>

