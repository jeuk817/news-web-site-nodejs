<template>
  <div>
    <v-app-bar
      absolute
      color="white"
      inverted-scroll
      scroll-threshold=150
      id="mainAppBar"
    >
      <v-container class="mainWidth mainBar">
        <div>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
        <Topics/>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import Topics from './MainHeader/Topics'

export default {
  components: {
    Topics
  }
}
</script>

<style scoped>
#mainAppBar{
  position: fixed;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
}
.mainWidth{
  padding: 0;
  margin: 0;
  width: 1200px;
}
.mainBar{
  display: grid;
  grid-template-columns: 1fr 5fr;
  align-items: center;
}
</style>
