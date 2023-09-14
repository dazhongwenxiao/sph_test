<template>
  <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container" @mouseenter="enterShow" @mouseleave="leaveShow">
            <h2 class="all">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- 三级联动 -->
            <!-- 过度动画 -->
            <transition name="sort"> 
                <div class="sort" v-show="this.show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="c1 in categoryList " :key="c1.categoryId">
                            <h3>
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                            </h3>
                            <!-- 二级、三级分类 -->
                            <div class="item-list clearfix">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>

import {mapState} from 'vuex'

    export default {
        name: 'TypeNav',
        data(){
            return {
                show: true
            }
        },
        // 组件挂载完毕：可以向服务器发请求
        mounted(){

            // 当挂载完毕，让show属性变为false
            // 如果不是Home路由组件，将TypeNav进行隐藏
            if(this.$route.path != '/home'){
                this.show = false
            }
        },
        computed: {
            ...mapState({
                // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
                // 注入一个参数state，其实即为大仓库中的数据
                categoryList: (state)=>{
                    return state.home.categoryList
                }
            })
        },
        methods: {
            goSearch(event){
                let element = event.target
                // 最好的解决方案：编程式导航 + 事件委派
                // 利用事件委派存在一些问题：点击的一定是a标签、如何获取参数

                // 第一个问题：把子节点当中a标签，我加上自定义属性data-categoryName，其余的子节点是没有的
                // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
                let {categoryname,category1id,category2id,category3id} = element.dataset
                if(categoryname){
                    // 整理路由跳转参数
                    let location = {name: 'search'}
                    let query = {categoryName: categoryname}
                    if(category1id){
                        query.category1Id = category1id
                    }else if(category2id){
                        query.category2Id = category2id
                    }else if(category3id){
                        query.category3Id = category3id
                    }

                    // 判断：如果路由跳转的时候，带有params参数，捎带者传递过去
                    if(this.$route.params){
                        // 整理完整参数
                        location.params = this.$route.params
                        location.query = query
                        // 路由跳转
                        this.$router.push(location)
                    }

                }

            },
                // 当鼠标进入的时候，让商品分类列表进行显示
            enterShow(){
                this.show = true
            },
            // 当鼠标离开的时候，让商品分类列表进行隐藏
            leaveShow(){
                if(this.$route.path != '/home'){
                    this.show = false
                }        
            }
            

        }
    }
</script>

<style scope lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                            text-decoration: none;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        background-color: skyblue;
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }

        // 过度动画的样式
        // 过度动画进入的开始状态
        .sort-enter,.sort-leave-to{
            height: 0;
        }
        // 过度动画结束状态
        .sort-enter-to,.sort-leave{
            height: 461px;
        }
        // 定义动画时间、速率
        .sort-enter-active,.sort-leave-active{
            transition: all .5s linear;
        }
    }
}
</style>