<template>
  <li
    :class="[{passed: isPassed},'group flex justify-between items-center rounded bg-white mb-3 px-1 pr-5 py-1 hover:shadow-md']"
  >
    <span
      class="counter flex flex-col flex-shrink-0 justify-center items-center font-bold bg-blue-base text-white rounded-sm"
      style="width: 100px; height: 100px;"
    >
      <span class="text-5xl leading-none" v-text="candidate.vote"></span>
      <span v-text="votePercent"></span>
    </span>
    <div class="text-2xl flex-1 mx-5 px-5" v-if="!isEditing">
      <p v-text="candidate.name" class="font-bold"></p>
      <p class="inline-flex items-center">
        <span v-text="'#' + index" class="text-gray-500 mr-4"></span>
        <span v-if="isPassed" class="bg-green-base text-white text-sm rounded-full px-4 py-1">Quá bán</span>
      </p>
    </div>
    <div v-if="isEditing" class="flex flex-1">
      <input
        type="text"
        class="form-input mx-5"
        v-focus
        v-model="candidateName"
        @keypress.enter="saveCandidate"
      >
      <span class="flex-shrink-0">
        <a href="#" class="btn inline-block mr-2" @click.prevent="saveCandidate">Lưu</a>
        <a
          href="#"
          class="btn btn--secondary inline-block mr-2"
          @click.prevent="isEditing = false"
        >Hủy</a>
      </span>
    </div>
    <div v-if="!isEditing" class="mr-4 relative cursor-pointer">
      <span class="px-2 hidden group-hover:block" @click="isShowDropdown = !isShowDropdown">
        <span class="block bg-gray-400 rounded-full mb-1" style="width: 5px; height: 5px;"></span>
        <span class="block bg-gray-400 rounded-full mb-1" style="width: 5px; height: 5px;"></span>
        <span class="block bg-gray-400 rounded-full" style="width: 5px; height: 5px;"></span>
      </span>
      <nav
        v-if="isShowDropdown"
        class="absolute right-0 z-10 mt-2 text-sm rounded shadow-md bg-white w-32 py-2 overflow-hidden border border-gray-300"
      >
        <a
          href="#"
          class="block px-3 py-2 hover:bg-gray-300"
          @click.prevent="isEditing = true; isShowDropdown = false"
        >Sửa tên</a>
        <a href="#" class="block px-3 py-2 hover:bg-gray-300" @click.prevent="voteDown">Trừ 1 phiếu</a>
        <a
          href="#"
          class="block px-3 py-2 text-red-500 hover:bg-gray-300"
          @click.prevent="deleteCandidate"
        >Xóa</a>
      </nav>
    </div>
    <span class="flex-shrink-0" v-if="!isEditing">
      <button class="btn px-8" @click.prevent="voteUp" :disabled="candidate.vote >= totalVotes">+1</button>
    </span>
    <div v-if="isShowDropdown" class="fixed inset-0" @click="isShowDropdown = false"></div>
  </li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'candidate-item',
  props: {
    candidate: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      isShowDropdown: false,
      candidateName: this.candidate.name,
    };
  },
  computed: {
    ...mapState(['totalVotes']),
    votePercent() {
      return `${Math.floor((this.candidate.vote * 100) / this.totalVotes)}%`;
    },
    isPassed() {
      return this.candidate.vote >= this.totalVotes / 2;
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  methods: {
    saveCandidate() {
      this.candidate.name = this.candidateName;
      this.$store.dispatch('UPDATE_CANDIDATE_NAME', this.candidate);
      this.isEditing = false;
    },
    deleteCandidate() {
      this.$store.dispatch('DELETE_CANDIDATE_NAME', this.candidate);
      this.isEditing = false;
      this.isShowDropdown = false;
    },
    voteUp() {
      this.candidate.vote += 1;
      this.$store.dispatch('UPDATE_CANDIDATE_NAME', this.candidate);
    },
    voteDown() {
      if (this.candidate.vote === 0) {
        return;
      }
      this.candidate.vote -= 1;
      this.$store.dispatch('UPDATE_CANDIDATE_NAME', this.candidate);
    },
  },
};
</script>

<style lang="scss" scoped>
.passed {
}
</style>
