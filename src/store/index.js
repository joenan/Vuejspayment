import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from '../resources/resources'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    deleteResponse: {},
    departmentCategoryList: [],
    departmentList: [],
    institutionTypeList: [],
    bankList: [],
    UserCatalogue: {},
    UserResetCatalogue: {},
    UserSignupCatalogue: {},
    user: {
      userid: 201,
      institutionid: 201,
      name: 'Odofin Timothy Oyejide',
      contactemail: 'odofintimothy@comsoftltd.com',
      contactmobile: '07087654637',
      contactaddress: 'No 7 Shola Fatokun Street, Rock City Avenue Goshen Estate, Asero Abeokuta'
    },
    Banksdto: {},
    Departmentdto: {},
    Prmintinstitutiondto: {
      institutionid: 201,
      institutionname: 'Comsoft Nigeria Ltd.',
      contactemail: 'info@comsoftltd.com',
      contactmobile: '07087654637',
      contactdetails: 'No 7 Shola Fatokun Street, Rock City Avenue Goshen Estate, Asero Abeokuta',
      contactperson: 'Odofin Timothy Oyejide',
      weburl: 'http://www.comsoftltd.com',
      logo: 'cabsol.png',
      contactpersonemail: 'odofintimothy@comsofltd.com',
      contactpersonmobile: '08076364738',
      institutiontypeid: {},
    },
    itemsList:[]
  },
  mutations: {
    setItemsList(state, payload){
      this.itemsList=payload
    },
    setPrmintinstitutiondto(state, payload) {
      this.Prmintinstitutiondto = payload;
    },
    setuser(state, payload) {
      state.user = payload;
    },
    setDepartmentdto(state, payload) {
      state.Departmentdto = payload;
    },
    setBanksdto(state, payload) {
      state.Banksdto = payload;
    },
    setdeleteResponse(state, payload) {
      state.deleteResponse = payload;
    },
    setUserSignupCatalogue(state, payload) {
      state.UserSignupCatalogue = payload;
    },
    setUserResetCatalogue(state, payload) {
      state.UserResetCatalogue = payload;
    },
    setDepartmentCategoryList(state, payload) {
      state.departmentCategoryList = payload;
    },
    setDepartmentList(state, payload) {
      state.departmentList = payload;
    },
    setInstitutionTypeList(state, payload) {
      state.institutionTypeList = payload;
    },
    setBankList(state, payload) {
      state.bankList = payload;
    },
    setUserCatalogue(state, payload) {
      state.UserCatalogue = payload;
    }
  },
  actions: {
    updatePassport({commit}, id, filename) {
      HTTP.post(`/user/updatepassport?id=` + id + '&passport=' + filename)
        .then(response => {
          commit("setuser", response.data);
        })
        .catch(e => {
          let results = {respmessage: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    updateLogo({commit}, id, filename) {
      HTTP.post(`prmintinstitution/updatepassport?institutionid=` + id + '&logo=' + filename)
        .then(response => {
          commit("setPrmintinstitutiondto", response.data);
        })
        .catch(e => {
          let results = {respmessage: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    addItem({commit}, item) {
      HTTP.post(`/add/item`, item)
        .then(response => {
          let results = {respmessage: 'Success: Record Successfully Created'};
          commit("setdeleteResponse", results);

        })
        .catch(e => {
          let results = {respmessage: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    addBanks({commit}, bank) {
      HTTP.post(`/add/banks`, bank)
        .then(response => {
          let results = {respmessage: 'Success: Record Successfully Created'};
          commit("setdeleteResponse", results);

        })
        .catch(e => {
          let results = {respmessage: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    updateBanks({commit}, bank) {
      HTTP.put(`/update/banks`, bank)
        .then(response => {
          let results = {respmessage: 'Success: Record Successfully Updated'};
          commit("setdeleteResponse", results);

        })
        .catch(e => {
          let results = {respmessage: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    deleteBanks({commit}, id) {
      HTTP.delete(`/banks/` + id)
        .then(response => {
          commit("setdeleteResponse", response.data)
        })
        .catch(e => {
          let results = {respmessage: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    getBanks({commit}, institutionid) {
      HTTP.get(`/bank/list?institutionid=` + institutionid)
        .then(response => {
          commit("setBankList", response.data)
        })
        .catch(e => {
          let results = {respmessage: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },

    getDepartmentList({commit}, institutionid) {
      HTTP.get(`/departments?institutionid=` + institutionid)
        .then(response => {
          commit("setDepartmentList", response.data)
        })
        .catch(e => {
          let results = {respmessage: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },

    addDepartment({commit}, department) {
      HTTP.post(`/add/prmintsuborganisation`, department)
        .then(response => {
          let results = {respmessage: 'Success: Record Saved Successfully'};
          commit("setdeleteResponse", results);
        })
        .catch(e => {
          let results = {respmessage: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    updateDepartment({commit}, department) {
      HTTP.put(`/update/prmintsuborganisation`, department)
        .then(response => {
          let results = {respmessage: 'Success: Record Updated Successfully'};
          commit("setdeleteResponse", results);
        })
        .catch(e => {
          let results = {response: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    deleteDepartment({commit}, id) {
      HTTP.delete(`/prmintsuborganisation/` + id)
        .then(response => {
          commit("setdeleteResponse", response.data)
        })
        .catch(e => {
          let results = {response: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },

    registerNewUser({commit}, UserCatalogue) {
      HTTP.post(`/register/user`, UserCatalogue)
        .then(response => {
          commit("setUserSignupCatalogue", response.data)
        })
        .catch(e => {
          let results = {respmessage: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    updateUser({commit}, user) {
      HTTP.post(`/update/users`, user)
        .then(response => {
          commit("setuser", response.data.user);
          let results = {respmessage: 'Success'};
          commit("setdeleteResponse", results);
        })
        .catch(e => {
          let results = {response: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    updatePrmintinstitution({commit}, institution) {
      HTTP.post(`/update/prmintinstitution`, institution)
        .then(response => {
          commit("setPrmintinstitutiondto", response.data);
          let results = {respmessage: 'Success'};
          commit("setdeleteResponse", results);
        })
        .catch(e => {
          let results = {response: 'Error Occur Please Contact Administrator'};
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    getInstitutionTypeList({commit}, page, size) {
      HTTP.get(`/list/prmintinstitutiontype?page=` + page + '&size=' + size)
        .then(response => {
          commit("setInstitutionTypeList", response.data)
        })
        .catch(e => {
          let results = [{response: 'Error Occur Please Contact Administrator'}];
          commit("setInstitutionTypeList", results);
          console.log(e)
        })
    },

    getdepartmentCategoryList({commit}, page, size) {
      HTTP.get(`/list/prmintsuborganisationtype?page=` + page + '&size=' + size)
        .then(response => {
          commit("setDepartmentCategoryList", response.data)
        })
        .catch(e => {
          let results = [{response: 'Error Occur Please Contact Administrator'}];
          commit("setdeleteResponse", results);
          console.log(e)
        })
    },
    loginUser({commit}, username, password) {
      HTTP.get(`/login/user?username=` + username + '&password=' + password)
        .then(response => {
          commit("setuser", response.data.user);
          commit("setPrmintinstitutiondto", response.data.institution);
          commit("setUserCatalogue", response.data)
        })
        .catch(e => {
          let results = {response: 'Error Occur Please Contact Administrator'};
          commit("setUserCatalogue", results);
          console.log(e)
        })
    },
    resetPassword({commit}, email) {
      HTTP.put(`/user/password-reset?email=` + email)
        .then(response => {
          commit("setUserResetCatalogue", response.data)
        })
        .catch(e => {
          let results = {response: 'Error Occur Please Contact Administrator'};
          commit("setUserResetCatalogue", results);
          console.log(e)
        })
    },
    getItemsList({commit}, page, size) {
      HTTP.get(`/items/list?page=` + page + '&size=' + size)
        .then(response => {
          commit('setitemsList', response.data)
          console.log('Data: '+response.data);
        })
        .catch(e => {
          let results = [{response: 'Error Occur Please Contact Administrator'}];
          commit("setInstitutionTypeList", results);
          console.log(e)
        })
    },

  },
  getters: {
    Prmintinstitutiondto(state) {
      return state.Prmintinstitutiondto;
    },
    UserCatalogue(state) {
      return state.UserCatalogue;
    },
    UserResetCatalogue(state) {
      return state.UserResetCatalogue;
    },
    institutionTypeList(state) {
      return state.institutionTypeList;
    },
    user(state) {
      return state.user;
    },
    UserSignupCatalogue(state) {
      return state.UserSignupCatalogue;
    },
    bankList(state) {
      return state.bankList;
    },
    Banksdto(state) {
      return state.Banksdto;
    },
    deleteResponse(state) {
      return state.deleteResponse;
    },
    departmentList(state) {
      return state.departmentList;
    },
    departmentCategoryList(state) {
      return state.departmentCategoryList;
    },
    itemsList(state){
      return state.itemsList;
    }
  }
})
