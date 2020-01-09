class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  // START: submit budget section:
  submitting() {
    console.log('Start submitting this number');
    const valueIn = this.budgetInput.value;
    console.log('Start submitting this number, the input value is'
      + valueIn);

    if (valueIn === '' || valueIn < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>Value cannot be negative or empty</p>`;

      const self1 = this;

      setTimeout(function () {
        self1.budgetFeedback.classList.remove('showItem');
      }, 3000)

    } else {
      this.budgetAmount.textContent = valueIn;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }
  // END: submit budget section

  // S: submitting expense
  submittingExpense() {
    var expenseNameIn = this.expenseInput.value;
    var expenseNumIn = parseInt(this.amountInput.value);
    console.log('adding new expense name is ' + expenseNameIn +
      ', the expense amount is:' + expenseNumIn);

    if (expenseNameIn === '' || expenseNumIn === '' || expenseNumIn < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>Input not valid</p>`

      var self2 = this;
      setTimeout(function () {
        self2.expenseFeedback.classList.remove('showItem');
      }, 5000);
    }
    this.expenseInput.value = '';
    this.amountInput.value = '';

    var currentExpense = {
      name: expenseNameIn,
      amount: expenseNumIn,
      id: this.itemID
    }

    this.itemID++;
    this.itemList.push(currentExpense);
    this.addExpense(currentExpense);
    this.showBalance();


  }
  // E: submitting expense


  addExpense(expense) {
    var div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.name}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
    `;

    this.expenseList.appendChild(div);
  }


  showBalance() {
    console.log('showing balance now...');
    var expense1 = this.totalExpense();
    var currentBudget = parseInt(this.budgetAmount.textContent);
    var currentTotal = currentBudget - expense1;
    this.balanceAmount.textContent = currentTotal;

    if (currentTotal < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    } else if (currentTotal > 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    } else {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    }
  }

  totalExpense() {
    var total2 = 0;

    if (this.itemList.length > 0) {
      total2 = this.itemList.reduce(function (accu, curr) {

        console.log(`total is ${accu}, current is ${curr.amount}`);
        accu = accu + curr.amount;
        return accu;
      }, 0);
      console.log('the total expense is ' + total2);
    }

    this.expenseAmount.textContent = total2;
    return total2;
  }



  // S:Editing and deleting expenses
  editingExpense(element) {
    var id3 = parseInt(element.dataset.id);
    var parent3 = element.parentElement.parentElement.parentElement;

    this.expenseList.removeChild(parent3);
    var expense3 = this.itemList.filter(function (item) {
      return item.id === id3;
    });


    this.expenseInput.value = expense3[0].name;
    this.amountInput.value = expense3[0].amount;
    var tempList3 = this.itemList.filter(function (item2) {
      return item2.id !== id3;
    });

    this.itemList = tempList3;
    this.showBalance();

  }


  removingExpense(element) {
    var id4 = parseInt(element.dataset.id);
    var parent4 = element.parentElement.parentElement.parentElement;

    this.expenseList.removeChild(parent4);

    var tempList3 = this.itemList.filter(function (item2) {
      return item2.id !== id4;
    });

    this.itemList = tempList3;
    this.showBalance();
  }
  // E:Editing and deleting expenses

}





// Start: Event Listners
function eventListners() {
  const budgetForm1 = document.getElementById("budget-form");
  const expenseForm1 = document.getElementById("expense-form");
  const expenseList1 = document.getElementById("expense-list");

  // New instance of UI CLASS

  const ui1 = new UI();

  // S:Bugdet form submit
  budgetForm1.addEventListener('submit', function (event) {

    event.preventDefault();
    ui1.submitting();

  })
  // E:Bugdet form submit


  // S:Expense form submit
  expenseForm1.addEventListener('submit', function (event) {

    event.preventDefault();
    ui1.submittingExpense();

  })
  // E:Expense form submit

  expenseList1.addEventListener("click", function (event) {
    if (event.target.parentElement.classList.contains('edit-icon')) {
      ui1.editingExpense(event.target.parentElement);
    } else if (event.target.parentElement.classList.contains('delete-icon')) {
      ui1.removingExpense(event.target.parentElement);
    }
  });

}


document.addEventListener('DOMContentLoaded', function () {
  eventListners();
})
