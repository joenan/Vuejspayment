<template src="./request.html">

</template>
<style scoped>
.whitetext {
  color: white;
}
.exportbtn {
  height: 26px;
}
.topDivider {
  margin-top: -7%;
}
.materialbadge {
  margin-top: -14px;
}
.modulename {
  margin-left: 30px;
  margin-top: -16px;
  padding: 0;
}
.addNew {
  height: 26px;
  margin-top: -74px;
  margin-left: 500px;
}
.recordsbadge {
  margin-left: 300px;
  margin-top: -41px;
  height: 18px;
}
.righticons {
  margin-top: -78px;
  float: right;
}
.righticonsbtn_settings {
  margin-right: -20px;
}
.righticonsbtn_refresh {
  margin-right: -20px;
}
.righticonsbtn_prin {
}
.righticons_deleteedit {
  margin-right: 20px;
  margin-top: -10px;
}

.reportTop {
  float: right;
  margin-top: -30px;
}
.reporticon {
  height: 26px;
}
.paymentinvoiceinfo {
  margin-top: -20px;
}
.editdeleteicon {
}
</style>

<script>
import {
  requestapi,
  itemlistapi,
  saveRequestMain,
  requestdetailListbyRequestmain,
  deleteRequestmain,
  deleteRequestDetail
} from '@/api/RequestAPI'

export default {
  data: () => ({
    newRequestDialog: false,
    pagination: {
      sortBy: 'remarks'
    },

    editClicked: false,
    editedIndex: -1,
    detailItemList: [],
    requestDetailResults: [],
    RequestdetaildtoList: [],
    requestdetailEditList: [],
    logList: [],
    selected: [],
    search: '',
    rate: '',
    editedTable: [],

    Requestmaindto: {
      daterequested: new Date(),
      dategiven: null,
      remarks: '',
      requestststatus: 'Pending',
      lastmodified: new Date(),
      issuebyid: null,
      issuebyname: '',
      documentsList: [],
      requestedbyid: { userid: 201 },
      requestlogsList: [],
      status: 'Pending',
      requestdetailList: []
    },
    Requestdetail: {
      qtyrequest: 0.0,
      qtygiven: 0.0,
      amountrequest: 0.0,
      amountgiven: 0.0,
      datecreated: new Date(),
      lastmodified: new Date(),
      itemid: null
    },
    requestlog: {
      comments: 'New Record Added',
      datecomments: new Date(),
      userid: { userid: 201 }
    },
    headers: [
      {
        text: 'Remarks',
        align: 'left',
        value: 'remarks'
      },
      { text: 'Request Status', value: 'requestststatus' }
    ],
    dialog: false,
    dialogTable: [
      { text: 'Item Requested', align: 'left', value: 'description' },
      { text: 'Quantity', value: 'qtyrequest' },
      { text: 'Date', value: 'datecreated' },
      { text: 'Status', value: 'status' }
    ]
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },
  mounted () {
    this.loadRequestResult()
    this.loadItemsList()
  },
  methods: {

    onItemsListSelected: function (ev) {
      this.rate = ev.cost
      this.Requestdetail.amountrequest = this.Requestdetail.qtyrequest * this.rate
    },

    onQuantityInputed: function (ev) {
      this.Requestdetail.amountrequest = ev * this.rate
    },

    editItem: function (item) {
      // // this.editedIndex = this.RequestdetaildtoList.indexOf(item)
      // // this.Requestdetail = Object.assign({}, item)
      // console.log(this.item)
      console.log('editItemClicked')
    },

    saveAll: function () {
      if (this.editClicked === false) {
        this.Requestmaindto.requestdetailList = this.RequestdetaildtoList
        this.Requestmaindto.requestlogsList.push(this.requestlog)
        return saveRequestMain(this.Requestmaindto).then(res => {
          console.log(res)
          this.clearAll()
        })
      } else {
        this.Requestmaindto.requestdetailList = this.RequestdetaildtoList
        // this.Requestmaindto.requestlogsList.push(this.requestlog)
        return saveRequestMain(this.Requestmaindto).then(res => {
          console.log(res)
          this.clearAll()
        })
      }
    },
    addToRequestdetails: function () {
      this.RequestdetaildtoList.push(this.Requestdetail)
      // console.log(this.RequestdetaildtoList)
      this.clearInputFields()
    },
    clearAll () {
      this.RequestdetaildtoList = []
      this.Requestdetail = {}
      this.rate = 0.0
    },
    clearInputFields: function () {
      this.Requestdetail = {}
      this.rate = 0.0
    },
    openEditDialog: function () {
      this.editClicked = true
      this.editedIndex = this.requestDetailResults.indexOf(this.selected[0])
      this.Requestmaindto = Object.assign({}, this.selected[0])

      return requestdetailListbyRequestmain(this.selected[0].id).then(res => {
        this.RequestdetaildtoList = res
        console.log(res)

        // this.Requestdetail.qtyrequest = res['0'].requestdetailsList.qtyrequest

        this.newRequestDialog = true
      })
    },

    cancelRequest: function () {

    },
    duplicateRequest: function () {
      if (confirm('Are you sure to duplicate selected Record?')) {
        this.Requestmaindto = Object.assign({}, this.selected[0])

        return requestdetailListbyRequestmain(this.selected[0].id).then(res => {
          this.Requestmaindto.requestdetailList = res
          this.Requestmaindto.requestlogsList.push(this.requestlog)
          this.Requestmaindto.id = null
          // console.log(this.Requestmaindto)

          return saveRequestMain(this.Requestmaindto).then(res => {
            this.loadRequestResult()
          })
        })
      }
    },

    closeRequest: function () {
      if (confirm('Are you sure to Close selected Record?')) {
        this.Requestmaindto = Object.assign({}, this.selected[0])

        return requestdetailListbyRequestmain(this.selected[0].id).then(res => {
          this.Requestmaindto.requestdetailList = res
          this.Requestmaindto.requestlogsList.push(this.requestlog)
          this.Requestmaindto.requestststatus = 'Closed'
          // console.log(this.Requestmaindto)

          return saveRequestMain(this.Requestmaindto).then(res => {
            this.loadRequestResult()
          })
        })
      }
    },

    removeRecord: function () {
      if (confirm('Are you sure to delete selected Record?')) {
        const index = this.requestDetailResults.indexOf(this.selected['0'])
        this.requestDetailResults.splice(index, 1)
        return deleteRequestmain(this.selected[0].id).then(res => {})
      }
    },

    removeDetailRecord: function (id) {
      const index = this.RequestdetaildtoList.indexOf(id)
      confirm('Are you sure you want to delete this item?') &&
        this.RequestdetaildtoList.splice(index, 1)
      return deleteRequestDetail(id).then(res => {})
    },

    changeDetailRecord: function (item) {
      this.editedIndex = this.RequestdetaildtoList.indexOf(item)
      this.Requestdetail = Object.assign({}, item)
    },

    loadRequestResult () {
      return requestapi().then(res => {
        this.requestDetailResults = res
      })
    },
    loadItemsList () {
      return itemlistapi().then(res => {
        this.detailItemList = res
      })
    },
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.results.slice()
    },

    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    initialize () {
      this.dialogRequestdetaildtoList = []
    },

    editItem (item) {
      this.editedIndex = this.dialogRequestdetaildtoList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.RequestdetaildtoList.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.RequestdetaildtoList.splice(index, 1)
    },

    close () {
      this.newRequestDialog = false
      this.RequestdetaildtoList = []
      this.Requestdetaildto = {}
      this.rate = 0.0
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(
          this.requestdetailList[this.editedIndex],
          this.Requestdetaildto
        )
      } else {
        this.requestdetailList.push(this.Requestdetaildto)
      }
      // this.close()
    }
  }
}
</script>
