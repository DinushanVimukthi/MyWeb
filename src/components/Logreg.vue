<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-if="tab === 'Register'"
        type="text"
        v-model="FormData.name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="email"
        v-model="FormData.email"
        label="Your Email *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your Email',
        ]"
      />
      <q-input
        filled
        type="password"
        v-model="FormData.password"
        label="Your password *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your password',
        ]"
      />

      <div>
        <q-btn :label="tab" @click="OnSubmit" color="primary" />
        <q-btn label="Reset" @click="OnReset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { mapActions } from "vuex";
import { LogUser, RegisterUser } from "src/store/stores/actions";
export default {
  props: ["tab"],
  data() {
    const $q = useQuasar();
    return {
      FormData: {
        name: '',
        email: 'test@test.com',
        password: 'test@test.com',
      }
    };
  },
  methods: {
    ...mapActions("stores", ["RegisterUser", "LogUser"]),
    async OnSubmit() {
      if (this.tab == 'Register') {
        this.RegisterUser(this.FormData).then(() => {
          console.log("success");
          // this.$router.push("/auth");
        }).catch(err => {
          console.log(err);
        });

        // this.$router.push('/dash')
      }
      else {
        this.LogUser(this.FormData);
      }

      // console.log(this.FormData);
    },
    OnReset() {
      (this.name = ""), (this.email = ""), (this.password = "");
    },
  },
};
</script>