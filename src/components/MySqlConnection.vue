<template>
    <form class="form " @submit.prevent="connect"  v-if="!connected || connected">
        <div class="field">
        <label class="label">Connection Name</label>
        <div class="control">
          <input v-model="name" class="input" type="text" placeholder="Name">
        </div>
      </div>


      <div class="field">
        <label class="label">Host</label>
        <div class="control">
          <input v-model="host" class="input is-small" type="text" placeholder="Enter the hostname or IP address">
        </div>
      </div>
      <div class="field">
        <label class="label">Port</label>
        <div class="control">
          <input v-model="port" class="input is-small" type="number" placeholder="Enter the port number">
        </div>
      </div>
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input v-model="username" class="input is-small" type="text" placeholder="Enter the username">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input v-model="password" class="input is-small" type="password" placeholder="Enter the password">
        </div>
      </div>
      <div class="field">
        <label class="label">Database</label>
        <div class="control">
          <input v-model="database" class="input is-small" type="text" placeholder="Enter the database name">
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Connect</button>
        </div>
        <div class="control">
          <button class="button is-text" @click="reset">Cancel</button>
        </div>
      </div>

    </form>
    <div v-else>
        <h1>Connected to {{ name }}</h1>
    </div>
  </template>
  
<script>

export default {
    data() {
        return {
            host: "",
            port: "3306",
            username: "",
            password: "",
            database: "",
            connected: false,
            name: "",
        };
    },
    methods: {
        async connect() {

            this.$store.commit('app/clearError');
            // Connect to the database using the collected details
            const connectionDetails = {
                host: this.host,
                port: this.port,
                user: this.username,
                password: this.password,
                database: this.database
            };
            // Example code, you will need to replace this with the appropriate code for your application
            console.log(`Connecting to the database at ${connectionDetails.host}:${connectionDetails.port} with username ${connectionDetails.username}`);

            this.$store.commit('source/name', this.name)
            this.$store.commit('source/type', 'mysql')
            this.$store.commit('source/options', connectionDetails)

            try{
                await this.$store.dispatch('source/getTables')
                this.connected = true
            } catch(e){
                this.$store.commit('app/error', e);
                this.connected = false
            }
        },
    },
    mounted(){
        this.name = this.$store.getters['source/name']
        this.host = this.$store.getters['source/options']?.host
        this.username = this.$store.getters['source/options']?.user
        this.password = this.$store.getters['source/options']?.password
        this.database = this.$store.getters['source/options']?.database
    }
};
</script>
  