<template>
  <div class="pagination">
    <!-- 上 -->
    <button 
      :disabled="pageNo == 1"
      @click="$emit('getPageNo', pageNo-1)"
    >上一页</button>

    <button 
      v-if="startAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{active: pageNo == 1}"
    >1</button>

    <button v-if="startAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startEnd" :key="index"
      @click="$emit('getPageNo', page)"
      :class="{active: pageNo == page}"
    >{{page}}</button>
  
    <!-- 下 -->
    <button v-if="startAndEndNum.end < totalPage-1">···</button>

    <button 
      v-if="startAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active: pageNo == totalPage}"
    >{{totalPage}}</button>

    <button 
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo+1)"
    >下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
    export default {
        name: 'Pagination',
        props: ['pageNo','pageSize','total','continues'],
        computed: {
            // 计算出总页数
            totalPage(){
                return Math.ceil(this.total/this.pageSize)
            },
            // 计算出连续的页码的起始数字与结束数字
            startAndEndNum(){
                // 先定义两个变量存储起始数字与结束数字
                let start = 0, end = 0
                // 连续页码数字5（至少5页，如果不够则是不正常现象）
                if(this.continues > this.totalPage){
                    start = 1
                    end = this.totalPage
                }else{
                    // 正常现象
                    start = this.pageNo - parseInt(this.continues/2)
                    end = this.pageNo + parseInt(this.continues/2)
                    if(start < 1){
                        start = 1
                        end = this.continues
                    }
                    if(end > this.totalPage){
                        end = this.totalPage
                        start = this.totalPage - this.continues + 1
                    }
                }
                return {start, end}
            },
            // 筛选符合条件的连续页码
            startEnd(){
              let arr = []
              for(let i = this.startAndEndNum.start; i< this.startAndEndNum.end;i++){
                arr.push(i)
              }
              return arr
            }
        }
    }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
