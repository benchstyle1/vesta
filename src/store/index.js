import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    credentials: {
      token: "",
      public_id: "",
    },
    config: {},
    profile: {
      email: "",
      followed: [],
      username: "",
      public_id: "",
      password: "",
    },
    users: [],
    pagesCount: 0,
  },
  mutations: {
    setCredentials(state, credential) {
      state.credentials.token = credential.token;
      state.credentials.public_id = credential.public_id;
    },
    setRequestHeader(state, token) {
      state.config.headers = {
        "x-access-token": token,
      };
    },
    setProfile(state, profile) {
      state.profile = profile;
    },
    setPagesCount(state, pagesCount) {
      state.pages = pagesCount;
    },
    addUserToList(state, users) {
      users.forEach((user) => {
        if (
          !state.users.includes(user) &&
          state.profile.public_id !== user.public_id
        ) {
          state.users.push(user);
        }
      });
    },
    addUserToFollowed(state, userId) {
      let user = state.users.find((user) => user.public_id === userId);
      state.profile.followed.push(user);
    },
    deleteUserFromFollowed(state, userId) {
      let index = state.profile.followed.findIndex(
        (user) => user.public_id === userId
      );
      state.profile.followed.splice(index, 1);
    },
  },
  actions: {
    async register(ctx, data) {
      let { username, password, email } = data;
      await Axios.post("https://predprod.gruza.net:8087/create", {
        username,
        password,
        email,
      })
        .then(() => {
          alert("profile created");
          router.push("/auth");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async auth(ctx, data) {
      let { username, password } = data;
      await Axios.post(
        "https://predprod.gruza.net:8087/auth",
        {},
        {
          auth: {
            username,
            password,
          },
        }
      )
        .then((response) => {
          let credentials = {
            token: response.data.token,
            public_id: response.data.public_id,
          };
          ctx.commit("setCredentials", credentials);
          ctx.commit("setRequestHeader", credentials.token);
          router.push("/profile");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async viewProfile(ctx) {
      let url = `https://predprod.gruza.net:8087/get/${ctx.state.credentials.public_id}`;
      await Axios.get(url, ctx.state.config)
        .then((response) => {
          ctx.commit("setProfile", response.data.user);
          ctx.commit("setPagesCount", response.data.pages);
        })
        .catch((error) => console.log(error));
    },
    async updateProfile(ctx, data) {
      let url = `https://predprod.gruza.net:8087/update/${ctx.state.credentials.public_id}`;
      let { username, password, public_id } = data;
      await Axios.put(
        url,
        {
          username,
          password,
          public_id,
        },
        ctx.state.config
      )
        .then(() => {
          alert("profile updated");
        })
        .catch((error) => console.log(error));
    },
    async deleteProfile(ctx) {
      let url = `https://predprod.gruza.net:8087/delete/${ctx.state.credentials.public_id}`;
      await Axios.delete(url, ctx.state.config)
        .then(() => {
          let credentials = {
            token: "",
            public_id: "response.data.public_id",
          };
          ctx.commit("setCredentials", credentials);
          ctx.commit("setProfile", {});
          alert("profile deleted");
          router.push("/register");
        })
        .catch((error) => console.log(error));
    },
    async fetchUsers(ctx, page) {
      let url = `https://predprod.gruza.net:8087/list/${page}`;
      await Axios.get(url, ctx.state.config)
        .then((response) => {
          ctx.commit("addUserToList", response.data.users);
          /* ctx.commit("setPagesCount", response.data.pages); */
        })
        .catch((error) => console.log(error));
    },
    async follow(ctx, userId) {
      let url = `https://predprod.gruza.net:8087/follow/${userId}`;
      await Axios.post(url, {}, ctx.state.config)
        .then(() => {
          ctx.commit("addUserToFollowed", userId);
        })
        .catch((error) => console.log(error));
    },
    async unfollow(ctx, userId) {
      console.log("unfollow");
      let url = `https://predprod.gruza.net:8087/unfollow/${userId}`;
      await Axios.post(url, {}, ctx.state.config)
        .then(() => {
          ctx.commit("deleteUserFromFollowed", userId);
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
  getters: {
    getCredentials: (state) => {
      return state.credentials;
    },
    getProfile: (state) => {
      return state.profile;
    },
    getUsers: (state) => {
      if (state.profile.followed) {
        return state.users.filter(
          (user) =>
            !state.profile.followed.find(
              (follow) => user.public_id === follow.public_id
            )
        );
      } else {
        return state.users;
      }
    },
    getPagesCount: (state) => {
      return state.pagesCount;
    },
    getFollowedUsers: (state) => {
      return state.profile.followed || [];
    },
  },
});
