<template>
    <div id="app">
        <el-rate v-model="rate1"></el-rate>
    </div>
</template>
<script>
    import ElRate from '@/components/ElRate.vue'
    export default{
        components: {
            ElRate
        },
        data(){
            return{
                rate1: null
            }
        }
    }
</script>
<style>

</style>