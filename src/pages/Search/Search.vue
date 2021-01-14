<template>
  <div class="content">
    <Nav></Nav>
    <HeadNav></HeadNav>
    <div class="box_title">
      <p>{{this.total}} 条结果 | <span style="color: #9d232c">{{this.kw}}</span></p>
    </div>
    <div class="box">
      <div class="book_info">
        <div class="book_content" v-for="book in bookList">
          <router-link :to="{path: '/book',query:{isbn:book.isbn}}">
          <div class="book_content_img">
            <el-image
              style="width: 82%; height: 150px;margin:5px 9%"
              :src="book.picture"
              fit="fill"></el-image>
          </div>
          </router-link>
          <div class="book_content_info">
            <div class="book_name">{{book.bookName}}</div>
            <div class="book_list_content">作者: 	{{book.author}}</div>
            <div class="book_list_content">ISBN: 	{{book.isbn}}</div>
            <div class="book_list_content">出版社: 	{{book.publisher}}</div>
            <div class="book_list_content">出版时间: 	{{book.releaseTime}}</div>
            <div class="book_list_content">售价: 	{{book.price}}</div>
            <div>
              <el-button type="primary" icon="el-icon-shopping-cart-2" class="cartBtn">加入购物车</el-button>
              <el-button class="plainBtn" plain>立即购买</el-button>
            </div>
          </div>
        </div>
        <div class="block" v-if="total>0" style="float: right;padding: 0px 30px 10px">
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
        <div v-else style="width:100%;height: 50px;line-height: 50px;padding: 0px 20px">
          不好意思，此分类暂时还没有图书......
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
    import Nav from "../../components/Common/Nav";
    import HeadNav from "../../components/Common/HeadNav";
    import Footer from "../../components/Common/Footer";
    import CarouselBtn from "../../components/Index/CarouselBtn";
    import {reqGetBookList} from "../../api/book";

    export default {
        name: "Search",
        components:{CarouselBtn, Nav,HeadNav,Footer,CarouselBtn},
        data(){
            return{
                currentPage: 1,
                page_size: 10,
                total:100,
                kw:"关键词",
                type:0,
                bookList: [],
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getSortList() {

            },
            //得到图书列表
            getBookList(type,kw){
                reqGetBookList(type,kw).then(response=>{
                    if(response.errcode=='0'){
                        this.total = response.data.length;
                        console.log(this.total);
                        this.bookList = response.data;
                    }
                    console.log(response);
                }).catch(err=>{
                    console.log(err);
                })
            },

            //分页函数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page_size = val;
                this.getBookList(this.type,this.kw);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                console.log(this.currentPage+":"+this.page_size);
                this.getBookList(this.type,this.currentPage,this.page_size);
            },
        },
        created() {
            this.type = this.$route.query.type;
            this.kw = this.$route.query.kw;

            console.log(this.kw);

            this.getBookList(this.type,this.kw);
        },
    }
</script>

<style scoped>
  .content{
    background-color: #ffffff;
  }
  .box_title{
    margin: 10px auto;
    width: 1240px;
    color: #545c64;
    padding: 5px 10px;
  }
  .box{
    margin: 10px auto;
    width: 1240px;
  }
  .book_sort{
    margin: 10px 10px;
    width: 200px;
    float: left;
    border-right: 1px #f3f0e9 solid;
  }

  .book_info{
    margin: 10px 10px;
    width: 1000px;
    float: right;
    background-color: #f7f7f6;
  }
  .tab{
    width: 100%;
  }
  .tab_head{
    padding-left: 5px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f3f0e9;
    margin: 1px 0px;
  }
  .tab_list{
    padding-left: 5px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    margin: 1px 0px;
  }
  .tab_list:hover{
    background-color: #a0a9b1;
  }

  .book_content{
    border: 1px #f3f0e9 solid;
    padding: 5px;
    margin: 10px auto;
    width: 940px;
    height: 190px;
    max-height: 240px;
    line-height: 35px;
    border: 1px solid #cacaca;
    padding: 15px;
  }
  .book_content:hover{
    background-color: white;
  }

  .book_content_img{
    float: left;
    width: 150px;
    height: 160px;
    /*border: 1px solid black;*/
  }
  .book_content_info{
    float: right;
    width: 740px;
    height: 160px;
    color: black;
    /*border: 1px solid black;*/
  }


  .book_name{
    margin: 5px auto;
    width: 740px;
    line-height: 30px;
    font-size: 18px;
    color: #9d232c;
    overflow: hidden;
  }

  .book_list_content{
    width: 32%;
    display: inline-block;
    height: 20px;
    overflow: hidden;
    line-height: 18px;
    font-size: 14px;
  }

  .plainBtn{
    width: 100px;
    color: #9d232c;
    background-color: #f3f0e9;
    border: 1px #f3f0e9 solid;
    float: right;
    margin: 0px 5px;
    font-size: 14px;
  }
  .plainBtn:hover{
    background-color: white;
    color: #9d232c;
    border: 1px #b2bac2 solid;
  }
  .cartBtn{
    width: 140px;
    background-color: #9d232c;
    border: 1px #9d232c solid;
    float: right;
    margin: 0px 5px;
    font-size: 14px;
  }
  .cartBtn:hover{
    background-color: #f52b21;
  }
</style>

