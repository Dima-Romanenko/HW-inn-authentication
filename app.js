let value = prompt("Введите ИНН");

const controlNumbers = [-1, 5, 7, 9, 4, 6, 10, 5, 7];

// Формируем массив полученных данных и приводим элементы к числу

let dataPreparation = (data) => {
  let numbers = Array.from(data).map((el) => {
    return +el;
  });
  return numbers;
};

// Функция проверки пола владельца ИНН

let gender = (data) => (data[8] % 2 == 0 ? "Женский" : "Мужской");

// Функция проверки  кода ИНН по формуле

let checkInn = (data, f) => {
  let inn = f(data);
  let controlSum = 0;

  if (inn.length == 10 && isFinite(data)) {
    for (let i = 0; i < inn.length - 1; i++) {
      controlSum += inn[i] * controlNumbers[i];
    }
  } else {
    return false;
  }

  if ((controlSum % 11) % 10 == inn[9]) {
    return true;
  } else {
    return false;
  }
};

// Создаем обьект с результатом проверки

let createResultObject = () => {
  return {
    gender: gender(value),
    exist: checkInn(value, dataPreparation),
  };
};

let result = createResultObject();

// Вывод данных

let outputBox = document.querySelector(".answer");

let outputData = (res) => {
  outputBox.innerHTML = `
  <h3>Код ИНН - ${value}</h3>
  `;
  res.exist
    ? (outputBox.innerHTML += `
  <span>Пол: <strong>${result.gender}</strong></span></br>
  <span>Статус: <strong>существует</strong></span>
  `)
    : (outputBox.innerHTML += `
  <span>Статус: <strong>не существует</strong></span>
  `);
};

outputData(result);
