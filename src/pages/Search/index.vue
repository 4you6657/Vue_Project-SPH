<template>
  <div>
    <h1>params参数：{{$route.params.keyWord}}||传递props后可直接调keyWord：{{ keyWord }}</h1>
    <h1>query参数：{{$route.query.k}}||传递props后可直接调key：{{ k }}</h1>
  </div>
</template>

<script>
export default {
  name:'',
  //路由组件可以传递props
  props:['keyWord','k']
}
</script>

<style>

</style>