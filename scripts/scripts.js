const projectBort = {};

projectBort.api = "https://api.boardgameatlas.com/api/search?";
// console.log(projectBort.api);
projectBort.clientID = "b8a4fHq3xL";

projectBort.getApi = () => {
  const url = new URL(projectBort.api);
  url.search = new URLSearchParams({
    client_id: projectBort.clientID,
    limit: 50,
    min_players: 2,
    mechanics: "",
  });
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      console.log(jsonResponse.games);
      jsonResponse.games.forEach(function (e) {
        console.log(e.min_players);
      });
    });
};

projectBort.init = () => {
  projectBort.getApi();
};

projectBort.init();
