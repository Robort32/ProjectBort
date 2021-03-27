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
//submit button
projectBort.submitButton = document.querySelector(".submitBtn");

projectBort.api = "https://api.boardgameatlas.com/api/search?";

projectBort.clientID = "pKTceFALuw";

//DISABLING BUTTON UNTIL OPTIONS ARE FILLED

projectBort.theMasterFunction = () => {
  projectBort.submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    // projectBort.buttonDisable();
    //Value of our options drop down
    projectBort.mechanicsOption = document.querySelector("#optionSelect").value;
    //getting the player option
    projectBort.playerOption = document.querySelector("#playerOption").value;
    //chainge the min player dropdown to a number
    let playerOptionNumber = parseInt(projectBort.playerOption, 10);
    console.log(playerOptionNumber);
    //iteraiting though the created array full of objects to see which option was selected and retruning the correct mechId
    projectBort.optionsArray.forEach((e) => {
      if (e.value === projectBort.mechanicsOption) {
        //project.bort.useInMech gets passed the meachanics params
        projectBort.useInMech = e.mechId;
      }
    });
    //Getting Our API
    const url = new URL(projectBort.api);
    url.search = new URLSearchParams({
      client_id: projectBort.clientID,
      limit: 20,
      min_players: playerOptionNumber,
      mechanics: projectBort.useInMech,
    });
    console.log(url);
    fetch(url)
      .then((res) => {
        return res.json();
      })
      //THIS IS WHERE WE GET THE DATAS
      .then((jsonResponse) => {
        console.log(jsonResponse);
        //This forEach was me going thought checking to make sure Each Game that came up Actually had the ID on it
        // jsonResponse.games.forEach(function (e) {
        //   console.log(e.mechanics[0].id);

        // });
      });
  });
  //});
};
projectBort.init = () => {
  projectBort.theMasterFunction();
};

projectBort.init();

//script is changggggggged
