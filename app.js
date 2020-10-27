// (2,4,10,3,5,9,4,6,8,0)
// 3237804599

let value = prompt("Введите ИНН");

const controlNumbers = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0];

let dataPreparation = (data) => {
  if (data.length === 10 && isFinite(data)) {
    let numbers = Array.from(data).map((el) => {
      return +el;
    });
    return numbers;
  } else {
    return;
  }
};

let checkInn = (data, f) => {
  let inn = f(data);
  let controlSum = 0;

  for (let i = 0; i < inn.length - 1; i++) {
    controlSum += inn[i] * controlNumbers[i];
  }

  (controlSum % 11) % 10 == inn[9] ? console.log(true) : console.log(false);
  console.log((controlSum % 11) % 10, inn[9]);
};
checkInn(value, dataPreparation);