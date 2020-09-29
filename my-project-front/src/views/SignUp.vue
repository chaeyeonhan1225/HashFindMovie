<!-- eslint-disable -->
<template>
  <v-container>
    <v-banner>
      <div style="text-align:center;padding:50px 120px">
        <h2 style="margin-bottom: 12px"><span class="mark_pen-blue">회원가입</span></h2>
        <h3><span>회원 정보</span>를 입력하세요</h3>
        <div class="signup-form">
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field v-model="email" label="이메일" type="email" :rules="emailRules" required outlined />
            <v-text-field v-model="password" label="비밀번호" type="password" :rules="passwordRules" required outlined />
            <v-text-field v-model="passwordCheck" label="비밀번호확인" type="password" :rules="passwordCheckRules" required
              outlined />
            <v-text-field v-model="nickname" label="닉네임" :rules="nicknameRules" required outlined />
            <v-checkbox v-model="terms" label="약관에 동의하시겠습니까?" :rules="[v=>!!v||'약관에 동의해야합니다.']" reuired />
            <v-row align="center" justify="end">
              <v-btn color="indigo lighten-1" type="submit" text x-large>
                SUBMIT
              </v-btn>
              <v-btn color="indigo lighten-1" text x-large to="/login">
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
        passwordCheck: null,
        nickname: null,
        terms: false,
        emailRules: [
          v => !!v || '이메일은 필수입니다.',
          v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'
        ],
        passwordRules: [
          v => !!v || '비밀번호는 필수입니다.',
        ],
        passwordCheckRules: [
          v => !!v || '비밀번호 확인은 필수입니다.',
          v => this.password === v || '비밀번호가 일치하지 않습니다.'
        ],
        nicknameRules: [
          v => !!v || '닉네임은 필수입니다.'
        ]
      };
    },
    computed: {
     
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          console.log(this.nickname);
          this.$store.dispatch('userStore/signUp',{
            nickname: this.nickname,
            email: this.email,
            password: this.password,
          });
          this.$router.push('/');
        }
      }
    }
  }
</script>
<style scoped>
.signup-form {
  display: inline-block;
  margin-top: 45px;
  width: 30rem;
}
</style>