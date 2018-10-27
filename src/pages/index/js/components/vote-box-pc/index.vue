<style lang="less" src="./index.less" scoped></style>
<template>
    <div class="vote-box">
        <div class="vote-box-item" v-for="(item,index) in playerData" :key="index">
            <div class="vote-box-item-container">
                <div class="vote-box-item-img">
                    <img v-lazy="item.preview">
                </div>
                <div class="vote-box-item-modal">
                    <div class="vote-box-item-btn" @click="voting(item.id,item.game_id,item.preview,item.name)">
                        预测冠军
                    </div>
                </div>
            </div>
            <div class="vote-box-item-name">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
        components:{

        },
        props:{
            isLogin: {
                type:Boolean,
                default:false
            },
            playerData:{
                type:Array,
                default:[]
            }
        },
        computed: {

        },
        data () {
            return {
                img:"http://img1.imgtn.bdimg.com/it/u=3633406756,3554355571&fm=206&gp=0.jpg",
                isRule:false,
                mouseenter:false,
                mouseleave:true
            }
        },
        methods: {
            goUrl(url){
                location.href = url;
            },
            voting(...args){
                console.log('votettt');

                this.$emit('vote',...args);
            },
            overShow(index){

            },
            outHide(index){

            }
        },
        created(){
            console.log('player Data', this.playerData);
        }
    }
</script>

