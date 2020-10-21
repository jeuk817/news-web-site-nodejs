<template>
  <div class="mainHeaderTopics">
    <div class="topicBtn">
      <v-btn text>
        정치
      </v-btn>
    </div>
    <div class="topicBtn">
      <v-btn text>
        경제
      </v-btn>
    </div>
    <div class="topicBtn">
      <v-btn text>
        사회
      </v-btn>
    </div>
    <div class="topicBtn">
      <v-btn text>
        IT
      </v-btn>
    </div>
    <div class="topicBtn">
      <v-btn text>
        세계
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.mainHeaderTopics{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.topicBtn{
  display: grid;
  justify-content: center;
}
</style>
