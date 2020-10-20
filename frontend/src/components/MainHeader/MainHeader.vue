<template>
  <div class="mainHeader">
    <MenuBar/>
    <div class="mainHeaderBody">
      <div>
        2020년 10월 21일 수요일
      </div>
      <div class="siteLogo">
        My News Site
      </div>
      <div id="jack">
        jack's web app
      </div>
    </div>
    asdf
  </div>
</template>

<script>
import MenuBar from './MenuBar'

export default {
  components: {
    MenuBar
  }
}
</script>

<style scoped>
.mainHeader{
  border: 2px solid blue;
  width: 100%;
  max-height: 135px;
}

.mainHeaderBody{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: end;
  border-bottom: 1px solid rgb(110, 173, 245);
}

.siteLogo{
  font-size: 48px;
}

.jack{
  display: grid;
  align-items: end;
  justify-items: end;
}
</style>
