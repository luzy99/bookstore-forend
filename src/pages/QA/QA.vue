<!--书籍详情页面-->
<template>
  <div class="content">
    <Nav></Nav>
    <HeadNav></HeadNav>
    <div class="section">
      <div class="help">
         <div class="help-title">
            <h1>F&amp;Q</h1>
         </div>
         <p>1. 该软件开发人员有哪些?</p> 
         <p>71118315 陆舟洋，71118316 钱会川， 71118317 徐志文</p> 

         <p>2.开发目的 ?</p> 
         <p>仅用于数据库大作业，学习使用</p> 
         
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
    import {reqGetBook} from "../../api/book";
    import {reqGetSortList} from "../../api/sort";
    import {reqAddCart} from "../../api/cart";
    import 'github-markdown-css'
    export default {
        name: "Book",
        components:{CarouselBtn, Nav,HeadNav,Footer,CarouselBtn},
        data(){
            return{
                result: "",
            }
        },
        methods: {
            
        },
        created() {

        }
    }
</script>

<style scoped>
  .content{
    background-color: #ffffff;
  }
  .box{
    margin: 10px auto;
    width: 1240px;
  }
  .book_box{
    height: 500px;
  }
  .book_img{
    margin: 10px;
    width: 450px;
    height: 480px;
    float: left;
  }
  .book_buy{
    margin: 10px;
    width: 750px;
    height: 480px;
    float: right;
    padding: 1px;
  }
  .book_buy_content{
    border: 1px #f3f0e9 solid;
    padding: 5px;
  }
  .book_content{
    margin: 10px auto;
    width: 740px;
    max-height: 120px;
    line-height: 35px;
  }

  .book_name{
    margin: 10px auto;
    width: 740px;
    line-height: 35px;
    font-size: 18px;
    overflow: hidden;
  }

  .book_list_content{
    width: 32%;
    display: inline-block;
    height: 20px;
    overflow: hidden;
    line-height: 20px;
    font-size: 15px;
  }
  .book_buy_info{
    width: 100%;
    line-height: 40px;
    font-size: 15px;
  }
  .book_buy_price{
    background-color: #f3f0e9;
    padding: 5px;
  }
  .labelSpan{
    color: #999;
  }
  .labelPrice{
    color: #9d232c;
    font-size: 17px;
  }
  .plainBtn{
    width: 150px;
    color: #9d232c;
    background-color: #f3f0e9;
    border: 1px #f3f0e9 solid;
  }
  .plainBtn:hover{
    background-color: white;
    color: #9d232c;
    border: 1px #b2bac2 solid;
  }
  .cartBtn{
    width: 150px;
    background-color: #9d232c;
    border: 1px #9d232c solid;
  }
  .cartBtn:hover{
    background-color: #f52b21;
  }

  .book_sort{
    margin: 10px 10px;
    width: 200px;
    /*height: 780px;*/
    float: left;
    border-right: 1px #f3f0e9 solid;
  }

  .book_info{
    margin: 10px 10px;
    width: 1000px;
    /*height: 780px;*/
    float: right;
    background-color: #f7f7f6;
  }
  .tab{
    width: 100%;
    /*height: 420px;*/
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
  .product{
    width: 100%;
    padding: 0px 15px;
    height: 800px;
  }
  .evaluation{
    width:100%;
    height: 2500px;
  }
  .section {
  width: 1100px;
  margin: 0 auto;
  position: relative;
}
.help {
  background-color: rgba(146, 145, 145, 0.5);
}

.help-title {
  text-align: center;
}

.help h1 {
  color: #070707;
}

.help p {
  color: rgb(12, 12, 12);
}
</style>
