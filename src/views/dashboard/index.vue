<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>网站消息</span>
    </div>
    <div class="text item">
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'Dashboard',
  computed: {
  }
}
</script>

<style  scoped>
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 480px;
  }
</style>
