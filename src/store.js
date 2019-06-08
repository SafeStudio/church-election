import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const ADD_CANDIDATE = 'ADD_CANDIDATE';
const UPDATE_CANDIDATE_NAME = 'UPDATE_CANDIDATE_NAME';
const DELETE_CANDIDATE_NAME = 'DELETE_CANDIDATE_NAME';
const SET_TOTAL_VOTES = 'SET_TOTAL_VOTES';

export default new Vuex.Store({
  state: {
    candidates: JSON.parse(localStorage.getItem('church_election_candidates')) || [],
    totalVotes: parseInt(localStorage.getItem('church_election_total_votes'), 10) || 10,
  },
  getters: {
    candidates: state => state.candidates,
    passedCandidates: state => state.candidates.filter(candidate => candidate.vote >= state.totalVotes / 2),
  },
  actions: {
    [ADD_CANDIDATE]({ commit }, name) {
      const timestamp = Date.now();
      const candidate = {
        id: timestamp,
        name,
        vote: 0,
      };
      commit(ADD_CANDIDATE, candidate);
    },
    [UPDATE_CANDIDATE_NAME]({ commit }, updatedCandidate) {
      commit(UPDATE_CANDIDATE_NAME, updatedCandidate);
    },
    [DELETE_CANDIDATE_NAME]({ commit }, deletedCandidate) {
      commit(DELETE_CANDIDATE_NAME, deletedCandidate);
    },
    [SET_TOTAL_VOTES]({ commit }, totalVotes) {
      commit(SET_TOTAL_VOTES, totalVotes);
    },
  },
  mutations: {
    [ADD_CANDIDATE](state, candidate) {
      state.candidates = [...state.candidates, candidate];
      localStorage.setItem('church_election_candidates', JSON.stringify(state.candidates));
    },
    [UPDATE_CANDIDATE_NAME](state, updatedCandidate) {
      const { id } = updatedCandidate;
      state.candidates = state.candidates.map(candidate => (candidate.id === id ? updatedCandidate : candidate));
      localStorage.setItem('church_election_candidates', JSON.stringify(state.candidates));
    },
    [DELETE_CANDIDATE_NAME](state, deletedCandidate) {
      state.candidates = state.candidates.filter(candidate => candidate.id !== deletedCandidate.id);
      localStorage.setItem('church_election_candidates', JSON.stringify(state.candidates));
    },
    [SET_TOTAL_VOTES](state, totalVotes) {
      state.totalVotes = totalVotes;
      localStorage.setItem('church_election_total_votes', state.totalVotes);
    },
  },
});
