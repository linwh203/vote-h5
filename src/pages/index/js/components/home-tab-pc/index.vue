<style lang="less" src="./index.less" scoped></style>
<template>
    <div class="home-tab">
        <div class="home-tab__top">
            <div class="home-tab__top-content">

                <div class="home-tab__top-content-tasklink" @click="openRuleBlock">
                    活动规则
                </div>

                <div class="home-tab__top-content-stat" v-if="!isLogin">
                    <button @click="goLogin" class="home-tab__top-content-stat-login">登录参加活动</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import router from '@/vote-wesg/js/router';

    export default {
        components: {},
        props: {
            isLogin: {
                type: Boolean,
                default: false
            },
            tickets: {
                type: [String, Number],
                default: 0
            }
        },
        computed: {},
        data () {
            return {
                isVote: this.$route.name == 'vote' ? true : false,
                show: true
            }
        },
        methods: {
            goLogin(){
                this.$emit('goLogin', false);
            },
            goUrl(url){
                location.href = url;
            },
            openRuleBlock(){
                this.$emit('openRuleBlock');
            }
        },
        created(){

        }
    }
</script>

