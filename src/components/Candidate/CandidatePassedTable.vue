<template>
  <div class="w-full">
    <div class="flex justify-between mb-6">
      <a
        href="#"
        class="inline-flex items-center text-blue-base hover:underline"
        @click.prevent="sortTable"
      >
        Sắp xếp
        <span v-html="iconSort" class="ml-2"></span>
      </a>
    </div>

    <transition-group name="list" tag="ul">
      <li
        v-for="(candidate, index) in candidates"
        :key="candidate.id"
        :class="[
          index < totalMembers && sort === 'desc' ? 'bg-green-base' : '',
          index === 0 ? 'rounded-tl-lg rounded-tr-lg' : '',
          index === totalMembers - 1 ? 'rounded-bl-lg rounded-br-lg' : '',
          'px-2 py-2'
        ]"
      >
        <div
          class="group flex justify-between items-center rounded font-bold bg-white px-1 pr-5 py-1 shadow-md"
        >
          <span
            class="flex flex-col flex-shrink-0 justify-center items-center bg-blue-base text-white rounded-sm"
            style="width: 60px; height: 60px;"
          >
            <span class="text-3xl leading-none" v-text="candidate.vote"></span>
          </span>
          <div class="flex-1 mx-3 px-5">
            <p v-text="candidate.name" class="text-xl"></p>
            <p class="text-sm">
              <span class="font-normal text-gray-600">Tỷ lệ&nbsp;</span>
              <span v-text="Math.round(candidate.vote * 100 / totalVotes) + '%'"></span>
            </p>
          </div>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'candidate-passed-table',
  data() {
    return {
      sort: '',
    };
  },
  computed: {
    ...mapState(['totalVotes', 'totalMembers']),
    ...mapGetters(['passedCandidates']),
    candidates() {
      const candidates = this.passedCandidates;
      if (this.sort === 'asc') {
        return candidates.sort((a, b) => a.vote - b.vote);
      }
      if (this.sort === 'desc') {
        return candidates.sort((a, b) => b.vote - a.vote);
      }
      return candidates;
    },
    iconSort() {
      if (this.sort === 'asc') {
        return '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 320 512"><path fill="currentColor" d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path></svg>';
      }
      if (this.sort === 'desc') {
        return '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 320 512"><path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>';
      }
      return '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 320 512"><path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path></svg>';
    },
  },
  methods: {
    sortTable() {
      if (this.sort === '' || this.sort === 'asc') {
        this.sort = 'desc';
      } else if (this.sort === 'desc') {
        this.sort = 'asc';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease-in-out;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.list-move {
  transition: transform 0.6s ease-in-out;
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
