<template src="./paymentregister.html">

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
  paymentList,
  itemlistapi,
  subscriberList,
  accountList,
  savePaymentheader,
  deletePaymentHeader,
  paymentheaderReceipt,
  paymentdetaillistapi,
  paymentdetailListbyPaymentheader
} from '@/api/PaymentAPI'

export default {
  data: () => ({
    paymentDialog: false,
    payduedate: null,
    paydate: null,
    modal: false,
    duedatemenu: false,
    datemenu: false,
    rate: '',
    totalamount: 0.0,
    pagination: {
      sortBy: 'subscribername'
    },
    Paymentheaderdto: {
      paydate: null,
      payduedate: null,
      code: '',
      discount: '',
      amount: '',
      paid: '',
      linkremarks: '',
      thenkyoouremarks: '',
      referalremarks: '',
      balance: '',
      subscriberid: {},
      paymentdetailList: []
    },
    Paymentdetail: {
      cost: 0.0,
      quantity: 0.0,
      amount: 0.0,
      accountid: null,
      itemid: null
    },
    paymentdetailList: [],
    Vwinvoicesummarydto: {
      invoiceno: '',
      amount: '',
      amountdue: '',
      discount: '',
      paid: '',
      duedate: new Date(),
      paydate: '',
      subscribername: '',
      invoiceList: []
    },
    date: '',
    subscriberListItems: [],
    accountList: [],
    itemsList: [],
    selected: [],
    editedTable: [],
    search: '',
    paymentResults: [],
    dialogTableResult: [],
    formTitle: '',
    editedIndex: -1,
    itemIndex: -1,
    paymentHeaders: [
      { text: 'Name', align: 'left', value: 'remarks' },
      { text: 'Due Date', value: 'duedate' },
      { text: 'Invoice', value: 'invoiceno' },
      { text: 'Amount', value: 'amount' },
      { text: 'Discount', value: 'discount' },
      { text: 'Paid', value: 'paid' },
      { text: 'Balance', value: 'balance' }
    ],
    paymentDialogHeaders: [
      { text: 'Item', align: 'left', value: 'remarks' },
      { text: 'Quantity', value: 'duedate' },
      { text: 'Cost', value: 'invoiceno' },
      { text: 'Amount', value: 'amount' },
      { text: 'Account', value: 'discount' }
    ]
  }),

  created () {
    this.initialize()
  },
  created () {
    this.initialize()
  },

  mounted () {
    this.loadPaymentList()
    this.loadSubscriberList()
    this.loadItemsList()
    this.loadAccountList()
  },

  methods: {

    onItemsListSelected: function (ev) {
      this.Paymentdetail.cost = ev.cost
      this.Paymentdetail.amount = this.Paymentdetail.quantity * this.Paymentdetail.cost
    },

    onDiscountTyped: function (ev) {
      this.Paymentheaderdto.balance = this.Paymentheaderdto.paid - (this.Paymentheaderdto.amount - ev)
    },
    onPaidTyped: function (ev) {
      this.Paymentheaderdto.balance = ev - (this.Paymentheaderdto.amount - this.Paymentheaderdto.discount)
    },

    onQuantityInputed: function (ev) {
      this.Paymentdetail.amount = ev * this.Paymentdetail.cost
    },

    changeDetailRecord: function (item) {
      this.editedIndex = this.paymentdetailList.indexOf(item)
      this.Paymentdetail = Object.assign({}, item)
    },

    removeDetailRecord: function (id) {
      const index = this.paymentdetailList.indexOf(id)
      confirm('Are you sure you want to delete this item?') &&
        this.paymentdetailList.splice(index, 1)
      return deletePaymentHeader(id).then(res => {})
    },

    openEditDialog: function () {
      this.editedIndex = this.paymentResults.indexOf(this.selected[0])
      this.Paymentheaderdto = Object.assign({}, this.selected[0])

      return paymentdetailListbyPaymentheader(this.selected[0].id).then(res => {
        this.paymentdetailList = res
        this.Paymentheaderdto.linkremarks = res['0'].payheaderid.linkremarks
        this.Paymentheaderdto.paid = res['0'].payheaderid.paid
        this.Paymentheaderdto.amount = res['0'].payheaderid.amount
        this.Paymentheaderdto.discount = res['0'].payheaderid.discount
        this.Paymentheaderdto.thenkyoouremarks =
          res['0'].payheaderid.thenkyoouremarks
        this.Paymentheaderdto.referalremarks =
          res['0'].payheaderid.referalremarks
        this.Paymentheaderdto.duedate = res['0'].payheaderid.duedate
        this.Paymentheaderdto.payduedate = res['0'].payheaderid.payduedate
        // this.Paymentheaderdto.subscriberdid.firstname = res['0'].payheaderid.subscriberdid.subscriberdid.firstname
        // console.log(this.Paymentheaderdto.subscriberdid)
        this.paymentDialog = true
      })
    },

    printReport: function () {
      return window.open(
        'http://localhost:8080/invoicereports/reports/detailbyheaderid/' +
          this.selected[0].id,
        '_blank'
      )
    },

    removeRecord: function () {
      if (confirm('Are you sure to delete selected Record?')) {
        const index = this.paymentdetailList.indexOf(this.selected['0'])
        this.paymentResults.splice(index, 1)
        return deletePaymentHeader(this.selected[0].id).then(res => {})
      }
    },

    saveAll () {
      this.Paymentheaderdto.paymentdetailList = this.paymentdetailList

      return savePaymentheader(this.Paymentheaderdto).then(res => {
        console.log(res)
        this.loadPaymentList()
        this.initialize()
      })
    },
    addToPaymentdetails () {
      this.paymentdetailList.push(this.Paymentdetail)
      this.totalamount = this.totalamount + this.Paymentdetail.amount
      this.Paymentheaderdto.amount = this.totalamount
      this.clearAddDetails()
    },
    clearAddDetails () {
      this.Paymentdetail = {}
    },
    loadPaymentList () {
      return paymentList().then(res => {
        this.paymentResults = res
      })
    },
    loadAccountList () {
      return subscriberList().then(res => {
        this.accountList = res
      })
    },
    loadSubscriberList () {
      return subscriberList().then(res => {
        this.subscriberListItems = res
      })
    },
    loadItemsList () {
      return itemlistapi().then(res => {
        this.itemsList = res
      })
    },
    initialize () {
      this.paymentdetailList = []
      this.dialogRequestdetaildtoList = []
      this.Paymentheaderdto = {}
      this.Paymentdetail = {}
      this.totalamount = 0.0
    },

    close () {
      this.paymentDialog = false
      this.paymentdetailList = []
      this.Paymentheaderdto = {}
      // alert('Result: '+ this.$store.getters.user.userid)
      setTimeout(() => {}, 300)
      this.loadPaymentList()
      this.initialize()
    },

    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.paymentResults.slice()
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    }
  }
}
</script>
