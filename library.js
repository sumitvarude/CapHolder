var library = {};
var fs = require('fs');

library.capData = {};

var saveCapData = function(data) {
  fs.writeFile('./data.txt', JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
};

var getCapData = function(){
  library.capData = JSON.parse(fs.readFileSync('./data.txt', 'utf8'));
};

var addTeamWithMembers = function(teamName, members){
  var teamObject = {};
  for (var i = 0; i < members.length; i++) {
     teamObject[members[i]] = {"runs":0,"wickets":0};
  }
  library.capData[teamName] = teamObject;
  saveCapData(library.capData);
};

var addStatsToPlayer = function(teamName, playerName, runs, wickets){
  library.capData[teamName][playerName].runs += runs;
  library.capData[teamName][playerName].wickets += wickets;
  saveCapData(library.capData);
};

library.getCapHolder = function(color){
  var caps = {"orange": "runs",
              "purple":"wickets"};
  var team = "";
  var capHolder = "";
  var most = 0;
  var teamNames = getAllTeamNames();
  getCapData();
  for (var i = 0; i < teamNames.length; i++) {
    var teamObject = library.capData[teamNames[i]];
    var teamPlayers = Object.keys(library.capData[teamNames[i]]);
    for (var j = 0; j < teamPlayers.length; j++) {
      if(teamObject[teamPlayers[j]][caps[color]] > most){
        capHolder = teamPlayers[j];
        most = teamObject[teamPlayers[j]][caps[color]];
        team = teamNames[i];
      }
    }
  }
  return {"Cap":color,"team":team,"player":capHolder,"most":most};
};

var deleteStats = function(){
  saveCapData("{}");
};

var getAllTeamNames = function(){
  getCapData();
  return Object.keys(library.capData);
};

var printTeamwiseStats = function(){
  var teamNames = getAllTeamNames();
  console.log("teams = "+teamNames);
  getCapData();
  console.log("Team\t\tPlayer\t\tRuns\t\tWickets");
  for (var i = 0; i < teamNames.length; i++) {
    console.log(teamNames[i]);
    var teamObject = library.capData[teamNames[i]];
    var teamPlayers = Object.keys(library.capData[teamNames[i]]);
    for (var j = 0; j < teamPlayers.length; j++) {
        console.log("\t\t"+teamPlayers[j]+"\t\t"+teamObject[teamPlayers[j]].runs+"\t\t"+teamObject[teamPlayers[j]].wickets);
    }
  }
};

printTeamwiseStats();

module.exports.library = library;
