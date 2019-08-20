<template>
  <div id="app" class="flex h-screen bg-gray-200">
    <div
      id="sidebar"
      class="fixed inset-0 h-full bg-white z-90 border-r border-gray-400"
      style="width: 250px;"
    >
      <div class="px-6 py-6 h-full">
        <h1 class="text-xl font-bold mb-6">
          <a href="/" class="flex items-center">
            <img
              src="./assets/img/logo.png"
              alt="Church Election"
              class="mr-2 h-auto"
              style="width: 35px;"
            />
            Bầu cử
          </a>
        </h1>
        <div class="flex flex-col justify-between h-full">
          <div>
            <label for="total" class="block mb-4">
              <span class="block text-gray-600 text-sm mb-1"
                >Tổng số phiếu</span
              >
              <input
                id="total"
                v-model="totalVotes"
                type="number"
                class="form-input font-bold"
              />
            </label>
            <label for="total" class="block mb-4">
              <span class="block text-gray-600 text-sm mb-1"
                >Số thành viên BĐH</span
              >
              <input
                id="total"
                v-model="totalMembers"
                type="number"
                class="form-input font-bold"
              />
            </label>
          </div>
          <ClearData />
        </div>
      </div>
    </div>
    <!-- #sidebar -->
    <main style="margin-left: 250px; margin-right: 550px;" class="w-full">
      <div class="h-full w-full">
        <div class="px-10 py-6 bg-gray-200">
          <form class="flex items-start" @submit.prevent="addCandidate">
            <input
              v-model="candidateName"
              type="text"
              placeholder="Họ và tên"
              class="form-input"
            />
            <button type="submit" class="btn">Thêm</button>
          </form>
        </div>

        <div class="px-10 py-6 bg-gray-200">
          <CandidateList />
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
        <CandidatePassedTable />
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields, mapMultiRowFields } from "vuex-map-fields";
import CandidateList from "@/components/Candidate/CandidateList.vue";
import CandidatePassedTable from "@/components/Candidate/CandidatePassedTable.vue";
import ClearData from "@/components/ClearData.vue";

export default {
  name: "App",
  components: {
    CandidateList,
    CandidatePassedTable,
    ClearData
  },
  data() {
    return {
      candidateName: ""
    };
  },
  computed: {
    ...mapFields(["totalVotes", "totalMembers"]),
    ...mapMultiRowFields(["candidates"])
  },
  methods: {
    addCandidate() {
      if (this.candidateName === "") {
        return;
      }

      this.$store.dispatch("ADD_CANDIDATE", this.candidateName);
      this.candidateName = "";
    }
  }
};
</script>

<style lang="scss">
@import "main.scss";
</style>
