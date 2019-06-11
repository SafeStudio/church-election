<template>
  <div class="mb-16 relative">
    <transition name="zoom-in">
      <div v-if="isShowConfirm" class="shadow-md px-4 py-4 rounded">
        <p
          class="text-sm mb-4"
        >Dữ liệu sẽ bị xóa và không thể khôi phục. Bạn có chắc xóa toàn bộ dữ liệu?</p>
        <div class="flex">
          <button class="btn btn--secondary flex-1 mr-1" @click="isShowConfirm = false">Hủy</button>
          <button class="btn btn--danger flex-1 ml-1" @click="clearData">Xóa</button>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <button
        class="btn btn--danger w-full absolute bottom-0"
        v-if="!isShowConfirm"
        @click="isShowConfirm = true"
      >Xóa dữ liệu</button>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'clear-data',
  data() {
    return {
      isShowConfirm: false,
    };
  },
  methods: {
    clearData() {
      this.$store.dispatch('CLEAR_DATA');
      this.isShowConfirm = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.zoom-in-enter-active,
.zoom-in-leave-active {
  transition: all .2s ease-in-out;
}

.zoom-in-enter,
.zoom-in-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
