import drink from "./drink.js";

const depositBtn = document.querySelector(".btn-deposit"); // 입금 버튼
const returnBtn = document.querySelector(".btn-return"); // 거스름돈 반환 버튼
const getBtn = document.querySelector(".btn-get"); // 획득 버튼
const colaList = document.querySelector(".colaList"); // 콜라 버튼 리스트
const balance = document.querySelector(".balance"); // 잔액 요소
const total = document.querySelector(".total"); // 총 금액

let myMoney = 50000; // 기본 소지금
let balanceValue = 0; // 현재 잔액
let totalValue = 0; // 현재 총 금액

// 소지금 띄우기
let moneyDiv = document.querySelector(".my-money");
moneyDiv.insertAdjacentHTML(
  "beforeend",
  `<span class="current">${comma(myMoney)}</span>`
);
const moneySpan = document.querySelector(".current"); // 현재 소지금 요소

// 입금 버튼 동작
depositBtn.addEventListener("click", () => {
  let inpDeposit = parseInt(document.querySelector(".inp-deposit").value); // 입금액 읽어 오기
  let check = /^[0-9]+$/; // 숫자인지 확인

  if (check.test(inpDeposit)) {
    // 소지금과 잔액 계산
    myMoney -= inpDeposit;
    balanceValue += inpDeposit;
    // 현재 소지금과 잔액 값 띄우기
    balance.textContent = comma(balanceValue);
    moneySpan.textContent = comma(myMoney);

    // alert(`${inpDeposit} 원이 입금되었습니다.`);
  } else {
    alert("숫자로만 입력해 주세요.");
  }
  document.querySelector(".inp-deposit").value = "";
});

// 거스름돈 반환 버튼
returnBtn.addEventListener("click", () => {
  myMoney += balanceValue;
  balanceValue = 0;

  balance.textContent = comma(balanceValue);
  moneySpan.textContent = comma(myMoney);
});

// 콜라 버튼
colaList.addEventListener("click", (e) => {
  const { name, price, count } = e.target.dataset;
  const stagedUl = document.querySelector(".item-staged");

  if (balanceValue < 1000) {
    alert("잔액이 부족합니다!");
    return;
  } else if (drink[name].count == 0) {
    alert("품절된 음료입니다!");
  } else {
    if (drink[name].sellcount == 1) {
      stagedUl.insertAdjacentHTML(
        "afterbegin",
        `<li>
          <button class="btn-stagedItem" data-name=${name} data-price=${price} data-count=${drink[name].sellcount}>
          <img
            src="./src/images/${name}.png"
            class="img-item"
            alt=""
          />
          <strong class="colaName">${name}</strong>
          <span class="countNum">1</span>
        </button>
      </li>`
      );
    } else if (drink[name].sellcount > 1) {
      const countNum = document.querySelector(".countNum");
      countNum.textContent = drink[name].sellcount;
    }
  }
  balanceValue -= drink[name].price;
  balance.textContent = comma(balanceValue);
  drink[name].count--;
  drink[name].sellcount++;
});

// 음료 획득 버튼
getBtn.addEventListener("click", (e) => {
  const getItemUl = document.querySelector(".cont-get");
  const stagedUl = document.querySelector(".item-staged");

  for (let i = 0; i < stagedUl.childNodes.length; i++) {
    const { name, price } = e.target.dataset;
    getItemUl.insertAdjacentHTML(
      "afterbegin",
      `<li>
        <button class="btn-stagedItem" data-name=${name} data-price=${price}>
          <img
            src="./src/images/${name}.png"
            class="img-item"
            alt=""
          />
          <strong class="colaName">${name}</strong>
          <span class="countNum">${drink[name].sellcount}</span>
        </button>
      </li>`
    );
  }
});

// 콤마 표시 함수
function comma(x) {
  let num = x.toString().split("").reverse();
  for (let i = 0; i < num.length; i++) {
    if (i % 4 == 3) {
      num.splice(i, 0, ",");
    }
  }
  return num.reverse().join("");
}
