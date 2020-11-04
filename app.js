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

// Функция определяюцая дату рождения

let defineDate = (innCode) => {
  let controlInnDate = new Date(1900, 0, 1, 0, 0, 0);

  innCode = innCode * 24 * 60 * 60 * 1000;

  let controlDate = innCode - controlInnDate.getTime() * -1;

  let date = new Date();
  date.setTime(controlDate);
  return date;
};

let birthDay = () => {
  let bDay = defineDate(innCodeForDate(value));
  return bDay.toLocaleDateString();
};

// Определяем количество полных лет

let defineFullYear = () => {
  let now = new Date(2020, 9, 03);
  let currentDate = defineDate(innCodeForDate(value));
  currentDate = now.getFullYear() - currentDate.getFullYear();
  return currentDate;
};

// Получаеь пятизначное число для даты

let innCodeForDate = (numbers) => {
  let innCode = "";
  for (let i = 0; i <= 4; i++) {
    innCode += numbers[i];
  }
  return innCode;
};

// Создаем обьект с результатом проверки

let createResultObject = () => {
  return {
    gender: gender(value),
    exist: checkInn(value, dataPreparation),
    birthDay: birthDay(),
    fullYear: defineFullYear(),
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
  <span>Пол: <strong>${result.gender}</strong></span>
  <span>Статус: <strong>существует</strong></span>
  <span>Дата рождения: <strong>${result.birthDay}</strong></span>
  <span>Полных лет: <strong>${result.fullYear}</strong></span>
  `)
    : (outputBox.innerHTML += `
  <span>Статус: <strong>не существует</strong></span>
  `);
};

outputData(result);
