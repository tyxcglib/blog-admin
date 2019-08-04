<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <input type="hidden" v-model="form.id">
      <el-form-item label="标题" >
        <el-input v-model="form.title"  style="width: 300px;"/>
      </el-form-item >
      <el-form-item label="类别">
        <el-select v-model="form.category" placeholder="选择博客类别">
          <el-option v-for="category in categorys" :label="category.cname" :value="category.caid"/>
        </el-select>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-switch v-model="form.isTop"/>
      </el-form-item>
      <el-form-item label="文章标签" >
        <el-select
          style="width: 300px;"
          v-model="form.tag"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签">
          <el-option
            v-for="item in tags"
            :key="item.caid"
            :label="item.cname"
            :value="item.caid"
            >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面上传">
        <el-upload
          class="avatar-uploader"
          :action="uploadLocation"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      <el-form-item label="文章内容">
        <div id="main" >
          <mavon-editor ref="md" @imgAdd="imgAdd" v-model="form.content" style="height:  400px;"/>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import  moment from  'moment'
  import  qs from 'qs'
export default {
  data() {
    return {
      form: {
        id:'',
        title: '',
        category:'',
        isTop: false,
        tag:[],  // 选中的标签
        imgUrl: '',
        content: '',
      },
      tags: [],
      categorys:[],
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: false, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
        boxShadow: false
    },
      uploadLocation:'http://localhost:8888/admin/blog/uploadCover'
  }},
  methods: {
    imgAdd (pos, file) {
// 上传图片
      var formData = new FormData()
      formData.append('image', file)
      this.$axios({
        url: '/admin/blog/uploadImg',//请求地址
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        this.$refs.md.$img2Url(pos,res.data.data.url)
      })},

    onSubmit() {
      var  formData=this.form;
      var htmlContent=document.getElementsByClassName("v-show-content-html scroll-style")[0].innerText;
      formData.htmlContent=htmlContent.trim()
      var orgTag=formData.tag;
      formData.tag=formData.tag.toString();
      if(this.form.id!=''){
        this.form.created=moment(this.form.created).format('YYYY-MM-DD HH:mm:ss')
      }
      this.$axios.post('/admin/blog/publish',qs.stringify(formData)).then(res=>{
          if(res.data.code==200){
            this.$message('保存成功!')
          }
      })
      formData.tag=orgTag;
    },
    onCancel() {
      this.form={
        id:'',
        title: '',
        category:'',
        isTop: false,
        tag:[],
        imgUrl: '',
        content: '',
      };
    },
    handleAvatarSuccess(res, file) {
      this.$message("上传成功")
        this.form.imgUrl =res.data.url;
    },
    fetchData:function() {
      this.$axios.get("/admin/category/find?flag=1").then(res=>{
        if(res.data.code==200){
          this.categorys=res.data.data;
        }
      })
      this.$axios.get("/admin/category/find?flag=2").then(res=>{
        if(res.data.code==200){
          this.tags=res.data.data;
        }
      })
    }
  },
  created() {
    // 获取类别 ,标签信息
    this.fetchData();
    // 判断是新增还是修改
    if(this.$route.params.id&&this.$route.params.id!='undifined'){
      this.$axios.get("/admin/blog/"+this.$route.params.id).then(res=>{
          if(res.data.code==200){
            this.form=res.data.data;
            this.form.isTop=eval(this.form.isTop)
            // 处理select默认值，注意数据类型
            let arr=res.data.data.tag.split(",")
            this.form.tag = arr.map(function(item) {
              return parseInt(item);
            })
          }
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
</style>

