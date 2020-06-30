<template>
  <div class="card">
    <div class="card-header">
      <div v-if="remoteDns.state === 'online'">
        <h5><span class="badge badge-success float-right">{{$t(remoteDns.state)}}</span></h5>
      </div>
      <div v-else-if="remoteDns.state === 'offline'">
        <h5><span class="badge badge-danger float-right">{{$t(remoteDns.state)}}</span></h5>
      </div>
      <div v-else>
        <h5><span class="badge badge-warning float-right">{{$t(remoteDns.state)}}</span></h5>
      </div>
      <h5 class="card-title">
        <b-btn v-b-toggle='"collapse-"+ this._uid' variant="light" class="collapsebtn">
          <i class="fa"></i>
        </b-btn>
        {{remoteDns.alias}}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="removeRemoteDns()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <b-collapse v-model="showCollapse" v-bind:id='"collapse-" + this._uid'>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-3">Cityscope:</div>
          <div class="remoteDnsInfos col-sm-9"><a class="card-link" v-bind:href="cityscopeUrl">{{cityscopeUrl}}</a></div>
        </div>
        <div v-if="hardware != ''">
          <div class="row">
            <div class="col-sm-3">{{$t('start')}}:</div>
            <div class="remoteDnsInfos col-sm-9">{{getStringDate(hardware.boottime)}}</div>
          </div>
          <div class="row">
            <div class="col-sm-3">{{$t('now')}}:</div>
            <div class="remoteDnsInfos col-sm-9">{{getStringDate(hardware.date)}}</div>
          </div>
          <div class="row">
            <div class="col-sm-3">{{$t('digital_manager')}}:</div>
            <div class="remoteDnsInfos col-sm-9">{{hardware.load}}</div>
          </div>
          <div class="row">
            <div class="col-sm-3">{{$t('temperature')}}:</div>
            <div class="remoteDnsInfos col-sm-9">{{hardware.temp}}</div>
          </div>
          <div class="row">
            <div class="col-sm-3">{{$t('memory')}}:</div>
            <div class="remoteDnsInfos col-sm-9">{{hardware.mem}}</div>
          </div>
        </div>
        <div v-else class="remoteDnsInfos" style="margin-top:35px;margin-left:35px">
          <p>{{$t('no_hardware_err')}}</p>
        </div>
        <a v-bind:href="remoteDns.domain" target="_blank" class="btn primary-custom" id="go-btn">Go</a>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: 'RemoteDnsCard',
  props: ['remoteDns'],
  data: function() {
    return {
      showCollapse: true,
      hardware: '',
      cityscopeUrl: ''
    };
  },
  methods: {
    removeRemoteDns: function() {
      this.$parent.removeRemoteDns(this.remoteDns);
    },
    getStringDate: function(timestamp) {
      var date = new Date(timestamp * 1000);
      var year = date.getFullYear();
      // getMonth return month number from 0 to 11
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = '0' + date.getMinutes();
      var seconds = '0' + date.getSeconds();
      return (
        day +
        '/' +
        month +
        '/' +
        year +
        '  ' +
        hours +
        ':' +
        minutes.substr(-2) +
        ':' +
        seconds.substr(-2)
      );
    },
    getRemoteDnsStatus: function() {
      if (this.hardware != '') {
        let now = new Date();
        var hwDate = new Date(this.hardware.date * 1000);
        var difference = now.getTime() - hwDate.getTime();
        var minutes = Math.round(difference / 60000);
        if (minutes > 3) this.remoteDns.state = 'offline';
        else this.remoteDns.state = 'online';
      } else {
        console.log('No hardware data found for: ' + this.remoteDns.name);
      }
    },
    collapseAllCard: function() {
      this.showCollapse = !this.showCollapse;
      this.remoteDns.collapse = this.showCollapse;
    },
    getInfos: function() {
      if (this.$parent.isLoggedIn == true) {
        var url = process.env.VUE_APP_WS_URL + '/ws/';
        url +=
          this.remoteDns.groupName +
          '/SupervisionStatus/' +
          this.remoteDns.name;
        if (this.remoteDns.groupName != undefined) {
          axios(url, {
            method: 'GET',
            params: {
              groupName: this.remoteDns.groupName,
              site_name: this.remoteDns.name,
              device_type: 'iena',
              type: 'hw'
            }
          })
            .then(response => {
              this.hardware = response.data.extended_state.hardware;
              this.getRemoteDnsStatus();
            })
            .catch(error => {
              console.log('Query to ' + url + ' failed, cause: ' + error);
            });
        } else {
          fetch(this.remoteDns.domain, {
            mode: 'no-cors'
          })
            .then(r => {
              this.remoteDns.state = 'online';
            })
            .catch(e => {
              this.remoteDns.state = 'offline';
            });
        }
      }
    }
  },
  created: function() {
    this.$parent.$on('getRemoteDnsStatus', this.getInfos);
    this.$parent.$on('collapseAllCard', this.collapseAllCard);
    this.getInfos();
  },
  mounted: function() {
    this.cityscopeUrl = process.env.VUE_APP_WS_URL + this.remoteDns.siteReferer;
    this.getInfos();
  }
};
</script>

<style scoped>
.card {
  display: inline-block;
}
.badge {
  margin-right: 10px;
}
.close {
  margin-right: 5px;
  position: absolute;
  top: 0;
  right: 0;
}
.collapsebtn {
  color: grey;
  display: contents;
}
.collapsebtn .fa:before {
  content: '\f139';
}
.collapsebtn.collapsed .fa:before {
  content: '\f13a';
}
.remoteDnsInfos {
  font-size: 13px;
  font-family: Consolas;
}
.card-title {
  margin-bottom: 0;
}
.card-body {
  height: 300px;
}
#go-btn {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
