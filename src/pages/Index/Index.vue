<template>
  <div>
    <Nav></Nav>
    <HeadNav></HeadNav>
    <div class="first_content">
      <div class="content_main">
        <div style="width: 100%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="首页" name="first">
                <div class="content_main_left">
                  <div class="tab">
                    <div v-if="single==0">
                      <div v-for="(item,index) in options" :key="index" class="tab_list" @mouseenter="enter(index)" @mouseleave="out(index)">
                        <div>
                          <router-link :to="{path: '/search',query:{id:item[0].value,name:item[0].label}}"><span style="color: black">{{item[0].label}}</span></router-link>
                            <span> | </span>
                          <router-link :to="{path: '/search',query:{id:item[1].value,name:item[1].label}}"><span style="color: black">{{item[1].label}}</span></router-link>
                          <transition name="fade">
                          <div class="tab_page" v-show="seen&&index==current" >
                            <div v-for="book in item">
                              <h3>
                                <router-link :to="{path: '/search',query:{id:book.value,name:book.label}}">>{{book.label}}</router-link>
                              </h3>
                              <div class="tab_page_list">
                                <el-breadcrumb separator="|">
                                  <!--                            <el-breadcrumb-item :to="{ path: '/' }" exact>首页</el-breadcrumb-item>-->
                                  <el-breadcrumb-item v-for="it in book.children" :to="{path: '/search',query:{id:it.value,name:getName(book.label,it.label)}}" :key="it.value">
                                    {{it.label}}
                                  </el-breadcrumb-item>
                                  <el-breadcrumb-item>
                                  </el-breadcrumb-item>
                                </el-breadcrumb>
                              </div>
                            </div>
                          </div>
                          </transition>
                        </div >
                      </div>
                    </div>
                    <div v-if="single==1">
                      <div v-for="(item,index) in options" class="tab_list" @mouseenter="enter(index)" @mouseleave="out(index)">
                        <div v-if="item.length<2">
<!--                          {{item[0].label}}-->
                          <router-link :to="{path: '/search',query:{id:item[0].value,name:item[0].label}}"><span style="color: black">{{item[0].label}}</span></router-link>
                          <transition name="fade">
                          <div class="tab_page" v-show="seen&&index==current">
                            <div v-for="book in item">
                              <h3>
                                <router-link :to="{path: '/search',query:{id:book.value,name:book.label}}">>{{book.label}}</router-link>
                              </h3>
                              <div class="tab_page_list">
                                <el-breadcrumb separator="|">
                                  <!--                            <el-breadcrumb-item :to="{ path: '/' }" exact>首页</el-breadcrumb-item>-->
                                  <el-breadcrumb-item v-for="it in book.children" :to="{path: '/search',query:{id:it.value,name:getName(book.label,it.label)}}" :key="it.value">
                                    {{it.label}}
                                  </el-breadcrumb-item>
                                  <el-breadcrumb-item>
                                  </el-breadcrumb-item>
                                </el-breadcrumb>
                              </div>
                            </div>
                          </div>
                          </transition>
                        </div>

                        <div v-if="item.length==2">
                          {{item[0].label}}<span> | </span>{{item[1].label}}
                          <transition name="fade">
                          <div class="tab_page" v-show="seen&&index==current">
                            <div v-for="book in item">
                              <h3>
                                <router-link :to="{path: '/search',query:{id:book.value,name:book.label}}">>{{book.label}}</router-link>
                              </h3>
                              <div class="tab_page_list">
                                <el-breadcrumb separator="|">
                                  <!--                            <el-breadcrumb-item :to="{ path: '/' }" exact>首页</el-breadcrumb-item>-->
                                  <el-breadcrumb-item v-for="it in book.children" :to="{path: '/search',query:{id:it.value,name:getName(book.label,it.label)}}" :key="it.value">
                                    {{it.label}}
                                  </el-breadcrumb-item>
                                  <el-breadcrumb-item>
                                  </el-breadcrumb-item>
                                </el-breadcrumb>
                              </div>
                            </div>
                          </div>
                          </transition>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="communicate">
                    <i class="el-icon-phone"></i><span>书店客服中心</span><br>
                    <span>客服热线 025-1234 5678</span>
                  </div>
                </div>
                <div class="content_main_right">
                  <Carousel :imgList="imgS"></Carousel>
                  <div class="gallery-book_title">
                    <span>最新出版</span>
                  </div>
                  <GalleryBook></GalleryBook>
                </div>
            </el-tab-pane>
            <el-tab-pane label="推荐区" name="second">
              <RecBookBox></RecBookBox>
            </el-tab-pane>
            <el-tab-pane label="新书区" name="third">
              <RecBookBox listSort="newProduct"></RecBookBox>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <Footer></Footer>

  </div>
</template>

<script>
    import Nav from "../../components/Common/Nav";
    import Footer from "../../components/Common/Footer";
    import Carousel from "../../components/Index/Carousel";
    import HeadNav from "../../components/Common/HeadNav";
    import GalleryBook from "../../components/Index/GalleryBook";
    import BookBox from "../../components/Index/BookBox";
    import RecBookBox from "../../components/Index/RecBookBox";

    export default {
        name: "index",
        components: {Nav,Footer,Carousel,HeadNav,GalleryBook,BookBox,RecBookBox},
        data() {
            return {
                recommend:"recommend",
                newProduct:"newProduct",
                bookTopicList: [],

                single: 0,
                current: 0,//复制成功提示显示或者隐藏
                seen: false, //显示和隐藏

                activeName: 'first',
                imgS: [
                    "static/image/21.jpg",
                    "static/image/22.jpg"],
                bookSortList:['小说','文学','地理','教科书','生物','科学','地理','教科书','生物','教科书'],
                options: [],
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },

            enter(index){
                // console.log(this.seen);
                this.seen = true;
                this.current = index;
                // console.log("鼠标进入了！");
                // console.log("index:"+index)
            },
            out(index){
                this.seen = false;
                this.current = null;
            },

            getName(upperName,childName){
                return upperName+"/"+childName;
            },


        },
        computed:{
            optionsList(){
                const optionsList  = [];
                const a = this.options;
                for(let i=0;i<a.length;i=i+2){
                  let j=i+1;
                  optionsList.push([a[i],a[j]]);
                }
                return optionsList;
            }
        },
        mounted(){

        },
        created() {
            // this.getSortList();
        },
    }
</script>

<style scoped>
  .first_content{
     width: 100%;
     background-color: #f7f7f6;
   }
  .content_main{
    margin: 0px auto;
    width: 1240px;
    height: 1450px;
    background-color: #f7f7f6;
  }
  .content_main_left{
    width: 17%;
    height: 100%;
    float: left;
  }
  .content_main_right{
    width: 82%;
    height: 100%;
    float: right;
  }
  .gallery-book_title{
    padding-top: 10px;
    width: 100%;
    height: 32px;
    margin-bottom: 25px;
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
    padding-bottom: 34px;
    font-size: 22px;
  }
  .second_content{
    width: 100%;
    background-color: #ffffff;
  }
  .book_box{
    width: 1240px;
    height: 700px;
    margin: 0px auto;
  }
  .tab_page a{
    font-size: 19px;
    color: #000000;
    text-decoration: none;
  }

  /*/deep/ .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{*/
  /*  !*font-weight: 700;*!*/
  /*  !*text-decoration: none;*!*/
  /*  !*-webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);*!*/
  /*  !*transition: color .2s cubic-bezier(.645,.045,.355,1);*!*/
  /*  color: #be1f89 !important;*/
  /*}*/

  /deep/ .el-breadcrumb__item .el-breadcrumb__inner{
    /*color: #393a42 !important;*/
    font-weight: 300;
  }

  .router-link-active {
    text-decoration: none;
  }
  .el-breadcrumb__item{
    line-height: 30px;
  }
  .tab{
    width: 100%;
    height: 420px;
  }
  .tab_list{
    padding-left: 5px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
    margin: 1px 0px;
    border: none !important;
  }
  .tab_list:hover{
    background-color: #f2f1ea;
  }
  .tab_page{
    /*display: none;*/
    padding: 25px 30px;
    width: 832px;
    position: absolute;
    left: 209px;
    top: 0;
    z-index: 24;
    height: 410px;
    border: 1px solid #e0e0e0;
    border-left: 0;
    background: #fff;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.18);
    box-shadow: 0 2px 4px rgba(0,0,0,.18);
  }
  .tab_page_list{
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 20px;
    position: relative;
  }


  .communicate{
    clear: both;
    position: relative;
    width: 100%;
    height: 100px;
    border: 1px #acb4bc solid;
    padding: 2px 5px;
    line-height: 30px;
  }
  /deep/ .el-tabs__item {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
  }


</style>
