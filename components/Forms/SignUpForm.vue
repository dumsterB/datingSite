<template>
  <div class="sign-up" v-if="isSignUp">
     <span class="back" @click="$emit('setSignUp')">
       <inline-svg src="/icons/arrow-left.svg"/>
    </span>
    <h2 class="title">{{$t('Sign Up')}}</h2>
    <form @submit.prevent="send">
      <div class="row row__full">
        <div class="column-full">
          <input v-focus type="text" :placeholder="$t('Full Name')" v-model="form.full_name"  class="input-default" required/>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <!--input v-focus type="text" :placeholder="$t('Full Name')" v-model="form.full_name"  class="input-default" required/-->
          <input type="password" :placeholder="$t('Password')" v-model="form.password"  class="input-default" required/>
<!--          <input type="text" placeholder="Phone" required class="input-default m-0"/>-->
          <div class="sex-block">
            <span class="sex-block__title">{{$t('Sex')}}:</span>
            <div class="row-radio">
              <span>
                <input type="radio" id="mail" value="male" v-model="form.gender">
                <label for="mail">{{$t('Male')}}</label>
              </span>
              <span>
                <input type="radio" id="female" value="female" v-model="form.gender">
                <label for="female">{{$t('Female')}}</label>
              </span>
            </div>
          </div>
        </div>
        <div class="column">
          <!--input type="email" :placeholder="$t('Email')" v-model="form.email"  class="input-default" required/ -->
          <input type="password" :placeholder="$t('Password again')" v-model="form.password_again" class="input-default" required/>
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
      </div>
      <button id="register" class="register-btn" >{{$t('Next')}}</button>
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
      selectedYear: 2003,
      optionsMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      form:{
        full_name:'',
        password:'',
        password_again:'',
        email:'',
        gender: 'male',
        orientation: this.gender
      },
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
      for (let i = 2003; i >= 1940; i--) {
        years.push(i)
      }
      return years
    },
    birthDate(){
      return `${this.selectedYear}-${this.optionsMonths.indexOf(this.selectedMonth) + 1}-${this.selectedDay}`;
    }
  },
  methods:{
    send(){
      const payload = {
        name: this.form.full_name,
        //mobile: '+380604319223',
        password: this.form.password,
        gender: this.form.gender,
        orientation: [this.form.gender],
        birth_date: this.birthDate
      }
      this.$emit('sendSendUp', payload)
    } 
  }
}
</script>
