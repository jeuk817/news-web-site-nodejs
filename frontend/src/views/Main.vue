<template>
  <div>
    <MainAppBar/>
    <HelloWorld/>
    <HelloWorld/>
    <HelloWorld/>
  </div>
</template>

<script>
import MainAppBar from '../components/MainAppBar'
import HelloWorld from '../components/HelloWorld'

export default {
  components: {
    MainAppBar,
    HelloWorld
  }
}
</script>
