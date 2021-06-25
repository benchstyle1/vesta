<template>
  <div class="input-field col s12">
    <input
      id="name"
      type="text"
      class="validate"
      v-model="username"
      @change="onChange"
    />
    <label for="name">Name</label>
  </div>
</template>

<script>
export default {
  name: "UsernameInput",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    onChange() {
      this.$emit("onChange", this.username);
    },
  },
};
</script>

<style></style>
