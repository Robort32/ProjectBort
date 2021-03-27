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
    value: "trading",
    mechId: "AVY6EvSQTP",
  },
  {
    value: "Cooperative play ",
    mechId: "9mNukNBxfZ",
  },
  {
    value: "Acting",
    mechId: "n1GtBt35Rd",
  },
  {
    value: "deduction",
    mechId: "GsNGxZFNCK",
  },
];
projectBort.submitButton = document.getElementById("choose");

projectBort.api = "https://api.boardgameatlas.com/api/search?";

projectBort.clientID = "pKTceFALuw";

projectBort.theMasterFunction = () => {
  projectBort.submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    projectBort.mechanicsOption = document.getElementById("board").value;
    // console.log(projectBort.mechanicsOption);

    projectBort.optionsArray.forEach((e) => {
      if (e.value === projectBort.mechanicsOption) {
        projectBort.useInMech = e.mechId;
        console.log(projectBort.useInMech);
      }
    });

    const url = new URL(projectBort.api);
    url.search = new URLSearchParams({
      client_id: projectBort.clientID,
      limit: 20,
      min_players: 2,
      mechanics: projectBort.useInMech,
    });
    console.log(url);
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        jsonResponse.games.forEach(function (e) {
          console.log(e.mechanics[0].id);
        });
      });
  });
};
projectBort.init = () => {
  projectBort.theMasterFunction();
};

projectBort.init();
