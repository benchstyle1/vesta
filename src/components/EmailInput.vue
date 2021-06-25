<template>
  <div class="input-field col s12">
    <input
      id="email"
      type="email"
      class="validate"
      v-model="email"
      @change="onChange"
    />
    <label for="email">Email</label>
  </div>
</template>

<script>
export default {
  name: "EmailInput",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    onChange() {
      this.$emit("onChange", this.email);
    },
  },
};
</script>

<style></style>
