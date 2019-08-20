<template>
  <transition-group name="list" tag="ul" class="relative">
    <CandidateItem
      v-for="(candidate, index) in candidates"
      :key="candidate.id"
      :candidate="candidate"
      :index="index + 1"
    ></CandidateItem>
  </transition-group>
</template>

<script>
import { mapMultiRowFields } from "vuex-map-fields";
import CandidateItem from "./CandidateItem";

export default {
  name: "CandidateList",
  components: {
    CandidateItem
  },
  computed: {
    ...mapMultiRowFields(["candidates"])
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
