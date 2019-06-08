<template>
  <transition-group name="list" tag="ul" class="relative">
    <candidate-item
      v-for="(candidate, index) in candidates"
      :key="candidate.id"
      :candidate="candidate"
      :index="index + 1"
    ></candidate-item>
  </transition-group>
</template>

<script>
import { mapGetters } from 'vuex';
import CandidateItem from './CandidateItem.vue';

export default {
  name: 'candidate-list',
  components: {
    CandidateItem,
  },
  computed: {
    ...mapGetters(['candidates']),
  },
};
</script>

<style lang="scss" scoped>
.list-enter-active, .list-leave-active {
  transition: all .6s ease-in-out;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.list-move {
  transition: transform .6s ease-in-out;
}
.list-leave-active  {
  position: absolute;
  width: 100%;
}
</style>
