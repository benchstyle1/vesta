<template>
  <div class="follow-list">
    <ul class="collection with-header">
      <li class="collection-header"><h6>Followed Users</h6></li>
      <li
        class="collection-item"
        v-for="follow in followed"
        :key="follow.public_id"
      >
        {{ follow.username }}
        <button class="secondary-content">
          <i class="material-icons" @click="unfollow(follow.public_id)"
            >unfollow</i
          >
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FollowList",
  props: {
    followed: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {  
    ...mapActions(["unfollow"]),
  }
};
</script>

<style></style>
