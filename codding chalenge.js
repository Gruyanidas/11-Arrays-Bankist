let dogsJulia = [3, 5, 2, 12, 7];
let dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  let realJuliaDogs = dogsJulia.slice(1, 3);
  let united = realJuliaDogs.concat(dogsKate);
  united.forEach(function (year, index) {
    year > 3
      ? console.log(
          `Dog number ${index + 1} is an adult and is ${year} years old.`
        )
      : console.log(`Dog number ${index + 1} is still a puppy.`);
  });
};

checkDogs(dogsJulia, dogsKate);

