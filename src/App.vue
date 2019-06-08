<template>
  <div id="app" class="flex h-screen bg-gray-200">
    <div
      id="sidebar"
      class="fixed inset-0 h-full bg-white z-90 border-r border-gray-400"
      style="width: 300px;"
    >
      <div class="px-6 py-6 h-full">
        <h1 class="text-xl font-bold mb-6">
          <a href="#">Bầu Cử</a>
        </h1>
        <div class="flex flex-col justify-between h-full">
          <div>
            <label for="total" class="block mb-4">
              <span class="block text-gray-600 text-sm mb-1">Tổng số phiếu</span>
              <input type="number" id="total" class="form-input font-bold" v-model="totalVotes">
            </label>
          </div>
          <a href="#" class="btn btn--danger mb-16">Xóa dữ liệu</a>
        </div>
      </div>
    </div>
    <!-- #sidebar -->
    <main style="margin-left: 300px; margin-right: 550px;" class="w-full">
      <div class="h-full w-full">
        <div class="px-10 py-6 bg-gray-200">
          <form class="flex items-start" @submit.prevent="addCandidate">
            <input type="text" placeholder="Họ và tên" class="form-input" v-model="candidateName">
            <button type="submit" class="btn">Thêm</button>
          </form>
        </div>

        <div class="px-10 py-6 bg-gray-200">
          <candidate-list></candidate-list>
        </div>
      </div>
    </main>
    <div
      id="sidebar"
      class="fixed top-0 bottom-0 right-0 h-full bg-white z-90 border-l border-gray-400"
      style="width: 550px;"
    >
      <div class="px-6 py-6 h-full">
        <h1 class="text-xl font-bold mb-6">Danh sách quá bán</h1>

        <candidate-passed-table></candidate-passed-table>
      </div>
    </div>
  </div>
</template>

<script>
import CandidateList from '@/components/Candidate/CandidateList.vue';
import CandidatePassedTable from '@/components/Candidate/CandidatePassedTable.vue';

export default {
  name: 'app',
  components: {
    CandidateList,
    CandidatePassedTable,
  },
  data() {
    return {
      candidateName: '',
      totalVotes: this.$store.state.totalVotes,
    };
  },
  methods: {
    addCandidate() {
      if (this.candidateName === '') {
        // show notice
      } else {
        this.$store.dispatch('ADD_CANDIDATE', this.candidateName);
        this.candidateName = '';
      }
    },
  },
  watch: {
    totalVotes(newVal) {
      if (newVal !== '') {
        this.$store.dispatch('SET_TOTAL_VOTES', newVal);
      }
    },
  },
};
</script>

<style lang="scss">
@import "main.scss";
</style>
