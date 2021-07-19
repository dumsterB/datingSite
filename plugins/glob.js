import Vue from 'vue';

export default new class {
  modals = {
    photoSliderModal:{
      show: false
    }
  }

  constructor() {
    const vm = new Vue({
      data: {
        modals: this.modals,
      }
    })

    this.modals = vm.modals;
  }

}
