<template>
  <div class="pa-3">
    <h1>추가하고 싶은 영화를 찾아보세요 !</h1>
      <v-row>
          <v-col cols="12" md="3">
              <v-select v-model="selectedGerne" :items="gerne">
              </v-select>
          </v-col>
          <v-col cols="12" md="3">
              <v-select v-model="selectedCountry" :items="country">
              </v-select>
          </v-col>
          <v-col cols="12" md="6">
              <v-text-field 
                v-model="title"
                append-icon="mdi-magnify"
                @click:append="searchMovie()"
              />
          </v-col>
      </v-row>
      <v-row>
          <template v-for="m in this.results">
            <v-col cols="12" md="6" :key="m">
              <SearchMovieCard :movie="m"/>
            </v-col>
          </template>
      </v-row>
  </div>
</template>

<script>
import SearchMovieCard from '../components/SearchMovieCard';

export default {
    components: { SearchMovieCard },
    data() {
        return {
            temp1: { "title": "토르: 러브 앤 썬더", "link": "https://movie.naver.com/movie/bi/mi/basic.nhn?code=187347", "image": "https://ssl.pstatic.net/imgmovie/mdi/mit110/1873/187347_P01_103714.jpg", "subtitle": "Thor: <b>Love</b> and Thunder", "pubDate": "2021", "director": "타이카 와이티티|", "actor": "크리스 헴스워스|테사 톰슨|나탈리 포트만|크리스찬 베일|", "userRating": "9.85" }, 
            temp2: { "title": "<b>클래식</b>", "link": "https://movie.naver.com/movie/bi/mi/basic.nhn?code=35939", "image": "https://ssl.pstatic.net/imgmovie/mdi/mit110/0359/C5939-00.jpg", "subtitle": "The Classic", "pubDate": "2003", "director": "곽재용|", "actor": "손예진|조승우|조인성|", "userRating": "9.41" },
            temp3: {
                    "title": "<b>알라딘</b>",
                    "link": "https://movie.naver.com/movie/bi/mi/basic.nhn?code=163788",
                    "image": "https://ssl.pstatic.net/imgmovie/mdi/mit110/1637/163788_P18_105943.jpg",
                    "subtitle": "Aladdin",
                    "pubDate": "2019",
                    "director": "가이 리치|",
                    "actor": "나오미 스콧|윌 스미스|메나 마수드|",
                    "userRating": "9.38"

            },
            selectedGerne: "선택안함",
            selectedCountry: "선택안함",
            gerne: ["선택안함", "드라마", "판타지", "서부", "공포", "로맨스", "모험", "스릴러", "느와르", "컬트", "다큐멘터리", "코미디", "가족", "미스터리",
            "전쟁", "애니메이션", "범죄", "뮤지컬", "SF", "액션", "무협", "에로", "서스펜스", "서사", "블랙코미디", "실험"],
            country: ["선택안함", "한국", "일본", "미국", "홍콩", "영국", "프랑스", "기타"],
            countryCode: {
                "한국": "KR",
                "일본": "JP",
                "미국": "US",
                "홍콩": "HK",
                "영국": "GB",
                "프랑스" : "FR",
                "기타" : "ETC"
            },
            title: "",
        };
    },
    methods: {
        searchMovie() {
            // console.log(this.gerne.indexOf(this.selectedGerne));
            // console.log(this.countryCode[this.selectedCountry]);
            // console.log(this.title);
            this.$store.dispatch('movieStore/searchMovie', {
                title: this.title,
                genre: this.gerne.indexOf(this.selectedGerne),
                country: this.countryCode[this.selectedCountry],
            });
        }
    },
    computed: {
        results() {
            return this.$store.state.movieStore.SearchResults;
        }
    }
}
</script>