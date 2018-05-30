<template >
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app

    >
<div>
 <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar color="white">
            <v-list-tile-avatar>
              <img src="@/images/cabsol.png" :size="100">
            </v-list-tile-avatar>
            <v-list-tile-content >
              <v-list-tile-title >CABSOL</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense >
        <v-divider></v-divider>
        <v-list-tile color="white" v-for="item in items" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title color="white" :to="item.link" >{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
</div>
  </v-navigation-drawer>

  <v-toolbar app>

    <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-icon large color="green" @click.stop="drawer = !drawer">list</v-icon></v-toolbar-side-icon>
<!-- <v-toolbar-side-icon large color="green" @click.stop="drawer = !drawer">list</v-toolbar-side-icon> -->
      <v-toolbar-title class="toolbartitle">Accounting and Financial Management</v-toolbar-title>
  </v-toolbar>
  <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer app>

 <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
    <div class="logsdialog">
    <v-btn color="info" @click.stop="dialog = true" class="openlogsbtn">Open Logs</v-btn>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                  autocomplete
                  chips
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
   </div>
  </v-footer>
</v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      dialog: false,
      drawer: true,
      items: [
        { title: 'Home', icon: 'dashboard', link: '/' },
        { title: 'Payment Register', icon: 'payment', link: '/payment' },
        {
          title: 'Request',
          icon: 'feedback',
          link: '/request'
        },

        {
          title: 'Request Register',
          icon: 'feedback',
          link: '/requestregister'
        }

      ],
      right: null
    }
  }
}
</script>

<style>
.openlogsbtn {
  border-top-left-radius: .5em;
  border-top-right-radius: .5em;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.navigation-drawer[data-booted="true"] {
  background-color: #00701a;
}
.avatar,
.avatar .icon,
.avatar img {
  width: 70px;
  height: 70px;
}
.toolbartitle {
  color: #00701a;
}

.table.table tbody td,
table.table tbody th {
  height: 30px;
}
/*.list__tile__title {*/
  /*color: white !important;*/
  /*font-size: 18px;*/
/*}*/
.primary--text {
  color: white !important;
}
</style>
