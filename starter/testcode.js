const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  

calcDisplaySummary = function (movements) {
    const incomes = movements.filter(mov => mov > 0).reduce((ak, cur) => ak + cur, 0);
    labelSumIn.textContent = `${incomes}€`;
    const out = movements.filter(mov => mov < 0).reduce((ak, cur) => ak + cur, 0);
    labelSumOut.textContent = `${out}€`;
  };

  calcDisplaySummary(account3.movements)
  