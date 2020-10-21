<template>
  <v-app>
    <Main/>
  </v-app>
</template>

<script>
import Main from './views/Main'

export default {
  name: 'App',

  components: {
    Main
  },

  data: () => ({
    //
  })
}
</script>

<style>
* {
    box-sizing: border-box;
}

html, body {
    margin: 0;
    height: 100%;
}
</style>
