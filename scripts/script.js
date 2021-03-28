const projectBort = {};

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

//DISABLING BUTTON UNTIL OPTIONS ARE FILLED

//selecting the robort section to toggle
projectBort.robortSection = document.querySelector(".robortSection");

projectBort.theMasterFunction = () => {
  projectBort.submitButton = document.querySelector(".submitBtn");

  projectBort.submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    //value of our price drop dow
    projectBort.priceOption = document.querySelector("#priceOption").value;
    //variables for api search for lower and greater
    projectBort.priceLowerThen;
    projectBort.priceGreaterThen;
    //Value of our options for mechanics drop down
    projectBort.mechanicsOption = document.querySelector("#optionSelect").value;

    //getting the minimum player options
    projectBort.playerOption = document.querySelector("#playerOption").value;
    //grabbing the game container

    projectBort.gameResultContainer = document.querySelector(
      ".gameResultContainer"
    );
    //getting the max+ options
    projectBort.MaxplayerOption = document.querySelector(
      "#MaxplayerOption"
    ).value;

    //iteraiting though the created array full of objects to see which option was selected and retruning the correct mechId
    projectBort.optionsArray.forEach((e) => {
      if (e.value === projectBort.mechanicsOption) {
        projectBort.useInMech = e.mechId;
      }
    });

    projectBort.priceOptionSelected = (price) => {
      let priceNumber = parseInt(price, 10);
      if (priceNumber === 75) {
        projectBort.priceGreaterThen = 75;
        projectBort.priceLowerThen = 7500;
      } else {
        projectBort.priceGreaterThen = priceNumber;
        projectBort.priceLowerThen = priceNumber + 25;
      }
    };
    //function for making a better user expereince and contorl what you see when you hit the button
    projectBort.hideRobortSection = (info) => {
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
    // };
    projectBort.priceOptionSelected(projectBort.priceOption);

    //chainge the min player to a number
    const playerOptionNumber = parseInt(projectBort.playerOption, 10);

    //changomg the max player ta number
    const maxPLayerNumber = parseInt(projectBort.MaxplayerOption, 10);

    //Getting Our API
    const url = new URL(projectBort.api);
    url.search = new URLSearchParams({
      client_id: projectBort.clientID,
      limit: 20,
      min_players: playerOptionNumber,
      mechanics: projectBort.useInMech,

      gt_price: projectBort.priceGreaterThen,
      lt_price: projectBort.priceLowerThen,
      gt_max_players: maxPLayerNumber,
    });

    fetch(url)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        projectBort.showGames(jsonResponse);
        projectBort.hideRobortSection(jsonResponse);
      });
  });
};

projectBort.showGames = (result) => {
  const gameResultContainer = document.querySelector(".gameResultContainer");
  const resultArray = result.games;
  console.log(resultArray);
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

projectBort.getCategory = () => {};

projectBort.init = () => {
  projectBort.theMasterFunction();
};

projectBort.init();
