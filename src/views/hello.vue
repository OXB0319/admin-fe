<template>
  <div class="hello">
    <img class="logo" src="../assets/images/logo.png">
    <p class="welcome">欢迎使用 vue</p>
    <div v-html="content"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import cTitle from 'components/title';

  export default {
    data () {
      return {
        title: 'Hello Vue!',
        content: ''
      }
    },
    methods: {
      async getContent () {
        // const response = await fetch('/api/hello');
        // this.content = await response.text();
      }
    },
   async mounted () {
      const packages = await this.api.getPackages();
      console.log(packages);
      this.getContent();
    },

    components: {cTitle}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  h1 {
    color: #42b983;
  }

  .logo {
    width: 100px;
    height: 100px;
    a {
      color: #42b983;
      text-decoration: none;
    }
  }
</style>
