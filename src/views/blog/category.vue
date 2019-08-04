<template>
  <div style="padding: 10px;">
    <el-form  style="margin-left: 100px;" :inline="true" :rules="rules"  class="demo-form-inline">
      <el-form-item label="新增" prop="cname">
        <el-input v-model="category.cname"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="flag">
        <el-select v-model="category.flag" placeholder="选择需要新增的类型">
          <el-option label="类别" value="1"></el-option>
          <el-option label="书签" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
    <div style="padding-top: 10px;width: 1306px;display: flex;justify-content: space-around;align-items: start">
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>类别管理</span>
        </div>
        <div  class="text item">
          <el-table
            :data="categorys"
            style="width: 100%">
            <el-table-column
              label="类别名称"
              prop="cname">
            </el-table-column>
            <el-table-column
              label="类别下文章数量"
              prop="articleNum"
              :formatter="formatNum">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteCa(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card" >
        <div slot="header" class="clearfix">
          <span>标签管理</span>
        </div>
        <div  class="text item">
          <el-table
            :data="tags"
            style="width: 100%">
            <el-table-column
              label="标签名称"
              prop="cname">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteTag(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import  qs from  'qs'
  export default {
    data(){
      return {
        category: {
          cname: '',
          flag: '',
        },
        categorys:[],
        tags:[],
        rules: {
          flag:[
            { required: true, message: '请选择类别', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      this.fetchData();
    },
    methods:{
      formatNum(row, column, cellValue, index){
        if(parseInt(cellValue)>0){
          return  '共'+cellValue+'篇文章';
        }
        return '暂无文章'
      },
      fetchData(){
        this.$axios.get("/admin/category/articleNum").then(res=>{
            if(res.data.code==200){
              this.categorys=res.data.data;
            }
        })
        this.$axios.get("/admin/category/tag").then(res=>{
            if(res.data.code==200){
              this.tags=res.data.data;
            }
        })
      },
      onSubmit(){
        this.$axios.post("/admin/category/add",qs.stringify(this.category)).then(res=>{
            if(res.data.code==200){
              this.$message("新增成功")
              this.category={};
              this.fetchData();      // 刷新数据
            }
        })
      },
      handleDeleteCa(index, row) {
        if(row.articleNum>0) {
          this.$alert('该类别下有文章，不能删除！', '提示', {
            confirmButtonText: '确定',
          });
          return;
        }
        this.$confirm('确认删除该标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get("/admin/category/delete?cid="+row.cid+"&flag=1").then(res=>{
            if(res.data.code==200){
              this.$message({
                type:'success',
                message:"删除成功"
              })
              this.fetchData();
            }
          })
        })

      },
      handleDeleteTag(index, row) {
        this.$confirm('确认删除该标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get("/admin/category/delete?cid="+row.caid+"&flag=2").then(res=>{
            if(res.data.code=200){
              this.$message({
                type:'success',
                message:"删除成功"
              })
              this.fetchData();
            }
          })
        });
      }
    }
  }
</script>

<style scoped>
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
