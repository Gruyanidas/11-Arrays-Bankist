'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const account = accounts.find(acc => acc.owner === 'Jessica Davis'); //VAZNO using a find method
console.log(account);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//NASLOV ACTUALL CODE

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = ''; //VAZNO Ceo kontejner se 'cisti' od starih vrednosti akounta
  const movs = sort ? movements.slice().sort((a,b) => a-b) : movements;
  
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__date">3 days ago</div>
<div class="movements__value">${Math.abs(mov)}€</div>
</div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html); //VAZNO metod za ubacivanje elementa u HTML (MDN DOKUMENTACIJA)
  });
};

//event handler
let currentAccount; //VAZNO jer ce nam trebati i za kasnije npr za transfer novca

btnLogin.addEventListener(
  'click',
  function (
    //VAZNO prevent form from submiting
    event
  ) {
    event.preventDefault();
    currentAccount = accounts.find(
      acc => acc.username === inputLoginUsername.value
    );

    inputTransferAmount.value = inputTransferTo.value = '';

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
      labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner.split(' ')[0]
      }`;

      containerApp.style.opacity = 100;
      //VAZNO clearing input fields uppon loggin
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();

      UIUpdater(currentAccount);
    }
  }
);

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault(); //VAZNO svaki put kada radimo sa form
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('Transfer valid');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    UIUpdater(currentAccount);
  }
});

// displayMovement(account3.movements);
//Poziv funkcije

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((ak, cur) => ak + cur, 0);
  labelBalance.textContent = `${acc.balance}€`; //labelBalance je element za prikaz iz html
};

// calcDisplayBalance(account4.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((ak, cur) => ak + cur, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((ak, cur) => ak + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * acc.interestRate) / 100)
    .filter(n => n >= 1)
    .reduce((ak, cur) => ak + cur, 0); //VAZNO drugi filter je da banka placa interest samo za deposite vece od 1
  labelSumInterest.textContent = `${Math.round(interest)}€`;
}; //VAZNO najbolje je chain method sa metodima koji ne menjaju postojeci red vec prave novi kao map i filter

// calcDisplaySummary(account3.movements);

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);
const UIUpdater = function (acc) {
  displayMovement(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //adding movementt
    currentAccount.movements.push(amount);

    //update UI
    UIUpdater(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //delete account
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Enter your user name and password to login!`;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function(event){
  event.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted; //znaci nikad se ne bi setio sam...
})
// console.log(containerMovements.innerHTML); //VAZNO innerHTML je ovo sto smo napravili unutar kontejnera
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////
const accountMovements = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((ak, cur) => ak + cur, 0);

//VAZNO flat + map => better performance

const accountMovements2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((ak, cur) => ak + cur, 0);
//VAZNO moze da bude problem kada nam treba flat sa vecom dubinom jer flatmap() ide samo jedan nivo po dubini
