<template>
  <div class="commentList">
      <comment-item v-for="item in List" v-bind:comment="item" :key="item.id"></comment-item>
      <div class="empty-msg" v-if="List.length==0">当前没有评论</div>
  </div>
</template>
<script>
    import CommentItem from './CommentItem.vue'
    export default {
        name: 'commentLsit',
        props: ['List'],
        components: {
            'comment-item': CommentItem
        }
    }
</script>
<style>
.comment-list{
  background: #eee;
  color: #000;
  font-size: 15px;
  margin:10px;
  width: 300px;
  border:1px solid #eee;
  margin:10px auto;
}


</style>
