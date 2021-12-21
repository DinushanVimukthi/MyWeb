<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar :class="this.$q.dark.mode?'row bg-dark':'row'">
        <q-toolbar-title class="absolute-center">
          UCSC 1st Year DashBoard
          <q-btn :label="this.$q.dark.mode?'Dark':'light'" :icon="this.$q.dark.mode?'dark_mode':'light_mode'" @click="ToggleDark"/>
          
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>




import { useQuasar } from 'quasar';
import { defineComponent} from 'vue'
import {mapState,mapActions} from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  setup(){
    const $q=useQuasar()
    
  },
  computed: {
    ...mapState('stores',['users'])
  },
  methods: {
    ...mapActions('stores', ['LogOut']),
    SignOut(){
      this.LogOut();
    },
    ToggleDark()
    {
      console.log( this.$q.dark.mode);
      this.$q.dark.toggle()
    }
  },


})
</script>
