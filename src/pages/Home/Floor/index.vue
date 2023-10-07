<template>
  <!--楼层-->
    <div class="floor">
        <div class="py-container" v-for="carousel in floorList" :key="carousel.id">
            <div class="title clearfix">
                <h3 class="fl">{{carousel.name}}</h3>
                <div class="fr">
                    <ul class="nav-tabs clearfix" v-for="(c1,index) in carousel.navList" :key="index">
                        <li class="active">
                            <a href="#tab1" data-toggle="tab">{{c1.text}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane">
                    <div class="floor-1">
                        <div class="blockgary">
                            <ul class="jd-list">
                                <li>{{carousel.keywords[0]}}</li>
                                <li>{{carousel.keywords[1]}}</li>
                                <li>{{carousel.keywords[2]}}</li>
                                <li>{{carousel.keywords[3]}}</li>
                                <li>{{carousel.keywords[4]}}</li>
                                <li>{{carousel.keywords[5]}}</li>
                            </ul>
                            <img :src="carousel.imgUrl" />
                        </div>
                        <div class="floorBanner">
                            <div class="swiper-container" ref="floor1Swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="c2 in carousel.carouselList" :key="c2.id">
                                        <img :src="c2.imgUrl">
                                    </div>
                                </div>
                                <!-- 如果需要分页器 -->
                                <div class="swiper-pagination"></div>

                                <!-- 如果需要导航按钮 -->
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            </div>
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit">
                                <img :src="carousel.recommendList[0]" />
                            </div>
                            <div class="floor-conver-pit">
                                <img :src="carousel.recommendList[1]" />
                            </div>
                        </div>
                        <div class="split center">
                            <img :src="carousel.bigImg" />
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit">
                                <img :src="carousel.recommendList[2]" />
                            </div>
                            <div class="floor-conver-pit">
                                <img :src="carousel.recommendList[3]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Swiper from 'swiper'
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Floor',
        mounted(){
            // 派发action：通过Vuex发起ajax请求，将数据仓库存储在仓库中
            this.$store.dispatch('getFloorList')
        },
        computed:{
            ...mapState({
                floorList:(state)=>{
                    return state.home.floorList
                }
            })
        },
        watch: {
            // 监听floorList数据的变化，因为这条数据发生过变化---由空数组变为数组里面有四个元素
            floorList: {
                handler(){
                    // 现在咱们通过watch监听bannerList属性的属性值变化
                    // 如果执行handler方法，代表组件实例身上这个属性已经有了
                    // v-for执行完毕，才有结构
                    this.$nextTick(()=>{
                        var mySwiper = new Swiper(this.$refs.floor1Swiper, {
                            loop: true,
                            autoplay:true,
                            // 如果需要分页器
                            pagination: {
                                el: ".swiper-pagination"
                            },
                            // 如果需要前进后退
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev"
                            }
                        })
                    })
                },
                deep: true
            }
        }
        
    }
</script>

<style scope lang="less">
.floor {
    margin-top: 15px;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .title {
            .fl {
                float: left;
                color: #c81623;
                font-size: 20px;
                line-height: 30px;
                margin: 9px 0;
                font-weight: 700;
            }

            .fr {
                float: right;

                .nav-tabs {
                    margin: 10px 0 0;
                    display: inline-block;

                    li {
                        float: left;
                        line-height: 18px;

                        a {
                            padding-top: 1px;
                            font-weight: 400;
                            background-color: #fff;

                            &::after {
                                content: "|";
                                padding: 0 10px;
                            }
                        }

                        &:nth-child(7) {
                            a {
                                &::after {
                                    content: "";
                                }
                            }
                        }

                        &.active {
                            a {
                                color: #e1251b;
                            }
                        }
                    }
                }
            }
        }

        .tab-content {
            border-top: 2px solid #c81623;
            border-bottom: 1px solid #e4e4e4;

            .tab-pane {
                .floor-1 {
                    height: 360px;
                    display: flex;

                    .blockgary {
                        width: 210px;
                        height: 100%;
                        background: #f7f7f7;

                        .jd-list {
                            padding: 15px 0;
                            overflow: hidden;

                            li {
                                list-style-type: none;
                                float: left;
                                width: 40%;
                                margin: 0 10px;
                                border-bottom: 1px solid #e4e4e4;
                                text-align: center;
                                line-height: 26px;
                            }
                        }

                        img {
                            width: 100%;
                        }
                    }

                    .floorBanner {
                        width: 330px;
                        height: 100%;
                    }

                    .split {
                        width: 220px;
                        height: 100%;
                        position: relative;

                        .floor-x-line {
                            position: absolute;
                            background: #e4e4e4;
                            width: 220px;
                            height: 1px;
                            top: 180px;
                        }

                        .floor-conver-pit {
                            width: 100%;
                            height: 50%;

                            img {
                                width: 100%;
                                height: 100%;
                                transition: all 400ms;

                                &:hover {
                                    opacity: 0.8;
                                }
                            }
                        }
                    }

                    .center {
                        border: 1px solid #e4e4e4;
                    }
                }
            }
        }
    }
}
</style>