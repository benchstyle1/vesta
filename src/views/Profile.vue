<template>
  <div class="profile">
    <button
      class="waves-effect waves-light btn"
      @click="edit"
      v-if="mode === 'view'"
    >
      Edit Profile
    </button>
    <template v-if="mode === 'edit'">
      <form>
        <UsernameInput @onChange="user.username = $event" />
        <PasswordInput @onChange="user.password = $event" />
      </form>
      <div class="profile__buttons">
        <button class="waves-effect waves-light btn" @click="save">
          Save Changes
        </button>
        <button class="waves-effect waves-light btn" @click="discardChages">
          Discard Changes
        </button>
      </div>
    </template>
    <FollowList :followed="getFollowedUsers" v-if="getFollowedUsers.length" />
    <div class="profile__buttons">
      <button class="waves-effect waves-light btn" @click="deleteAccount">
        Delete Account
      </button>
      <button
        class="waves-effect waves-light btn"
        @click="loadUsers"
        v-if="getUsers.length === 0"
      >
        Load Users
      </button>
      <button class="waves-effect waves-light btn" @click="loadUsers" v-else>
        More users
      </button>
    </div>
    <UsersList :users="getUsers" v-if="getUsers.length" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UsernameInput from "@/components/UsernameInput.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import UsersList from "@/components/UsersList.vue";
import FollowList from "@/components/FollowList.vue";

export default {
  name: "Profile",
  components: {
    UsernameInput,
    PasswordInput,
    UsersList,
    FollowList,
  },
  async created() {
    await this.viewProfile();
  },
  data() {
    return {
      mode: "view",
      page: 0,
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters([
      "getProfile",
      "getUsers",
      "getPagesCount",
      "getFollowedUsers",
    ]),
  },
  methods: {
    ...mapActions([
      "viewProfile",
      "deleteProfile",
      "fetchUsers",
      "updateProfile",
    ]),
    save() {
      this.mode = "view";
      let { public_id } = this.getProfile;
      let { password, username } = this.user;
      this.updateProfile({ password, public_id, username });
    },
    discardChages() {
      this.mode = "view";
    },
    edit() {
      console.log("edit");
      this.mode = "edit";
      this.username = this.getProfile.username;
    },
    deleteAccount() {
      this.deleteProfile();
      this.$router.push("/register");
    },
    loadUsers() {
      this.page++;
      this.fetchUsers(this.page);
    },
  },
};
</script>

<style>
.profile {
  width: 50%;
  margin: 100px auto 0 auto;
}

.profile > button {
  margin: 0 auto;
  display: block;
}

.profile__buttons {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px auto 0 auto;
}
</style>
