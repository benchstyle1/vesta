<template>
  <div class="auth">
    <form>
      <UsernameInput @onChange="user.username = $event" />
      <PasswordInput @onChange="user.password = $event" />
    </form>
    <div class="auth__buttons">
      <button class="waves-effect waves-light btn" @click="send">
        Send
      </button>
      <router-link to="/register">Don't have an account yet?</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UsernameInput from "@/components/UsernameInput.vue";
import PasswordInput from "@/components/PasswordInput.vue";

export default {
  name: "Auth",
  components: {
    UsernameInput,
    PasswordInput,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["auth"]),
    async send() {
      await this.auth(this.user);
    },
  },
};
</script>

<style>
.auth form {
  width: 50%;
  margin: 100px auto 0 auto;
}

.auth__buttons {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 auto;
}

.auth__buttons button {
  width: 100px;
  margin: 0 auto;
}

.auth__buttons > a {
  text-align: center;
  margin-top: 20px;
}

.auth__buttons > a:hover {
  text-decoration: underline;
}
</style>
