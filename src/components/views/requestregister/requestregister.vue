<template src="./requestregister.html">

</template>

<style>
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
  margin-top: -45px;
  float: right;
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
.cardrow {
 display:table;
}
.cardcolumn1 {
  display: table-cell;
  float: left;
}
.cardcolumn2 {
  display: table-cell;
  width: 80%;
}
.cardcolumn3 {
  display: table-cell;
  float: right;
}
</style>

<script>
import { requestapi, itemlistapi, saveRequestMain } from '@/api/RequestAPI'

export default {
  data: () => ({
    pagination: {
      sortBy: 'remarks'
    },
    Requestmaindto: {
      documentsList: [],
      requestlogsList: [],
      status: 'Pending',
      requestdetailList: []
    },
    RequestdetaildtoList: [],
    Requestdetaildto: {
      qtyrequest: 0,
      qtygiven: 0,
      amountrequest: 0.0,
      amountgiven: 0.0,
      datecreated: new Date().toLocaleDateString(),
      itemid: {}
    },
    logList: [],
    requestlog: {
      comments: 'New Record Added',
      datecomments: new Date().toLocaleDateString(),
      userid: { userid: 201 }
    },
    selected: [],
    search: '',
    headers: [
      {
        text: 'Remarks',
        align: 'left',
        value: 'remarks'
      },
      { text: 'Request Status', value: 'requestststatus' }
    ],
    results: [],
    dialog: false,
    dialogheaders: [
      {
        text: 'Item Requested',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Quantity', value: 'calories' },
      { text: 'Date', value: 'fat' },
      { text: 'Status', value: 'carbs' }
    ],

    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
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
    saveAll: function () {
      this.Requestmaindto.requestdetailList = this.RequestdetaildtoList
      this.logList.push(this.requestlog)
      this.Requestdetaildto.requestlogsList = this.logList

      return saveRequestMain(this.Requestmaindto).then(res => {
        console.log(res)
      })
    },
    addToRequestdetails: function () {
      this.RequestdetaildtoList.push(this.Requestdetaildto)
      this.clearInputFields()
    },
    clearInputFields: function () {
      this.Requestdetaildto = {
        qtyrequest: 0,
        qtygiven: 0,
        amountrequest: 0.0,
        amountgiven: 0.0,
        datecreated: new Date().toLocaleDateString(),
        itemid: {}
      }
    },
    loadRequestResult () {
      return requestapi().then(res => {
        this.results = res
        // console.log(res)
      })
    },
    loadItemsList () {
      return itemlistapi().then(res => {
        this.resultList = res
        // console.log(res)
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
      this.dialog = false
      // alert('Result: '+ this.$store.getters.user.userid)
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
