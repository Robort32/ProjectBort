const projectBort = {};
projectBort.clientID = "b8a4fHq3xL";
projectBort.submitDataToApi = () => {
  projectBort.submitBtn = document.querySelector(".submitBtn");
  projectBort.submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //grab the value of Mechanics and Categories (loaded in window from API first thing)
    projectBort.useMerchanics = document.querySelector("#mechOption").value;
    projectBort.useCategories = document.querySelector("#categoryOption").value;
    //creating the price window selected by user
    projectBort.pricePoint();
    //creating the window of min/max players as selected by user
    projectBort.minMaxPlayers();
    //sending all the collected data to be called to API
    projectBort.apiCall(
      projectBort.minPlayerNumber,
      projectBort.maxPlayerNumber,
      projectBort.useMerchanics,
      projectBort.priceGreaterThen,
      projectBort.priceLowerThen,
      projectBort.useCategories
    );
  });
};
//
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
//
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
//
//hide robort section when games are received OR display "nothing found"
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
//
//Getting the information from the API
projectBort.apiCall = (
  minPlayers,
  maxPlayers,
  mechanics,
  gtprice,
  ltprice,
  categories
) => {
  projectBort.api = "https://api.boardgameatlas.com/api/search?";
  const searchUrl = new URL(projectBort.api);
  const searchParams = {
    client_id: projectBort.clientID,
    // limit: 20,
    min_players: minPlayers,
    mechanics: mechanics,
    gt_price: gtprice,
    lt_price: ltprice,
    gt_max_players: maxPlayers,
    categories: categories,
  };
  //remove any unselected dropdown means
  const cleanUrl = new URLSearchParams();
  Object.entries(searchParams).forEach((value) => {
    if (
      value[1] !== "makeASelection" &&
      !(typeof value[1] === "number" && isNaN(value[1]))
    ) {
      cleanUrl.set(value[0], value[1]);
    }
  });
  searchUrl.search = cleanUrl;
  fetch(searchUrl)
    .then((res) => {
      return res.json();
    })
    .then((jsonResponse) => {
      projectBort.showGames(jsonResponse);
      projectBort.hideRobortSection(jsonResponse);
    });
};
//
//show game results in cards
projectBort.showGames = (result) => {
  const resultArray = result.games;
  const gameResultContainer = document.getElementById("gameResultContainer");
  gameResultContainer.style.display = "grid";
  projectBort.removeNodes(gameResultContainer);
  //che