<template>
  <div class="fast">
    <a-table :columns="columns"
             rowKey="id"
             :dataSource="orderList"
             :pagination="pagination">
      <span
        class="details_id"
        slot="id"
        @click="toFastDetail(record.id)"
        slot-scope="id, record" >{{id}}</span>
      <!--预计收益-->
      <div slot="incomeFrom"
            slot-scope="incomeFrom, record" >{{record.incomeFrom}}~{{record.incomeTo}}元</div>
      <!--状态-->
      <div slot="status"
           slot-scope="status, record" >
        <span v-if="record.status == 0 ">未开始</span>
        <span v-if="record.status == 1 ">进行中</span>
        <span v-if="record.status == 9 ">已结束</span>
        <span v-if="record.status == 8 ">已取消</span>
      </div>
      <!--结算收益-->
      <div slot="income"
           slot-scope="income, record" >{{income}}元</div>
      <div slot="click"
           slot-scope="text, record">
        <p class="details_no" v-if="record.voiceStatus == 1">上传音频</p>
        <a-upload name="file"
                  v-if="record.voiceStatus == 0"
                  class="details_click"
                  :beforeUpload="beforeUpload"
                  :showUploadList="isSuccse"
                  @change="handleChange"
                  :action="'api/order/'+ record.id +'/upload'">
          <p class="updata_text">上传音频</p>
        </a-upload>
      </div>

      <!--<span
        class="details_click"
        slot="click"
        @click="toFastDetail(record.id)"
        slot-scope="text, record" >查看详情</span>-->
    </a-table>
  </div>

</template>

<script>
  import axios from 'axios'
  const columns = [
    { title: '订单', dataIndex: 'id', key: 'id', scopedSlots: { customRender: 'id' } },
    { title: '预计收益', dataIndex: 'incomeFrom', key: 'incomeFrom', scopedSlots: { customRender: 'incomeFrom' }},
    { title: '结算收益', dataIndex: 'income', key: 'income', scopedSlots: { customRender: 'income' }},
    { title: '状态', dataIndex: 'status', key: 'status' , scopedSlots: { customRender: 'status' }},
    { title: '交付时间', dataIndex: 'deliveryTime', key: 'deliveryTime'},
    { title: '操作' , key: 'click' , scopedSlots: { customRender: 'click' }}
  ];
  export default {
    inject:['reload'],
    data() {
      return {
        isUpdataSize:false,
        data: [],
        orderList:[],
        pagination: {},
        loading: false,
        isSuccse:false,
        columns,
      }
    },
    methods: {
      handleTableChange(pagination, filters, sorter) {

      },
      beforeUpload(file){
        console.log(file)
        const upType = file.type === 'audio/mp3'
        let upSize = file.size
        if(upSize < 5100000){
          this.isUpdataSize = true
        }
        if(!upType){
          this.$message.error('文件上传格式错误，只允许上传mp3格式')
        }else if(!this.isUpdataSize){
          console.log(this.isUpdataSize,'isUpdataSize')
          this.$message.error('文件大小超过上限')
        }
      },
      handleChange(file,event,fileList){
        console.log(file)
        if(file.file.status == 'done'){
          this.reload()
        }
      },
      toFastDetail(id){
        this.$router.push({
          name: 'order_fast_detail',
          params: {
            id:id
          }
        })
      },
    },
    mounted(){
      axios.get('api/order?status').then(res => {
        this.orderList = res.data.data
        console.log(this.orderList)
      }).catch(err => {
        const errorStatus = err.response.status
        if(errorStatus == '401'){
          this.$router.replace('/login')
        }
        if(errorStatus == '500'){
          this.error = 1
        }
      })
    },
  }

</script>
<style lang="scss" scoped>
  .fast{
    background: #ffffff;
    border-radius: 4px;
    margin: 20px;
    padding: 20px;
    .details_id{
      &:hover{
        cursor: pointer;
        color: #ffd101;
      }
    }
    .details_click{
       width: 80px;
       font-size: 12px;
       color: #ffffff;
       background: #ffd101;
       border-radius: 4px;
       padding: 4px 8px;
       text-align: center;
       &:hover{
         cursor: pointer;
       }
     }
    .details_no{
      width: 80px;
      font-size: 12px;
      color: #aeaeae;
      background: #f2f2f2;
      border-radius: 4px;
      padding: 4px 8px;
      text-align: center;
      margin-bottom: 0px;
    }
  }
</style>
