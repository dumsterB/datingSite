<template>
  <div class="sign-up" v-if="isSignUp">
     <span class="back" @click="$emit('setSignUp')">
       <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <h2 class="title">Sign Up</h2>
    <form @submit.prevent="send">
      <div class="row">
        <div class="column">
          <input v-focus type="text" placeholder="Full Name" v-model="form.full_name"  class="input-default" required/>
          <input type="password" placeholder="Password" v-model="form.password"  class="input-default" required/>
<!--          <input type="text" placeholder="Phone" required class="input-default m-0"/>-->
          <div class="select-block">
            <v-select class="select-block__day" v-model="selectedDay" :options="optionsDays">
              <template #open-indicator="{ attributes }">
                <span v-bind="attributes"><inline-svg src="/icons/arrow-dwn.svg"/></span>
              </template>
            </v-select>
            <v-select class="select-block__month" v-model="selectedMonth" :options="optionsMonths">
              <template #open-indicator="{ attributes }">
                <span v-bind="attributes"><inline-svg src="/icons/arrow-dwn.svg"/></span>
              </template>
            </v-select>
            <v-select class="select-block__year" v-model="selectedYear" :options="optionsYear">
              <template #open-indicator="{ attributes }">
                <span v-bind="attributes"><inline-svg src="/icons/arrow-dwn.svg"/></span>
              </template>
            </v-select>
          </div>
        </div>
        <div class="column">
          <input type="email" placeholder="Email" v-model="form.email"  class="input-default" required/>
          <input type="password" placeholder="Password again" v-model="form.password_again" class="input-default" required/>
          <div class="sex-block">
            <span class="sex-block__title">Sex:</span>
            <div class="row-radio">
          <span>
            <input type="radio" id="mail" value="male" v-model="form.gender">
            <label for="mail">Mail</label>
          </span>
              <span>
             <input type="radio" id="female" value="female" v-model="form.gender">
            <label for="female">Female</label>
          </span>
            </div>
          </div>
        </div>
      </div>
      <button class="button button__full" >Next</button>
    </form>
  </div>
</template>

<script>
export default {
  props:{
    isSignUp:{
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      selectedDay: 1,
      selectedMonth: 'January',
      selectedYear: 2021,
      optionsMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      form:{
        full_name:'',
        password:'',
        password_again:'',
        email:'',
        file:'',
        gender: 'male',
      },
      image:null
    }
  },
  computed: {
    optionsDays() {
      const days = [];
      for (let i = 1; i <= 31; i++) {
        days.push(i)
      }
      return days
    },
    optionsYear() {
      const years = [];
      for (let i = 2021; i >= 1940; i--) {
        years.push(i)
      }
      return years
    }
  },
  methods:{
    send(){
      // const payload = {
      //   name: this.form.full_name,
      //   mobile: '+380604319223',
      //   password: this.form.password,
      //   gender: this.gender,
      //   orientation: [this.gender],
      //   birthday: "1999-10-10"
      // }
      /*const payload = {
        name: 'user1',
        mobile: '+380622319223',
        gender: 'male',
        orientation: ['male'],
      }*/
      const payload = {
        name: this.form.full_name,
        email: this.form.email,
        phone: this.form.phone,
        password: this.form.password,
        gender: this.form.gender,
        orientation: ['male'],
        image: this.image
      };

      console.log(payload)
      this.$emit('sendSendUp', payload)
    } 
  }
}
</script>
