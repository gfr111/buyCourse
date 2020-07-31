<template>
  <div class="wrapper">
     <div class="coursePage" :style="{height:height}" v-if="(showCoursePage)">
        <div class="headers"  @click="returnBack">
              <div class="returnImg">
                <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png" class="beforePage" />
              </div>
          <text class="title">办理{{restrictTraining?'培训课':'私教课'}}</text>
          <text class="nullBox">保存</text>
        </div>
      <!-- <list :style="{height:listHeight}"> 
        <cell> -->
        <div class="courseContent">
          <div class="cousrHeader" v-if="(showChooseCourse)">
              <div class="coursePrice">
                  <image :src="courseImg" class="courseImg"/>                   
              </div>  
              <div class="reChooseCourse" @click="chooseCouseType" >
                  <text class="txt">请选择{{restrictTraining?'培训课':'私教课'}}</text>
                  <image  src="http://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/Rectanglex.png" class="chooseImg"/>
             </div>
          </div> 
           <div class="cousrHeaders" v-else>
            <div class="coursePrice">
                 <image :src="courseImg" class="courseImg"/>                   
            </div>
            <div class="reChooseCourses" @click="chooseCouseType" >
                <div class="courseMess" >
                        <text class="courseName">{{courseItem}}</text>
                        <div class="priceBox">
                              <text class="priceIcon">￥</text>
                              <text class="realPrice">{{realPrice}}</text>
                              <text class="realDay" v-if="types==2">/{{effectiveDays}}天</text>
                              <text class="realDay" v-else>/节</text>
                        </div>
                    </div>
                 <image src="http://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/Rectanglex.png" class="chooseImg"/>
            </div>            
          </div>  
          <div class="conditionList">
            <div class="childrens">
              <div class="conditionName">
                  <text class="aterisk">*</text>   
                  <text class="names">销售类型</text>
              </div>  
              <div class="chooseCondition" @click="saleStyle">
                  <text class="txt">{{saleTypeItem}}</text>
                  <image  src="http://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/Rectanglex.png" class="chooseImg"/>
              </div>
            </div>  
            <div class="childrens" v-if="(types==1)">
              <div class="conditionName">
                  <text class="aterisk">*</text>   
                  <text class="names">购买课时</text>
              </div>  
              <div class="chooseTime">
                <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/reduce.png" class="reduceImg" @click="reduceNum"/>
                <input :value="num" class="numBox" type="number" @input="getCourseNum"  ref="numText" @blur="getMoney" disabled=true readonly =“readonly”/>
                <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/add.png" class="reduceImg" @click="addNum"/>
              </div>
            </div>  
            <div class="childrens" v-if="(types==2)">
              <div class="conditionName">
                  <text class="aterisk">*</text>   
                  <text class="names">生效方式</text>
              </div>  
              <div class="chooseTime">
                <text :class="[effectiveType===2? 'active' : 'firstClass']" @click="firstTime">首次上课生效</text>
                <text :class="[effectiveType===1? 'active' : 'appointClass']" @click="appointTime">指定日期生效</text>
              </div>
            </div> 
            <div class="children" v-if="(effectiveType===1)">
                <div class="startTime" @click="openPicker">
                  <text class="startName">生效日期</text>
                  <text class="dating">{{defaultTitle}}</text>  
                </div> 
                <div class="startTime">
                  <text class="startName">有效日期</text>
                  <text class="dating">{{endDate}}</text>  
                </div> 
            </div> 
            <div class="childrens" v-if="types==1&&(effectiveDaysUnitType==5||effectiveDaysUnitType==6)">
              <div class="conditionName"> 
                  <text class="names">有效期至</text>
              </div>  
              <div class="chooseCondition">
                  <text class="txt" style="color:#A3A3A3;font-size:28px;">{{endDate}}</text>
              </div>
            </div> 
            <div class="childrens">
              <div class="conditionName">
                  <text class="aterisk">*</text>   
                  <text class="names">应收金额</text>
              </div>  
              <div class="chooseCondition">
                  <input :value="money" class="moneyBox" placeholder="请输入应收金额" placeholder-color='rgba(0, 0, 0, 0.25);' type="number" @input="getNum" ref="moneyText" @blur="conmuterMoney"/>
              </div>
            </div>  
            <div class="childrens" v-if="(pannyList.length>0)">
              <div class="conditionName">
                  <text class="aterisks">*</text>   
                  <text class="names">可用定金</text>
              </div>  
              <div class="chooseCondition" @click="selectPenny">
                  <text class="txt">{{pannyItem||'选择可用定金'}}</text>
                  <image  src="http://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/Rectanglex.png" class="chooseImg"/>
              </div>
            </div>  

            <div class="childrens" >
              <div class="conditionName">
                  <text class="aterisks">*</text>   
                  <text class="names">协助销售</text>
              </div>  
              <div class="chooseCondition" @click="chooseHelpSale">
                  <text class="txt">{{helpSaleItem}}</text>
                  <image  src="http://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/Rectanglex.png" class="chooseImg"/>
              </div>
            </div> 
            <div class="childrens" >
              <div class="conditionName">
                  <text class="aterisks">*</text>   
                  <text class="names">协助比例</text>
              </div>  
              <div class="chooseCondition" @click="choosePrecent">
                  <text class="txt">{{precentItem}}</text>
                  <image  src="http://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/Rectanglex.png" class="chooseImg"/>
              </div>
            </div>  
          </div> 
          <div class="reMarks" >
            <text class="marksName">备注</text>
            <textarea placeholder="输入备注内容" class="markContent" maxlength="150"   @input="oninput" ref="inputText" v-model="notes"></textarea>  
          </div> 
        </div>
        <!-- </cell>
      </list> -->
      <div class="bg" v-if="(isShowchooseCourse)" :style="{height:height}" @click="returnPage">
        <div class="selectBox">
            <div class="selectHeader">
                <text class="dispire" @click="hideCourseList">取消</text>
                <text class="titles">{{data}}</text>
                <text class="finish" @click="getCourseItem">确定</text>
            </div>
            <list class="scrollers">
                <cell>
                   <div v-if="listType==1">
                        <div class="lists" v-for="(item,index) in list" :key="index" @click="chooseCourseItem(item.id)" >
                          <text :class="[item.checked?'select':'contents']" style="width:690px;lines:1;text-align:center;">{{item.name}}</text>                
                        </div>                    
                   </div>
                   <div v-if="listType==2">
                        <text @click="emptySale"  :class="[isEmpty?'emptyOptionSelect':'emptyOption']">无</text>                    
                        <div class="lists" v-for="(item,index) in list" :key="index" @click="chooseCourseItem(item.id)">
                           <text :class="[item.checked?'select':'contents']" style="width:690px;lines:1;text-align:center;">{{item.name}}</text>
                        </div>
                   </div>
                   <div v-if="listType==3">
                        <text @click="emptySale"  :class="[isEmpty?'emptyOptionSelect':'emptyOption']">无</text>                    
                        <div class="lists" v-for="(item,index) in list" :key="index" @click="chooseCourseItem(item.id)">
                           <text :class="[item.checked?'select':'contents']" style="width:690px;lines:1;text-align:center;">{{item.name}}</text>
                        </div>
                   </div>
                   <div v-if="listType==4">
                        <text @click="emptySale"  :class="[isEmpty?'emptyOptionSelect':'emptyOption']">无</text>                    
                        <div class="lists" v-for="(item,index) in list" :key="index" @click="chooseCourseItem(item.id)">
                           <text :class="[item.checked?'select':'contents']" style="width:690px;lines:1;text-align:center;">{{item.name}}</text>
                        </div>
                   </div>
                </cell>
            </list>          
        </div>
      </div> 
      <div class="bottom" :style="{visibility: componentVisibility}">
           <div class="needPay">
              <text class="texts">需支付 ￥ </text>
              <text class="money">{{payMoney}}</text>
           </div>
           <text class="placeOrder" @click="toOrder">提交订单</text>
      </div>
      <div class="bg" :style="{height:height}"  v-if="(earnestMoney)" @click="returnPage">
        <div class="selectBox">
            <div class="selectHeader">
                <text class="dispire" @click="hidePannyList">取消</text>
                <text class="titles">可用定金</text>
                <text class="finish" @click="getpannyItem">确定</text>
            </div>
            <list class="scrollers" >
                <cell>
                    <div class="pannyLists" v-for="(item,index) in pannyList" :key="index" @click="choosePannyItem(item.id)">
                        <text :class="[item.checked?'selects':'content']">{{item.sellerName}}</text>
                        <text :class="[item.checked?'selects':'content']">{{item.amount}}</text>
                    </div>
                </cell>
            </list>          
        </div>
      </div>       
     </div>
     <div class="orderPage" v-else :style="{height:height}" >
            <div class="orderContent">
                 <div class="headers">
                    <div class="returnImgs" @click="returnCourse">
                        <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png" class="beforePage"/>
                    </div>
                    <text class="title">确认订单</text>
                    <div class="deleteImg" @click="deleteOrder">
                        <image src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/delete.png" class="deletePage" v-if="isFinish"/>
                    </div>
                </div>
            <!-- <list :style="{height:listHeight}"> 
              <cell> -->
                <div class="customerMess">
                    <div style=" align-items: center;flex-direction: row;">
                      <div class="peopleAvatar" style="margin-right: 30px;">
                         <image :src='orderPeopleImg' class="peopleAvatar" />
                      </div>
                        <div class="nameAndPhone">
                            <text class="customerName">{{orderPeopleName}}</text>
                            <div class="phones">
                                   <image src='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/phone.png' class="phoneImg"/>
                                <text class="phoneTxt">{{orderPeoplePhone||'--'}}</text>
                            </div>
                        </div>
                    </div>
                      <text class="payDone" v-if="payResult==1" style="color:#303030;">已完成</text>
                      <text class="payDone" v-if="payResult==-3" style="color:#6E6E6E;" @click="toApprovalDetail">撤销审批</text>
                      <text class="payDone" v-if="payResult==-2" style="color:#EF8D8D;" @click="toApprovalDetail">审批驳回</text>
                      <text class="payDone" v-if="payResult==-1"  style="color:#FF9D3B;" @click="toApprovalDetail">审批中</text>
                      <text class="payDone" v-if="payResult==0&&(approvalId==''||approvalId==null||approvalId==undefined)" style="color:#FF9D3B;">待付款</text>
                      <text class="payDone" v-if="payResult==0&&approvalId!=''&&approvalId!=null&&approvalId!=undefined" style="color:#72BFA7;" @click="toApprovalDetail">审批通过</text>
                </div>
                <div class="orderMess" >
                    <div class="orderTitle">
                       <text class="leftTxt">订单信息</text>
                    </div>
                    <div class="projectList">
                      <div class="listChildren">
                           <text class="projectName">私教课</text>
                           <text class="projectContent">{{orderCourseName}}</text> 
                      </div>
                       <div class="listChildren" v-if="isHours">
                           <text class="projectName">有效节数</text>
                           <text class="projectContent">{{orderCourseCont}}节</text> 
                      </div>
                       <div class="listChildren" v-else>
                           <text class="projectName">有效天数</text>
                           <text class="projectContent">{{orderCourseCont}}天</text> 
                      </div>
                       <div class="listChildren">
                           <text class="projectName">销售方式</text>
                           <text class="projectContent">{{orderSaleStyle}}</text> 
                      </div>
                       <div class="listChildren" v-if="!isHours">
                           <text class="projectName">生效方式</text>
                           <text class="projectContent" v-if="(effectiveType==1)">指定日期生效</text> 
                            <text class="projectContent" v-if="(effectiveType==2)">首次开课生效</text> 
                      </div>
                       <div class="listChildren" v-if="(effectiveType==1)">
                           <text class="projectName">有效期</text>
                           <text class="projectContent">{{orderStartTime}}至{{orderEndTime}}</text> 
                      </div>
                       <div class="listChildren" v-if="isHelp">
                           <text class="projectName">协助销售</text>
                           <text class="projectContent">{{orderHelpSale}} {{orderPrecent}}%</text> 
                      </div>
                       <div class="listChildren" v-if="isNotes">
                           <text class="projectName">备注</text>
                           <text class="projectContent">{{orderNotes}}</text> 
                      </div>
                    </div>
                    <div class="earnestList">
                       <div class="listChildren">
                           <text class="projectName">应收金额</text>
                           <text class="projectContent">{{orderAmount}} 元</text> 
                      </div>
                       <div class="listChildren"  v-if="(isPanny)">
                           <text class="projectName">定金抵扣</text>
                           <text class="projectContent">-{{orderPanny}} 元</text> 
                      </div>
                       <div class="listChildren">
                           <text class="projectName">实收金额</text>
                           <text class="payMoney">{{orderRealPrice}} 元</text> 
                      </div>
                    </div>
                </div>
            <!-- </cell>
              </list> -->
            </div>
            <div :style="{visibility: payVisibility}" class="editAndPayBox" v-if="isFinish&&payResult==0">
               <text class="editCourseBtnTxt" @click="editOrder" v-if="signaturePhoto==null||isSkipSign">编辑信息</text>
               <text class="editCourseBtnTxt" v-else @click="toSignPage">查看合同</text>
               <text class="checkInTxt" @click="toPay" v-if="signaturePhoto!=null||!signatureRequired||isSkipSign">发起付款</text>
               <text class="checkInTxt"  v-if="signatureRequired&&signaturePhoto==null&&!isSkipSign" @click="toSignPage">客户签字</text>
            </div>
             <div :style="{visibility: payVisibility}" class="editAndPayBox" v-if="!isFinish&&payResult!=-1&&signatureRequired&&signaturePhoto==null&&!isSkipSign">
                <text class="showPayPage" @click="toSignPage">查看合同</text>
            </div>
             <div :style="{visibility: payVisibility}" class="editAndPayBox " v-if="isFinish&&(payResult==-2||payResult==-3)">
                <text class="showPayPage againHandle" @click="deleteAndEditOrder">重新办理</text>
            </div>
            <div class="bg centerBg" :style="{height:height}" v-if="(showPayCode)" @click="returnPage">             
                 <div class="codeBox">
                    <div class="qrCodeTop">
                        <div class="codeTitle">
                              <text class="nullBox" style=" width: 32px;">12</text>
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
            <div class="bg deletePop" :style="{height:height}"  v-if="(isDelete)" @click="returnPage">
                  <div class="deletePopBox">
                    <text class="deletePopTitle">提示</text>  
                    <text class="deletePopContent">· 确认要删除该订单？</text>
                    <div class="deleteBtnBox">
                      <text class="cancelDelete" @click="cancelDeleteEvent">取消</text>
                      <text class="submitDelete" @click="submitCancelEvent">确定</text>
                    </div>
                  </div>  
            </div> 
     </div>
      <!-- <div class="bg deletePop" :style="{height:height}" @click="returnPage" v-if="isLoading">
            <text class="loadingBox">加载中...</text>
      </div>  -->
  </div> 
</template>
<script>
  // import { WxcDialog  } from 'weex-ui';
   import { WxcLoading  } from 'weex-ui';
  var modal = weex.requireModule("modal");
  var stream = weex.requireModule('stream');
  var TrainerNativeModule=weex.requireModule('nativeModule');
    const storage = weex.requireModule('storage');
  export default {
    components: {WxcLoading},
    data: () => ({
      isDelete:false,
      defaultTitle:'',//课程生效日期
      height:'',//页面高度
      isShowchooseCourse:null,//是否显示选课弹窗
      list:[],//公用列表
      courseList:[],//课程列表
      data:'选择课程',//公用弹窗显示的title
      courseId:'',//课程id
      courseItem:'',//课程名称
      num:24,//课时
      componentVisibility: 'hidden',//控制发起付款是否可见
      listHeight:'',
      saleTypeId:null,//销售类型id
      saleTypeItem:"选择销售类型",//销售类型名称
      earnestMoney:false,//控制显示可用定金弹窗
      pannyId:'',//可用定金id
      pannyItem:'选择可用定金',//可用定金内容
      pannyList:[],//可用定金列表
      helpSale:false,//
      helpSaleList:[],//协助销售列表
      helpSaleId:null,//协助销售id
      helpSaleItem:'选择协助销售',//协助销售人名称
      webHost:'https://www.forzadata.cn',
      // webHost:'http://10.0.0.5:8081',
      centerId:null,
      types:'',//课程类型
      effectiveType:"",//指定日期生效还是首次开课生效
      year:'',
      month:'',
      day:'',
      saleList:[
            { name: '新购课', id: 1,checked: false},
            { name: '续课', id: 2, checked: false},
            { name: 'pos销售', id: 3,checked: false},
            { name: '场地开发', id: 4,checked: false},
            { name: '交叉课', id: 5,checked: false},
            { name: '会员转介绍', id:8,checked: false},
            { name: '体验课出单', id: 9,checked: false},
            { name: '其他', id: 16,checked: false},
      ],//销售类型列表
      showCoursePage:true,//控制订单详情页显示还是添加页面显示
      notes:'',//备注
      money:'',//应收金额
      showPayStyle:false,//显示支付方式
      payVisibility:'visible',//发起付款显示隐藏
      showPayCode:false,//显示付款码
      courseImg:'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/cousre.png',
      endDate:"0000-00-00",//指定日起开课结束日期
      precentId:'',//分成id
      precentItem:'选择协助比例',//分成份额
      precentList:[
           { name: '分成10%', id: 1,checked: false},
            { name: '分成20%', id: 2, checked: false},
            { name: '分成30%', id: 3,checked: false},
            { name: '分成40%', id: 4,checked: false},
            { name: '分成50%', id: 5,checked: false},
            { name: '分成60%', id:6,checked: false},
            { name: '分成70%', id: 7,checked: false},
            { name: '分成80%', id: 8,checked: false},
            { name: '分成90%', id: 9,checked: false},
      ],//分成列表
      consultantsList:[],//会籍列表
      minPrice:null,//课程最低价
      payMoney:'0',//需付款
      traineeId:'600',
      depositIdsList:[],//定金id列表
      depositAsTrainerPerformance:null,//定金是否算入会籍
      showChooseCourse:"hidden",//显示课程详情还是选择课程
      realPrice:'',//课程价格
      effectiveDays:'',//包月课有效期或者课时课的固定有效期天数
      coachList:[],//教练列表
      isShow:false,//弹窗显示隐藏
      orderPeopleName:'',//会员名称
      orderPeoplePhone:'',//会员手机号
      orderPeopleImg:'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultImg.png',//会员头像
      orderCourseName:'',//课程名称
      orderCourseCont:'',//课时或者有效天数
      orderSaleStyle:'',//销售类型
      orderCoach:'',//上课教练
      orderHelpSale:"",//协助教练
      orderPrecent:'',//定金分成
      orderNotes:'',//备注
      isPanny:null,//是否使用了定金
      orderAmount:'',//应收金额
      orderPanny:'',//定金抵扣
      orderRealPrice:'',//实收金额
      isHours:null,//是否课时课
      isHelp:'',//是否有协助销售
      isNotes:'',//是否有备注
      orderStartTime:'',//开始时间
      orderEndTime:'',//结束时间
      isEdit:false,//是否是编辑
      orderId:null,//订单ID
      needPayMoney:0,//需要支付的价钱
      qrCode:'',//二维码图片
      realId:'',//支付时传递的id
      isFinish:true,//是否付款成功
      token:'eyJuYW1lIjoiUmVkQTFlcnQiLCJwaG9uZSI6IjE1ODg4ODMwODQ4IiwiYWNjb3VudElkIjo1MzE0MzR9.YVUVqYttJUd85cj0GMBX9jZQCUCvvvDrB39AsDLvd3Y=',//token
      nullHeight:'',
      isAlipay:false,
      courseEffectiveEndTsMode:null,
      eachCourseEffectiveDays:null,
      maxEnd:null,
      signatureRequired:'',
      signaturePhoto:'',
      preCoursePrice:'',
      privateCourseTeachType:'',
      isNeedApproval:'',//私教课是否审批开启
      approvalId:'',
      isTrainingCourse:'',//是否培训课,
      trainApproval:'',//培训课是否审批开启
      isLoading:true,
      isEmpty:false,
      isSkipSign:false,
      membershipEndDate:null,
      allowOnlinePay:null,
      stageNum:0,
      isPay:false,
      payResult:'',
      listType:1,
      restrictTraining:false,
      effectiveDaysUnitType:4
    }),
    created(){
       var that=this;
       that.isShow=true;
       var heights=750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight;
        if(weex.config.env.platform=='iOS'){
          if(heights>=1624){
                 that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-51-80;
                 that.listHeight= 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-51-230-80;
          }else{
            that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-51;
            that.listHeight= 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-51-230;
          }
        }else{
            that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-51;
            that.listHeight= 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-51-230;
        }
       that.componentVisibility='hidden';
       that.year=new Date().getFullYear();
       that.month=(new Date().getMonth()+1)<10?'0'+(new Date().getMonth()+1):(new Date().getMonth()+1);
       that.day = new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate();
       that.defaultTitle =that.year+'-'+that.month+'-'+that.day;
       TrainerNativeModule.getMetaData(function(map){
          that.traineeId=map.traineeId;
          that.centerId=map.centerId;
          that.token=map.token;
          that.restrictTraining=map.restrictTraining?map.restrictTraining:false;
          that.webHost=map.webHost?map.webHost:'https://www.forzadata.cn';
       });
        setTimeout(()=>{
            that.getCourseList(); 
            that.getOrder();
            storage.getItem('isSkipSign', event => {
                 if(event.data=='undefined'){
                    that.isSkipSign=false;
                 } else{
                   that.isSkipSign=event.data;
                 }
            })
        },50);
      weex.requireModule('globalEvent').addEventListener('androidback', function (e) {  
          if(that.isEdit){
            that.showCoursePage=false;
        }else{
            TrainerNativeModule.close();
            storage.removeItem('isSkipSign');
        }
      })
    },
    methods: {
      returnPage(){
      },
      deleteAndEditOrder(){
        var that=this;
          stream.fetch({
            method:"DELETE",
            type:'json',
            url:that.webHost+'/api/trainerApp/saleCourse/removePerCourse/'+that.orderId,
            headers:{
                "Content-Type": 'application/json',
                'X-AUTH-TOKEN':that.token
            }
         }, function(ret) {
            if(ret.data.data){
               that.getOrder();
            }
        })
      },
      cancelDeleteEvent(){
        this.isDelete=false;
      },
      submitCancelEvent(){
            var that=this;
            stream.fetch({
                method:"DELETE",
                type:'json',
                url:that.webHost+'/api/trainerApp/saleCourse/removePerCourse/'+that.orderId,
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                }
            }, function(ret) {
                if(ret.data.data){
                  that.isDelete=false; 
                  TrainerNativeModule.toast('删除成功');              
                  setTimeout(function(){
                      //删除成功，关闭页面
                      TrainerNativeModule.close();
                      storage.removeItem('isSkipSign');
                  },1000)
                }
            })
      },
      getNum(event){
          this.money=event.value;
          this.payMoney=this.money.toFixed;
           if(this.pannyItem=='选择可用定金'){
              this.payMoney=this.money;
          }else{
            if(Number(this.money)-Number(this.pannyItem)<0){
               this.payMoney=0;
            }else{
              this.payMoney=Number(this.money)-Number(this.pannyItem);
             this.payMoney=this.payMoney.toFixed(2);
            }
         
        }
      },
      //获取课程列表
      getCourseList(){
        var me=this;
        var GET_URL = me.webHost+'/api/trainerApp/saleCourse/courseList/'+me.centerId+'/'+me.traineeId+'?restrictTraining='+me.restrictTraining;
        stream.fetch({
          method: 'GET',
          url: GET_URL,
          type:'json',
          headers:{
           'X-AUTH-TOKEN':me.token
          }
        },function(ret) {
          // TrainerNativeModule.toast(ret)
          if(!ret.ok){
               me.isShow=false;
               TrainerNativeModule.toast('请求失败');
          }else{
            if(ret.data.status==0){
                  me.isShow=false;
                  if(ret.data.data.courseEffectiveEndTsMode!=null&&ret.data.data.courseEffectiveEndTsMode!=''&&ret.data.data.courseEffectiveEndTsMode!=undefined){
                      me.courseEffectiveEndTsMode=ret.data.data.courseEffectiveEndTsMode;
                  }
                  if(ret.data.data.eachCourseEffectiveDays!=null&&ret.data.data.eachCourseEffectiveDays!=''&&ret.data.data.eachCourseEffectiveDays!=undefined){
                      me.eachCourseEffectiveDays=ret.data.data.eachCourseEffectiveDays;
                  }
                  if(ret.data.data.courseApproval==''||ret.data.data.courseApproval==null||ret.data.data.courseApproval==undefined){
                       me.isNeedApproval=false;
                  }else{
                        me.isNeedApproval=ret.data.data.courseApproval;
                  }
                  if(ret.data.data.trainApproval==''||ret.data.data.trainApproval==null||ret.data.data.trainApproval==undefined){
                       me.trainApproval=false;
                  }else{
                        me.trainApproval=ret.data.data.trainApproval;
                  }               
              if(ret.data.data.course.length==0){
                TrainerNativeModule.toast('暂无可选课程');
                 setTimeout(function(){
                  TrainerNativeModule.close();
                },1500)
              }else{
                  if(ret.data.data.course!=null&&ret.data.data.course!=''&&ret.data.data.course!=undefined){
                   var list=ret.data.data.course;
                    for(var i=0;i<list.length;i++){
                      list[i].checked=false;
                   }
                    me.courseList=list;
                    me.list=list;
                    me.listType=1;
                }
              }
                if(ret.data.data.trainers!=null&&ret.data.data.trainers!=''&&ret.data.data.trainers!=undefined){
                  var  coachList=ret.data.data.trainers;
                    for(var i=0;i<coachList.length;i++){
                        coachList[i].checked=false;
                    }
                    me.helpSaleList=coachList;
                    me.coachList=coachList;
                }
                if(ret.data.data.consultants!=null&&ret.data.data.consultants!=''&&ret.data.data.consultants!=undefined){
                    var consultantsList=ret.data.data.consultants;
                    for(var i=0;i<consultantsList.length;i++){
                        consultantsList[i].checked=false;
                    }
                    me.consultantsList=consultantsList;
                }          

                if(ret.data.data.deposits!=null&&ret.data.data.deposits!=''&&ret.data.data.deposits!=undefined){
                    var  deposits=ret.data.data.deposits;         
                    if(deposits.length>0){
                      for(var i=0;i<deposits.length;i++){
                          deposits[i].checked=false;
                      }
                    }
                    me.pannyList=deposits;
                }
                 me.depositAsTrainerPerformance=ret.data.data.depositAsTrainerPerformance.depositAsTrainerPerformance;
            }else{
              // TrainerNativeModule.toast(ret.data.message);
                setTimeout(function(){
                  TrainerNativeModule.close();
                  storage.removeItem('isSkipSign');
                },500)
            }
             me.allowOnlinePay=ret.data.data.allowOnlinePay;
          }      
        },function(response){
        });
      },
      //协助销售选择无
      emptySale(){
         var that=this;
         that.isEmpty=true;
           for(var i=0;i<that.list.length;i++){      
              that.list[i].checked=false;
          };
          for(var i=0;i<that.precentList.length;i++){      
              that.precentList[i].checked=false;     
          }
      },
      //获取是否有单
      getOrder(){
        var me=this;
        var GET_URL = me.webHost+'/api/trainerApp/saleCourse/unPayCourse/'+me.centerId+'/'+me.traineeId;
        stream.fetch({
            method: 'GET',
            url: GET_URL,
            type:'json',
            headers:{
            'X-AUTH-TOKEN':me.token
            }
          },function(ret) {
             if(!ret.ok){
               TrainerNativeModule.toast('请求失败');
             }else{
                // me.isLoading=false; 
               if(ret.data.status==0){                            
                  if(ret.data.data==null||ret.data.data==undefined||ret.data.data==''){
                      me.isShowchooseCourse=true;
                      me.showCoursePage=true;
                  }else{
                    me.signatureRequired=ret.data.data.signatureRequired;
                    if(ret.data.data.course.signaturePhoto!=''&&ret.data.data.course.signaturePhoto!=''&&ret.data.data.course.signaturePhoto!=undefined){
                        me.signaturePhoto=ret.data.data.course.signaturePhoto;
                    }else{
                      me.signaturePhoto=null;
                    }

                    me.payResult=ret.data.data.course.status;
                      // TrainerNativeModule.toast(me.payResult);
                    me.isTrainingCourse=ret.data.data.isTrainingCourse;
                    me.approvalId=ret.data.data.course.approvalId;
                    // TrainerNativeModule.toast(me.approvalId+'----'+me.payResult);
                    me.showCoursePage=false;
                    me.isShowchooseCourse=false;
                    me.membershipEndDate=ret.data.data.membershipEndDate;
                    me.allowOnlinePay=ret.data.data.allowOnlinePay;
                    var course=ret.data.data.course;
                    var trainee=ret.data.data.trainee;
                    me.orderPeopleName=trainee.name;
                    me.orderPeoplePhone=trainee.phone;
                    if(trainee.photo==undefined||trainee.photo==null||trainee.photo==''||trainee.photo.indexOf('static')!=-1){
                      me.orderPeopleImg='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultImg.png';
                    }else{
                      me.orderPeopleImg=trainee.photo;
                    }
                    me.orderCourseName=course.courseName;
                    me.orderCourseCont=course.count;
                    me.orderId=course.id;
                    if(course.notes==undefined||course.notes==''||course.notes==null){
                      me.isNotes=false; 
                    }else{
                      me.isNotes=true;
                      me.orderNotes=course.notes;
                    }
                    for(var i=0;i<me.saleList.length;i++){
                      if(course.saleType==me.saleList[i].id){
                        me.orderSaleStyle=me.saleList[i].name;
                      }
                    }
                    if(course.depositIds==undefined){
                          me.isPanny=false;
                    }else{
                        me.isPanny=true;
                        if(course.amount<ret.data.data.depositAmount){
                          me.orderPanny=course.amount;
                        }else{
                           me.orderPanny = ret.data.data.depositAmount;
                        }
                       
                    }
                    me.orderAmount=course.amount;
                    me.orderRealPrice=course.payMethod1Amount;
                    if(course.activatedMode==undefined){
                      me.isHours=true;
                    }else{
                      me.isHours=false;
                      if(course.activatedMode==4){
                        me.effectiveType=2
                      }else{
                        me.effectiveType=1;
                        me.orderStartTime=course.startDate;
                        me.orderEndTime=course.endDate;
                      }
                    }
                    if(course.assistSellerName==undefined){
                        me.isHelp=false;
                    }else{
                        me.isHelp=true;
                        me.orderHelpSale=course.assistSellerName;
                        me.orderPrecent=Number(course.saleRatio)*100;
                    }
                }
                }else{
                  // TrainerNativeModule.toast(ret.data.message);
                   setTimeout(function(){
                      TrainerNativeModule.close();
                      storage.removeItem('isSkipSign');
                   },500)
                }
             }
          })
      },
      //跳转审批详情
      toApprovalDetail(){
         TrainerNativeModule.goToApprovalDetail(this.approvalId);
      },
      //跳转合同页面
      toSignPage(){
         this.$router.push({name:'payOrder',query:{id:this.orderId}}); 
      },
      //编辑当前订单
      editOrder(){
          var me=this;
          me.isEdit=true;
          var GET_URL = me.webHost+'/api/trainerApp/saleCourse/unPayCourse/'+me.centerId+'/'+me.traineeId;
          stream.fetch({
             method: 'GET',
             url: GET_URL,
             type:'json',
             headers:{
              'X-AUTH-TOKEN':me.token
             }
          },function(ret) {  
        // modal.toast({ message:ret.data.data.course, duration: 10 });
          if(!ret.ok){
               TrainerNativeModule.toast('请求失败');
             }else{
                if(ret.data.status==0){  
                      var course=ret.data.data.course;
                        me.courseId=course.courseId;
                        me.orderId=course.id;
                        me.courseItem=course.courseName;
                        me.notes=course.notes;
                        me.money=course.amount;
                        me.payMoney=course.payMethod1Amount;
                        me.showChooseCourse=false;
                        if(course.depositIds!=undefined){
                          me.pannyItem=ret.data.data.depositAmount;
                          var pannyIdList = course.depositIds.split(';');
                          var idList=[];
                          for(var i=0;i<pannyIdList.length;i++){
                            for(var j=0;j<me.pannyList.length;j++){
                              if(pannyIdList[i]==me.pannyList[j].id){
                                me.pannyList[j].checked=true;
                                idList.push(me.pannyList[j].id)
                              }
                            }
                          }
                            me.depositIdsList=idList;
                        }  
                        if(course.assistSellerId==undefined||course.assistSellerId==''||course.assistSellerId==null){
                        }else{                     
                          if(course.saleType==3){
                              me.helpSaleList=me.consultantsList;
                              for(var i=0;i<me.helpSaleList.length;i++){
                                if(course.assistSellerId==me.helpSaleList[i].consultantId){
                                      me.helpSaleId=me.helpSaleList[i].consultantId;
                                      me.helpSaleItem=me.helpSaleList[i].name;
                                      me.helpSaleList[i].checked=true;
                                }
                              }
                          }else{                    
                              me.helpSaleList=me.coachList;
                              for(var i=0;i<me.helpSaleList.length;i++){
                                if(course.assistSellerId==me.helpSaleList[i].trainerId){
                                      me.helpSaleId=me.helpSaleList[i].trainerId;
                                      me.helpSaleItem=me.helpSaleList[i].name;
                                      me.helpSaleList[i].checked=true;
                                }
                              }

                          }
                        }
                        if(course.saleRatio!=undefined){
                            for(var i=0;i<me.precentList.length;i++){
                              if(Number(course.saleRatio)*10==me.precentList[i].id){
                                  me.precentId=me.precentList[i].id;
                                  me.precentList[i].checked=true;
                                  me.precentItem='分成'+Number(course.saleRatio)*100+'%';
                              }
                            }
                        }
                        for(var i=0;i<me.list.length;i++){
                          if(course.courseId==me.list[i].id){
                            me.courseId=me.list[i].id;
                            me.list[i].checked=true;
                            me.courseItem=me.list[i].name;
                            me.realPrice=me.list[i].price;
                            if(course.activatedMode==undefined||course.activatedMode==''||course.activatedMode==null){
                                me.types=1;
                                me.num=course.count;
                            }else{
                              me.types=2;
                              me.effectiveDays=course.count;
                              if(course.activatedMode==4){
                                me.effectiveType=2;
                              }else{
                                me.effectiveType=1;
                                me.defaultTitle=course.startDate;
                                me.endDate=course.endDate;
                              }
                            }
                          }
                        }
                        for(var i=0;i<me.saleList.length;i++){
                          if(course.saleType==me.saleList[i].id){
                              me.saleTypeId=me.saleList[i].id;
                              me.saleTypeItem=me.saleList[i].name;
                              me.saleList[i].checked=true;
                          }
                        }
                      setTimeout(function(){
                          me.showCoursePage=true;
                          me.componentVisibility='visible';
                          storage.removeItem('isSkipSign');
                      },100)
                }else{
                  // TrainerNativeModule.toast(ret.data.message);
                   setTimeout(function(){
                      TrainerNativeModule.close();
                      storage.removeItem('isSkipSign');
                   },500)
                }
             }
          })
      },
      //打开日历选择
      openPicker () {
        var that=this;
        var endTime=that.defaultTitle;
        TrainerNativeModule.getDateDialog(endTime,function(map){
            that.defaultTitle=map.date;
            var times=new Date(map.date);
            var l=times.getTime(times)+that.effectiveDays*86400000;
            that.timestampToTime(l);
            that.endDate=that.timestampToTime(l).substring(0,10);
        })
      },
      //时间转换
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D=(date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + '-';
        var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes())+ ':';
        var s = date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds();
        return Y+M+D+h+m+s;
      },
      //获取课时
      getCourseNum(event){
        this.num=event.value;
        if(this.money==''){
          var money=this.num*this.realPrice;
          this.money=money.toFixed(2);
        }
       
        if(this.pannyItem=='选择可用定金'){
            this.payMoney=this.money;
        }else{
              this.payMoney=this.money-this.pannyItem;
              this.payMoney=this.payMoney.toFixed(2);
        }    
      },
      //隐藏选课等列表
      hideCourseList(){
            var that=this;
          if(that.data=='选择课程'){
            if(that.courseItem==''){
                TrainerNativeModule.close();
                storage.removeItem('isSkipSign');
            }else{
              for(var i=0,len=that.list.length;i<len;i++){
                    if(that.list[i].id==that.courseId){
                      that.list[i].checked=true;
                    }else{
                      that.list[i].checked=false;
                    }
                }
            }
          }else if(that.data=='销售类型'){
              if(that.saleTypeId==null){
                    TrainerNativeModule.toast('请选择销售类型');
                    return;
              }else{
                for(var i=0,len=that.list.length;i<len;i++){
                      if(that.list[i].id==that.saleTypeId){
                        that.list[i].checked=true;
                      }else{
                        that.list[i].checked=false;
                      }
                  }
              }
          }else if(that.data=='协助销售'){
               var isChecked=false;
               for(var i=0,len=that.list.length;i<len;i++){
                 if(that.list[i].checked){
                   isChecked=true;
                 }
               }
              // TrainerNativeModule.toast(isChecked+'--'+that.helpSaleItem);
               if(!isChecked||that.helpSaleItem=='选择协助销售'){
                  that.helpSaleId=null;
                  that.helpSaleItem='选择协助销售';
                   for(var i=0,len=that.list.length;i<len;i++){
                        that.list[i].checked=false;
                   }
               }else{
                 for(var i=0,len=that.list.length;i<len;i++){           
                     if(that.saleTypeId==3){
                      that.helpSaleId=that.list[i].consultantId;
                       if(that.list[i].consultantId==that.helpSaleId){
                            that.list[i].checked=true;
                        }else{
                          that.list[i].checked=false;
                        }
                    }else{
                       if(that.list[i].trainerId==that.helpSaleId){
                            that.list[i].checked=true;
                        }else{
                          that.list[i].checked=false;
                        }
                    }
                  }
               }
          }else if(that.data=='协助比例'){
               var isChecked=false;
               for(var i=0,len=that.list.length;i<len;i++){
                 if(that.list[i].checked){
                   isChecked=true;
                 }
               }
               if(!isChecked||that.precentItem=='请选择协助比例'){
                  that.precentId=null;
                  that.precentItem='选择协助比例';
                   for(var i=0,len=that.list.length;i<len;i++){
                       that.list[i].checked=false;
                   }
               }else{
                  for(var i=0,len=that.list.length;i<len;i++){
                     if(that.list[i].id==that.precentId){
                        that.list[i].checked=true;
                     }else{
                       that.list[i].checked=false;
                     }
                  }
               }
          }
            that.componentVisibility='visible';
            that.isShowchooseCourse = !that.isShowchooseCourse;
        },
      // 获取时间
      addDate(days) {
        if (days == undefined || days == '') {
          days = 1;
        }
        var day2 = new Date();
        day2.setTime(day2.getTime() - 24 * 60 * 60 * 1000);
        var date = day2.getFullYear() + "-" + ((day2.getMonth() + 1) < 10 ? '0' + (day2.getMonth() + 1) : day2.getMonth() + 1) + "-" + (day2.getDate() < 10 ? '0' + day2.getDate()-1 : day2.getDate());
        date = new Date(date);
        date.setDate(date.getDate() + days);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var mm = "'" + month + "'";
        var dd = "'" + day + "'";

        //单位数前面加0
        if (mm.length == 3) {
          month = "0" + month;
        }
        if (dd.length == 3) {
          day = "0" + day;
        }

        var time = date.getFullYear() + "-" + month + "-" + day;
        return time;
      },
       mul(a, b) {
        var c = 0,
          d = a.toString(),
          e = b.toString();
        try {
          c += d.split(".")[1].length;
        } catch (f) { }
        try {
          c += e.split(".")[1].length;
        } catch (f) { }
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
      },
      //确定选择课程等
      getCourseItem(){
            var that=this;
            if(that.data=='选择课程'){
              for(var i=0;i<that.list.length;i++){
                  if(that.list[i].checked){
                      that.isTrainingCourse=that.list[i].isTrainingCourse;
                      that.courseId=that.list[i].id;
                      that.privateCourseTeachType=that.list[i].privateCourseTeachType;
                      that.courseItem=that.list[i].name;
                      that.membershipEndDate=that.list[i].membershipEndDate;
                      // if(that.list[i].effectiveDays==''||that.list[i].effectiveDays==null||that.list[i].effectiveDays==undefined){
                      //   that.types=1;
                      // }else{
                      //   that.types=2;
                      // }
                      that.types=that.list[i].cardType;
                    var GET_URL = that.webHost+'/api/membership/'+that.centerId+'/'+that.traineeId+'/'+that.courseId+'/courseMaxEndDate';
                    stream.fetch({
                      method: 'GET',
                      url: GET_URL,
                      type:'json',
                      headers:{
                        'X-AUTH-TOKEN':that.token
                      }
                    },function(ret) {  
                         if(!ret.ok){
                            TrainerNativeModule.toast('请求失败');
                        }else{
                            if(ret.data.status==0){    
                                 that.maxEnd=ret.data.data;                
                            }
                        }      
                    })
                      that.courseImg=that.list[i].pictures[0];
                      if(that.list[i].pictures[0]=='https://www.forzadata.cn/static/images/course.png'){
                         that.courseImg='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/course1.png'
                      }else if(that.list[i].pictures[0]=='https://www.forzadata.cn/static/images/private_negotiation_course.png'){
                         that.courseImg='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/private_negotiation_course.png'
                      }else if(that.list[i].pictures[0]=='https://www.forzadata.cn/static/images/private_experience_course.png'){
                         that.courseImg='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/private_experience_course.png'
                      }else if(that.list[i].pictures[0]=='https://www.forzadata.cn/static/images/course1.png'){
                        that.courseImg='https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/cousre.png'
                      }
                      that.minPrice=that.list[i].minPrice;                  
                      that.effectiveDays=that.list[i].effectiveDays;
                      that.realPrice=that.list[i].price;
                      that.effectiveType='';
                       that.defaultTitle =that.year+'-'+that.month+'-'+that.day;
                       that.endDate='0000-00-00';
                       that.effectiveDaysUnitType=that.list[i].effectiveDaysUnitType;
                      if(that.list[i].courseTypeId===2){
                        that.effectiveDays=that.list[i].effectiveDays;
                      };
                      if(that.list[i].cardType==1){
                        if(that.list[i].effectiveDaysUnitType==5){
                            that.endDate = that.addDate(that.list[i].effectiveDays)
                        }else if(that.list[i].effectiveDaysUnitType == 6){
                           that.endDate = that.addDate(that.mul(that.list[i].effectiveDays, that.num))
                        }
                      }
                      
                     that.addDate(that.list[i].effectiveDays)
                  }
              }
              if(that.courseId==''){
                    TrainerNativeModule.toast('请选择课程');
                    return;
              }else{
                  that.showChooseCourse=false;
              }
              if(that.types==1){
                 var money=Number(that.num)*Number(that.realPrice)
                 that.money=money.toFixed(2);
                 that.payMoney=that.money;
              }else{
                  that.money=Number(that.realPrice);
                  that.payMoney=that.money;
              }
            }
            if(that.data=='销售类型'){  
              var isChecked=false;
              // TrainerNativeModule.toast(that.money);           
              for(var i=0;i<that.list.length;i++){
                  if(that.list[i].checked){
                          isChecked=true;
                          that.saleTypeId=that.list[i].id;
                          that.saleTypeItem=that.list[i].name;
                          if(that.list[i].id==3){
                             that.helpSaleList=that.consultantsList;
                          }else{
                             that.helpSaleList=that.coachList;
                          }
                  }      
              }
              if(!isChecked){
                   TrainerNativeModule.toast('请选择销售类型');
                    return;
              }else{
                   that.helpSaleId=null;
                   that.helpSaleItem='选择协助销售';
                   that.precentId=null;
                   that.precentItem='选择协助比例';
                  for(var i=0;i<that.helpSaleList.length;i++){
                     that.helpSaleList[i].checked=false;
                  };
                  for(var i=0;i<that.precentList.length;i++){
                    that.precentList[i].checked=false;
                  }
              }
            }
            if(that.data=='协助比例'){
               var isChecked=false;
               for(var i=0,len=that.list.length;i<len;i++){
                 if(that.list[i].checked){
                     isChecked=true;
                      that.precentId=that.list[i].id;
                      that.precentItem=that.list[i].name;
                 }
               }
              //  TrainerNativeModule.toast(isChecked);
               if(!isChecked){
                  that.precentId=null;
                  that.precentItem='选择协助比例';
                   for(var i=0,len=that.list.length;i<len;i++){
                       that.list[i].checked=false;
                   }
               }     

            } 
            if(that.data=='协助销售'){    
               var isChecked=false;
               for(var i=0,len=that.list.length;i<len;i++){
                 if(that.list[i].checked){
                     isChecked=true;
                     if(that.saleTypeId==3){
                      that.helpSaleId=that.list[i].consultantId;
                      that.checkId=that.list[i].consultantId;
                    }else{
                      that.helpSaleId=that.list[i].trainerId;
                      that.checkId=that.list[i].trainerId;
                    }
                    that.helpSaleItem=that.list[i].name;
                 }
               }
               if(!isChecked){
                   that.helpSaleId=null;
                   that.helpSaleItem='选择协助销售';
                   that.precentItem='选择协助比例';
                   that.precentId=null;
                   for(var i=0,len=that.list.length;i<len;i++){
                       that.list[i].checked=false;
                   }
                   for(var i=0,len=that.precentList.length;i<len;i++){
                       that.precentList[i].checked=false;
                   }
               }  
               if(that.isEmpty){
                  that.helpSaleItem='选择协助销售';
                  that.helpSaleId=null;            
                  that.precentItem='选择协助比例';
                  that.precentId=null;          
               }          
            }   
              that.componentVisibility='visible';
              that.isShowchooseCourse = !that.isShowchooseCourse;     
      
      },  
      //选择课程
      chooseCourseItem(id){
          var that=this;
          for(var i=0;i<that.list.length;i++){
              if(id==that.list[i].id){
                  that.list[i].checked=!that.list[i].checked;
              }else{
                  that.list[i].checked=false;
              }
          }
          that.isEmpty=false;
      },
      //选择定金
      choosePannyItem(id){
          var that=this;
          if(that.money-that.stageNum>0){
               var allMoney=[];//选择的所有可用定金
               for(var i=0;i<that.pannyList.length;i++){
                  if(id==that.pannyList[i].id){
                      that.pannyList[i].checked= !that.pannyList[i].checked;
                      if(that.pannyList[i].checked){
                          allMoney.push(that.pannyList[i].amount)
                      }else{
                        var index=allMoney.indexOf(that.pannyList[i].amount);
                        allMoney.splice(index,1)
                      }
                  }
              }
              if(allMoney.length>0){      
                   var num=0;      
                  allMoney.forEach(function (e) {
                      num += e;
                  });        
                  that.stageNum=num;             
              }
            
        }else{
            for(var i=0;i<that.pannyList.length;i++){
                if(id==that.pannyList[i].id){
                    that.pannyList[i].checked= false;
                     that.stageNum=that.stageNum-that.pannyList[i].amount;
                     var index=allMoney.indexOf(that.pannyList[i].amount);
                     allMoney.splice(index,1)
                 }
          }
        }
               
      },
      onfocus(){
      },
      //显示选课
      chooseCouseType(){
        this.$refs.inputText.blur();
        if(this.types==1){
            this.$refs.numText.blur();
        }
        this.$refs.moneyText.blur();
        this.componentVisibility='hidden';
        this.isShowchooseCourse=true;
        this.data="选择课程";
        this.list=this.courseList;
        this.listType=1;
      },
      //显示销售分成
      choosePrecent(){
        this.$refs.inputText.blur();
        if(this.types==1){
          this.$refs.numText.blur();
        }
        this.$refs.moneyText.blur();
        this.componentVisibility='hidden';
        this.isShowchooseCourse=true;
        this.data="协助比例";
        this.list=this.precentList;
        this.listType=2;
      },
      //显示销售类型
      saleStyle(){
          this.$refs.inputText.blur();
          if(this.types==1){
              this.$refs.numText.blur();
          }
          this.$refs.moneyText.blur();
          this.data="销售类型";
          this.componentVisibility='hidden';
          this.isShowchooseCourse=true;
          this.list=this.saleList;
          this.listType=3;
      },
      //显示定金列表
      selectPenny(){
          this.$refs.inputText.blur();
        if(this.types==1){
              this.$refs.numText.blur();
          }
          this.$refs.moneyText.blur();
          this.earnestMoney=true;
          this.componentVisibility='hidden';
      },
      //隐藏定金
      hidePannyList(){
        var that=this;
        that.componentVisibility='visible';
        that.earnestMoney = !that.earnestMoney;
      },
      //获取定金
      getpannyItem(){
        var that=this;
        var allMoney=[];
        for(var i=0;i<that.pannyList.length;i++){
            if(that.pannyList[i].checked){
                allMoney.push(that.pannyList[i].amount)
            }
        }
        if(allMoney.length>0){
            var num=null;
            allMoney.forEach(function (e) {
                num += e;
            });
              that.pannyItem=num;
        }else{
            that.pannyItem='选择可用定金';
        }
        if(that.pannyItem=='选择可用定金'){
              that.payMoney=that.money;
              that.depositIdsList=[];
        }else{
             that.payMoney=that.money-that.pannyItem;
           if(that.payMoney<0){
              that.payMoney=0;
            }
            that.depositIdsList=[];
            for(var i=0;i<that.pannyList.length;i++){
              if(that.pannyList[i].checked){
                  that.depositIdsList.push(that.pannyList[i].id)
              }
          }
        }
          that.componentVisibility='visible';
          that.earnestMoney = !that.earnestMoney;
      },
      //显示协助销售
      chooseHelpSale(){
          this.$refs.inputText.blur();
          if(this.types==1){
            this.$refs.numText.blur();
          }
          this.$refs.moneyText.blur();
          this.data="协助销售";
          this.componentVisibility='hidden';
          this.isShowchooseCourse=true;
          this.list=this.helpSaleList;
          this.listType=4;
      },
      //首次开课
      firstTime(){
        this.effectiveType=2;
      },
      //指定日期
      appointTime(){
        var that=this;
        that.effectiveType=1;
        var times=new Date( that.defaultTitle);
        var l=times.getTime(times)+that.effectiveDays*86400000;
        that.timestampToTime(l);
        that.endDate=that.timestampToTime(l).substring(0,10);
       },
        //生成订单
      toOrder(){
        var that=this;
        that.$refs.inputText.blur();
        if(that.types==1){
          that.$refs.numText.blur();
        }
        that.$refs.moneyText.blur();
        that.isShow=true;
        if(that.types==2){
            if(that.minPrice==undefined){
              if(Number(that.money)<0){
                  TrainerNativeModule.toast('金额不能小于0！');
                  return;
              }
            }else{
            }
            if(that.saleTypeId==null||that.effectiveType==''||that.money==''){
                  TrainerNativeModule.toast('请填写必填项');                  
                   return;
            }
        }
        if(that.types==1){  
          var needPrice=Number(that.money)/Number(that.num);
           needPrice=needPrice.toFixed(2);
           that.preCoursePrice=needPrice;
            if(that.num<0||that.num>999){
              TrainerNativeModule.toast('请输入1-999之间的正整数节数！');                  
               return;
            }
            if(that.minPrice==undefined){
                if(that.money<0){
                 TrainerNativeModule.toast('金额不能小于0！');    
                  return;
                }
            }else{
              if(needPrice<0){
                  TrainerNativeModule.toast("请输入合法的实收金额!");    
                   return;
               }
            }
            if(that.saleTypeId==null||that.money==''||that.num==''){
               TrainerNativeModule.toast("请填写必填项");   
               return;
          } 
        }
        that.generateOrder();
      },
      //生成订单集成
      generateOrder(){
         var that=this;
         storage.removeItem('isSkipSign');
         that.isSkipSign=false;
         if(that.payMoney<0){
             TrainerNativeModule.toast("实收金额不能小于0!");
            return;
        }
         var assistCommissionAmount=null;
         var amount=null;
         var saleRatio=null;
         var depositIds=null;
         var courseBuyUnitPrice=null;
         var activatedMode=null;
         var startDate=null;
         var endDate=null;
         var count=null;
         var assistSellerId=null;
         var payMethod1Amount=null;
         var createdTs=new Date().getTime();
         var assistSellerName=null;
         //处理协助金额
          if(that.precentItem=='选择协助比例'||that.helpSaleItem=='选择协助销售'){
               assistCommissionAmount=null;
          }else{
             for(var i=0;i<that.precentList.length;i++){
               if(that.precentList[i].checked){
                  var pre=Number(that.precentList[i].id/10);
                      if(!that.depositAsTrainerPerformance){
                        assistCommissionAmount=Number(that.money)*pre;
                        assistCommissionAmount=assistCommissionAmount.toFixed(2);
                    }else{
                        if(that.pannyItem!='选择可用定金'){
                          assistCommissionAmount=(Number(that.money)-Number(that.pannyItem))*pre;
                          assistCommissionAmount=assistCommissionAmount.toFixed(2);
                        }else{
                          assistCommissionAmount=Number(that.money)*pre;
                          assistCommissionAmount=assistCommissionAmount.toFixed(2);
                        }
                    }
                 }
             }
          }
          if(that.helpSaleItem=='选择协助销售'){
              assistSellerId=that.helpSaleId?that.helpSaleId:null;
          }else{
             assistSellerName=that.helpSaleItem;
          }
          //出理协助比例
          if(that.precentItem=='选择协助比例'){
             saleRatio=null;
          }else{
            for(var i=0;i<that.precentList.length;i++){
               if(that.precentList[i].checked){
                 saleRatio=that.precentList[i].id/10;
               }
             }
          }
          if(that.helpSaleItem=='选择协助销售'&&that.precentItem!='选择协助比例'){
              TrainerNativeModule.toast("请选择协助销售人!");
              return;
          }
           if(that.helpSaleItem!='选择协助销售'&&that.precentItem=='选择协助比例'){
              TrainerNativeModule.toast("请选择协助销售比例!");
            return;
          }
          //处理实收金额    
          if(that.pannyItem=='选择可用定金'){
             amount=Number(that.money);
             depositIds=[];
             payMethod1Amount=Number(that.money);
          }else{
               amount=Number(that.money);
               depositIds=that.depositIdsList;
               if(Number(that.money)-Number(that.pannyItem)<0){
                 payMethod1Amount=0
               }else{
                 payMethod1Amount=Number(that.money)-Number(that.pannyItem)
               }
          }
          //处理每节课价格
           if(that.types==1){
             courseBuyUnitPrice=Number(that.money)/Number(that.num);
             courseBuyUnitPrice=courseBuyUnitPrice.toFixed(2);
             count=Number(that.num);
          }
          //处理包月课生效方式
          if(that.types==2){
            courseBuyUnitPrice=Number(that.money);
            count=that.effectiveDays;
            if(that.effectiveType==2){
               activatedMode=4;
            }else{
              activatedMode=3;
             if(that.endDate=='0000-00-00'){
                  TrainerNativeModule.toast("请选择生效日期!");
                  return;
             }else{
                  startDate=that.defaultTitle;
                  endDate=that.endDate;
             }
            }
          }else if(that.types==1){
             startDate=that.defaultTitle;
             if(that.effectiveDaysUnitType!=5&&that.effectiveDaysUnitType!=6){
                  if(that.courseEffectiveEndTsMode==3){
                    //如果没有最大的截至日期，当前日期加上eachCourseEffectiveDays
                    if(that.maxEnd==''||that.maxEnd==null||that.maxEnd==undefined){
                          var times=new Date();
                          var l=times.getTime(times)+that.eachCourseEffectiveDays*86400000*that.num;
                          endDate=that.timestampToTime(l).substring(0,10); 

                    }else{
                      //如果有最大的截至日期，最大日期+eachCourseEffectiveDays
                        var times=new Date();
                        if(that.maxEnd<times.getTime()){
                          that.maxEnd=times.getTime();
                        }
                        var l=that.maxEnd+that.eachCourseEffectiveDays*86400000*that.num;
                        endDate=that.timestampToTime(l).substring(0,10);

                    }
                  }
             }else{
                endDate=that.endDate;
             }
            
            // else if(that.courseEffectiveEndTsMode==2){
            //    that.endDate=that.membershipEndDate;
            // }
          }
             var data=JSON.stringify({
                  cardId:that.courseId,
                  traineeId:that.traineeId,
                  assistSellerId:that.helpSaleId?that.helpSaleId:null,
                  assistCommissionAmount:assistCommissionAmount,
                  amount:amount,
                  courseBuyUnitPrice:courseBuyUnitPrice,
                  count:count,
                  notes:that.notes,
                  startDate:startDate,
                  endDate:endDate,
                  payMethod1Amount:payMethod1Amount,
                  saleType:that.saleTypeId,
                  saleRatio:saleRatio,
                  depositIds:depositIds,
                  createdTs:createdTs,
                  activatedMode:activatedMode,
                  courseName:that.courseItem,
                  assistSellerName:assistSellerName
              })
              var url="";
              var method='';
              var isEditApproval='';//是否由编辑进入的审批，true是编辑，fasle是新建
              if(that.isEdit){
                url=that.webHost+'/api/trainerApp/saleCourse/editPerCourse/'+that.orderId+'?serverSupportDepositSpilt=true';
                   method='PUT';
                   isEditApproval=true;
              }else{
                  url=that.webHost+'/api/trainerApp/saleCourse/perCourse/'+that.centerId+'?serverSupportDepositSpilt=true';
                   method='POST';
                  isEditApproval=false;
              }                        
              if(that.minPrice==''||that.minPrice==null||that.minPrice==undefined){
                 //不审批
                  stream.fetch({
                    method:method,
                    type:'json',
                    url:url,
                      headers:{
                        "Content-Type": 'application/json',
                        'X-AUTH-TOKEN':that.token
                    },
                    body:data
                  }, function(ret) {
                      //  modal.toast({ message:ret.data, duration: 10 });
                       if(!ret.ok){
                            TrainerNativeModule.toast('请求失败');
                        }else{
                       if(ret.data.status==0){
                            that.getOrder(); 
                            that.isEdit=false;                        
                            setTimeout(function(){
                                that.showCoursePage=false;
                                if(ret.data.data.prePrivateCourse.signaturePhoto!=''&&ret.data.data.prePrivateCourse.signaturePhoto!=''&&ret.data.data.prePrivateCourse.signaturePhoto!=undefined){
                                  that.signaturePhoto=ret.data.data.prePrivateCourse.signaturePhoto;       
                                }else{
                                  that.signaturePhoto=null;
                                }
                                that.signatureRequired=ret.data.data.signatureRequired;
                                that.payResult=ret.data.data.prePrivateCourse.status;
                            },500)                         
                        }else{
                            TrainerNativeModule.toast(ret.data.message);
                        }
                       }
                    }) 
              }else{
                if(that.types==2){
                  if(that.money<that.minPrice){
                    // TrainerNativeModule.toast('金额低于最低价，请修改');
                    //审批
                    var postData={
                          needPostMess:JSON.parse(data),
                          otherMess:{
                              minPrice:that.minPrice, 
                              types:that.types,  
                              privateCourseTeachType:that.privateCourseTeachType,
                              edit:isEditApproval,
                              orderId:that.orderId,
                              trainingCourse:that.isTrainingCourse
                          },
                          isNeedApproval:that.isNeedApproval,
                          trainApproval:that.trainApproval
                    }
                    //   //  TrainerNativeModule.toast(postData.otherMess.isTrainingCourse);
                    TrainerNativeModule.awakenApproval(postData);
                  }else{
                    //不审批
                   stream.fetch({
                    method:method,
                    type:'json',
                    url:url,
                      headers:{
                        "Content-Type": 'application/json',
                        'X-AUTH-TOKEN':that.token
                    },
                    body:data
              }, function(ret) {
                 if(!ret.ok){
                            TrainerNativeModule.toast('请求失败');
                        }else{
                    if(ret.data.status==0){
                        that.getOrder(); 
                        that.isEdit=false;
                        setTimeout(function(){
                            that.showCoursePage=false;
                            if(ret.data.data.prePrivateCourse.signaturePhoto!=''&&ret.data.data.prePrivateCourse.signaturePhoto!=''&&ret.data.data.prePrivateCourse.signaturePhoto!=undefined){
                              that.signaturePhoto=ret.data.data.prePrivateCourse.signaturePhoto;       
                            }else{
                              that.signaturePhoto=null;
                            }
                            that.signatureRequired=ret.data.data.signatureRequired;
                            that.payResult=ret.data.data.prePrivateCourse.status;
                        },500)
                    }else{
                        TrainerNativeModule.toast(ret.data.message);
                    }
                 }
                }) 
                  }
                }else{
                  if(that.preCoursePrice<that.minPrice){
                    // TrainerNativeModule.toast('金额低于最低价，请修改');
                    //审批
                    var postData={
                          needPostMess:JSON.parse(data),
                          otherMess:{
                              minPrice:that.minPrice, 
                              types:that.types,  
                              privateCourseTeachType:that.privateCourseTeachType,
                              edit:isEditApproval,
                              orderId:that.orderId,
                              trainingCourse:that.isTrainingCourse
                          },
                          isNeedApproval:that.isNeedApproval,
                          trainApproval:that.trainApproval
                    }
                    TrainerNativeModule.awakenApproval(postData);
                  }else{
                    //不审批
                    stream.fetch({
                    method:method,
                    type:'json',
                    url:url,
                      headers:{
                        "Content-Type": 'application/json',
                        'X-AUTH-TOKEN':that.token
                    },
                    body:data
              }, function(ret) {
                  //  modal.toast({ message:ret.data, duration: 10 });
                   if(!ret.ok){
                            TrainerNativeModule.toast('请求失败');
                        }else{
                    if(ret.data.status==0){
                        that.getOrder(); 
                        that.isEdit=false;
                        setTimeout(function(){
                            that.showCoursePage=false;
                            if(ret.data.data.prePrivateCourse.signaturePhoto!=''&&ret.data.data.prePrivateCourse.signaturePhoto!=''&&ret.data.data.prePrivateCourse.signaturePhoto!=undefined){
                              that.signaturePhoto=ret.data.data.prePrivateCourse.signaturePhoto;       
                            }else{
                              that.signaturePhoto=null;
                            }
                            that.signatureRequired=ret.data.data.signatureRequired;
                            that.payResult=ret.data.data.prePrivateCourse.status;
                        },500)
                    }else{
                        TrainerNativeModule.toast(ret.data.message);
                    }
                  }
                }) 
                  }
                }
              }
      },
      //详情页返回
      returnCourse(){
        //关闭当前页面
        TrainerNativeModule.close();
        storage.removeItem('isSkipSign');
      },
      //获取应付金额
      getMoney(event){
        //  TrainerNativeModule.toast(this.num);
      },
      //应收金额失焦时计算金额
      conmuterMoney(){
        //     var that=this;
        //     that.$refs.moneyText.blur();
        //     if(that.pannyItem=='选择可用定金'){
        //         that.payMoney=that.money;
        //     }else{
        //        that.payMoney=that.money-that.pannyItem;
        //        that.payMoney=that.payMoney.toFixed(2);
        //   }
        //   if(that.payMoney<0){
        //         TrainerNativeModule.toast('需支付不能小于0');
        //         that.payMoney=0;
        //  }
      },
      oninput(event){
          this.notes=event.value;
      },
      //显示付款方式
      toPay(){
        var that=this;
        if(that.orderRealPrice==0){
          if(!that.isPay){
            // TrainerNativeModule.showProgressDialog();
            that.isPay=true;
            stream.fetch({
                method:"GET",
                type:'json',
                url:that.webHost+'/api/trainerApp/saleCourse/'+that.centerId+'/getAggregateOrder/'+that.orderId+'/'+4+'?pay=false&serverSupportDepositSpilt=true',
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
                        storage.removeItem('isSkipSign');
                      },500)
                  }else{                       
                    if(ret.data.status==0){
                          // that.success();     
                            that.isFinish=false;
                            that.payResult=1;
                            TrainerNativeModule.toast('支付成功');
                            storage.removeItem('isSkipSign');

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
         if(!that.isAlipay){
            //  TrainerNativeModule.showProgressDialog();
              that.isShow=true;
              that.isAlipay=true;
            //  if(that.orderRealPrice==0){
            //    pay=false;
            //  }else{
            //    pay=true;
            //  }     
              stream.fetch({
                method:"GET",
                type:'json',
                url:that.webHost+'/api/trainerApp/saleCourse/'+that.centerId+'/getAggregateOrder/'+that.orderId+'/'+4+'?pay=true&serverSupportDepositSpilt=true',
                headers:{
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN':that.token
                },
                timeout: 3000
            }, function(ret) {       
                //  TrainerNativeModule.progressDialogDismiss();             
                      if(!ret.ok){
                          that.isShow=false;
                          that.isAlipay=false;
                          TrainerNativeModule.toast('请求失败');                     
                          setTimeout(function(){
                              TrainerNativeModule.close();
                                storage.removeItem('isSkipSign');
                          },500)
                      }else{                       
                       if(ret.data.status==0){
                            that.needPayMoney=ret.data.data.amount;
                            that.qrCode=ret.data.data.qrCodeLink.replace(/\s*/g,"");
                            that.realId=ret.data.data.orderId;     
                            that.showPayCode=true;
                            that.showPayStyle=false;
                            that.isShow=false;
                            that.isAlipay=false;
                      }
                      that.isAlipay=false;
                  }
            })
         }else{
            TrainerNativeModule.toast('点击过于频繁！');
         }
      },
      //切换支付方式
      // changePay(){
      //       this.showPayStyle=true;  
      //       this.showPayCode=false;
      // },
      //取消支付
      cancelPay(){
            this.showPayCode=false;
            this.payVisibility='visible';
      },
      //课时增加
      reduceNum(){
        if(this.num==1){
          return;
        }else{
          this.num--;
          this.money=Number(this.num)*Number(this.realPrice);
          this.money=this.money.toFixed(2)
          this.payMoney=this.money;
              //  TrainerNativeModule.toast(this.effectiveDays+'--'+this.num+'--'+this.effectiveDaysUnitType);
          if (this.effectiveDaysUnitType == 6) {
            this.endDate = this.addDate(this.mul(this.effectiveDays, this.num))
          }
        }
      },
      //课时减少
      addNum(){
        this.num++;
        this.money=Number(this.num)*Number(this.realPrice);
        this.money=this.money.toFixed(2)
        this.payMoney=this.money;
        //  TrainerNativeModule.toast(this.effectiveDays+'--'+this.num+'--'+this.effectiveDaysUnitType);
       if (this.effectiveDaysUnitType == 6) {
          this.endDate = this.addDate(this.mul(this.effectiveDays, this.num))
        }
      },
       //删除订单
       deleteOrder(){
          // modal.toast({ message:this.orderId, duration: 1 });
          var that=this;
          that.isDelete=true;       
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
            // modal.toast({ message:ret, duration: 1 });
           if(!ret.ok){
               TrainerNativeModule.toast('请求失败');
           }else{
              if(ret.data.status==0){
               if(ret.data.data==1){
                   that.success();
               }else{
                  if(ret.data.data==0){
                       TrainerNativeModule.toast('支付失败，订单待付款');                     
                  }else if(ret.data.data==3){
                       TrainerNativeModule.toast('支付失败，订单已退款');                    
                  }
                    that.payVisibility='visible';
                    that.isFinish=true;
                    that.showPayCode=false;
               }
            }else{
              if(i>15){
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
          that.payResult=1;
          TrainerNativeModule.toast('支付成功');
          storage.removeItem('isSkipSign');
       },
        returnBack(){
          if(this.isEdit){
              this.showCoursePage=false;
          }else{
              TrainerNativeModule.close();
               storage.removeItem('isSkipSign');
          }
        }
    },
    watch:{
      '$route'(){
          this.created();
      }
    }
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
  .codeBox{
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
.nullBox{
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
.emptyOption{
  width: 750px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size:30px; 
  color:#575757;
}
.emptyOptionSelect{
  font-size:34px; 
  color: #12C48B;
  width: 750px;
  height: 80px;
  text-align: center;
  line-height: 80px;
}
.deletePop{
  justify-content: center;
  align-content: center;
}
.deletePopBox{
  width:620px;
  height: 320px;
  border-radius: 16px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  opacity:1;
  flex-direction: column;
  margin-left: 64px;
}
.loadingBox{
   width:300px;
   height: 120px;
   line-height: 320px;
   margin-left: 225px;
   border-radius: 16px;
   text-align: center;
   font-size: 14px;
   background-color: #ffffff;
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
.cancelDelete{
  width: 310px;
  height: 90px;
   line-height: 90px;
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
  height: 90px;
   line-height: 90px;
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
   width:620px;
  color: #323232;
  font-size: 36px;
  background-color: #ffffff;
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
.nameAndPhone{
  flex-direction: column;
}
.orderContent{
  flex-direction: column;
}
.courseMess{
  justify-content: space-around;
   /* align-items: center; */
}
.courseName{
  color:'#222222';
  font-size:30px;
  margin-bottom:10px;
  width: 250px;
  lines:1;
}
.payDone{
  font-size: 28px;
  width: 170px;
  height: 56px;
  text-align: center;
  line-height: 56px;
  border-top-left-radius: 46px;
  border-bottom-left-radius: 46px;
  background-color: #F4F6F7;
}
.payWill{
  color: #FF9D3B;
  font-size: 28px;
}
.priceIcon{
  color:'#575757';
  font-size:24px;
}
.realPrice{
   color:'#575757';
  font-size:40px;
  margin-right:5px;
}
.realDay{
     color:'#575757';
  font-size:34px;
}
.priceBox{
   justify-content: space-around;
   align-items: center;
   flex-direction: row;
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
  font-size:34px;
  color: #ffffff;
}
.addBox{
    width: 750px;
    background-color: #f2f2f2;
}
.deleteImg{
    width: 100px;
    height: 80px;
    flex-direction: row;
    justify-content:flex-end;
    align-items: center;
}
.beforePage{
    width: 48px;
    height: 48px;
 }
 .deletePage{
     width: 40px;
    height: 40px;
 }
.bg{
    background-color:rgba(0, 0, 0, 0.6);
    position: absolute;
    left: 0;
    top:0;
    width: 750px;
}
.selectBox{
    width: 750px;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    opacity: 1;
}
.selectHeader{
    padding-left:20px;
    width: 730px;
    height: 100px;
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
.lists{
    width:750px;
    height: 80px;
    justify-content: center;
    align-items: center;
}
.pannyLists{
    width:750px;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding-left: 40px;
    padding-right: 40px;
}
.helpSaleLists{
    width:750px;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding-left: 200px;
    padding-right: 200px;
}
.contents{
    font-size:30px; 
    color:#575757;
}
.select{
     font-size:34px; 
    color: #12C48B;;

}
.content{
    font-size:30px; 
    color:#575757;
}
.selects{
     font-size:34px; 
     color: #12C48B;

}
.scrollers{
    width: 750px;
    height: 400px;
    background-color: #ffffff;
}
.courseContent{
  padding-left: 30px;
  padding-right: 30px;
   background-color: #ffffff;
    flex-direction:column;
}
.cousrHeader{
  align-items: center;
  flex-direction: row;
  padding-top: 34px;
  padding-bottom: 34px;
  background-color: #ffffff;
  justify-content: space-between;

}
.cousrHeaders{
  align-items: center;
  flex-direction: row;
  padding-top: 34px;
  padding-bottom: 34px;
  background-color: #ffffff;
}
.courseImg{
  width: 202px;
  height: 128px;
  border-radius: 8px;
  margin-right: 20px;
}
.reChooseCourse{
  flex-direction: row;
  align-items: center;
}
.reChooseCourses{
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 480px;
}
.txt{
  font-size: 28px;
  color: rgba(0, 0, 0, 0.25);
}
.chooseImg{
  width: 44px;
  height: 44px;
}
.childrens{
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgba(230, 230, 230, 1);
  background-color: #ffffff;
}
.children{
 flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 112px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgba(230, 230, 230, 1);
  background-color: #ffffff;
  padding-left: 50px;
  padding-right: 50px;
}
.conditionName{
  flex-direction: row;
  align-items: center;
}
.chooseCondition{
   flex-direction: row;
  align-items: center;
}
.aterisk{
  color: rgba(242, 99, 123, 1);
  margin-right: 5px;
}
.names{
  color: rgba(87, 87, 87, 1);
  font-size: 28px;
}
.aterisks{
    color: #ffffff;
  margin-right: 5px;
}
.reduceImg{
  width: 54px;
  height: 54px;
}
.chooseTime{
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.numBox{
    width: 60px;
    line-height: 54px;
    text-align: center;
    color: #575757;
    font-size: 28px;
}
.reMarks{
  padding-top: 36px;
  padding-left: 10px;
}
.marksName{
  color: rgba(87, 87, 87, 1);
  font-size: 28px;
  margin-bottom: 20px;
}
.markContent{
  font-size: 28px;
  height: 80px;
}
.bottom{
  padding-left: 40px;
  padding-right: 40px;
  height: 140px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  position: absolute; 
  bottom: 0;
  width: 750px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color:rgba(0, 0, 0, 0.1);
}
.needPay{
  flex-direction: row;
  align-items: center;
  height: 140px;
}
.texts{
  color: #222222;
  font-size: 24px;
}
.money{
    color: #222222;
  font-size:40px;
}
.moneyBox{
  width: 220px;
  font-size: 30px;
   height: 140px;
   text-align: right;
}
.placeOrder{
  width:320px;
  height: 84px;
  line-height: 84px;
  text-align: center;
  background-color: #13C07B;
  font-size: 34px;
  color: #ffffff;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  border-bottom-left-radius:100px;
  border-bottom-right-radius: 100px;
}
.active{
  width: 180px;
  height: 54px;
  text-align: center;
  line-height: 54px;
  border-radius: 8px;
  background-color: #12C48B;
  font-size: 24px;
  color: #ffffff;
   margin-left: 10px;
}
.firstClass{
 width: 180px;
    height: 54px;
    text-align: center;
    line-height: 54px;
    border-radius: 8px;
    background-color: #F2F2F2;
    font-size: 24px;
    color: #575757; 
}
.appointClass{
    width: 180px;
    height: 54px;
    text-align: center;
    line-height: 54px;
    border-radius: 8px;
    background-color: #F2F2F2;
    font-size: 24px;
    color: #575757;
    margin-left: 10px;
}
.startTime{
  width:280px;
  height: 100px;
  background-color: #F8F8F8;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}
.startName{
  color:rgba(0, 0, 0, 0.25);
  font-size:  24px;
}
.dating{
  color: rgba(87, 87, 87, 1);
  font-size: 28px;
}  
.orderPage{
  background-color: #F8F8F8;
}
.customerMess{
  background-color: #ffffff;
  margin-top:26px;
  padding:40px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
  padding-right: 0;
}
.peopleAvatar{
  width: 80px;
  height: 80px;
  border-radius: 200px;
}
.customerName{
  font-size: 34px;
  color: #222222;
  margin-bottom: 8px;
}
.phones{
  flex-direction: row;
  align-items: center;
}
.phoneImg{
  width: 26px;
  height: 26px;
}
.phoneTxt{
  font-size: 24px;
  color: #575757;
}
.orderTitle{
  background-color: #ffffff;
  padding-top:22px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 22px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #F8F8F8;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.leftTxt{
  font-size: 28px;
  color: #222222;
}
.editBtn{
   flex-direction: row;
   align-items: center;
}
.payFinishs{
   flex-direction: row;
   align-items: center;
   width: 120px;
   height: 44px;
   background-color: #00BC71;
   color: #ffffff;
   font-size: 24px;
     border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;

}
.payFinishResult{
    color: #ffffff;
      width: 120px;
   height: 44px;
   font-size: 24px;
   text-align: center;
   line-height: 44px;
}
.editTxt{
  color: #12C48B;
  font-size: 28px;
}
.editImg{
  width:12px;
  height: 20px;
  margin-left: 10px;
}
.projectList{
   background-color: #ffffff;
   padding-left: 40px;
   padding-right: 40px;
   padding-top: 18px;
   padding-bottom: 10px;
    width: 750px;
}
.listChildren{
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
.projectName{
  color: #ABABAB;
  font-size: 28px;
  width: 150px;
}
.projectContent{
   color: #575757;
   font-size: 28px;
   lines:1;
   width: 500px;
   text-align: right;
}
.earnestList{
  background-color: #ffffff;
   padding-left: 40px;
   padding-right: 40px;
   padding-top: 18px;
    width: 750px;
    margin-top:20px;
}
.payMoney{
 color: #12C48B;
 font-size: 34px;
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
  opacity: 1;
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
.editAndPayBox{
  width: 750px;
  height: 120px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  flex-direction: row;
  bottom: 0px;
  border-top-color: #E5E5E5;
  border-top-width: 1px;
  border-top-style: solid;
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
.payImg{
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}
.payTxt{
  color: #808080;
  font-size: 20px;
}
.changePayStyle{
   width: 750px;
   height: 88px;
   position: absolute;
   bottom: 0;
   background-color: #ffffff;
}
.changeTxt{
  font-size: 30px;
  color: #94949B;
  text-align: center;
  line-height: 88px;
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
 .againHandle{
    background-color: #f1f1f1;
    color: #303030;
  }
</style>