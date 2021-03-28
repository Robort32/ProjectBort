const projectBort = {};
//sorry tonight i am far to lazy to make this alphabetical
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
  //submit button
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
    });

    fetch(url)
      .then((res) => {
        return res.json();
      })
      //THIS IS WHERE WE GET THE DATAS
      .then((jsonResponse) => {
        console.log("API RETURNS");
        projectBort.showGames(jsonResponse);
      });
  });
};

projectBort.showGames = (result) => {
  const gameResultContainer = document.querySelector(".gameResultContainer");
  const resultArray = result.games;

  const gameContent = resultArray.map((x) => {
    return `<div class="gameCard">
      <div class="gameImageContainer">
        <img
          src=${x.image_url}
        alt=""
        id="gameImage"
      />
    </div>
  
    <div class="gameTextContainer">
      <h2 id="gameTitle">${x.name}</h2>
      <div class="lineBreak"></div>
      <div class="gameDetail">
        <p id="gameCategory">CATEGORY</p>
      </div>
      <div class="gameDetail">
        <p id="gamePrice">20.00</p>
      </div>
    </div></div>`;
  });
  gameResultContainer.innerHTML = gameContent.join("");
};

projectBort.init = () => {
  projectBort.theMasterFunction();
};

projectBort.init();
