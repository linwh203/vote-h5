<style lang="less" src="./index.less" scoped></style>
<template>
    <div class="vote-box">
        <div class="vote-box-item" v-for="(item,index) in playerData" :key="index">
            <div class="vote-box-item-img">
                <img v-lazy="item.preview">
            </div>
            <div class="vote-box-item-name">
                <h2>{{item.name}}</h2>
                <h5>{{item.name_en}}</h5>
            </div>
            <div class="vote-box-item-btn" @click="voting(item.id,item.game_id,item.preview,item.name)">
                预测冠军
            </div>
        </div>

        <!--<div class="vote-box-itemempty" v-for="item in restData">
            <div class="vote-box-item-img">

            </div>
            <div class="vote-box-item-name">

            </div>
            <div class="vote-box-item-vote">

            </div>
            <div class="vote-box-itemempty-btn">

            </div>
        </div>-->
    </div>
</template>

<script type="text/babel">

    export default {
        components: {},
        props: {
            isLogin: {
                type: Boolean,
                default: false
            },
            playerData: {
                type: Array,
                default: []
            }
        },
        computed: {
            restData: function () {
                let restLen = this.playerData.length % 4;

                let restData = [];

                for (let i = 0; i < restLen; i++) {
                    restData.push({});
                }

                console.log('restData', restData);

                return restData;
            }
        },
        data () {
            return {
                img: "http://img1.imgtn.bdimg.com/it/u=3633406756,3554355571&fm=206&gp=0.jpg",
                isRule: false,
            }
        },
        methods: {
            goUrl(url){
                location.href = url;
            },
            voting(...args){
                this.$emit('vote', ...args);
            }
        },
        created(){
            console.log(this.playerData);
        },
        mounted() {
            console.log(this.playerData);

        }
    }
</script>

