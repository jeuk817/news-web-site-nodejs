<template>
  <v-toolbar
    dense
    flat
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn
      class="ma-2"
      :loading="loading4"
      :disabled="loading4"
      color="info"
      @click="loader = 'loading4'"
    >
      SIGN IN
      <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>mdi-cached</v-icon>
        </span>
      </template>
    </v-btn>

  </v-toolbar>
</template>

<script>
export default {

}
</script>
