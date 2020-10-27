let value = prompt("Введите ИНН");

const controlNumbers = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0];

let dataPreparation = (data) => {
  let numbers = Array.from(data).map((el) => {
    return +el;
  });
  return numbers;
};

let gender = (data) => (data[8] % 2 == 0 ? "female" : "male");

let checkInn = (data, f) => {
  let inn = f(data);
  let controlSum = 0;

  if (inn.length == 10 && isFinite(data)) {
    for (let i = 0; i < inn.length - 1; i++) {
      controlSum += inn[i] * controlNumbers[i];
    }
  }

  (controlSum % 11) % 10 == inn[9] ? console.log(true) : console.log(false);

  console.log(gender(inn));
  
  console.log((controlSum % 11) % 10, inn[9]);
};
checkInn(value, dataPreparation);
