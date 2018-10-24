<template>
    <span class="operate-icon fa" :class="className"/>
</template>
<script>
    export default {
        props:{
          type:{
             type: String,
             default: 'add'
          }
        },

        computed:{
            className:()=>{
                switch (this.type){
                    case 'add':
                        return 'fa-'

                }
            }
        }
    }
</script>

<style lang="scss">
    .operate-icon {
        cursor: pointer;
    }
</style>