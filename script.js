const form = document.querySelector("form");
const section = document.querySelector(".section");
const inputValue = document.getElementById("input");

const API_KEY = "coinrankingd006df4c454c3c2538d6cc7f1cc0ba12762d1bb9d91194dc";
const URL = `https://api.coinranking.com/v2/coins?api_key=${API_KEY}`;

let coins = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getCoin();
});

const getCoin = async () => {
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error("Bulunamadi.");
    }
    const data = await res.json();
    domaYaz(data);
    inputValue = "";
    // console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const domaYaz = (veri) => {
  console.log(veri.data.coins);

  let obj = veri.data.coins.filter((element) => {
    return (
      element.name.toLowerCase().trim() ===
        inputValue.value.toLowerCase().trim() ||
      element.symbol.toLowerCase().trim() ===
        inputValue.value.toLowerCase().trim()
    );
  });

  //? ayni coinin tekrar tekrar girilmemesi icin onlem aldik.
  if (obj.length) {
    if (coins.includes(obj[0].symbol || coins.push(obj[0].name))) {
      hata2();
    } else {
      coins.push(obj[0].symbol);
      coins.push(obj[0].name);
      table(obj[0]);
    }
  } else {
    hata();
  }
};
//*========== ASAGIDAKI KODLAR FONKSIYONLARA AIT =============
const hata2 = () => {
  section.innerHTML = `<h2>Ayni degeri daha once girmis bulunmaktasiniz.Farkli bir deger girmeniz gerekir</h2>`;
  section.style.color = "pink";
  setTimeout(() => {
    section.innerHTML = "";
  }, 4000);
  inputValue.value = "";
  inputValue.focus();
};

const hata = () => {
  section.innerHTML = `<h2>Coin ismini dogru yazdiginizdan emin misiniz?</h2>`;
  section.style.color = "red";
  setTimeout(() => {
    section.innerHTML = "";
  }, 3000);
  inputValue.value = "";
  inputValue.focus();
};

const table = (obj) => {
  const coins = document.querySelector(".coins");
  coins.innerHTML += `
  <figure class="coin">
    <figcaption class="coin-name"> 
        <p class="coin-temp">${obj.name}<sup>${obj.symbol}</sup></p>
        <p>$ ${obj.price}</p>
        <img class="coin-icon" src=${obj.iconUrl} alt="">
    </figcaption>
    <sup id="supchange">- ${obj.change} %</sup>
  </figure>
  `;
  inputValue.value = "";
  inputValue.focus();
};

//? alternative line
// async function getCoin() {

// }
