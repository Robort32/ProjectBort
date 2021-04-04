const projectBort = {};

projectBort.clientID = "b8a4fHq3xL";

//
//combine user selection for api call
projectBort.submitDataToApi = () => {
  const submitBtn = document.querySelector(".submitBtn");
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //grab the value of Mechanics and Categories (loaded in window from API first thing)
    const useMerchanics = document.querySelector("#mechOption").value;
    const useCategories = document.querySelector("#categoryOption").value;
    //creating the price window selected by user
    projectBort.pricePoint();
    //creating the window of min/max players as selected by user
    projectBort.minMaxPlayers();
    //sending all the collected data to be called to API
    projectBort.apiCall(
      minPlayerNumber,
      maxPlayerNumber,
      useMerchanics,
      priceGreaterThen,
      priceLowerThen,
      useCategories
    );
  });
};
//
//Getting Value for minimum players and maximum players
projectBort.minMaxPlayers = () => {
  const minPlayerOption = document.querySelector("#minPlayerOption").value;
  const maxPlayerOption = document.querySelector("#maxPlayerOption").value;
  maxPlayerNumber = parseInt(maxPlayerOption, 10);
  minPlayerNumber = parseInt(minPlayerOption, 10);
};
//
//get value for price
projectBort.pricePoint = () => {
  const priceOption = document.querySelector("#priceOption").value;
  let priceNumber = parseInt(priceOption, 10);
  if (priceNumber === 75) {
    priceGreaterThen = 75;
    priceLowerThen = 7500;
  } else {
    priceGreaterThen = priceNumber;
    priceLowerThen = priceNumber + 25;
  }
};
//
//hide robort section when games are received OR display "nothing found"
projectBort.hideRobortSection = (info) => {
  const robortSection = document.querySelector(".robortSection");
  const sortDropdown = document.querySelector(".sortDropdown");
  const gameResultContainer = document.getElementById("gameResultContainer");
  const robortLogo = document.getElementById("robortLogo");
  //if search returns 0 results, display error, else snap screen to results display
  if (info.count === 0) {
    robortLogo.src = "./assets/robortLogoError.gif";
    robortLogo.alt = "Robort Error. Search Again";
    sortDropdown.style.display = "none";
    gameResultContainer.style.display = "none";

    robortSection.classList.remove("hidden");
    robortSection.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  } else {
    robortSection.classList.add("hidden");
    sortDropdown.scrollIntoView({
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
  //fetch using cleaned up search parameters
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
// display game search results in cards
projectBort.showGames = (result) => {
  const gameResultContainer = document.getElementById("gameResultContainer");
  const sortDropdown = document.querySelector(".sortDropdown");
  const mechName = document.getElementById("mechOption");
  const categoryName = document.getElementById("categoryOption");

  gameResultContainer.style.display = "grid";
  sortDropdown.style.display = "block";

  //setting the mechanic/category text if selected by user
  const insideTextMechanic = mechName.options[mechName.selectedIndex].text;
  const insideTextCategory =
    categoryName.options[categoryName.selectedIndex].text;
  //clear game containers
  projectBort.removeNodes(gameResultContainer);

  //if result is missing a mechanic/category, default to price display
  if ("content" in document.createElement("template")) {
    result.forEach((game) => {
      let insideText;
      let smallText;
      if (mechName.selectedIndex === 0 && categoryName.selectedIndex === 0) {
        insideText = game.year_published;
        smallText = "Year Published ";
      } else if (mechName.selectedIndex > 0) {
        insideText = insideTextMechanic;
        smallText = " Mechanic";
      } else if (categoryName.selectedIndex > 0) {
        insideText = insideTextCategory;
        smallText = " Category";
      } else if (mechName.selectedIndex > 0 && categoryName.selectedIndex > 0) {
        insideText = insideTextMechanic;
        smallText = " Mechanic";
      }
      //populate individual cards
      const gameTemplate = document
        .getElementById("gameResultTemplate")
        .content.cloneNode(true);
      gameTemplate.querySelector(".gameLink").href = game.url;
      gameTemplate.querySelector(".gameLinkTitle").href = game.url;
      gameTemplate.querySelector(".gameTitle").innerText = game.name;
      gameTemplate.querySelector(".gameImage").src = game.image_url;
      gameTemplate.querySelector(".gameImage").alt = game.name;
      gameTemplate.querySelector("#smallText").innerText = smallText;
      gameTemplate.querySelector(".gameDetailMechanic").innerText = insideText;
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
    });
  } else {
    //in case user is on an older browswer
    error("Your browser does not support templates");
  }

  projectBort.sortByRating(result);
  projectBort.sortByPrice(result);
  projectBort.sortByName(result);
};
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
    projectBort.sortMenu();
    projectBort.clearSearch();
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
//clear search button
projectBort.clearSearch = () => {
  document.querySelector(".clearBtn").addEventListener("click", function () {
    const allSelects = document.querySelectorAll("select");
    allSelects.forEach((element) => {
      element.selectedIndex = 0;
    });
    //hide sortMenu if it's open
    const sortConentDropdown = document.querySelector(".sortConentDropdown");
    sortConentDropdown.classList.add("notVisible");

    const menuArrow = document.querySelector(".lni-arrow-down-circle");
    menuArrow.classList.remove("arrowSwing");
  });
};
//
//sort results based on rating (highest to lowest)
projectBort.sortByRating = (result) => {
  const sortAverageRating = document.getElementById("sortAverageRating");
  sortAverageRating.addEventListener("click", function () {
    const sortedResult = result.sort(
      (itemOne, itemTwo) =>
        itemTwo.average_user_rating - itemOne.average_user_rating
    );
    projectBort.showGames(sortedResult);
  });
};
//
//sort results based on price (lowest to highest)
projectBort.sortByPrice = (result) => {
  const sortLowestPrice = document.getElementById("sortLowestPrice");
  sortLowestPrice.addEventListener("click", function () {
    const sortedResult = result.sort(
      (itemOne, itemTwo) => itemOne.price_ca - itemTwo.price_ca
    );
    projectBort.showGames(sortedResult);
  });
};
//
//sort results alphabetically (a-z)
projectBort.sortByName = (result) => {
  const sortAlphabetical = document.getElementById("sortAlphabetical");
  sortAlphabetical.addEventListener("click", function () {
    const sortedResult = result.sort((itemOne, itemTwo) =>
      itemOne.name.localeCompare(itemTwo.name)
    );
    projectBort.showGames(sortedResult);
  });
};
//
//sortMenu click for drowdown
projectBort.sortMenu = () => {
  const sortClickMenu = document.querySelector(".sortClickMenu");
  const menuArrow = document.querySelector(".lni-arrow-down-circle");
  const sortConentDropdown = document.querySelector(".sortConentDropdown");

  sortClickMenu.addEventListener("click", function () {
    sortConentDropdown.classList.toggle("notVisible");
    menuArrow.classList.toggle("arrowSwing");
  });
  projectBort.hideMenu();
};
//
//hide sort dropdown if you click anywhere on the screen
projectBort.hideMenu = () => {
  const menuArrow = document.querySelector(".lni-arrow-down-circle");
  const sortConentDropdown = document.querySelector(".sortConentDropdown");

  document.addEventListener("click", function (e) {
    if (e.target.closest("#sortMenu")) return;
    if (e.target.closest(".lni-arrow-down-circle")) return;
    sortConentDropdown.classList.add("notVisible");
    menuArrow.classList.remove("arrowSwing");
  });
};

//go get it!
projectBort.init = () => {
  projectBort.pageLoad();
  projectBort.submitDataToApi();
};
projectBort.init();
//
