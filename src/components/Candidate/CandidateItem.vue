<template>
  <li
    :class="[
      { passed: isPassed },
      'group flex justify-between items-center rounded bg-white mb-3 px-1 pr-5 py-1 hover:shadow-md'
    ]"
  >
    <span
      class="counter flex flex-col flex-shrink-0 justify-center items-center font-bold bg-blue-base text-white rounded-sm"
      style="width: 80px; height: 80px;"
    >
      <span class="text-5xl leading-none" v-text="candidate.vote"></span>
      <span v-text="votePercent"></span>
    </span>
    <div v-if="!isEditing" class="text-2xl flex-1 mx-5 px-5">
      <p class="font-bold" v-text="candidate.name"></p>
      <p class="inline-flex items-center">
        <span class="text-gray-500 mr-4" v-text="'#' + index"></span>
        <span
          v-if="isPassed"
          class="bg-green-base text-white text-sm rounded-full px-4 py-1"
          >Quá bán</span
        >
      </p>
    </div>
    <div v-if="isEditing" class="flex flex-1">
      <input
        v-model="candidateName"
        v-focus
        type="text"
        class="form-input mx-5"
        @keypress.enter="saveCandidate"
      />
      <span class="flex-shrink-0">
        <a href="#" class="btn inline-block mr-2" @click.prevent="saveCandidate"
          >Lưu</a
        >
        <a
          href="#"
          class="btn btn--secondary inline-block mr-2"
          @click.prevent="isEditing = false"
          >Hủy</a
        >
      </span>
    </div>
    <div v-if="!isEditing" class="mr-4 relative cursor-pointer">
      <span
        class="px-2 hidden group-hover:block"
        @click="isShowDropdown = !isShowDropdown"
      >
        <span
          class="block bg-gray-400 rounded-full mb-1"
          style="width: 5px; height: 5px;"
        ></span>
        <span
          class="block bg-gray-400 rounded-full mb-1"
          style="width: 5px; height: 5px;"
        ></span>
        <span
          class="block bg-gray-400 rounded-full"
          style="width: 5px; height: 5px;"
        ></span>
      </span>
      <nav
        v-if="isShowDropdown"
        class="absolute right-0 z-10 mt-2 text-sm rounded shadow-md bg-white w-32 py-2 overflow-hidden border border-gray-300"
      >
        <a
          href="#"
          class="block px-3 py-2 hover:bg-gray-300"
          @click.prevent="
            isEditing = true;
            isShowDropdown = false;
          "
          >Sửa tên</a
        >
        <a
          href="#"
          class="block px-3 py-2 hover:bg-gray-300"
          @click.prevent="voteDown"
          >Trừ 1 phiếu</a
        >
        <a
          href="#"
          class="block px-3 py-2 text-red-500 hover:bg-gray-300"
          @click.prevent="deleteCandidate"
          >Xóa</a
        >
      </nav>
    </div>
    <span v-if="!isEditing" class="flex-shrink-0">
      <button
        class="btn px-8"
        :disabled="candidate.vote >= totalVotes"
        @click.prevent="voteUp"
      >
        +1
      </button>
    </span>
    <div
      v-if="isShowDropdown"
      class="fixed inset-0"
      @click="isShowDropdown = false"
    ></div>
  </li>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CandidateItem",
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  props: {
    candidate: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      isShowDropdown: false,
      candidateName: this.candidate.name
    };
  },
  computed: {
    ...mapState(["totalVotes"]),
    votePercent() {
      return `${Math.floor((this.candidate.vote * 100) / this.totalVotes)}%`;
    },
    isPassed() {
      return this.candidate.vote >= this.totalVotes / 2;
    }
  },
  methods: {
    saveCandidate() {
      this.candidate.name = this.candidateName;
      this.isEditing = false;
    },
    deleteCandidate() {
      this.isEditing = false;
      this.isShowDropdown = false;
    },
    voteUp() {
      this.candidate.vote += 1;
    },
    voteDown() {
      if (this.candidate.vote === 0) {
        return;
      }
      this.candidate.vote -= 1;
    }
  }
};
</script>
