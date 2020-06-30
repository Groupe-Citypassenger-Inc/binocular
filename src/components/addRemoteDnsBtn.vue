<template>
  <b-form @submit="onSubmit">
    <b-card header-tag="header" header-text-variant="white">
      <h5 slot="header">{{$t('add_remoteDns')}}</h5>
      <b-form-group horizontal :label-cols="3" :label="$t('remoteDns_name')" label-for="remoteDnsNameInput">
        <b-form-input required type="text" v-model="remoteDnsName" id="remoteDnsNameInput" :placeholder="$t('remoteDns_name_placeholder')" pattern="([a-zA-Z0-9-_.\-!@ ()]){1,64}" :title="$t('err_pattern')"/>
      </b-form-group>
      <b-form-group horizontal :label-cols="3" :label="$t('remoteDns_domain')" label-for="remoteDnsDomain">
         <b-form-input required type="text" v-model="remoteDnsDomain" id="remoteDnsDomain" :placeholder="$t('remoteDns_domain_placeholder')" pattern="([a-zA-Z0-9-_.\-]){1,64}" :title="$t('err_pattern')"/>
      </b-form-group>
      <b-form-group horizontal :label-cols="3" :label="$t('remoteDns_gate')" label-for="remoteDnsGateSelect">
        <b-form-select required id="remoteDnsGateSelect" :options="options" v-model="selected" />
      </b-form-group>
      <b-button type="submit" variant="success" id="addBtn">{{$t('add_remoteDns')}} <i class="fa fa-plus"></i></b-button>
    </b-card>
  </b-form>
</template>

<script>
import { RemoteDns } from './remoteDns.js';

export default {
  name: 'addRemoteDnsBtn',
  data: function() {
    return {
      remoteDnsName: '',
      remoteDnsDomain: '',
      selected: null,
      options: [
        {
          value: null,
          text: this.$t('remoteDns_gate_placeholder'),
          disabled: true
        }
      ]
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.selected.alias = this.remoteDnsName;
      this.selected.domain =
        'https://' + this.remoteDnsDomain + '.citypassenger.com:8080';
      this.$parent.addRemoteDns(this.selected);
    }
  },
  created: function() {
    this.$parent.$on('populateSelect', remoteDns_list => {
      remoteDns_list.forEach(rdns => {
        this.options.push({ value: rdns, text: rdns.name });
      });
    });
  }
};
</script>

<style scoped>
.card {
  display: inline-block;
}
.card-header {
  background-color: rgb(57, 73, 156) !important;
}
.card-body {
  height: 299px;
}
#addBtn {
  position: absolute;
  bottom: 15px;
  width: 95%;
}
</style>
