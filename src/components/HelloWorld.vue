<template>
    <section  class="contentBox">
             <div>
                <Row>
                    <i-col span="6">
                        SLA下发时间从：
                           <Date-picker type="date" :options="startDate" placeholder="选择日期" class="inputWdth" ref="startDate"></Date-picker>
                    </i-col>
                    <i-col span="6" push="1">
                        到： <Date-picker type="date" :options="endDate" placeholder="选择日期" class="inputWdth" ref="endDate"></Date-picker>
                    </i-col>
                    <i-col span="6">
                        SLA ID：<i-input :value.sync="Car_owner_information.SLAId"  placeholder="请输入SLA ID" class="inputWdth"></i-input>
                    </i-col>
                    <i-col span="6">
                        状态：  <i-select :model.sync="carStatus" class="inputWdth" ref="carStatus" clearable>
                            <i-option v-for="(item,index) in carStatusData" :value="item.value" :key="index">{{ item.label }}</i-option>
                        </i-select>
                    </i-col>
                </Row>
                 <Row class="top50">
                    <i-col span="6"  offset="1">
                        VIN： <i-input :value.sync="Car_owner_information.vinNum" placeholder="请输入VIN" class="inputWdth"></i-input>
                    </i-col>
                     <i-col span="6" pull="1">
                        手机号码： <i-input :value.sync="Car_owner_information.phoneNum" placeholder="请输入VIN" class="inputWdth"></i-input>
                    </i-col>
                     <i-col span="6" pull="1">
                        车主姓名：<i-input :value.sync="Car_owner_information.userName" placeholder="请输入车主姓名" class="inputWdth"></i-input>
                    </i-col>
                    <i-col span="5" pull="1">
                        车牌号码：<i-input :value.sync="Car_owner_information.carId" placeholder="请输入车牌号码" class="inputWdth"></i-input>
                    </i-col>
                    
                </Row>
                <Row type="flex" justify="center" class="mt30">
                    <i-col span="3">
                        <i-button type="primary">确定</i-button>
                    </i-col>
                    <i-col span="3">
                        <i-button type="primary" @click="restForm">重置</i-button>
                    </i-col>
                </Row>
            </div>
            <div slot="content" class="mt30">
                <table class="tableBox">
                    <tr>
                        <th>SLA触发时间</th>
                        <th>SLA ID</th>
                        <th>VIN</th>
                        <th>车主姓名</th>
                        <th>手机号码</th>
                        <th>车牌号码</th>
                        <th>车型</th>
                        <th>诊断状态</th>
                        <th>详情</th>
                    </tr>
                    <tr>
                        <td>2019-02-01 12:00:00</td>
                         <td>SLA1234</td>
                        <td>2LSTS226JPCC011T01</td>
                        <td>成功</td>
                        <td>14523368465</td>
                        <td>沪A12344</td>
                         <td>朗逸</td>
                         <td>诊断中</td>
                        <td>
                            <i-button type="primary" @click="viewDetails">查看</i-button>
                        </td>
                    </tr>
                     <tr>
                        <td>2019-02-01 12:00:00</td>
                         <td>SLA1234</td>
                        <td>2LSTS226JPCC011T01</td>
                        <td>成功</td>
                        <td>14523368465</td>
                        <td>沪A12344</td>
                         <td>朗逸</td>
                         <td>失败</td>
                        <td>
                            <i-button type="primary" @click="viewDetails">查看</i-button>
                        </td>
                    </tr>
                </table>
                 <Page :total="40"></Page>
            </div>
    </section>
</template>

<script>
export default {
    data(){
        return{
            value:'',
            carStatus:'',
             Car_owner_information:{
                vinNum:'',
                carId:'',
                userName:'',
                phoneNum:'13523368465',
                SLAId:'',
            },
            carStatusData:[
                     {
                     value:'1',
                     label:'在线',
                    },
                    {
                     value:'2',
                     label:'离线'
                    }
                ],
             startDate: {
                // disabledDate (date) {
                //     return date && date.valueOf() < Date.now() - 86400000;
                // }
            },
            endDate:{

            },
             model1: '',
        }
    },
    methods:{
        viewDetails(){
            this.$router.push({path:'/viewDetails'});
        },
        restForm(){
            this.$refs.startDate.handleClear();
            this.$refs.endDate.handleClear();
            this.$refs.carStatus.clearSingleSelect();
            this.Car_owner_information.vinNum = " ";
            this.Car_owner_information.carId = " ";
            this.Car_owner_information.userName = " ";
            this.Car_owner_information.phoneNum = " ";
            this.Car_owner_information.SLAId = " ";
        },
    }
}
</script>

<style lang="scss" scoped>
.contentBox{
    padding:2%;
}
.ivu-input{
   width:80%;
}
</style>

