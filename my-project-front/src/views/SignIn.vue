<template>
  <v-container>
    <v-banner outlined flat>
      <div style="text-align:center;padding:50px 120px">
        <h2 style="margin-bottom: 10px">
          <span class="mark_pen-blue">로그인</span>
        </h2>
        <p>이메일과 비밀번호를 입력해주세요</p>
        <div class="signup-form">
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field
              v-model="email"
              label="이메일"
              type="email"
              :rules="emailRules"
              required
              outlined
            />
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              :rules="passwordRules"
              required
              outlined
            />
            <v-alert v-if="errorMessage" dense outlined type="error"
              >아이디 / 비밀번호가 맞지 않습니다.</v-alert
            >
            <v-row align="center">
              <span><a href="/signup">회원가입 하러 가기</a></span>
              <v-spacer></v-spacer>
              <v-btn color="indigo lighten-1" type="submit" text x-large>
                SUBMIT
              </v-btn>
              <v-btn color="indigo lighten-1" text x-large to="/">
                CANCEL
              </v-btn>
            </v-row>
          </v-form>
        </div>
      </div>
    </v-banner>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      valid: false,
      email: null,
      password: null,
      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다.",
      ],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
      errorMessage: true,
    };
  },
  computed: {},
  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        console.log(this.nickname);
        this.$store.dispatch("userStore/signIn", {
          email: this.email,
          password: this.password,
        });
        this.$router.push("/");
      }
    },
  },
};
</script>
<style scoped>
.signup-form {
  display: inline-block;
  margin-top: 10px;
  width: 30rem;
}
a {
  font-size: 16px;
  text-decoration: none;
}
</style>
