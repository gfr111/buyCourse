<template>
  <div class="wrapper">
     <div class="coursePage" :style="{height:height}">
            <div class="headers"  >
                <div class="returnImg" @click="returnBack">
                    <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png" class="beforePage" />
                </div>
                <text class="title">合同确认</text>
                <text class="nullBox" @click="skipSignEvent" v-if="allowSkipSign&&peopleSign==null">跳过签字</text>
                <text class="nullBoxs" v-if="!allowSkipSign||peopleSign!=null">跳过签字</text>
            </div>
            <div class="protocolBox">
                <list :style="{height:heights}">
                     <cell>
                       <div class="firstBox">
                            <div class="singleRowBox">
                                <text class="singleRowName">私教课</text>
                                <text class="singleRowText">{{courseName}}</text>
                            </div>
                            <div class="singleRowBox">
                                <text class="singleRowName">有效期</text>
                                <text class="singleRowText">{{effectiveDays}}</text>
                            </div>
                            <div class="singleRowParent">
                                    <div class="singleRowBox" style="width:325px;">
                                        <text class="singleRowName">购买课时</text>
                                        <text class="singleRowText">{{buyCount}}节</text>
                                    </div>
                                    <div class="singleRowBox" style="width:425px;">
                                    <text class="singleRowName">授课方式</text>
                                    <text class="singleRowText">{{teachingStyle==1?'一对一':'一对多'}}</text>
                                    </div>
                            </div>
                            <div class="singleRowParent lastBox">
                                    <div class="singleRowBox" style="width:325px;">
                                        <text class="singleRowName">合同金额</text>
                                        <text class="singleRowText">¥{{buyAmount}}</text>
                                    </div>
                                    <div class="singleRowBox" style="width:425px;" v-if="courseType==2">
                                    <text class="singleRowName">生效方式</text>
                                    <text class="singleRowText">{{effectiveStyle==4?'首次上课生效':'指定日期生效'}}</text>
                                    </div>
                            </div>
                        </div>
                        <div class="useCenters">
                            <text class="singleRowName">可用门店</text>
                            <text class="singleRowText warp">{{usableCenters}}</text>
                        </div>
                        <div class="useCenters noBorder">
                            <text class="singleRowName">合同备注</text> 
                            <text class="singleRowText" style="padding-right:30px;">{{notes||'--'}}</text>
                        </div>
                         <div class="buyerMess">
                             <div class="singleRowParent" style="border-bottom-width: 0px;">
                                <div class="singleRowBox" style="width:250px;">
                                    <text class="singleRowName">购买人</text>
                                    <text class="singleRowText">{{buyers}}</text>
                                </div>
                                <div class="singleRowBox" style="width:500px;">
                                    <text class="singleRowName">手机号</text>
                                    <text class="singleRowText">{{buyPhone||'--'}}</text>
                                </div>
                            </div>
                            <div class="singleRowParent" style="border-bottom-width: 0px;">
                                <div class="singleRowBox" style="width:250px;">
                                    <text class="singleRowName">证件类型</text>
                                    <text class="singleRowText">{{idType||'--'}}</text>
                                </div>
                                <div class="singleRowBox" style="width:500px;">
                                    <text class="singleRowName">证件号</text>
                                    <text class="singleRowText">{{idNumber||'--'}}</text>
                                </div>
                            </div>
                         </div>
                          <div class="useCenter noBorder">
                            <text class="singleRowName">销售人</text>
                            <text class="singleRowText">{{saler}}</text>
                        </div>
                        <div class="centerSignBox noBorder">
                            <div class="centerDefaultBox">
                                <text class="centerDefaultTitle">场馆签字/印章</text>
                                <image :src="centerSign" class="centerSignImg"/>
                            </div>
                            <div class="signLine"></div>
                            <div class="centerDefaultBox">
                                <text class="centerDefaultTitle">会员签字</text>
                      
                                <span class="nullSign">
                                    <text class="nullSignTxt" v-if="peopleSign==null">未签字</text>
                                    <image :src="peopleSign"  class="centerSignImg" v-else/>               
                                </span>
                            </div>
                        </div>
                        <div class="protocolBoxContent" v-if="protocol!=''&&protocolVersion!=null&&protocolVersion!=undefined">
                            <text class="protocolBoxTitle">服务协议</text>
                            <text class="protocolVersion">协议版本号：{{protocolVersion}}</text>
                            <text class="protocolVersion">发布日期：{{protocolData}}</text>
                            <text class="protocolTxt">{{protocloTxt}}</text>
                        </div>
                    </cell>
                </list>
            </div>
             <div  class="editAndPayBox" v-if="peopleSign==null&&(isQrSignEnable&&isAppSignEnable)">
                     <text class="editCourseBtnTxt" @click="showScanCode" >扫码确认</text>
                     <text class="checkInTxt" @click="awakenSignPage">客户签字</text>
            </div>
              <div  class="editAndPayBox" v-if="peopleSign==null&&(isQrSignEnable&&!isAppSignEnable)">                  
                     <text class="scanBtn" @click="showScanCode" >扫码确认</text>          
            </div>
              <div  class="editAndPayBox" v-if="peopleSign==null&&(isAppSignEnable&&!isQrSignEnable)">
                     <text class="scanBtn" @click="awakenSignPage">客户签字</text>
            </div>
            <div class="editAndPayBox"  :style="{visibility: payVisibility}" v-if="peopleSign!=null&&isFinish">
                <text class="showPayPage" @click="toPay">发起付款</text>
            </div> 
            <div class="bg centerBg"  :style="{height:height}" v-if="(showPayCode)">
                 <div class="codeBoxs">
                    <div class="qrCodeTop">
                        <div class="codeTitle">
                              <text class="nullBoxTxt" style=" width: 32px;">12</text>
                              <text class="payName" style="font-size:36px;">扫码支付</text>
                              <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/greyCancel.png' class="hidePayBtn" @click="cancelPay"/>
                          </div>
                          <div class="codePriceBox">
                              <text style="color:#323232;font-size:32px;">支付：</text>
                              <text style="color:#FD5000;font-size:36px;">¥{{needPayMoney}}</text>
                          </div>
                    </div>
                    <div class="qrCodeBox">
                        <image :src='qrCode' class="qrCode"/>
                    </div>
                    <div class="supportPayBox">
                        <text class="supportTxt">支持以下方式</text>   
                        <view class="payMethodsIcon">
                          <image class="payIcon" src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/wechat.png' style="margin-right:30px;"/>
                          <image class="payIcon" src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/alipay.png'/>
                        </view>
                      </div>          
                      <div class="buttonBox">
                          <text class="dispireBtn" @click="cancelPay">取消</text>
                          <text class="payFinish" @click="payResults">已支付</text>
                      </div>
                </div>
            </div>
     </div>
      <div class="bg deletePop" :style="{height:height}"  v-if="(showSkipSign)" @click="cancelSkipSign">
                  <div class="deletePopBox">
                    <text class="deletePopTitle">提示</text>  
                    <text class="deletePopContent">跳过签字后可直接进行付款， 之后补签合同需在电脑端操作～</text>
                    <div class="deleteBtnBox">
                      <text class="cancelDelete" @click="cancelSkipSign">取消</text>
                      <text class="submitDelete" @click="submitSkipSign">确定</text>
                    </div>
                  </div>  
            </div> 
  </div> 
</template>
<script>
  import { WxcLoading } from 'weex-ui';
  var modal = weex.requireModule("modal");
  var stream = weex.requireModule('stream');
  var TrainerNativeModule=weex.requireModule('nativeModule');
   const storage = weex.requireModule('storage');
  export default {
    components: {WxcLoading},
    data: () => ({
      defaultTitle:'',//课程生效日期
      height:'',//页面高度
      heights:'',
      showPayCode:false,//显示付款码
      showPayStyle:false,//显示支付方式
      payVisibility:'visible',
      isAlipay:false,
      isWechatPay:false,
      isScanCode:false,
      preCourseId:null,
      token:'',
      webHost:'https://www.forzadata.cn',
    //    webHost:'http://10.0.0.5:8081',
      courseName:null,
      buyCount:null,
      teachingStyle:null,
      buyAmount:null,
      effectiveStyle:null,
      usableCenters:null,
      notes:null,
      buyers:null,
      buyPhone:null,
      idType:null,
      idNumber:null,
      saler:null,
      centerSign:null,
      peopleSign:null,
      protocolVersion:null,
      protocolData:null,
      protocloTxt:null,
      effectiveDays:null,
      courseType:null,
      protocol:null,
      centerId:null,
      scanCode:null,
      needPayMoney:null,
      qrCode:null,
      realId:null,
      isFinish:true,
      isQrSignEnable:null,
      isAppSignEnable:null,
      showSkipSign:false,
      allowSkipSign:null,
       allowOnlinePay:null,
       realPrice:null,
       isPay:false
    }),
    created(){
       var that=this;
       that.preCourseId=that.$route.query.id;
       TrainerNativeModule.getMetaData(function(map){
          that.token=map.token;
          that.centerId=map.centerId;
          that.webHost=map.webHost?map.webHost:'https://www.forzadata.cn';
          that.height = map.isPhoneBangseries? (750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-48):(750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight+20);           
          that.heights=750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-100+'px';
       });
       setTimeout(()=>{
            that.getProtocol(); 
        },50);
         weex.requireModule('globalEvent').addEventListener('androidback', function (e) {  
            that.$router.go(-1);
            storage.removeItem('isSkipSign');
        })
    },
    methods: {
        returnBack(){
            if(this.peopleSign!=null&&!this.isFinish){
                TrainerNativeModule.close();
            }else{
                this.$router.go(-1);
            }
        },
         //时间转换
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '年';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
        var D=(date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + '日';
        return Y+M+D;
      },
        //获取合同内容
        getProtocol(){
              var that=this;
              stream.fetch({
                method:"GET",
                type:'json',
                url:that.webHost+'/api/trainerApp/saleCourse/'+that.centerId+'/preCourseDetail/'+that.preCourseId,
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                }
            }, function(ret) {                   
                  //  modal.toast({ message:ret.data.data, duration: 10 });
                      if(!ret.ok){
                        TrainerNativeModule.toast('请求失败');
                      }else{
                      if(ret.data.status==0){     
                        that.courseName=ret.data.data.prePrivateCourse.courseName;
                        that.buyCount=ret.data.data.prePrivateCourse.count;
                        that.effectiveDays=ret.data.data.prePrivateCourse.effectiveDays;
                        that.teachingStyle=ret.data.data.prePrivateCourse.privateCourseTeachType;
                        that.buyAmount=ret.data.data.prePrivateCourse.amount;
                        that.realPrice=ret.data.data.prePrivateCourse.payMethod1Amount,
                        that.effectiveStyle=ret.data.data.prePrivateCourse.activatedMode;
                        that.courseType=ret.data.data.prePrivateCourse.cardType;
                        that.usableCenters=ret.data.data.usableCenters;
                        that.notes=ret.data.data.prePrivateCourse.notes?ret.data.data.prePrivateCourse.notes:'--';
                        that.buyers=ret.data.data.trainee.traineeName;
                        that.buyPhone=ret.data.data.trainee.phone?ret.data.data.trainee.phone:'--';
                        that.idType=ret.data.data.trainee.idType?ret.data.data.trainee.idType:'--';
                        that.idNumber=ret.data.data.trainee.idNumber?ret.data.data.trainee.idNumber:'--';
                        that.saler=ret.data.data.prePrivateCourse.trainerName;
                        that.centerSign=ret.data.data.setting.centerSignUrl;
                        that.isQrSignEnable=ret.data.data.setting.qrSignEnable,
                        that.isAppSignEnable=ret.data.data.setting.appSignEnable,
                        that.allowSkipSign=ret.data.data.setting.allowSkipSign,
                        that.protocolVersion=ret.data.data.protocol.version;
                        that.protocolData=that.timestampToTime(ret.data.data.protocol.issueTime);
                        that.protocloTxt=ret.data.data.protocol.protocolContent;
                        that.protocol=ret.data.data.protocol;
                        that.allowOnlinePay=ret.data.data.allowOnlinePay;
                        if(ret.data.data.prePrivateCourse.signaturePhoto!=''&&ret.data.data.prePrivateCourse.signaturePhoto!=null&&ret.data.data.prePrivateCourse.signaturePhoto!=undefined){
                            that.peopleSign=ret.data.data.prePrivateCourse.signaturePhoto;
                        }else{
                            that.peopleSign=null;
                        }
                      }
                  }
            })
      
        },
         //显示付款方式
      toPay(){
         var that=this;
        if(that.realPrice==0){
            if(!that.isPay){
                //  TrainerNativeModule.showProgressDialog();
                that.isPay=true;
                stream.fetch({
                    method:"GET",
                    type:'json',
                    url:that.webHost+'/api/trainerApp/saleCourse/'+that.centerId+'/getAggregateOrder/'+that.preCourseId+'/'+4+'?pay=false&serverSupportDepositSpilt=true',
                    headers:{
                        "Content-Type": 'application/json',
                        'X-AUTH-TOKEN':that.token
                    },
                    timeout: 3000
                }, function(ret) {     
                    //  TrainerNativeModule.progressDialogDismiss();   
                        if(!ret.ok){
                            that.isShow=false;                          
                            TrainerNativeModule.toast('请求失败');
                            setTimeout(function(){
                                TrainerNativeModule.close();
                            },500)
                        }else{                       
                            if(ret.data.status==0){              
                                that.success();
                            }else{
                                TrainerNativeModule.toast(ret.data.message);
                            }
                        }
                         that.isPay=false;
                })
            }
           
        }else{
          if(that.allowOnlinePay){
            that.showPayCode=true;
            that.payVisibility='hidden';
            that.aliPay();
          }else{
            TrainerNativeModule.toast('请先开通在线支付！');
          }
        }
      },
      //隐藏付款方式
      hidePay(){
        // this.showPayStyle=false;
        this.showPayCode=false;
        this.payVisibility='visible';
      },
       //点击支付宝支付
      aliPay(){
         var that=this;     
          var pay=null;
        // if(that.realPrice==0){
        //     pay=false;
        // }else{
        //     pay=true;
        // }
         if(!that.isAlipay){
            //   TrainerNativeModule.showProgressDialog();
              that.isAlipay=true;
              stream.fetch({
                method:"GET",
                type:'json',
                url:that.webHost+'/api/trainerApp/saleCourse/'+that.centerId+'/getAggregateOrder/'+that.preCourseId+'/'+4+'?pay=true&serverSupportDepositSpilt=true',
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                },
                timeout: 3000
            }, function(ret) {     
                // TrainerNativeModule.progressDialogDismiss();               
                  //  modal.toast({ message:ret.data.data, duration: 10 });
                      if(!ret.ok){
                        that.isAlipay=false;
                        that.isFinish=true;
                        TrainerNativeModule.toast('请求失败');
                         setTimeout(function(){
                            TrainerNativeModule.close();
                        },500)
                      }else{
                      if(ret.data.status==0){   
                              that.needPayMoney=ret.data.data.amount;
                            that.qrCode=ret.data.data.qrCodeLink.replace(/\s*/g,"");
                            that.realId=ret.data.data.orderId;  
                            that.showPayCode=true;                                                
                            that.showPayStyle=false;                        
                      }
                      that.isAlipay=false;
                  }
            })
         }else{
            TrainerNativeModule.toast('点击过于频繁！');
         }
      },

       //查询支付结果
       payResults(){
          this.loader(0);
       },
       loader(i){
         i++;
         var that=this;
         stream.fetch({
            method:"GET",
            type:'json',
            url:that.webHost+'/api/trainerApp/saleCourse/getOrderStatus/'+that.centerId+'/order/'+that.realId,
            headers:{
                "Content-Type": 'application/json',
                'X-AUTH-TOKEN':that.token
            }
         }, function(ret) {
           if(!ret.ok){
               that.isFinish=true;
               TrainerNativeModule.toast('请求失败');
           }else{
              if(ret.data.status==0){
               if(ret.data.data==1){
                 that.success();
               }else{
                  if(ret.data.data==0){
                       TrainerNativeModule.toast('支付失败，订单待付款');
                       that.payVisibility='visible';
                       that.isFinish=true;
                       that.showPayCode=false;
                      return;
                  }else if(ret.data.data==3){
                       TrainerNativeModule.toast('支付失败，订单已退款');
                       that.isFinish=true;
                       that.showPayCode=false;
                  }
               }
            }else{
              if(i>15){
                  that.isFinish=true;
                 TrainerNativeModule.toast('支付超时');
                 return;
              }else{
                setTimeout(function(){
                    that.loader(i);
                },1000)
              }
            }
           }
        })
       },
       success(){
          var that=this;
          that.isFinish=false;
          that.visibility='hidden';
          that.showPayCode=false;
         TrainerNativeModule.toast('支付成功');
       },
       cancelPay(){
            this.showPayCode=false;
            this.payVisibility='visible';
       },
      showScanCode(){
          var that=this;     
          stream.fetch({
                method:"GET",
                type:'json',
                url:that.webHost+'/api/trainerApp/saleCourse/'+that.centerId+'/perCourse/signatureQr/'+that.preCourseId,
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                }
            }, function(ret) {                          
                      if(!ret.ok){
                        TrainerNativeModule.toast('请求失败');
                      }else{
                      if(ret.data.status==0){           
                        that.scanCode=ret.data.data;      
                        TrainerNativeModule.showTraineeSignQrCode(ret.data.data,that.preCourseId);
                         weex.requireModule('globalEvent').addEventListener('traineeElectronicSign', function (e) {  
                            that.peopleSign=e.url;
                        })
                      }
                  }
            })
      },
      hideScan(){
           this.isScanCode=false;
      },
      awakenSignPage(){
          var that=this;
          TrainerNativeModule.awakenSign(that.preCourseId);
            weex.requireModule('globalEvent').addEventListener('traineeSign', function (e) {  
                that.peopleSign=e.url;
            })
      },
      skipSignEvent(){
            this.showSkipSign=true; 
      },
      cancelSkipSign(){
           this.showSkipSign=false;
      },
      submitSkipSign(){
         var that=this;
        storage.setItem('isSkipSign',true,res=>{
            if(res.result=='success'){
                that.$router.go(-1);
            }
        })  
      }
    },
  }
</script>
<style scoped>
.centerBg{
  align-items: center;
  justify-content: center;
}
.buttonBox{
    flex-direction: row;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #E9E9E9;
    width: 570px;
  }
  .dispireBtn{
     width: 286px;
     line-height: 100px;
     text-align: center;
     color: #A3A3A3;
     font-size: 32px;
     border-right-width: 1px;
     border-right-style: solid;
     border-right-color: #E9E9E9;
     border-bottom-left-radius: 16px;
  }
  .payFinish{
     width: 286px;
     line-height: 100px;
     text-align: center;
     color: #0279FF;
     font-size: 32px; 
     border-bottom-right-radius: 16px;
  }
  .codeBoxs{
    background-color: #ffffff;
    width:570px;
    border-radius: 8px;
  }
 .payIcon{
      width: 80px;
      height: 80px;
  }
.supportPayBox{
  align-items: center;
  justify-content: center;
}
.supportTxt{
    color: #323232;
    font-size: 28px;
    margin-bottom:20rpx;
}
.payMethodsIcon{
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 40rpx;
}
 .codePriceBox{
      flex-direction: row;
    justify-content: center;
      align-items: center;
      margin-bottom: 16px;
      margin-top: 20px;
  }
.nullBoxTxt{
  font-size:34px;
  color: #F5F5F5;
}
.payName{
      color: #323232;
      font-size: 32px;
  }
   .hidePayBtn{
      width: 32px;
      height: 32px;
  }
 .qrCodeTop{
      background-color: #F5F5F5;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
  }
    .codeTitle{
      width: 570px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      padding-right: 40px;
      padding-left: 40px;
  }
  .qrCodeBox{
    width: 570px;
    height: 290px;
    margin-top:60px;
    justify-content: center;
    align-items: center;
  }
.nullBoxs{
    color: #ffffff;
}
.bg{
    background-color:rgba(0, 0, 0, 0.6);
    position: absolute;
    top:0;
    left: 0;
    width: 750px;
}
.deleteBtnBox{
  flex-direction: row;
  justify-content: flex-start;
  background-color: #ffffff;
  border-top-color: #E9E9E9;
  border-top-style: solid;
  border-top-width: 1px;
  width:620px;
  border-bottom-left-radius:16px;
  border-bottom-right-radius: 16px; 

}
.deletePop{
  justify-content: center;
  align-content: center;
}
.deletePopBox{
  width:620px;
  height: 368px;
  border-radius: 16px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  opacity:1;
  flex-direction: column;
  margin-left: 64px;
}
.cancelDelete{
  width: 310px;
  height: 100px;
   line-height: 100px;
  border-right-color: #E9E9E9;
  border-right-style: solid;
  border-right-width: 1px;
  color: #A3A3A3;
  font-size: 32px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  border-bottom-left-radius:16px;
}
.submitDelete{
  width: 309px;
  height: 100px;
   line-height: 100px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  color: #13C38C;
  text-align: center;
  font-size: 32px;
  flex-direction: column;
   border-bottom-right-radius: 16px; 

}
.deletePopTitle{
  color: #323232;
   width:620px;
  font-size: 36px;
  margin-top: 30px;
  margin-bottom: 40px;
  background-color: #ffffff;
  font-weight: 600;
  text-align: center;
}
.deletePopContent{
  margin-bottom: 60px;
  text-align: center;
   width:508px;
  color: #A3A3A3;
  font-size: 32px;
  background-color: #ffffff;
}
.selectBox{
    width: 750px;
    padding-top:20px;
    background-color: #ffffff;
    position: absolute;
    bottom: 60px;
    opacity:1;
}
.selectHeader{
    padding-left:20px;
    width: 730px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background-color: #ffffff;
}
.dispire{
    font-size: 30px;
    color: #ABABAB;
}
.finish{
    font-size: 30px;
    color: #12C48B;
}
.titles{
        font-size: 32px;
       color: #2A3E49;
}
.payStyle{
  flex-direction: row;
  align-items: center;
  padding-left: 40px;
  padding-top: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
}
.payContent{
  justify-content: space-around;
  align-items: center;
  margin-right: 90px;
}
.payImg{
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
.payTxt{
  color: #808080;
  font-size: 20px;
}
.headers{
    width: 750px;
    height:88px;
    padding-left: 30px;
    padding-right: 40px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-color: #EDF0F2;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    background-color: #ffffff;
  }
.returnImg{
    width: 100px;
    height: 80px;
    flex-direction: row;
    align-items: center;
}
.returnImgs{
    width: 100px;
    height: 80px;
    flex-direction: row;
    align-items: center;
}
.title{
  font-size:34px;
  color: #53575A;
}
.nullBox{
  font-size:28px;
  color: #303030;
}
.beforePage{
    width: 48px;
    height: 48px;
 }
.firstBox{
    width: 750px;
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 0;
    background-color: #ffffff;
}
.singleRowBox{
    align-items: center;
    flex-direction: row;
    margin-bottom: 10px;
}
.singleRowName{
    color: #383838;
    font-size: 28px;
    font-weight: 600;
    width:116px;
    margin-right: 15px;
}
.singleRowText{
    color: #6E6E6E;
    font-size: 28px;
    width: 600px;
    white-space: nowrap;
}
.singleRowParent{
    align-items: center;
    flex-direction: row;
}
.lastBox{
    border-bottom-color: #E5E5E5;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    padding-bottom: 30px;
}
.useCenter{
     align-items: center;
     flex-direction: row;
     height: 100px;
     width: 750px;
     padding-left: 30px;
     padding-right: 30px;
     background-color: #ffffff;
     border-bottom-color: #E5E5E5;
     border-bottom-width: 1px;
     border-bottom-style: solid;
}
.useCenters{
     flex-direction: row;
     width: 750px;
     padding-left: 30px;
     padding-top: 30px;
     padding-bottom: 30px;
     padding-right: 30px;
     background-color: #ffffff;
     border-bottom-color: #E5E5E5;
     border-bottom-width: 1px;
     border-bottom-style: solid;
}
.noBorder{
    border-bottom-width: 0px;
    margin-bottom: 30px;
}
.buyerMess{
     width: 750px;
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
    background-color: #ffffff;
    margin-bottom: 20px;
}
.centerSignBox{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 750px;
    padding: 30px;
    background-color: #ffffff;
}
.centerDefaultTitle{
  font-size: 28px;
  color: #383838;
  font-weight: 600;
  margin-bottom: 20px;
}
.centerSignImg{
    width: 314px;
    height: 120px;
}
.signLine{
    width: 2px;
    height: 120px;
    margin-top:80px;
    background-color: #E5E5E5;
}
.nullSign{
      width: 314px;
    height: 120px;
    justify-content: center;
    align-items: center;
}
.nullSignTxt{
    color: #6E6E6E;
    font-size: 28px;
}
.protocolBoxContent{
  background-color: #ffffff;
  padding:30px;
  width: 750px;
  margin-bottom: 130px;
}
.protocolBoxTitle{
    color: #383838;
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: 600;
}
.protocolVersion{
    color: #6E6E6E;
    font-size: 28px;
    margin-bottom: 8px;
}
.editAndPayBox{
  width: 750px;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 76px;
  border-top-color: #E5E5E5;
  border-top-width: 1px;
  border-top-style: solid;
  background-color: #ffffff;
}
.editCourseBtnTxt{
  color: #303030;
  font-size: 28px;
  width: 212px;
  height: 76px;
  text-align: center;
  line-height: 76px;
  background-color: #F3F3F3;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-left-radius: 40px;
  margin-left: 30px;
  border-bottom-right-radius: 40px;
}
.checkInTxt{
  color: #ffffff;
  font-size: 28px;
  width: 438px;
  height: 76px;
  text-align: center;
  line-height: 76px;
  background-color: #12C48B;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin-right: 30px;
}
.scanBtn{
  color: #ffffff;
  font-size: 28px;
  width: 690px;
  height: 76px;
  text-align: center;
  line-height: 76px;
  background-color: #12C48B;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin-left: 30px;
}
.showPayPage{
    color: #ffffff;
  font-size: 28px;
  width: 690px;
  height: 76px;
  text-align: center;
  line-height: 76px;
  background-color: #13C38C;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-left-radius: 40px;
  margin-left: 30px;
  border-bottom-right-radius: 40px;
}
.payCodeBox{
  width: 520px;
  height: 636px;
  background-color: #ffffff;
  left:120px;
  top:300px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-top:46px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.codeAndprice{
 justify-content: space-between;
 align-items: center;
 flex-direction:column; 
}
.price{
  font-size: 40px;
  color: #12C48B;
  margin-bottom: 20px;
}
.qrCode{
  width: 280px;
  height: 280px;
  margin-bottom: 34px;
}
.tips{
  color:#596F7C;
  font-size: 28px;
}
.payResultBtn{
  height: 100px;
  border-top-color: #E9E9E9;
  border-top-width: 1px;
  border-top-style: solid;
  flex-direction: row;
  /* justify-content: space-between;
  align-items: center; */
}
.hideCode{
  width: 260px;
  text-align: center;
  line-height: 100px;
  height: 100px;
  color: #a3a3a3;
  font-size: 32px;
  border-right-color:#E9E9E9;
  border-right-style: solid;
  border-right-width: 1px; 
}
.payFinish{
   width: 260px;
  text-align: center;
  line-height: 100px;
  height: 100px;
  color: #00BC71;
  font-size: 32px;

}
.codeBox{
  width: 550px;
  height: 684px;
  background-color: #ffffff;
  left:100px;
  top:266px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.codeHeader{
    flex-direction: row;
    padding-left: 30px;
    padding-right: 30px;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    width: 550px;
    padding-top: 30px;
}
.nullBoxTxt{
    color: #ffffff;
}
.codeHeaderTitle{
    color: #323232;
    font-size: 36px;
    font-weight: 600;
}
.cancelScan{
  width: 32px;
  height: 32px;
}
.qrCodes{
    width: 410px;
    height: 410px;
    margin-top: 20px;
    margin-bottom: 15px;
}
.scanTips{
    text-align: center;
    color: #323232;
    font-size: 32px;
    margin-bottom: 56px;
}
.saveCodeBox{
    text-align: center;
    top:1000px;
    position: absolute;
    width: 550px;
    left: 218px;
}
.saveCodeBtn{
  width: 314px;
  height: 96px;
  text-align: center;
  line-height: 96px;
  color: #ffffff;
  font-size: 32px;
   border-top-left-radius: 48px;
  border-top-right-radius: 48px;
  border-bottom-left-radius: 48px;
  border-bottom-right-radius: 48px;
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: #FFFFFF;

   border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #FFFFFF;

   border-right-width: 1px;
  border-right-style: solid;
  border-right-color: #FFFFFF;

   border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #FFFFFF;
}
.warp{
  white-space: normal;
  width:530px;
  flex-direction: row;
  flex-wrap: wrap;
}
.unwantedSign{
    width:120px;
    height: 120px;
}
</style>