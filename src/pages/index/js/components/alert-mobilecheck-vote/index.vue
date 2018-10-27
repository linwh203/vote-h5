<style lang="less" src="./index.less" scoped></style>
<template>
    <div class="mobilecheck">
        <h2 class="mobilecheck__title">预测冠军</h2>
        <div class="mobilecheck__form">
            <div class="mobilecheck__form-voteword">
                我预测 <span>{{showEventName}}</span> 项目的冠军国家是
            </div>
            <div class="mobilecheck__form-voteflag">
                <img v-bind:src="chosenNationFlag">
            </div>
            <div class="mobilecheck__form-votenation">{{chosenNationName}}</div>

            <div class="mobilecheck__form-btngroup">
                <button class="mobilecheck__form-btngroup-cancel" @click="close">再想想</button>
                <button class="mobilecheck__form-btngroup-confirm" @click="vote">就选TA</button>
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
            eventId: {
                type: Number,
                default: 1
            },
            chosenNationFlag: {
                type: String,
                default: ''
            },
            chosenNationName: {
                type: String,
                default: ''
            }
        },
        data () {
            return {

            }
        },
        computed: {
            fromid(){
                return GetQueryString('ali_from') || '';
            },
            showEventName() {
                if (this.eventId == 1) {
                    return 'DOTA2';
                }
                else if (this.eventId == 2) {
                    return 'CS:GO';
                }
                else if (this.eventId == 3) {
                    return '炉石传说';
                }
                else if (this.eventId == 4) {
                    return '星际争霸';
                }
            }
        },
        methods: {
            close(){
                this.$emit('closeBox', false);
            },
            vote(){
                this.$emit('confirmVote');
            }
        },
        created(){
            console.log(this.chosenNationFlag);
            console.log(this.eventId);
        }
    }
</script>

