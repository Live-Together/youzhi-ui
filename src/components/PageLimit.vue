<template>
  <div>
    <el-pagination
    layout="prev, pager, next"
    :total=total
    :current-page.sync=pageIndex
    style="float:right; margin-right: 150px; margin-top:10px"
    background
    ></el-pagination>
  </div>
</template>

<script>
export default {
    data(){
      return {
      }
    },
    computed: {
        pageIndex:{
          get(){
            return this.$store.state.pageIndex
          },
          set(val){
            this.$store.commit("changePageIndex", val)
          }
        }
    },
    props:['total'],
}
</script>

<style scoped>

</style>x