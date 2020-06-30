<template>
  <div id="app_container">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp"
      crossorigin="anonymous">
    <nav class="navbar navbar-dark primary-custom">
      <h1 class="navbar-brand"><i class="fa fa-binoculars"></i> BINOCULARS </h1>
      <div class="col-md-4">
        <div class="input-group">
          <input class="form-control py-2 border-right-0 border" type="search" v-model="search" v-bind:placeholder="$t('search_placeholder')">
          <span class="input-group-append">
            <div class="input-group-text"><i class="fa fa-search"></i></div>
          </span>
        </div>
      </div>
      <div class="inline pull-right btngrp" style="inline-flex">
        <p v-if="isLoggedIn" :class="minutes >= '5' ? 'd-inline warning-custom':'d-inline text-white'">
          {{ $tc('minutes_timer', minutes, {count: minutes}) }}
        </p>
        <b-button v-if="isLoggedIn" id="reloadBtn" :class="minutes >= '5' ? 'btn btn-danger':'btn btn-light'" @click="getRemoteDnsStatus()" v-b-tooltip.hover.bottom="$t('refresh')">
          <span class="fa fa-sync" aria-hidden="true"></span>
        </b-button>
        <b-button id="resetBtn" v-if="isLoggedIn" variant="light" @click="resetData" v-b-tooltip.hover.bottom="$t('reset')">
          <span class="fa fa-undo"></span>
        </b-button>
        <fileHandler v-if="isLoggedIn"></fileHandler>
        <span v-if="isLoggedIn" style="color:white">  |</span>
        <lang-switcher></lang-switcher>
        <Login @devices-list=loadData></Login>
      </div>
    </nav>
    <b-card-group  columns v-if="isLoggedIn">
      <RemoteDnsCard ref="remoteDnsCard" v-for="remoteDns in filteredList" :key="remoteDns.alias" v-bind:remoteDns=remoteDns></RemoteDnsCard>
      <addRemoteDnsBtn></addRemoteDnsBtn>
    </b-card-group>
    <b-alert :show="!isLoggedIn" variant="danger">{{ $t('err_login')}}</b-alert>
  </div>
</template>

<script>
import { RemoteDns } from './components/remoteDns.js';
import RemoteDnsCard from './components/remoteDnsCard.vue';
import addRemoteDnsBtn from './components/addRemoteDnsBtn.vue';
import Login from './components/login.vue';
import langSwitcher from './components/langSwitcher.vue';
import fileHandler from './components/fileHandler.vue';

export default {
  name: 'binoculars-app',
  components: {
    RemoteDnsCard,
    addRemoteDnsBtn,
    Login,
    langSwitcher,
    fileHandler
  },
  data: function() {
    return {
      start_time: '',
      minutes: '',
      search: '',
      isLoggedIn: false,
      remoteDns_list: []
    };
  },
  computed: {
    filteredList: function() {
      return this.remoteDns_list.filter(remoteDns => {
        return remoteDns.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    loadData(groups) {
      var rdns_list = [];
      groups.forEach(group => {
        var groupId = group.groupId;
        var groupName = group.groupName;
        group.sites.forEach(element => {
          var rdns = new RemoteDns(
            element.siteName,
            element.siteName,
            groupId,
            groupName,
            element.siteReferer,
            process.env.VUE_APP_WS_URL + element.siteReferer
          );
          rdns_list.push(rdns);
        });
      });
      this.$emit('populateSelect', rdns_list);
      this.getRemoteDnsStatus();
      this.saveRemoteDns();
    },
    updateDateTime() {
      let now = new Date();
      var difference = now.getTime() - this.start_time.getTime();
      this.minutes = Math.round(difference / 60000);
    },
    addRemoteDns(remoteDns) {
      this.remoteDns_list.push(remoteDns);
      this.saveRemoteDns();
    },
    removeRemoteDns(remoteDns) {
      this.remoteDns_list.splice(
        this.remoteDns_list.findIndex(function(i) {
          return i === remoteDns;
        }),
        1
      );
      this.saveRemoteDns();
    },
    saveRemoteDns() {
      const parsed = JSON.stringify(this.remoteDns_list);
      localStorage.setItem('remoteDns_list', parsed);
    },
    resetData() {
      var msg = this.$t('reset_msg');
      var r = confirm(msg);
      if (r == true) {
        localStorage.clear();
        document.location.reload(true);
      }
    },
    getRemoteDnsStatus() {
      //Reset timer
      this.start_time = new Date();
      this.$emit('getRemoteDnsStatus');
    },
    collapseAllCard() {
      this.$emit('collapseAllCard');
    }
  },
  mounted: function() {
    if (localStorage.getItem('remoteDns_list')) {
      try {
        this.remoteDns_list = JSON.parse(
          localStorage.getItem('remoteDns_list')
        );
      } catch (e) {
        localStorage.removeItem('remoteDns_list');
      }
    }
    this.$options.interval = setInterval(this.updateDateTime, 1000);
    this.$emit('getRemoteDnsStatus');
  },
  created: function() {
    this.start_time = new Date();
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(51, 51, 51);
  margin-top: 60px;
}
.btngrp button {
  margin-left: 2px;
  margin-right: 2px;
}
.card-columns {
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
.primary-custom {
  background-color: rgb(57, 73, 156) !important;
  color: white !important;
}
.warning-custom {
  color: #eea600;
}
.fa-binoculars {
  color: rgb(177, 214, 59);
}
</style>
