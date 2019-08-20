<template>
  <div class="w-full">
    <div class="flex justify-between mb-6">
      <a
        v-show="candidates.length > 1"
        href="#"
        class="inline-flex items-center text-blue-base hover:underline"
        @click.prevent="sortTable"
      >
        Sắp xếp
        <span class="ml-2">
          <SortIcon :mode="sort" />
        </span>
      </a>
    </div>

    <transition-group name="list" tag="ul">
      <li
        v-for="(candidate, index) in candidates"
        :key="candidate.id"
        :class="[
          index < totalMembers && sort === 'desc'
            ? 'border-2 border-green-base'
            : 'border-2 border-white',
          'flex justify-between items-center rounded font-bold bg-white px-1 pr-5 py-1 mb-2 shadow-md'
        ]"
      >
        <span
          :class="[
            index < totalMembers && sort === 'desc'
              ? 'bg-green-base'
              : 'bg-blue-base',
            'flex flex-col flex-shrink-0 justify-center items-center text-white rounded-sm'
          ]"
          style="width: 50px; height: 50px;"
        >
          <span class="text-3xl leading-none" v-text="candidate.vote"></span>
        </span>
        <div class="flex-1 mx-3 px-5">
          <p class="text-xl" v-text="candidate.name"></p>
          <p class="text-sm">
            <span class="font-normal text-gray-600">Tỷ lệ&nbsp;</span>
            <span
              v-text="Math.round((candidate.vote * 100) / totalVotes) + '%'"
            ></span>
          </p>
        </div>
        <span class="text-gray-400" v-text="'#' + (index + 1)"></span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SortIcon from "@/components/SortIcon";

export default {
  name: "CandidatePassedTable",
  components: {
    SortIcon
  },
  data() {
    return {
      sort: ""
    };
  },
  computed: {
    ...mapState(["totalMembers", "totalVotes"]),
    ...mapGetters(["passedCandidates"]),
    candidates() {
      const candidates = this.passedCandidates;
      if (this.sort === "asc") {
        return candidates.sort((a, b) => a.vote - b.vote);
      }
      if (this.sort === "desc") {
        return candidates.sort((a, b) => b.vote - a.vote);
      }
      return candidates;
    }
  },
  methods: {
    sortTable() {
      if (this.sort === "" || this.sort === "asc") {
        this.sort = "desc";
      } else if (this.sort === "desc") {
        this.sort = "asc";
      }
    }
  }
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
