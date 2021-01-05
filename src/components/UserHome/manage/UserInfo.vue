<template>
  <div class="content">
    <div class="info">
      <div class="user_card">
        <el-image style="width: 160px; height: 160px;vertical-align: middle;border-radius: 50%;float: left;margin: 20px 10px"
                  :src="imgS"
                  fit="fill"></el-image>
        <div class="user_card_info">
          <p style="font-size: 22px;color: #616161">一条小黄龙</p>
          <p style="color: #757575">修改头像</p>
        </div>
      </div>
      <div class="user_action">
        <p> <span>会员等级:</span><span>VVVIP</span></p>
        <p> <span>绑定手机:</span><span>18370098989</span></p>
        <p> <span>绑定邮箱:</span><span>123@qq.com</span></p>
      </div>
    </div>

    <div class="box_info">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人信息" name="first">
          <div class="tab_box">
            <div class="modify_box">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item prop="name" label="昵称">
                  <el-input type="text" v-model="ruleForm.account" autocomplete="off" placeholder="请输入新昵称"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="邮箱">
                  <el-input type="text" v-model="ruleForm.account" autocomplete="off" placeholder="请输入新邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="手机">
                  <el-input type="text" v-model="ruleForm.account" autocomplete="off" placeholder="请输入新手机号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="width: 120px;">确认修改</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
    // <!--用户中心-->
    export default {
        name: "UserInfo",
        data () {
            var checkAccount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }
                setTimeout(() => {
                    if(value.length>13){
                        callback(new Error('账号不能大于13位'));
                    }else {
                        callback();
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                msg: 'Welcome to Your Vue.js App',
                imgS: require('../../../assets/image/head.jpg'),
                imgS1: require('../../../assets/image/weibo.png'),
                imgS2: require('../../../assets/image/qq.png'),
                imgS3: require('../../../assets/image/weixin.png'),
                imgS4: require('../../../assets/image/apple.png'),
                activeName: 'first',
                currentPage: 1,
                page_size: 5,
                total:20,
                ruleForm: {
                    account: '',
                    password: '',
                },
                rules: {
                    account: [
                        { validator: checkAccount, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            }
        },
        mounted(){

        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
        }
    }
</script>

<style scoped>

  .content{
    width: 1000px;
    margin: 40px auto;
    background-color: white;
  }

  .info{
    width: 940px;
    height: 200px;
    margin: 0px auto;
    background-color: #ffffff;
    /*border-bottom: 1px solid #d9d9d9;*/
  }

  .user_card{
    width: 540px;
    height: 200px;
    float: left;
  }

  .user_card_info{
    margin: 75px 0px;
    width: 200px;
    height: 100px;
    display: inline-block;
    line-height: 30px;
  }
  .user_action{
    float: left;
    width: 400px;
    height: 200px;
    padding-top: 65px;
  }
  span{
    color: #757575;
    font-size: 15px;
    margin: 0px 5px;
    line-height: 30px;
  }


  h1{
    color: #757575;
    font-family: 新宋体;
  }
  .box_info{
    width: 960px;
    margin: 10px auto;
  }
  /deep/ .el-tabs__item {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #757575;
  }
  .tab_box{
    width:960px;
  }

  .noMesInfo{
    text-align: center;
    font-size: 18px;
    color: #757575;
    line-height: 60px
  }

  .secure_box{
    margin: 12px auto 0px;
    width: 960px;
    height: 100px;
    border-top: 1px solid #e5e5e5;
    /*border-bottom: 1px solid #e5e5e5;*/
  }

  .secure_logo{
    display: inline-block;
    width: 60px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 30px;
    color: #ff7f52;
    vertical-align: top;
  }

  .secure_title{
    display: inline-block;
    width: 700px;
    height: 100px;
    vertical-align: top;
    padding-top: 25px;
  }

  .secure_action{
    display: inline-block;
    width: 190px;
    height: 100px;
    text-align: right;
    line-height: 100px;
    vertical-align: top;
  }

  .text_msg{
    color: #757575;
    font-size: 14px;
    line-height: 23px;
  }

  .bind_list{
    width: 230px;
    height: 150px;
    /*border: 1px solid #cacaca;*/
    display: inline-block;
    margin-right: 30px;
    margin-top: 20px;
    padding: 20px 10px;
    vertical-align: top;
  }
  .bookImg{
    margin-top: 10px;
    float: left;
    width: 90px;
    height: 90px;
    border-radius: 10px;
  }
  .bind_account{
    float: left;
    width: 100px;
    height: 105px;
    padding-top: 15px;
    text-align: center;
  }
  .bind_btn{
    width: 80px;
    height: 30px;
    background-color: white;
    border: 1px solid #e1e1e1
  }
  .modify_box{
    margin-top: 30px;
    width: 400px;
    height: 270px;
    /*border: 1px solid #dfdfdf;*/
    padding: 15px;
  }

</style>

