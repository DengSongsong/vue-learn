<template>
  <div class="comment">
    <!-- "addComment" 为本页面中函数定义-->
    <CommentForm @addComment="addComment"></CommentForm>
    <!-- :后面的List为参数 "List"为数据-->
    <CommentList :List="List"/>
    <Pagination @transferPage="getPage" :totalCount="totalCount" :currentPage="currentPage"/>
  </div>
</template>

<script>
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';
import Pagination from './Pagination.vue'
export default{
    data(){
        return{
            totalCount:0,
            currentPage:1,
            pagesize:3,
            totalData:[],
            List:[]
        }

    },
    components:{
        Pagination,
        CommentForm,
        CommentList
    },
    methods:{
        addComment(msg){
            // console.log(msg);
            // console.log(text);
            this.totalData.push({text:msg});
            console.log(this.totalData);
            this.totalCount=this.totalData.length;
            if (this.totalCount <=this.pagesize){
                this.List=this.totalData;
            }else{
                this.List=this.totalData.slice(this.totalCount-this.pagesize)
            }
            this.currentPage=1;
            // this.List.reverse();
            // 单向数据绑定 v-bind:(数据)="" data->template
            //双向数据绑定 input 的时候  data<=>template 性能差
        },
        getPage(curr,size){
            // console.log('currentPage:',curr);
            this.currentPage=curr;
            if(this.totalCount<=this.pagesize){
                this.List=this.totalData;
            }else{
                // ceil() 方法可对一个数进行上舍入
                let pages=Math.ceil(
                    this.totalCount / this.pagesize
                )
                let res =this.totalCount % this.pagesize;
                let start =this.totalCount-this.currentPage*this.pagesize;
                // console.log('totalCount: ',this.totalCount);
                // console.log('pagesize: ',this.pagesize);
                if(start<0) start =0;
                this.List=this.totalData.slice(start,start+this.pagesize)
            }
            // this.List.reverse();
        }
        
    }
    // console.log('totalCount: ',this.totalCount);
 
}
</script>

<style>

</style>
