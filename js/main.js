let min;
let max;

let rdmNumber;
let rdmArray = [];
let rdmArrayLength;

let btfl;

let interval;
let scndInterval;
let clickCount = 0;

function random(min, max) {
  document.getElementById("min").disabled = true;
  document.getElementById("max").disabled = true;

  rdmNumber = 0;
  rdmArray = [];

  if (min > max) {
    alert("Минимальное значение больше максимального");
    document.getElementById("min").disabled = false;
    document.getElementById("max").disabled = false;
  } else if (min > 999 || max > 999 || min < 1 || max < 1) {
    alert(
      "Минимальное и максимальное значение должны быть меньше 1000 и больше 0"
    );
    document.getElementById("min").disabled = false;
    document.getElementById("max").disabled = false;
  } else {
    rdmNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    rdmArray.push(String(rdmNumber).split(""));
  }
}

function showRandomInt(min, max) {
  document.getElementById("result").innerHTML =
    Math.floor(Math.random() * (max - min + 1)) + min;
}

function showRandomIntFast(part1, min, max) {
  document.getElementById("result").innerHTML = `${
    Math.floor(Math.random() * (max - min + 1)) + min
  }${part1}`;
}

function clickHandler() {
  if (clickCount == 0) {
    min = Number(document.getElementById("min").value);
    max = Number(document.getElementById("max").value);

    random(min, max);

    rdmArrayLength = rdmArray[0].length;

    if (rdmArrayLength == 1) {
      interval = setInterval("showRandomInt(1, 9)", 20);
      clickCount++;
      return;
    } else if (rdmArrayLength == 2 && max < 99) {
      interval = setInterval("showRandomInt(10, max)", 20);
      clickCount++;
      return;
    } else if (rdmArrayLength == 2 && rdmNumber < 100) {
      interval = setInterval("showRandomInt(10, 99)", 20);
      clickCount++;
      return;
    } else if (rdmArrayLength == 3 && max < 999) {
      interval = setInterval("showRandomInt(100, max)", 20);
      clickCount++;
      return;
    } else if (rdmArrayLength == 3 && rdmNumber < 1000) {
      interval = setInterval("showRandomInt(100, max)", 20);
      clickCount++;
      return;
    }
  }

  if (clickCount == rdmArrayLength) {
    clickCount = 0;
    clearInterval(interval);
    document.getElementById("result").innerHTML = rdmNumber;
    document.getElementById("min").disabled = false;
    document.getElementById("max").disabled = false;
  }

  if (rdmArrayLength == 2 && clickCount == 1) {
    clickCount++;
    clearInterval(interval);

    if (max > 99) {
      interval = setInterval(
        "showRandomIntFast(`${rdmArray[0][1]}`, 1, 9)",
        20
      );
    } else
      interval = setInterval(
        "showRandomIntFast(rdmArray[0][1], 1, Number(max.toString().split('')[0]) )",
        20
      );
  }

  if (rdmArrayLength == 3 && clickCount == 1) {
    clickCount++;
    clearInterval(interval);
    interval = setInterval(
      "showRandomIntFast(rdmArray[0][2], 10, Number(max.toString().match(/.{1,2}/g)[0]))",
      20
    );
    return;
  }

  if (rdmArrayLength == 3 && clickCount == 2) {
    clickCount++;
    console.log(clickCount);
    clearInterval(interval);
    interval = setInterval(
      "showRandomIntFast(`${rdmArray[0][1]}${rdmArray[0][2]}`, 1, Number(max.toString().split('')[0]) )",
      20
    );
  }
}
