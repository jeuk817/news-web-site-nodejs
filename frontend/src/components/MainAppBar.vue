<template>
  <div>
    <v-app-bar
      absolute
      color="primary"
      dark
      inverted-scroll
      scroll-threshold=200
      id="fixedBar"
    >
      <v-container class="mainWidth mainBar">
        <!-- <v-spacer></v-spacer> -->
        <div>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
        <v-toolbar-title>정치</v-toolbar-title>
        <v-toolbar-title>경제</v-toolbar-title>
        <v-toolbar-title>사회</v-toolbar-title>
        <v-toolbar-title>IT</v-toolbar-title>
        <v-toolbar-title>세계</v-toolbar-title>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#fixedBar{
  position: fixed;
}
.mainWidth{
  margin: auto;
  padding: 0 3%;
  max-width: 1200px;
}
.mainBar{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
}
</style>
