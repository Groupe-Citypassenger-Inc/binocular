<template>
  <div class="login">
    <b-form inline @submit="onSubmit" v-if="isHidden && !isLoggedIn">
      <b-form-input class="formLoginInput" type="text" required v-model="login" id="email" :placeholder="$t('username')"></b-form-input>
      <b-form-input class="formLoginInput" type="password" required v-model="password" id="inputPassword" :placeholder="$t('password')"></b-form-input>
      <b-button type="submit" variant="success" id="signIn">{{$t('signIn')}}</b-button>
    </b-form>
    <b-button id="loginBtn" variant="info" v-if="!isHidden" v-on:click="isHidden = true">{{$t('login')}}</b-button>
    <b-button id="logoutBtn" variant="danger" @click="handleLogout()" v-if="isLoggedIn" v-b-tooltip.hover.bottom="$t('logout')"><span class="fa fa-power-off"></span></b-button>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: 'Login',
  data: function() {
    return {
      isHidden: false,
      login: '',
      password: '',
      isLoggedIn: ''
    };
  },
  created: function() {
    // Check if the user is logged
    var url = process.env.VUE_APP_WS_URL + '/ws/User/Logged';
    axios(url, {
      method: 'GET'
    })
      .then(response => {
        // console.log('------------- DEBUG logged call done -------------');
        // console.log(response);
        // console.log('---------------------------------------------');
        if (response.data != null) {
          this.isLoggedIn = true;
          this.isHidden = true;
          this.getDevices();
        } else {
          this.isLoggedIn = false;
          this.isHidden = false;
        }
      })
      .catch(error => {
        console.log('Query to ' + url + ' failed, cause: ' + error);
      });
  },
  watch: {
    isLoggedIn: function() {
      this.$parent.isLoggedIn = this.isLoggedIn;
    }
  },
  mounted: function() {},
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios(process.env.VUE_APP_WS_URL + '/ws/User/Login', {
        method: 'GET',
        params: {
          login: this.login,
          password: this.password
        }
      })
        .then(data => {
          if (data.username != '' && data.id != '') {
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', true);
            this.getDevices();
          } else {
            alert('Error occured: wrong email/password');
          }
        })
        .catch(error => {
          console.log('Submit login error :' + error);
        });
    },
    handleLogout() {
      localStorage.setItem('isLoggedIn', false);
      this.isHidden = false;
      this.isLoggedIn = false;
      var url = process.env.VUE_APP_WS_URL + '/ws/User/Logout';
      axios(url, {
        method: 'GET'
      })
        .then(response => {
          this.isHidden = false;
          this.isLoggedIn = false;
          console.log('Logged out');
        })
        .catch(error => {
          console.log('Query to ' + url + ' failed, cause: ' + error);
        });
    },
    getDevices() {
      var url = process.env.VUE_APP_WS_URL + '/ws/Map/Devices';
      axios(url, {
        method: 'GET'
      })
        .then(response => {
          // console.log('------------------- DEBUG getDevices() -------------');
          // console.log(response.data);
          // console.log('---------------------------------------------');
          this.$emit('devices-list', response.data.groups);
        })
        .catch(error => {
          console.log('Query to ' + url + ' failed, cause: ' + error);
        });
    }
  }
};
</script>

<style scoped>
.login {
  display: inline-block;
}
.formLoginInput {
  margin-right: 5px;
}
</style>
