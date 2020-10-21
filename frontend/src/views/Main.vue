<template>
  <div>
    <MainAppBar />
    <div class="bodyBox">
      <MainHeader />
      <HelloWorld />
      <HelloWorld />
      <HelloWorld />
    </div>
  </div>
</template>

<script>
import MainAppBar from '../components/MainAppBar'
import MainHeader from '../components/MainHeader/MainHeader'
import HelloWorld from '../components/HelloWorld'

export default {
  components: {
    MainAppBar,
    MainHeader,
    HelloWorld
  }
}
</script>

<style scoped>
.bodyBox {
  /* border: 2px solid red; */
  max-width: 1200px;
  margin: 0 auto;
}
</style>
