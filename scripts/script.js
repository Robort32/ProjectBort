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
  projectBort.sortDropdown = document.querySelector(".sortDropdown");
  const robortLogo = document.getElementById("robortLogo");
  if (info.count === 0) {
    robortLogo.src = "./assets/robortLogoError.gif";
    robortLogo.alt = "Robort Error. Search Again";
    projectBort.robortSection.classList.remove("hidden");
    projectBort.robortSection.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  } else {
    projectBort.robortSection.classList.add("hidden");
    projectBort.sortDropdown.scrollIntoView({
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
      projectBort.showGames(jsonResponse.games);
      projectBort.hideRobortSection(jsonResponse);
    });
};
//
//show game results in cards
projectBort.showGames = (result) => {
  const gameResultContainer = document.getElementById("gameResultContainer");
  const sortDropdown = document.querySelector(".sortDropdown");
  gameResultContainer.style.display = "grid";
  sortDropdown.style.display = "block";

  const mechName = document.getElementById("mechOption");
  const mechInsideText = mechName.options[mechName.selectedIndex].text;

  projectBort.removeNodes(gameResultContainer);
  //check to make sure templates are supported (catch added to fetch statement)
  if ("content" in document.createElement("template")) {
    result.forEach((game) => {
      const gameTemplate = document
        .getElementById("gameResultTemplate")
        .content.cloneNode(true);
      gameTemplate.querySelector(".gameLink").href = game.url;
      gameTemplate.querySelector(".gameLinkTitle").href = game.url;
      gameTemplate.querySelector(".gameTitle").innerText = game.name;
      gameTemplate.querySelector(".gameImage").src = game.image_url;
      gameTemplate.querySelector(".gameImage").alt = game.name;
      gameTemplate.querySelector(
        ".gameDetailMechanic"
      ).innerText = mechInsideText;
      gameTemplate.querySelector(
        ".gameDetailPrice"
      ).innerText = `$ ${game.price_ca}`;
      gameTemplate.querySelector(".gameDetailMinPlayer").innerText =
        game.min_players;
      gameTemplate.querySelector(".gameDetailMaxPlayer").innerText =
        game.max_players;
      gameTemplate.querySelector(
        ".gameAvgRatingText"
      ).innerText = game.average_user_rating.toFixed(2);
      gameResultContainer.appendChild(gameTemplate);

      gameResultContainer.appendChild(gameTemplate);
    });
  } else {
    error("Your browser does not support templates");
  }
  projectBort.sortByRating(result);
  projectBort.sortByPrice(result);
  projectBort.sortByName(result);
};
//

//
//remove all game cards
projectBort.removeNodes = (template) => {
  template.querySelectorAll(".gameCard").forEach((e) => {
    e.parentNode.removeChild(e);
  });
};
//
//things that run on the page load - populating drop downs & general stylings
projectBort.pageLoad = () => {
  window.addEventListener("load", () => {
    projectBort.loadDropdowMechanic();
    projectBort.loadDropdowCategorgies();
    projectBort.returnToTop();
  });
};
//
//API call to populate game mechanic dropdown
projectBort.loadDropdowMechanic = () => {
  const mechanicUrl = new URL(
    "https://api.boardgameatlas.com/api/game/mechanics?"
  );
  mechanicUrl.search = new URLSearchParams({
    client_id: projectBort.clientID,
  });
  fetch(mechanicUrl).then((res) => {
    res.json().then((response) => {
      projectBort.populateDropdown(response.mechanics, "#mechOption");
    });
  });
};
//
//API call to populate game category dropdown
projectBort.loadDropdowCategorgies = () => {
  const categoryUrl = new URL(
    "https://api.boardgameatlas.com/api/game/categories?"
  );
  categoryUrl.search = new URLSearchParams({
    client_id: projectBort.clientID,
  });
  fetch(categoryUrl).then((res) => {
    res.json().then((response) => {
      projectBort.populateDropdown(response.categories, "#categoryOption");
    });
  });
};
//
//shared function to populate the dropdowns from a window load API call (categories & mechanics)
projectBort.populateDropdown = (apiResult, location) => {
  const dropdownLocation = document.querySelector(location);
  apiResult.forEach((item) => {
    const gameOption = document.createElement("option");
    gameOption.textContent = item.name;
    gameOption.value = item.id;
    dropdownLocation.appendChild(gameOption);
  });
};
//
//Hiding/unhiding the back to top button
projectBort.returnToTop = () => {
  const backToTop = document.getElementById("returnToTop");
  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 600 ||
      document.documentElement.scrollTop > 600
    ) {
      backToTop.style.visibility = "visible";
      backToTop.style.opacity = 1;
    } else {
      backToTop.style.visibility = "hidden";
      backToTop.style.opacity = 0;
    }
  });
};
//
//

document.querySelector(".clearBtn").addEventListener("click", function () {
  projectBort.allSelects = document.querySelectorAll("select");

  projectBort.allSelects.forEach((element) => {
    element.selectedIndex = 0;
  });

  // document.getElementById("mechOption").selectedIndex = 0;
  // doc
});
//
//sort results based on rating (highest to lowest)
projectBort.sortByRating = (result) => {
  const sortAverageRating = document.getElementById("sortAverageRating");
  sortAverageRating.addEventListener("click", function () {
    const sortedResult = result.sort(
      (x, y) => y.average_user_rating - x.average_user_rating
    );
    projectBort.showGames(sortedResult);
  });
};
//sort results based on price (lowest to highest)
projectBort.sortByPrice = (result) => {
  const sortLowestPrice = document.getElementById("sortLowestPrice");
  sortLowestPrice.addEventListener("click", function () {
    const sortedResult = result.sort((x, y) => x.price - y.price);
    projectBort.showGames(sortedResult);
  });
};
//sort results alphabetically (a-z)
projectBort.sortByName = (result) => {
  const sortAlphabetical = document.getElementById("sortAlphabetical");
  sortAlphabetical.addEventListener("click", function () {
    const sortedResult = result.sort((a, b) => a.name.localeCompare(b.name));
    projectBort.showGames(sortedResult);
  });
};
//
//
//go get it!
projectBort.init = () => {
  projectBort.pageLoad();
  projectBort.submitDataToApi();
};

projectBort.init();
//
//
