<template>
  <div class="pa-3">
    <h1>추가하고 싶은 영화를 찾아보세요 !</h1>
      <v-row>
          <v-col cols="12" md="3">
              <v-select :items="gerne">
              </v-select>
          </v-col>
          <v-col cols="12" md="3">
              <v-select :items="gerne">
              </v-select>
          </v-col>
          <v-col cols="12" md="6">
              <v-text-field/>
          </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            gerne: ["드라마", "판타지", "서부", "공포"],
        };
    }
}
</script>