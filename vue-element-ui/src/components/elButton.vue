<template>
  <button class="el-button" @click="handleClick" :type="nativeType" :disabled="disabled" 
  :class="[type ? 'el-button--' + type : '', 
  buttonSize ? 'el-button--' + buttonSize : '', 
  {
    'is-disabled': disabled
  }]">
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'default'
        },
        size: {
            type: String
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        disabled: Boolean
    },
    computed: {
        buttonSize(){
            return this.size;
        }
    },
    methods: {
        handleClick(evt){
            this.$emit("click",evt);
        }
    }
}
</script>
<style>

</style>
