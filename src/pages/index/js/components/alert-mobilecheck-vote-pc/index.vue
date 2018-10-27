<style lang="less" src="./index.less" scoped></style>
<template>
    <div class="mobilecheck">
        <h2 class="mobilecheck__title">预测冠军</h2>
        <div class="mobilecheck__form">
            <div class="mobilecheck__form-voteword">
                我预测 <span :class="['mobilecheck__form-voteword-icon',{'icon-dota':isDota,'icon-cs':isCSGO,'icon-hs':isHS,'icon-sc':isSC}]"></span><span>{{showEventName}}项目</span> 的冠军国家是
            </div>
            <div class="mobilecheck__form-voteflag">
                <img v-bind:src="chosenNationFlag">
            </div>
            <div class="mobilecheck__form-votenation">{{chosenNationName}}</div>

            <button class="mobilecheck__form-voteconfirm" @click="vote">确认了，就选TA</button>

            <div class="mobilecheck__form-votetip">确认所选国家后不可以再修改哦~</div>
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
                isDota: false,
                isCSGO: false,
                isHS: false,
                isSC: false
            }
        },
        computed: {
            fromid(){
                return GetQueryString('ali_from') || '';
            },
            showEventName() {
                if (this.eventId == 1) {
                    this.isDota = true;
                    this.isCSGO = false;
                    this.isHS = false;
                    this.isSC = false;
                    return 'DOTA2';
                }
                else if (this.eventId == 2) {
                    this.isDota = false;
                    this.isCSGO = true;
                    this.isHS = false;
                    this.isSC = false;
                    return 'CS:GO';
                }
                else if (this.eventId == 3) {
                    this.isDota = false;
                    this.isCSGO = false;
                    this.isHS = true;
                    this.isSC = false;
                    return '炉石传说';
                }
                else if (this.eventId == 4) {
                    this.isDota = false;
                    this.isCSGO = false;
                    this.isHS = false;
                    this.isSC = true;
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
        created() {

        }
    }
</script>

