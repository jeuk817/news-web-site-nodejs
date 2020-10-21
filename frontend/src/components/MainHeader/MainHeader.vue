<template>
  <div class="mainHeader">
    <MenuBar/>
    <div class="mainHeaderBody">
      <div class="mainHeaderBodyDate">
        2020년 10월 21일 수요일
      </div>
      <div class="siteLogo">
        My News Site
      </div>
      <div id="jack">
        jack's web app
      </div>
    </div>
    <Topics/>
  </div>
</template>

<script>
import MenuBar from './MenuBar'
import Topics from './Topics'

export default {
  components: {
    MenuBar,
    Topics
  }
}
</script>

<style scoped>
.mainHeader{
  border: 2px solid blue;
  width: 100%;
  /* max-height: 135px; */
}

.mainHeaderBody{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid rgb(110, 173, 245);
  padding: 0 5px;
}

.mainHeaderBodyDate{
  display: grid;
  align-content: end;
}

.siteLogo{
  font-size: 48px;
  display: grid;
  align-content: end;
  justify-content: center;
}

#jack{
  display: grid;
  align-content: end;
  justify-content: end;
}
</style>
