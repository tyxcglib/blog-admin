<template>
  <div style="padding: 10px">
  <el-table
    :data="articleList"
    style="width: 100%;">
    <el-table-column
      label="标题"
      prop="title"
      width="160px">
    </el-table-column>
    <el-table-column
      label="类别"
      prop="categoryName"
      width="140px">
    </el-table-column>
    <el-table-column
      label="标签"
      prop="tags"
      width="230px">
    <template slot-scope="scope">
      <el-tag  v-for="(item,index) in scope.row.tags"  :type="getType(index)" style="padding:0 5px;margin: 2px">
        {{item}}
      </el-tag>
    </template>
    </el-table-column>
    <el-table-column
      label="评论数"
      prop="commentsNum"
      width="140px">
    </el-table-column>
    <el-table-column
      label="浏览数"
      prop="hits"
      width="140px">
    </el-table-column>
    <el-table-column
      label="发布时间"
      prop="created" :formatter="formatDate"
      width="140px">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="block" style="width: 500px;margin: 0 auto;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,15]"
        :page-size="pageSize"
        :pager-count="5"
        layout="prev, pager, next,sizes"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import  moment from  'moment'
  export default {
    data() {
      return {
        articleList: [],
        currentPage: 1,
        pageSize:5,  //  每页显示个数 ,不需要赋值
        total:100    // 总记录数
      }
    },
    created(){
      this.fetchData();
    },
    methods: {
      fetchData(){
        this.$axios.get("/admin/blog/manageArticle").then(res=>{
            this.articleList=res.data.articleList;
            this.total=res.data.total;
        })
      },
      handleEdit(index, row) {
        this.$router.push("modify/"+row.id);
      },
      handleDelete(index, row) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get("/admin/blog/delete?id="+row.id,function(res) {
                if(res.data.code==200){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
          })
        });
      },
      handleSizeChange(val) {
        this.$axios.get("/admin/blog/manageArticle?limit="+val).then(res=>{
            this.articleList=res.data.articleList;
        })
      },
      handleCurrentChange(val) {
        this.$axios.get("/admin/blog/manageArticle?page="+val).then(res=>{
            this.articleList=res.data.articleList;
            this.total=res.data.total;
        })
      },
      formatDate(row, column, cellValue, index){
        return moment(cellValue).format("YYYY-MM-DD");
      },
      // 设置标签颜色
      getType:function(index) {
        var colorArr=['','info','success','danger'];
        let arrIndex=parseInt(Math.random()*(colorArr.length+1));
        return colorArr[arrIndex];
      }
    },
  }
</script>

<style scoped>

</style>
