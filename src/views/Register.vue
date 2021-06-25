<template>
  <div class="register">
    <form>
      <UsernameInput @onChange="user.username = $event" />
      <PasswordInput @onChange="user.password = $event" />
      <EmailInput @onChange="user.email = $event" />
    </form>
    <button class="waves-effect waves-light btn" @click="send">Send</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UsernameInput from "@/components/UsernameInput.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import EmailInput from "@/components/EmailInput.vue";

export default {
  name: "Register",
  components: {
    UsernameInput,
    PasswordInput,
    EmailInput,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    ...mapActions(["register"]),
    async send() {
      await this.register(this.user);
    },
  },
};
</script>

<style>
.register form {
  width: 50%;
  margin: 100px auto 0 auto;
}

.register button {
  width: 100px;
  display: block;
  margin: 0 auto;
}
</style>
