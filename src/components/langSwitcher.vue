<template>
  <b-dropdown id="langDropdown" variant="light" class="m-md-2">
    <template slot="button-content">
        {{ $t('lang') }}
    </template>
    <b-dropdown-item v-for="(lang, i) in langs" @click="setLang(lang)" :key="`Lang${i}`" :value="lang">
       {{ $t('lang', lang) }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import Vue from 'vue';
import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

export default {
  name: 'lang-switcher',
  data() {
    return {
      langs: ['fr', 'en']
    };
  },
  methods: {
    setLang: function(locale) {
      this.$cookie.set('locale', locale, 365);
      this.$i18n.locale = locale;
    },
    getLang: function() {
      return $t('flag', this.$i18n.locale);
    }
  },
  created: function() {
    this.$i18n.locale = this.$cookie.get('locale') || 'fr';
  }
};
</script>

<style scoped>
button {
  margin-top: 0px !important;
}
.flag {
  padding-bottom: 4px;
  width: 21px;
  height: 21px;
}
.btn-light {
  color: #212529;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}
</style>
