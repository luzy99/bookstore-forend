<template>
  <div class="headNav">
    <div class="content">
      <div style="float: left">
        <div style="width: 232px; height: 40px;vertical-align: middle;font-family: 宋体;font-size: 38px;font-style: italic">
          志文书店
        </div>
      </div>
      <div style="float: right">
        <el-input placeholder="书名、作者、出版社、ISBN" v-model="input" class="input-with-select" style="width: 500px;height: 40px;">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="书名" value="1"></el-option>
            <el-option label="作者" value="2"></el-option>
            <el-option label="出版社" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="onSubmit"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "HeadNav",
        data() {
            return {
                input: "",
                select: "1"
            }
        },
        methods:{
          onSubmit(){
            this.$router.push({
                    path: "/search",
                    query: {
                        type: Number(this.select),
                        kw: this.input
                    }
                })
          }
        }
    }
</script>

<style scoped>

  .headNav{
    width: 100%;
    background-color: #f2f1ea;
    line-height: 100px;
    clear: both;
  }
  .content{
    margin: 0px auto;
    width: 1240px;
    height: 100px;
    background-color: #f2f1ea;
  }
  .el-select {
    width: 110px;
  }
</style>
