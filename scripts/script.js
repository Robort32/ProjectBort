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
  } else {
    projectBort.robortSection.classList.add("hidden");
    projectBort.gameResultContainer.scrollIntoView({
      behavior: "smooth",
      block: "start",
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
  console.log(url);
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
  const gameResultContainer = document.querySelector(".gameResultContainer");
  const resultArray = result.games;
  const gameContent = resultArray.map((resultItem) => {
    return `
    <div class="gameCard">
      <div class="gameImageContainer">
        <img
          src=${resultItem.image_url}
          alt=${resultItem.name}
          id="gameImage"
          />
      </div>
  
      <div class="gameTextContainer">
        <h3 id="gameTitle" class="gameTitle">${resultItem.name}</h3>
        <div class="lineBreak"></div>
        

      <div class="gameDetail">
        <div class="gameDetailItem">
          <p class="gameSmallText">Mechanic</p>
        </div>
        <div class="gameDetailItem">
          <h5>network and route building</h5>
        </div>
      </div>
      <div class="gameDetail">
        <div class="gameDetailItem">
          <p class="gameSmallText">Price</p>
        </div>
        <div class="gameDetailItem">
          <h5>$ ${resultItem.price_ca}</h5>
        </div>
      </div>
      <div class="gameDetail">

        <div class="gameDetailItem">
          <p class="gameSmallText">Min Players</p>
        </div>
        <div class="gameDetailItem">
          <h5>${resultItem.min_players}</h5>
        </div>
      </div>
      <div class="gameDetail">
        <div class="gameDetailItem">
          <p class="gameSmallText">Max Players</p>
        </div>
        <div class="gameDetailItem">
          <h5>${resultItem.max_players}</h5>
        </div>
      </div>




      </div>
      
    </div>`;
  });
  gameResultContainer.innerHTML = gameContent.join("");
};
// This will be to get a category
// projectBort.getCategory = () => {};
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
