<template>
  <div class="pagination">
    <!-- 分页器上半部分 -->
    <!-- 当前页码等于1，则不可以操作‘上一页’按钮 -->
    <button :disabled="pageNo == 1" @click="$emit('getCurrentPage', pageNo - 1)">上一页</button>
    <!-- 只有start 大于1 才显示button 1 -->
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getCurrentPage', 1)" :class="{ active: pageNo == 1 }">1</button>
    <!-- 只有start 大于2才 才显示省略号 ... -->
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 分页器的中间部分（连续页码） -->
    <button 
    v-for="(page, index) in startNumAndEndNum.end" 
    :key="index" 
    v-if="page >= startNumAndEndNum.start" 
    @click="$emit('getCurrentPage', page)" 
    :class="{ active: pageNo == page }"
    >
    {{ page }}
  </button>

    <!-- 分页器下半部分 -->、
    <!-- 只有 end < totalPage-1 才显示 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <!-- 只有 end < totalPage 才显示 -->
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getCurrentPage', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <!-- 当前页码等于总页码就不可操作 -->
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getCurrentPage', pageNo + 1)"
    >
      下一页
    </button>

    <!-- 记录总条数 -->
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  //父组件传递给子组建：当前页、每一页展示多少条数据、数据总个数、连续页码数。
  props: ["total", "pageSize", "pageNo", "continues"],
  computed: {
    /* 
    总页码数totalPage
    依赖数据：总数量：total、单页容纳数量：pageSize
     */
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    /*
    返回连续页码的开始页码数(start)与结束页码数(end): 
    比如: {start: 3, end: 7}
    依赖数据:当前页码: pageNo: continues、总页码数: totalPage
    注意:
        start的最小值为1
        end的最大值为totalPage
        start与end之间的最大差值为continues-1
     */
    startNumAndEndNum() {
      //解构出连续的页码数、当前页码、总页数
      const { continues, pageNo, totalPage } = this;
      //先定义两个变量，存储起始页码数与结束页码数
      let start = 0;
      let end = 0;
      
      //假如：当前共有6条数据，每一页展示3条数据 ==> 分页器一共有2页
      //连续的页码为5[表示至少得有5页数据]，如果一共只有<=5页的数据怎么办？
      if (totalPage<continues ) {
        //不正常现象[总页数2＜规定的连续页码数5]
        start = 1;
        end = totalPage;
      } else {
        //正常现象[总页数＞规定的连续页码数5]
        start = pageNo - parseInt(continues / 2); //起始页码数
        end = pageNo + parseInt(continues / 2); //结束页码数
        
        //处理异常情况1：start<1
        if (start < 1) {
          start = 1;
          end = continues;
        }

        //处理异常情况2：end>totalPage
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      //算出了起始页码数和结束页码数
      return { start, end };
    },
  },
  methods: {
    /**
     * 将当前页码改变为指定页码
     */
  },
};
</script>

<style scoped lang="less">
.pagination {
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

.active {
  background-color: skyblue;
}
</style>
