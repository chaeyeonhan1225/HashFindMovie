<template>
  <div class="pa-3">
    <h1>추가하고 싶은 영화를 찾아보세요 !</h1>
    <v-row>
      <v-row class="mt-3">
        <v-text-field
          lavel="영화 제목"
          placeholder="영화 제목"
          filled
          rounded
          dense
          v-model="title"
          append-icon="mdi-magnify"
          @click:append="searchMovie()"
        />
      </v-row>
      <v-expansion-panels flat outlined>
        <v-expansion-panel>
          <v-expansion-panel-header append-icon="mdi-menu-down">
            장르 / 국가 선택
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="selectedGerne"
                  label="장르"
                  :items="gerne"
                  aria-placeholder="장르"
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="selectedCountry"
                  label="국가"
                  :items="country"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-row>
      <template v-for="m in this.results">
        <v-col cols="12" md="6" :key="m.id">
          <SearchMovieCard :movie="m" />
        </v-col>
      </template>
    </v-row>
    <div
      class="more-btn"
      v-if="results.length % 10 === 0 && results.length >= 10"
      @click="searchMoreMovie()"
    >
      더 보기
    </div>
  </div>
</template>

<script>
import SearchMovieCard from "../components/SearchMovieCard";

export default {
  components: {
    SearchMovieCard,
  },
  data() {
    return {
      selectedGerne: "선택안함",
      selectedCountry: "선택안함",
      gerne: [
        "선택안함",
        "드라마",
        "판타지",
        "서부",
        "공포",
        "로맨스",
        "모험",
        "스릴러",
        "느와르",
        "컬트",
        "다큐멘터리",
        "코미디",
        "가족",
        "미스터리",
        "전쟁",
        "애니메이션",
        "범죄",
        "뮤지컬",
        "SF",
        "액션",
        "무협",
        "에로",
        "서스펜스",
        "서사",
        "블랙코미디",
        "실험",
      ],
      country: [
        "선택안함",
        "한국",
        "일본",
        "미국",
        "홍콩",
        "영국",
        "프랑스",
        "기타",
      ],
      countryCode: {
        한국: "KR",
        일본: "JP",
        미국: "US",
        홍콩: "HK",
        영국: "GB",
        프랑스: "FR",
        기타: "ETC",
      },
      title: "",
    };
  },
  methods: {
    searchMovie() {
      this.$store.dispatch("movieStore/searchMovie", {
        title: this.title,
        genre: this.gerne.indexOf(this.selectedGerne),
        country: this.countryCode[this.selectedCountry],
        offset: this.results.length + 1,
        search: true,
      });
    },
    searchMoreMovie() {
      this.$store.dispatch("movieStore/searchMovie", {
        title: this.title,
        genre: this.gerne.indexOf(this.selectedGerne),
        country: this.countryCode[this.selectedCountry],
        offset: this.results.length + 1,
        search: false,
      });
    },
  },
  computed: {
    results() {
      return this.$store.state.movieStore.SearchResults;
    },
  },
};
</script>

<style>
.more-btn {
  text-align: center;
  background-color: lightblue;
  margin-top: 15px;
  padding: 10px 20px;
  border-radius: 10px;
}
</style>
