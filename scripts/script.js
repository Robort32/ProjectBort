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

projectBort.theMasterFunction = () => {
  projectBort.submitButton = document.querySelector(".submitBtn");

  projectBort.submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    //Value of our options drop down
    projectBort.mechanicsOption = document.querySelector("#optionSelect").value;

    //getting the player option
    projectBort.playerOption = document.querySelector("#playerOption").value;

    //iteraiting though the created array full of objects to see which option was selected and retruning the correct mechId
    projectBort.optionsArray.forEach((e) => {
      if (e.value === projectBort.mechanicsOption) {
        projectBort.useInMech = e.mechId;
      }
    });

    //chainge the min player to a number
    const playerOptionNumber = parseInt(projectBort.playerOption, 10);

    //Getting Our API
    const url = new URL(projectBort.api);
    url.search = new URLSearchParams({
      client_id: projectBort.clientID,
      limit: 20,
      min_players: playerOptionNumber,
      mechanics: projectBort.useInMech,
      gt_price: 20,
      lt_price: 40,
    });

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        projectBort.showGames(jsonResponse);
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
