<template>
  <div>
    <!-- 三级联动的全局组件 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor/>
    <Brand/>
  </div>
</template>

<script>
// 引入其余组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

    export default {
      // eslint-disable-next-line vue/multi-word-component-names
      name: 'Home',
      components: {
        ListContainer
        ,Recommend
        ,Rank
        ,Like
        ,Floor
        ,Brand
      },
      // mounted(){
      //   this.$store.dispatch('getUserInfo')
      // }
    }
</script>

<style>

</style>