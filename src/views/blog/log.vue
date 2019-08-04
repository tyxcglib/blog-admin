<template>
  <div style="margin: 0;padding: 10px;width: 60%">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="系统日志" name="system">
        <el-table
          :data="system.list"
          stripe
          style="width: 100%">
          <el-table-column
            prop="happenTime"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="who"
            label="操作人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="something"
            label="事件"
            width="280">
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="system.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="错误日志" name="erro">
        <el-table
          :data="erro.list"
          stripe
          style="width: 100%">
          <el-table-column
            prop="happenTime"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="who"
            label="异常类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="something"
            label="事件记录"
            width="280">
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="erro.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="访问日志" name="watch">
        <el-table
          :data="watch.list"
          stripe
          style="width: 100%">
          <el-table-column
            prop="happenTime"
            label="访问时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="who"
            label="对方IP"
            width="180">
          </el-table-column>
          <el-table-column
            prop="place"
            label="对方地址"
            width="280px">
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="watch.total"
          >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(tab, event) {
        this.fetchData();
      },
      fetchData(){
        if(this.activeName=='system'){
          this.$axios.get("/admin/log/findAll?category=系统日志").then(res=>{
            this.system.data=res.data.data;
          })
        }
        else if(this.activeName=='watch'){
          this.$axios.get("/admin/log/findAll?category=访问日志").then(res=>{
            this.watch=res.data.data;
          })
        }
        else {
          this.$axios.get("/admin/log/findAll?category=错误日志").then(res=>{
            this.erro.data=res.data.data;
          })
        }
      }
    },
    created(){
      this.fetchData();
    },
    data() {
      return {
        activeName: 'system',
        system:{
          total:'',
          list:[]
        },
        erro:{
          total:'',
          list:[]
        },
        watch:{
          total:'',
          list:[]
        }
      }
    }
  }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
