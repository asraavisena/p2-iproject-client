import Vue from "vue";
import Vuex from "vuex";
import axios from "../apis/server";
import router from "@/router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    accommodations: [],
  },
  mutations: {
    FETCH_ISAUTH(state, payload) {
      state.isAuth = payload;
    },
    FETCH_ACCOMMODATIONS(state, payload) {
      state.accommodations = payload;
    },
  },
  actions: {
    loginFunction(context, payload) {
      axios
        .post("/public/login", {
          email: payload.email,
          password: payload.password,
        })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user_Email", data.user_email);
          localStorage.setItem("user_Role", data.user_role);
          localStorage.setItem("user_Id", data.user_id);
          context.commit("FETCH_ISAUTH", true);
          router.push({ path: "/" }).catch(() => {});
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    logoutFunction(context) {
      localStorage.clear();
      context.commit("FETCH_ISAUTH", false);
      router.push({ path: "/login" }).catch(() => {});
    },

    registerFunction(context, payload) {
      axios
        .post("/public/register", payload)
        .then(() => {
          router.push({ path: "/login" }).catch(() => {});
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },

    getAccommodationsFunction(context) {
      axios
        .get("/public", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then(({ data }) => {
          console.log(data);
          context.commit("FETCH_ACCOMMODATIONS", data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  modules: {},
});
