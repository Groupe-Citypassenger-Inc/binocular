<template>
    <div class="fileHandler">
        <b-button id="download" variant="light" @click="downloadData" v-b-tooltip.hover.bottom="$t('download')">
            <span class="fa fa-download"></span>
        </b-button>
        <label id="upload" class="uploadFile" v-b-tooltip.hover.bottom="$t('upload')">
            <input type="file" @change="uploadData">
            <span class="fa fa-upload"></span>
        </label>
    </div>
</template>

<script>
export default {
  name: 'fileHandler',
  methods: {
    downloadData() {
      var json = JSON.stringify(this.$parent.remoteDns_list);
      var blob = new Blob([json], { type: 'application/json' });
      saveAs(blob, 'binocularsData.json');
    },
    uploadData(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.loadData(e.target.result);
      reader.readAsText(file);
    },
    loadData(json) {
      var rdns = JSON.parse(json);
      this.$parent.remoteDns_list = rdns;
      this.$parent.saveRemoteDns();
    }
  }
};
</script>

<style scoped>
.uploadFile {
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
  border-radius: 5px;
  padding: 7px 12px;
  cursor: pointer;
  vertical-align: middle;
  margin-bottom: 0px;
}
.uploadFile input {
  display: none;
}
.fileHandler {
  display: inline-block;
}
.uploadFile:hover {
  background-color: #e2e6ea;
  border-color: #e2e6ea;
}
</style>
