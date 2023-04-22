let dogsJulia = [3, 5, 2, 12, 7];
let dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  let realJuliaDogs = dogsJulia.slice(1, 3);
  let united = realJuliaDogs.concat(dogsKate);
  console.log(united);
  united.forEach(function (year, index) {
    year > 3
      ? console.log(
          `Dog number ${index + 1} is an adult and is ${year} years old.`
        )
      : console.log(`Dog number ${index + 1} is still a puppy.`);
  });
};

checkDogs(dogsJulia, dogsKate);

//NASLOV CChal 2

const calcAverageHumanAge = function (ages) {
  const toHumanAge = ages.map((n) => (n <= 2 ? 2 * n : 16 + n * 4));
  let reduced = toHumanAge.filter((n) => n > 18); //VAZNO zadrzi sve vece od 18
  console.log(reduced);
  const averageHumanYears = reduced.reduce(
    (ak, cur) => ak + cur / reduced.length,
    0
  );
  return averageHumanYears;
};
test1 = [5, 2, 4, 1, 15, 8, 3];
test2 = [16, 6, 10, 5, 6, 1, 4];
calcAverageHumanAge(test2);
