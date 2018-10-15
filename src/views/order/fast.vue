<template>
  <div class="fast">
    <a-table :columns="columns"
             rowKey="id"
             :dataSource="orderList"
             :pagination="pagination">
      <!--预计收入-->
      <div slot="incomeFrom"
            slot-scope="incomeFrom, record" >{{record.incomeFrom}}~{{record.incomeTo}}元</div>
      <div slot="status"
           slot-scope="status, record" >
        <span v-if="record.status == 0 ">未开始</span>
        <span v-if="record.status == 1 ">进行中</span>
        <span v-if="record.status == 9 ">已结束</span>
        <span v-if="record.status == 8 ">已取消</span>
      </div>
      <div slot="income"
           slot-scope="income, record" >{{income}}元</div>
      <span
        class="details_click"
        slot="click"
        @click="toFastDetail(record.id)"
        slot-scope="text, record" >查看详情</span>
    </a-table>
  </div>

</template>

<script>
  import axios from 'axios'
  const columns = [
    { title: '订单', dataIndex: 'id', key: 'id' },
    { title: '预计收益', dataIndex: 'incomeFrom', key: 'incomeFrom', scopedSlots: { customRender: 'incomeFrom' }},
    { title: '结算收益', dataIndex: 'income', key: 'income', scopedSlots: { customRender: 'income' }},
    { title: '状态', dataIndex: 'status', key: 'status' , scopedSlots: { customRender: 'status' }},
    { title: '交付时间', dataIndex: 'deliveryTime', key: 'deliveryTime'},
    { title: '操作' , key: 'click' , scopedSlots: { customRender: 'click' }}
  ];
  export default {
    data() {
      return {
        data: [],
        orderList:[],
        pagination: {},
        loading: false,
        columns,
      }
    },
    methods: {
      handleTableChange(pagination, filters, sorter) {

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
          //this.$router.replace('/login')
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
    .details_click{
      color: #ffd101;
      &:hover{
        cursor: pointer;
      }
    }
  }
</style>
