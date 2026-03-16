/* =========================================================
   GAMEBOOST
   Главный JS:
   1) Переключение вкладок игр
   2) Смена темы сайта
   3) Открытие витрины бустеров
   4) Открытие модалки заказа
   5) Копирование заявки
   6) Полное переключение языка RU / KZ
   ========================================================= */

/* =========================
   УДОБНЫЕ СЕЛЕКТОРЫ
   ========================= */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

/* =========================
   DOM-ЭЛЕМЕНТЫ
   ========================= */
const tabs = $$(".game-tab");
const sections = $$(".game-section");
const promoBuy = $("#promoBuy");
const langToggle = $("#langToggle");

const orderOverlay = $("#orderOverlay");
const orderClose = $("#orderClose");
const boosterList = $("#boosterList");
const bigService = $("#bigService");
const bigGame = $("#bigGame");
const bigGameImg = $("#bigGameImg");
const orderTitleTop = $(".order-title");
const orderTableHead = $(".order-table-head");

const modalOverlay = $("#modalOverlay");
const modalClose = $("#modalClose");
const modalTitle = $(".modal-title");
const orderGame = $("#orderGame");
const orderService = $("#orderService");
const orderBooster = $("#orderBooster");
const orderPrice = $("#orderPrice");
const orderNick = $("#orderNick");
const orderNote = $("#orderNote");
const copyBtn = $("#copyOrder");
const copyHint = $("#copyHint");
const modalLabels = $$(".modal-label");

/* =========================
   ДАННЫЕ
   ========================= */
const THEME_BY_SECTION = {
  "game-wt": "theme-wt",
  "game-wot": "theme-wot",
  "game-cs2": "theme-cs2",
  "game-dota": "theme-dota"
};

const GAME_IMAGE = {
  "War Thunder": "https://warthunder.com/i/opengraph-wt.jpg",
  "World of Tanks": "https://worldoftanks.eu/static/6.13.1_5ba0d8/wotp_static/img/download_game/frontend/scss/img/sharing.jpg",
  "CS2": "https://csmarket.gg/blog/wp-content/uploads/2024/07/counter-strike-2.webp",
  "Dota 2": "https://cdn.steamstatic.com/apps/dota2/images/dota2_social.jpg"
};

/* 
   У каждого бустера теперь 2 языка:
   descRu / descKz
   reviewsRu / reviewsKz
*/
const BOOSTERS_BY_GAME = {
  "War Thunder": [
    {
      name: "EagleBoost",
      price: "599 ₽",
      rating: 4.8,
      reviewsCount: 126,
      descRu: "Быстрая и аккуратная прокачка техники без риска. Играю на результат, не на нервы.",
      descKz: "Техниканы тәуекелсіз, жылдам және ұқыпты дамытамын. Нәтижеге жұмыс істеймін.",
      reviewsRu: ["Очень быстро!", "Сделал чисто и без вопросов.", "Рекомендую 👍"],
      reviewsKz: ["Өте жылдам!", "Таза әрі сапалы жасады.", "Ұсынамын 👍"]
    },
    {
      name: "SkyAce",
      price: "799 ₽",
      rating: 4.6,
      reviewsCount: 88,
      descRu: "Премиум-скорость: оптимальные режимы фарма и прокачки, без лишних боёв.",
      descKz: "Премиум жылдамдық: фарм мен прокачканың тиімді режимдері, артық шайқассыз.",
      reviewsRu: ["Скорость топ.", "Всегда на связи.", "Прокачал за вечер!"],
      reviewsKz: ["Жылдамдығы күшті.", "Әрқашан байланыста.", "Бір кеште дамытты!"]
    },
    {
      name: "TankPilot",
      price: "999 ₽",
      rating: 4.9,
      reviewsCount: 203,
      descRu: "Хардкорный буст: беру сложные ветки и задачи. Подходит для тех, кому нужен максимум.",
      descKz: "Қиын тармақтар мен тапсырмаларға арналған хардкор буст. Максимум нәтиже керек адамдарға.",
      reviewsRu: ["Лучший бустер.", "Сделал даже то, что я сам не мог.", "Идеально!"],
      reviewsKz: ["Ең мықты бустер.", "Мен істей алмағанды да жасады.", "Керемет!"]
    }
  ],

  "World of Tanks": [
    {
      name: "SteelFox",
      price: "699 ₽",
      rating: 4.7,
      reviewsCount: 91,
      descRu: "Поднимаю эффективность и фармлю ресурсы. Аккуратная игра + тактика.",
      descKz: "Тиімділікті көтеремін және ресурстар фармын жасаймын. Ұқыпты ойын + тактика.",
      reviewsRu: ["WN8 вырос!", "Отличный сервис.", "Быстро и честно."],
      reviewsKz: ["WN8 өсті!", "Өте жақсы сервис.", "Жылдам әрі адал."]
    },
    {
      name: "HeavyHand",
      price: "899 ₽",
      rating: 4.5,
      reviewsCount: 64,
      descRu: "Беру тяжелые танки и сложные бои. Прокачка ветки без провалов.",
      descKz: "Ауыр танктер мен қиын шайқастарды аламын. Тармақты тұрақты дамытамын.",
      reviewsRu: ["Норм цена/качество.", "Сделал всё как надо.", "Стабильно."],
      reviewsKz: ["Баға/сапа жақсы.", "Бәрін дұрыс жасады.", "Тұрақты."]
    },
    {
      name: "Wn8Master",
      price: "1199 ₽",
      rating: 4.9,
      reviewsCount: 154,
      descRu: "Фокус на стату: WN8, средний урон, победы. Только эффективные катки.",
      descKz: "Статистикаға бағытталған: WN8, орташа урон, жеңістер. Тек тиімді ойындар.",
      reviewsRu: ["Стата выросла заметно.", "Профессионально.", "Топ."],
      reviewsKz: ["Статистика қатты өсті.", "Кәсіби деңгейде.", "Топ."]
    }
  ],

  "CS2": [
    {
      name: "AimCoach",
      price: "799 ₽",
      rating: 4.6,
      reviewsCount: 73,
      descRu: "Уверенный ап звания: дисциплина, тимплей и грамотные размены.",
      descKz: "Рангты сенімді көтеру: тәртіп, командалық ойын және дұрыс размен.",
      reviewsRu: ["Апнул быстро.", "Не токсик.", "Стабильный буст."],
      reviewsKz: ["Жылдам көтерді.", "Токсик емес.", "Тұрақты буст."]
    },
    {
      name: "PremierUp",
      price: "999 ₽",
      rating: 4.7,
      reviewsCount: 120,
      descRu: "Ап Premier по плану: выбираю карты и темп игры под цель рейтинга.",
      descKz: "Premier-ді жоспар бойынша көтеру: карта мен темп рейтинг мақсатына сай таңдалады.",
      reviewsRu: ["Рейтинг поднял.", "Всегда на связи.", "Круто."],
      reviewsKz: ["Рейтинг өсті.", "Әрқашан байланыста.", "Керемет."]
    },
    {
      name: "ClutchPro",
      price: "1299 ₽",
      rating: 4.9,
      reviewsCount: 98,
      descRu: "Для тех, кому нужен уверенный результат: сильный клатч и контроль игры.",
      descKz: "Нәтиже керек адамдарға: күшті клатч және ойынды бақылау.",
      reviewsRu: ["Монстр.", "Лёгкие победы.", "Лучший!"],
      reviewsKz: ["Монстр.", "Жеңістер оңай келді.", "Ең жақсысы!"]
    }
  ],

  "Dota 2": [
    {
      name: "MMRWizard",
      price: "899 ₽",
      rating: 4.8,
      reviewsCount: 142,
      descRu: "Ап MMR без суеты: правильные пики, тайминги и макро.",
      descKz: "MMR-ді асықпай көтеру: дұрыс пиктер, таймингтер және макро.",
      reviewsRu: ["MMR растёт.", "Крутая игра.", "Советы полезные."],
      reviewsKz: ["MMR өсіп жатыр.", "Ойыны мықты.", "Кеңестері пайдалы."]
    },
    {
      name: "CarryKing",
      price: "1099 ₽",
      rating: 4.7,
      reviewsCount: 77,
      descRu: "Буст через керри-позиции: стабильный фарм и завершение игр.",
      descKz: "Керри позициясы арқылы буст: тұрақты фарм және ойынды аяқтау.",
      reviewsRu: ["Победы пошли.", "Сильно.", "Рекомендую."],
      reviewsKz: ["Жеңістер келе бастады.", "Өте мықты.", "Ұсынамын."]
    },
    {
      name: "MacroSensei",
      price: "1399 ₽",
      rating: 4.9,
      reviewsCount: 210,
      descRu: "Премиум-буст: контроль карты, коллы и максимально умная дота.",
      descKz: "Премиум буст: картаны бақылау, коллдар және өте ақылды дота.",
      reviewsRu: ["Жёсткий буст.", "Чётко по макро.", "Огонь!"],
      reviewsKz: ["Күшті буст.", "Макро өте жақсы.", "От!"]
    }
  ]
};

/* =========================
   ПЕРЕВОДЫ
   ========================= */
const translations = {
  ru: {
    langBtn: "ҚАЗ",

    title1: "Популярное и рекомендуемое",
    title2: "Наши лучшие бустеры",
    title3: "Услуги по играм",

    promo: "Покупка",
    gameName: "Закажите буст аккаунта в играх",

    sectionDesc: "Выберите услугу и оформите заказ",

    serviceTitles: [
      "Прокачка техники",
      "Фарм серебра",
      "Боевой пропуск",

      "Прокачка ветки",
      "Поднятие статистики",
      "Фарм кредитов",

      "Поднятие Premier",
      "Поднятие звания",
      "Калибровка",

      "Поднятие MMR",
      "Поднятие ранга",
      "Герой-пул тренинг"
    ],

    serviceButtons: "Заказать",

    boosterHoverLabels: {
      game: "Игра:",
      rank: "Ранг:",
      bestMoment: "Лучший момент:"
    },

    topBoosterTexts: [
      ["DOTA2", "Immortal", "2 МИСА С МЭМКАБЭ 🔥"],
      [null, null, "3 двойных сырных лавашей за катку"],
      [null, null, "Самая красивая мама"]
    ],

    orderTopLabel: "Услуга",
    tableBooster: "Бустер",
    tablePrice: "Цена",

    modalTitle: "Оформление заказа",
    modalGame: "Игра:",
    modalService: "Услуга:",
    modalBooster: "Бустер:",
    modalPrice: "Цена:",
    modalNick: "Ваш никнейм:",
    modalNote: "Комментарий:",
    modalNickPlaceholder: "nickname",
    modalNotePlaceholder: "Что важно учесть?",
    copyBtn: "Скопировать заявку",
    copied: "Скопировано ✅",

    hoverRatingReviews: "отзывов",
    hoverService: "Услуга:",
    hoverPrice: "Цена:",
    hoverLastReviews: "Последние отзывы:"
  },

  kz: {
    langBtn: "РУС",

    title1: "Танымал және ұсынылатын",
    title2: "Біздің үздік бустерлер",
    title3: "Ойын қызметтері",

    promo: "Сатып алу",
    gameName: "Ойын аккаунттарына бустқа тапсырыс беріңіз",

    sectionDesc: "Қызметті таңдап, тапсырыс беріңіз",

    serviceTitles: [
      "Техниканы дамыту",
      "Күміс фармы",
      "Жауынгерлік пропуск",

      "Бұтақты дамыту",
      "Статистиканы көтеру",
      "Кредит фармы",

      "Premier рейтингін көтеру",
      "Дәрежені көтеру",
      "Калибровка",

      "MMR көтеру",
      "Ранг көтеру",
      "Герой-пул тренингі"
    ],

    serviceButtons: "Тапсырыс беру",

    boosterHoverLabels: {
      game: "Ойын:",
      rank: "Ранг:",
      bestMoment: "Үздік сәт:"
    },

    topBoosterTexts: [
      ["DOTA2", "Immortal", "2 МИСА С МЭМКАБЭ 🔥"],
      [null, null, "Каткада 3 қос ірімшікті лаваш"],
      [null, null, "Ең әдемі мама"]
    ],

    orderTopLabel: "Қызмет",
    tableBooster: "Бустер",
    tablePrice: "Баға",

    modalTitle: "Тапсырысты рәсімдеу",
    modalGame: "Ойын:",
    modalService: "Қызмет:",
    modalBooster: "Бустер:",
    modalPrice: "Баға:",
    modalNick: "Сіздің никнейм:",
    modalNote: "Пікір:",
    modalNickPlaceholder: "nickname",
    modalNotePlaceholder: "Нені ескеру керек?",
    copyBtn: "Өтінімді көшіру",
    copied: "Көшірілді ✅",

    hoverRatingReviews: "пікір",
    hoverService: "Қызмет:",
    hoverPrice: "Баға:",
    hoverLastReviews: "Соңғы пікірлер:"
  }
};

/* =========================
   СОСТОЯНИЕ
   ========================= */
let selectedGame = "—";
let selectedService = "—";
let selectedBooster = "—";
let selectedPrice = "—";
let currentLang = "ru";

/* =========================
   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
   ========================= */
function escapeHtml(text = "") {
  return String(text).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function setThemeBySectionId(sectionId) {
  document.body.classList.remove(...Object.values(THEME_BY_SECTION));
  const themeClass = THEME_BY_SECTION[sectionId];
  if (themeClass) document.body.classList.add(themeClass);
}

function setActiveTab(sectionId) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.target === sectionId);
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function getTranslatedBoosterDesc(booster) {
  return currentLang === "kz" ? booster.descKz : booster.descRu;
}

function getTranslatedBoosterReviews(booster) {
  return currentLang === "kz" ? booster.reviewsKz : booster.reviewsRu;
}

/* =========================
   ВКЛАДКИ И ПРОКРУТКА
   ========================= */
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const id = tab.dataset.target;
    setActiveTab(id);
    setThemeBySectionId(id);
    scrollToSection(id);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visibleSection) {
      setActiveTab(visibleSection.target.id);
    }
  },
  { threshold: [0.2, 0.35, 0.5, 0.7] }
);

sections.forEach((section) => observer.observe(section));

if (promoBuy) {
  promoBuy.addEventListener("click", () => {
    const activeTab = tabs.find((tab) => tab.classList.contains("active"));
    scrollToSection(activeTab ? activeTab.dataset.target : "game-wt");
  });
}

/* =========================
   ВИТРИНА БУСТЕРОВ
   ========================= */
function renderBoosterList(game, service) {
  const boosters = BOOSTERS_BY_GAME[game] || [];
  const t = translations[currentLang];

  boosterList.innerHTML = boosters.map((booster) => {
    const reviews = getTranslatedBoosterReviews(booster).slice(0, 3);

    return `
      <div class="order-row" data-booster="${escapeHtml(booster.name)}" data-price="${escapeHtml(booster.price)}">
        <div>${escapeHtml(booster.name)}</div>
        <div class="price-col">${escapeHtml(booster.price)}</div>

        <div class="booster-hover">
          <div class="bh-title">${escapeHtml(booster.name)}</div>

          <div class="bh-meta">
            <span>⭐ ${escapeHtml(booster.rating)}</span>
            <span>(${escapeHtml(booster.reviewsCount)} ${escapeHtml(t.hoverRatingReviews)})</span>
          </div>

          <div class="bh-desc">${escapeHtml(getTranslatedBoosterDesc(booster))}</div>

          <div class="bh-service">
            <div><b>${escapeHtml(t.hoverService)}</b> ${escapeHtml(service)}</div>
            <div><b>${escapeHtml(t.hoverPrice)}</b> ${escapeHtml(booster.price)}</div>
          </div>

          <div class="bh-reviews">
            <div class="bh-reviews-title">${escapeHtml(t.hoverLastReviews)}</div>
            <ul>
              ${reviews.map((review) => `<li>${escapeHtml(review)}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function openBigOrder(game, service) {
  selectedGame = game;
  selectedService = service;
  selectedBooster = "—";
  selectedPrice = "—";

  if (bigService) bigService.textContent = service;
  if (bigGame) bigGame.textContent = game;

  if (bigGameImg) {
    bigGameImg.src = GAME_IMAGE[game] || "";
    bigGameImg.alt = game;
  }

  renderBoosterList(game, service);

  if (orderOverlay) orderOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeBigOrder() {
  if (orderOverlay) orderOverlay.classList.add("hidden");
  document.body.style.overflow = "";
}

/* =========================
   МОДАЛКА ЗАКАЗА
   ========================= */
function openModal() {
  if (orderGame) orderGame.textContent = selectedGame;
  if (orderService) orderService.textContent = selectedService;
  if (orderBooster) orderBooster.textContent = selectedBooster;
  if (orderPrice) orderPrice.textContent = selectedPrice;

  if (modalOverlay) modalOverlay.classList.remove("hidden");
  if (copyHint) copyHint.classList.add("hidden");
}

function closeModal() {
  if (modalOverlay) modalOverlay.classList.add("hidden");
}

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const text = `Заявка на буст:
Игра: ${selectedGame}
Услуга: ${selectedService}
Бустер: ${selectedBooster}
Цена: ${selectedPrice}
Ник: ${orderNick?.value || "—"}
Комментарий: ${orderNote?.value || "—"}`;

    try {
      await navigator.clipboard.writeText(text);

      if (copyHint) {
        copyHint.classList.remove("hidden");
        copyHint.textContent = translations[currentLang].copied;
        setTimeout(() => copyHint.classList.add("hidden"), 1200);
      }
    } catch {
      alert("Не удалось скопировать заявку.");
    }
  });
}

/* =========================
   СОБЫТИЯ
   ========================= */
document.addEventListener("click", (event) => {
  const serviceButton = event.target.closest(".service-btn");
  if (serviceButton) {
    openBigOrder(serviceButton.dataset.game, serviceButton.dataset.service);
    return;
  }

  const boosterRow = event.target.closest(".order-row");
  if (boosterRow && boosterList.contains(boosterRow)) {
    $$(".order-row").forEach((row) => row.classList.remove("selected"));
    boosterRow.classList.add("selected");

    selectedBooster = boosterRow.dataset.booster || "—";
    selectedPrice = boosterRow.dataset.price || "—";

    openModal();
  }
});

if (orderClose) {
  orderClose.addEventListener("click", closeBigOrder);
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (orderOverlay) {
  orderOverlay.addEventListener("click", (event) => {
    if (event.target === orderOverlay) closeBigOrder();
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) closeModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeBigOrder();
    closeModal();
  }
});

/* =========================
   ПЕРЕВОД ВСЕГО САЙТА
   ========================= */
function applyLanguage(lang) {
  const t = translations[lang];

  /* обычные заголовки */
  const titles = $$(".title");
  if (titles[0]) titles[0].textContent = t.title1;
  if (titles[1]) titles[1].textContent = t.title2;
  if (titles[2]) titles[2].textContent = t.title3;

  /* верх */
  const gameName = $(".game-name");
  if (gameName) gameName.textContent = t.gameName;
  if (promoBuy) promoBuy.textContent = t.promo;
  if (langToggle) langToggle.textContent = t.langBtn;

  /* описания секций */
  const sectionTexts = $$(".section-head p");
  sectionTexts.forEach((text) => {
    text.textContent = t.sectionDesc;
  });

  /* названия услуг */
  const serviceTitles = $$(".service-title");
  serviceTitles.forEach((item, index) => {
    if (t.serviceTitles[index]) item.textContent = t.serviceTitles[index];
  });

  /* кнопки услуг */
  const serviceButtons = $$(".service-btn");
  serviceButtons.forEach((btn) => {
    btn.textContent = t.serviceButtons;
  });

  /* верхние всплывашки бустеров */
  const hoverTexts = $$(".hover-text");
  const labelSet = t.boosterHoverLabels;
  const dataSet = t.topBoosterTexts;

  hoverTexts.forEach((box, index) => {
    const data = dataSet[index];
    if (!data) return;

    if (index === 0) {
      box.innerHTML = `
        <p><b>${labelSet.game}</b> ${data[0]}</p>
        <p><b>${labelSet.rank}</b> ${data[1]}</p>
        <p><b>${labelSet.bestMoment}</b> ${data[2]}</p>
      `;
    } else {
      box.innerHTML = `
        <p><b>${labelSet.bestMoment}</b></p>
        <p>${data[2]}</p>
      `;
    }
  });

  /* большая витрина */
  if (orderTitleTop) orderTitleTop.textContent = t.orderTopLabel;

  if (orderTableHead) {
    const cols = orderTableHead.children;
    if (cols[0]) cols[0].textContent = t.tableBooster;
    if (cols[1]) cols[1].textContent = t.tablePrice;
  }

  /* если витрина уже открыта — перерисовать список */
  if (orderOverlay && !orderOverlay.classList.contains("hidden") && selectedGame !== "—" && selectedService !== "—") {
    renderBoosterList(selectedGame, selectedService);
  }

  /* модалка */
  if (modalTitle) modalTitle.textContent = t.modalTitle;

  const modalBodyParagraphs = $$(".modal-body p");
  if (modalBodyParagraphs[0]) modalBodyParagraphs[0].innerHTML = `<b>${t.modalGame}</b> <span id="orderGame">${selectedGame}</span>`;
  if (modalBodyParagraphs[1]) modalBodyParagraphs[1].innerHTML = `<b>${t.modalService}</b> <span id="orderService">${selectedService}</span>`;
  if (modalBodyParagraphs[2]) modalBodyParagraphs[2].innerHTML = `<b>${t.modalBooster}</b> <span id="orderBooster">${selectedBooster}</span>`;
  if (modalBodyParagraphs[3]) modalBodyParagraphs[3].innerHTML = `<b>${t.modalPrice}</b> <span id="orderPrice">${selectedPrice}</span>`;

  /* после innerHTML нужно заново обновить ссылки на span */
  const newOrderGame = $("#orderGame");
  const newOrderService = $("#orderService");
  const newOrderBooster = $("#orderBooster");
  const newOrderPrice = $("#orderPrice");

  if (newOrderGame) newOrderGame.textContent = selectedGame;
  if (newOrderService) newOrderService.textContent = selectedService;
  if (newOrderBooster) newOrderBooster.textContent = selectedBooster;
  if (newOrderPrice) newOrderPrice.textContent = selectedPrice;

  if (modalLabels[0]) modalLabels[0].textContent = t.modalNick;
  if (modalLabels[1]) modalLabels[1].textContent = t.modalNote;

  if (orderNick) orderNick.placeholder = t.modalNickPlaceholder;
  if (orderNote) orderNote.placeholder = t.modalNotePlaceholder;
  if (copyBtn) copyBtn.textContent = t.copyBtn;
  if (copyHint) copyHint.textContent = t.copied;
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "ru" ? "kz" : "ru";
    applyLanguage(currentLang);
  });
}

/* =========================
   СТАРТ
   ========================= */
setThemeBySectionId("game-wt");
setActiveTab("game-wt");
applyLanguage("ru");

if (orderOverlay) orderOverlay.classList.add("hidden");
if (modalOverlay) modalOverlay.classList.add("hidden"); 