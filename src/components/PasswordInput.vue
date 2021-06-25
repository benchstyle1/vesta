<template>
  <div class="input-field col s12">
    <input
      id="password"
      type="password"
      class="validate"
      v-model="password"
      @change="onChange"
    />
    <label for="password">Password</label>
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
  data() {
    return {
      password: "",
    };
  },
  methods: {
    onChange() {
      this.$emit("onChange", this.password);
    },
  },
};
</script>

<style></style>
