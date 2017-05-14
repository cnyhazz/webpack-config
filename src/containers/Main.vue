<template>
  <div class="main" id="main">
    <header>头部</header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>  
</template>

<script>
  export default {
    name:"main",
    data() {
      return {
      }
    }
  }
</script>