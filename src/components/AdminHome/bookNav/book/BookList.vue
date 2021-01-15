<template>
  <div class="content">
    <el-card class="box-card" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small">
          查询
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 25px">
        <el-form :inline="true" :model="search" size="small" label-width="140px">
          <el-form-item label="书名">
            <el-input v-model="search.bookName"></el-input>
          </el-form-item>
          <el-form-item label="ISBN">
            <el-input v-model="search.isbn"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="search.author"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-cascader
              v-model="book.bookSort"
              :options="options"
              :props="{ checkStrictly: true }"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="出版社">
            <el-select v-model="book.publish" placeholder="请选择出版社" prop="publish">
              <el-option
                v-for="item in publishList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态">
            <el-select v-model="search.put" placeholder="请选择上架状态">
              <el-option label="上架" value="shanghai"></el-option>
              <el-option label=下架 value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        style="float: right"
        size="mini">
        添加
      </el-button>
    </el-card>

    <div class="table_content">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="编号"
          width="70"
          align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          label="图书图片"
          width="110"
          align="center">
          <template slot-scope="scope">
            <el-image style="height: 120px"
                      :src="scope.row.coverImg">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="bookName"
          label="书名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="isbn"
          label="isbn"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          align="center">
        </el-table-column>
        <el-table-column
          label="原价/售价"
          width="120" align="center">
          <template slot-scope="scope">
            原价：{{ scope.row.price }}元<br>
            售价：{{ scope.row.price }}元
          </template>
        </el-table-column>
        <el-table-column
          label="标签"
          width="120" align="center">
          <template slot-scope="scope">
            <span style="margin-right: 10px">上架</span>
            <el-switch v-model="scope.row.put" @change="handlePut($event,scope.row,scope.$index)"></el-switch>
            <span style="margin-right: 10px">新品</span>
            <el-switch v-model="scope.row.newProduct" @change="handleNew($event,scope.row,scope.$index)"></el-switch>
            <span style="margin-right: 10px" >推荐</span>
            <el-switch v-model="scope.row.recommend" @change="handleRec($event,scope.row,scope.$index)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="rank"
          label="排序"
          width="70" align="center">
        </el-table-column>
        <el-table-column
          prop="sales"
          label="销量"
          width="80" align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="160"
          align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="updateBook(scope.$index,scope.row)"
              >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 20px;width: 100%;">
      <div style="float: left;padding: 0px 0px 10px">
        <el-select v-model="operator" placeholder="批量操作">
          <el-option
            v-for="item in operates"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button
          style="margin-left: 10px"
          @click="operatorBook"
          type="primary"
          size="medium">
          确定
        </el-button>
      </div>
      <div class="block" style="float: right;padding: 0px 0px 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="page_size"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
    import {reqGetBookList,reqModifyPut,reqModifyRec,reqModifyNew} from "../../../../api/book";
    import axios from 'axios';
    import qs from 'qs';
    export default {
        name: "BookList",
        data(){
            return{
                loading: true,
                currentPage: 1,
                page_size: 5,
                tableData: [],
                total:null,
                book: {
                    id: null,
                    bookName: '',
                    author: '',
                    isbn: '',
                    publisher: '',
                    releaseTime: '',
                    price: '',
                    remainNum: '',
                    description: '',
                    ImgSrc: [],
                    put: true,
                    coverImg: '',
                    rank: '',
                    newProduct: true,
                    recommend: true,
                    bookSort: [],//图书分类的绑定值
                },
                search: {
                    bookName: '',
                    author: '',
                    isbn: '',
                    publisher: '',
                    put: '',
                    bookSort: '',
                },
                publishList: [],//出版社下拉选择器
                options: [],//图书分类的联机选择器

                operator: null,
                //批量操作
                operates: [
                    {
                        label: "批量删除",
                        value: "del"
                    },
                    {
                        label: "批量上架",
                        value: "put"
                    },
                    {
                        label: "批量下架",
                        value: "putOff"
                    },
                    {
                        label: "设为推荐",
                        value: "recommend"
                    },
                    {
                        label: "取消推荐",
                        value: "recommendOff"
                    },
                    {
                        label: "设为新品",
                        value: "newProduct"
                    },
                    {
                        label: "取消新品",
                        value: "newProductOff"
                    }
                ],
                multipleSelection: []
            }
        },
        created:function () {
            this.GetSort(1,5);
            console.log("init起作用了！")
        },
        methods: {
            //处理选项框的操作，获取表格中哪些选项被选中
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            operatorBook(){
                if(this.multipleSelection.length<1){
                    this.$message({
                        type: 'warning',
                        message: "请至少选择一项进行操作"
                    })
                }else{
                    let dataList = [];
                    for(let i=0;i<this.multipleSelection.length;i++){
                        dataList.push(this.multipleSelection[i].id);
                    }
                    console.log(this.operator);
                    let formData = new FormData();
                    formData.append("ids", dataList);
                    formData.append("operator",this.operator);

                }
            },


            //获取图书的分类值
            handleChange(bookSort) {
                console.log("图书的分类是:"+bookSort[0],bookSort[1]);
            },


            //分页函数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page_size = val;
                this.GetSort(1,this.page_size);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                console.log(this.currentPage+":"+this.page_size);
                this.GetSort(this.currentPage,this.page_size);
            },
            //得到图书列表
            GetSort(page,pageSize){
                this.loading=false;
                reqGetBookList(page,pageSize).then(response=>{
                    if(response.errcode=='0'){
                        this.total = response.total;
                        console.log(this.total);
                        this.tableData = response.bookList;
                    }
                    console.log(response);
                }).catch(err=>{
                    console.log(err);
                })
            },


            //操作表格
            updateBook(index,row){
                console.log("row.id:"+row.isbn);
                this.$router.push({
                    path: "/admin/updateBook",
                    query: {
                        id: row.id
                    }
                })
            },

            //处理是否显示滑块的改变
            handlePut(e,row,index){
                console.log(row.put);
                reqModifyPut(row.id,row.put).then(response=>{
                    console.log(response);
                    if(response.errcode=='0'){
                        this.$message({
                            message: response.errmsg,
                            type: "success"
                        })
                    }else{
                        this.$message({
                            message: response.errmsg,
                            type: "warning"
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },

            handleRec(e,row,index){
                console.log(row.put);
                reqModifyRec(row.id,row.recommend).then(response=>{
                    console.log(response);
                    if(response.errcode=='0'){
                        this.$message({
                            message: response.errmsg,
                            type: "success"
                        })
                    }else{
                        this.$message({
                            message: response.errmsg,
                            type: "warning"
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            handleNew(e,row,index){
                console.log(row.put);
                reqModifyNew(row.id,row.newProduct).then(response=>{
                    console.log(response);
                    if(response.errcode=='0'){
                        this.$message({
                            message: response.errmsg,
                            type: "success"
                        })
                    }else{
                        this.$message({
                            message: response.errmsg,
                            type: "warning"
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },

        }

    }
</script>

<style scoped>
.content{
  margin: 0px auto;
  width: 100%;
}
.box-card{
  margin-top: 20px;
  width: 100%;
}
.table_content{
  width: 100%;
  margin-top: 20px;
}


/deep/ .el-input__inner {
  padding-right: 0px;
}

</style>
