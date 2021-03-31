const projectBort = {};
//For the game mechanic drop down.
projectBort.optionsArray = [
  {
    value: "Betting",
    mechId: "3tuJiW3pps",
  },
  {
    value: "Campaign",
    mechId: "xuphiSlrxI",
  },
  {
    value: "Action",
    mechId: "Bc7R8pLoGk",
  },
  {
    value: "Network and Route Building",
    mechId: "ohABM4GjbC",
  },
  {
    value: "Player Elimination",
    mechId: "BGrhzIN69D",
  },
  {
    value: "Race",
    mechId: "qZx4PEzKKz",
  },
  {
    value: "Trading",
    mechId: "AVY6EvSQTP",
  },
  {
    value: "Cooperative play",
    mechId: "9mNukNBxfZ",
  },
  {
    value: "Acting",
    mechId: "n1GtBt35Rd",
  },
  {
    value: "Deduction",
    mechId: "GsNGxZFNCK",
  },
];

projectBort.api = "https://api.boardgameatlas.com/api/search?";
projectBort.clientID = "b8a4fHq3xL";

//selecting the robort section to toggle

projectBort.submitDataToApi = () => {
  projectBort.submitBtn = document.querySelector(".submitBtn");
  projectBort.submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    projectBort.mechanics();
    projectBort.pricePoint();
    projectBort.minMaxPlayers();
    projectBort.apiCall(
      projectBort.minPlayerNumber,
      projectBort.maxPlayerNumber,
      projectBort.useInMech,
      projectBort.priceGreaterThen,
      projectBort.priceLowerThen
    );
  });
};
//Getting Value for minimum players and maximum players
projectBort.minMaxPlayers = () => {
  projectBort.minPlayerOption = document.querySelector(
    "#minPlayerOption"
  ).value;
  projectBort.maxPlayerOption = document.querySelector(
    "#maxPlayerOption"
  ).value;
  projectBort.minPlayerNumber = parseInt(projectBort.minPlayerOption, 10);
  projectBort.maxPlayerNumber = parseInt(projectBort.maxPlayerOption, 10);
};
//getting value for mechanics
projectBort.mechanics = () => {
  projectBort.mechanicsOption = document.querySelector("#mechOption").value;
  projectBort.optionsArray.forEach((e) => {
    if (e.value === projectBort.mechanicsOption) {
      projectBort.useInMech = e.mechId;
    }
  });
};
//get value for price
projectBort.pricePoint = () => {
  projectBort.priceOption = document.querySelector("#priceOption").value;
  let priceNumber = parseInt(projectBort.priceOption, 10);
  if (priceNumber === 75) {
    projectBort.priceGreaterThen = 75;
    projectBort.priceLowerThen = 7500;
  } else {
    projectBort.priceGreaterThen = priceNumber;
    projectBort.priceLowerThen = priceNumber + 25;
  }
};

projectBort.hideRobortSection = (info) => {
  projectBort.robortSection = document.querySelector(".robortSection");
  projectBort.gameResultContainer = document.querySelector(
    ".gameResultContainer"
  );
  if (info.count === 0) {
    projectBort.robortSection.classList.remove("hidden");
    projectBort.robortSection.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
};

//Getting Our API
projectBort.apiCall = (minPlayers, maxPlayers, mechanics, gtprice, ltprice) => {
  const url = new URL(projectBort.api);
  url.search = new URLSearchParams({
    client_id: projectBort.clientID,
    limit: 20,
    min_players: minPlayers,
    mechanics: mechanics,
    gt_price: gtprice,
    lt_price: ltprice,
    gt_max_players: maxPlayers,
  });

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((jsonResponse) => {
      projectBort.showGames(jsonResponse);
      projectBort.hideRobortSection(jsonResponse);
    });
};

projectBort.showGames = (result) => {
  const resultArray = result.games;
  console.log(resultArray);
  //check to make sure templates are supported (catch added to fetch statement)
  if ("content" in document.createElement("template")) {
    const gameResultContainer = document.getElementById("gameResultContainer");
    resultArray.forEach((game) => {
      const gameTemplate = document
        .getElementById("gameResultTemplate")
        .content.cloneNode(true);
      gameTemplate.querySelector(".gameTitle").innerText = game.name;
      gameTemplate.querySelector(".gameImage").src = game.image_url;
      gameTemplate.querySelector(".gameImage").alt = game.name;
      gameTemplate.querySelector(".gameDetailMechanic").innerText =
        "mechanic var";
      gameTemplate.querySelector(".gameDetailPrice").innerText = game.price;
      gameTemplate.querySelector(".gameDetailMinPlayer").innerText =
        game.min_players;
      gameTemplate.querySelector(".gameDetailMaxPlayer").innerText =
        game.max_players;

      gameResultContainer.appendChild(gameTemplate);
    });
  } else {
    console.error("Your browser does not support templates");
  }
};

//Hiding/unhiding the back to top button
projectBort.returnToTop = () => {
  const backToTop = document.getElementById("returnToTop");
  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      backToTop.style.visibility = "visible";
      backToTop.style.opacity = 1;
    } else {
      backToTop.style.visibility = "hidden";
      backToTop.style.opacity = 0;
    }
  });
};

projectBort.init = () => {
  projectBort.submitDataToApi();
  projectBort.returnToTop();
};

projectBort.init();
//
//
