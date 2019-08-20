import Vue from "vue";
import Vuex from "vuex";
import { getField, updateField } from "vuex-map-fields";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const ADD_CANDIDATE = "ADD_CANDIDATE";
const CLEAR_DATA = "CLEAR_DATA";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  strict: true,
  plugins: [vuexLocal.plugin],
  state: {
    candidates: [],
    totalVotes: 10,
    totalMembers: 5
  },
  getters: {
    getField,
    passedCandidates: state =>
      state.candidates.filter(
        candidate => candidate.vote >= state.totalVotes / 2
      )
  },
  actions: {
    [ADD_CANDIDATE]({ commit }, name) {
      const timestamp = Date.now();
      const candidate = {
        id: timestamp,
        name,
        vote: 0
      };
      commit(ADD_CANDIDATE, candidate);
    },
    [CLEAR_DATA]({ commit }) {
      commit(CLEAR_DATA);
    }
  },
  mutations: {
    updateField,
    [ADD_CANDIDATE](state, candidate) {
      state.candidates.push(candidate);
    },
    [CLEAR_DATA](state) {
      state.candidates = [];
      state.totalVotes = 10;
      state.totalMembers = 5;
    }
  }
});
