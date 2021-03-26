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

projectBort.mechanicsOption = document.getElementById("board").value;
projectBort.api = "https://api.boardgameatlas.com/api/search?";

projectBort.clientID = "pKTceFALuw";

projectBort.getApi = () => {
  const url = new URL(projectBort.api);
  url.search = new URLSearchParams({
    client_id: projectBort.clientID,
    limit: 20,
    min_players: 2,
    mechanics: projectBort.useInMech,

    //POPULAR ID's for mechanics and what they mean
    //this is for our mechanism option

    //RIGHT NOW manually go
  });
  console.log(url);
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      // jsonResponse.games.forEach(function (e) {
      //   console.log(e.mechanics[0].id);
    });
};
projectBort.optionsArray.forEach((e) => {
  if (e.value === projectBort.mechanicsOption) {
    projectBort.useInMech = e.mechId;
    console.log(projectBort.useInMech);
  }
});

projectBort.init = () => {
  projectBort.getApi();
};

projectBort.init();
