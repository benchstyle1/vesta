<template>
  <div class="users-list">
    <ul class="collection with-header">
      <li class="collection-header"><h6>Users List</h6></li>
      <li class="collection-item" v-for="user in users" :key="user.public_id">
        <div>
          {{ user.username }}
          <button class="secondary-content" v-if="!isFollowed(user)">
            <i class="material-icons" @click="follow(user.public_id)">follow</i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UsersList",
  props: {
    users: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapGetters(["getProfile"]),
  },
  methods: {
    ...mapActions(["viewProfile", "deleteProfile", "follow"]),
    isFollowed(user) {
      if (
        this.getProfile.followed.find((el) => el.public_id === user.public_id)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.users-list {
  margin: 20px auto 0 auto;
}
</style>
