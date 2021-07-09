const $bannertextlink = document.querySelector('.banner-text-link')
const $headerlink = document.querySelector('.headerlink');
const $homepageplayers = document.querySelector('.homepageplayers');
const $homepage = document.querySelector('.homepage');
const $homepageteams = document.querySelector('.homepageteams');
const $loading = document.querySelector('.loading');
const $playername = document.querySelector('.playername');
const $playerprofilepage = document.querySelector('.playerprofilepage');
const $playersearchform = document.querySelector('.playersearchform');
const $position = document.querySelector('.position');
const $tablestats = document.querySelector('.tablestats');
const $tablestatsbody = document.querySelector('.tablestatsbody');
const $team = document.querySelector('.team');
const $teaminfobody = document.querySelector('.teaminfobody');
const $teamname = document.querySelector('.teamname');
const $teamprofilepage = document.querySelector('.teamprofilepage');
const $teamselectform = document.querySelector('.teamselectform');

const previousDataJson = localStorage.getItem('playerData');
if (previousDataJson !== null) {
const data = JSON.parse(previousDataJson);
}

function profileStorage(event) {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('playerData', dataJson);
}

window.addEventListener('beforeunload', profileStorage);

// Dropdown Menu of Basketball Teams

function getTeams() {
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://www.balldontlie.io/api/v1/teams');
  xhttp.responseType = 'json',
  xhttp.addEventListener('load', function () {
    for (var i = 0; i <= xhttp.response.data.length - 1; i++) {
      const $option = document.createElement('option');
      $option.textContent = xhttp.response.data[i].full_name;
      $homepageteams.appendChild($option);
    }
  });
  xhttp.addEventListener('error', function () {
    failed();
  });
  xhttp.send();
  console.log("Teams:", xhttp);
}
getTeams();

// Get all players

function getAllPlayers() {
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://www.balldontlie.io/api/v1/players');
  xhttp.responseType = 'json',

  xhttp.addEventListener('error', function () {
    failed();
  });
  xhttp.send();
  console.log("All Players:", xhttp);
}
getAllPlayers();

// Team Search Form

function ballDontLieTeam(team) {
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://www.balldontlie.io/api/v1/teams');
  xhttp.responseType = 'json';
  xhttp.addEventListener('loadstart', function () {
  });
  xhttp.addEventListener('load', function () {
    const storage = [];
    if (xhttp.status === 200) {
      $teamname.textContent = team;
      }
    const queryData = ['city', 'conference', 'division'];
    const $tr = document.createElement('tr');
    $tr.classList.add(queryData[0]);
    for (var i = 0; i <= queryData.length - 1; i++) {

        const $td = document.createElement('td');
        $td.textContent = xhttp.response.data[0][queryData[i]];
        $td.classList.add(queryData[i]);
        $tr.appendChild($td);

    }
    $teaminfobody.appendChild($tr);
  });
  xhttp.addEventListener('error', function () {
    failed();
  });
  xhttp.send();
  console.log("teams:", xhttp);
}

// Player Search Form

function ballDontLie(player) {
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://www.balldontlie.io/api/v1/players?search=' + player);
  xhttp.responseType = 'json';
  xhttp.addEventListener('loadstart', function () {
  });
  xhttp.addEventListener('load', function () {
    const storage = [];
    if (xhttp.status === 200) {
      $tablestatsbody.innerHTML = '';
      const firstLast = player.split(' ');
      if ((firstLast[0].toLowerCase() === xhttp.response.data[0].first_name.toLowerCase()) && (firstLast[1].toLowerCase() === xhttp.response.data[0].last_name.toLowerCase())) {
        var playerID
        playerID = xhttp.response.data[0].id;
        $playername.textContent = xhttp.response.data[0].first_name + ' ' + xhttp.response.data[0].last_name;
        $team.textContent = 'Team: ' + xhttp.response.data[0].team.abbreviation;
        $position.textContent = 'Position: ' + xhttp.response.data[0].position;
        for (var i = 2010; i <= 2020; i++) {
          ballDontLieSeasonAvg(i, playerID);
        }
      } else {
        $playername.textContent = 'Player Name';
      }
    }
  });
  xhttp.addEventListener('error', function () {
    failed();
  });
    xhttp.send();
}

//Team Page

// function ballDontLieTeamInfo() {
//   const xhttp = new XMLHttpRequest();
//   xhttp.open('GET', 'https://www.balldontlie.io/api/v1/teams/');
//   xhttp.responseType = 'json';
//   xhttp.addEventListener('load', function () {
//     const queryData = ['city', 'conference', 'division'];
//     const $tr = document.createElement('tr');
//     $tr.classList.add(queryData[0]);
//     for (var i = 0; i <= queryData.length - 1; i++) {
//       if (xhttp.response.data[0] !== undefined) {
//         const $td = document.createElement('td');
//         $td.textContent = xhttp.response.data[0][queryData[i]];
//         $td.classList.add(queryData[i]);
//         $tr.appendChild($td);
//       }
//     }
//     $teaminfobody.appendChild($tr);
//     for (var x = 1; x <= queryData.length - 1; x++) {
//       const name = '.' + queryData[x];
//       const teamInfo = document.querySelectorAll(teamInfo);
//       storage.push(teamInfo);
//     }
//   });
//   xhttp.addEventListener('error', function () {
//     failed();
//   });
//   xhttp.send();
//   console.log("team info:", xhttp);
// }

$teamselectform.addEventListener('submit', function (e) {
  $teaminfobody.innerHTML = '';
  e.preventDefault();
  ballDontLieTeam($homepageteams.value);
  const storage = [];
  $homepage.classList.add('hidden');
  $teamprofilepage.classList.remove('hidden');
  $headerlink.classList.remove('hidden');
  $homepageteams.value = '';
});

//Player Page

function ballDontLieSeasonAvg(season, id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://www.balldontlie.io/api/v1/season_averages?season=' + season + '&player_ids[]=' + id);
  xhttp.responseType = 'json';
  xhttp.addEventListener('load', function () {
    const queryData = ['season', 'pts', 'ast', 'reb', 'stl', 'blk', 'ft_pct', 'fg3_pct', 'turnover'];
    const $tr = document.createElement('tr');
    $tr.classList.add(queryData[0]);
    for (var i = 0; i <= queryData.length - 1; i++) {
      if (xhttp.response.data[0] !== undefined) {
        const $td = document.createElement('td');
        $td.textContent = xhttp.response.data[0][queryData[i]];
        $td.classList.add(queryData[i]);
        $tr.appendChild($td);
      }
    }
    $tablestatsbody.appendChild($tr);

    for (var x = 1; x <= queryData.length - 1; x++) {
      const name = '.' + queryData[x];
      const statClass = document.querySelectorAll(name);
      storage.push(statClass);
    }
  });
  xhttp.addEventListener('error', function () {
    failed();
  });
  xhttp.send();
  console.log("player stats:", xhttp);
}

$playersearchform.addEventListener('submit', function (e) {
  $tablestatsbody.innerHTML = '';
  e.preventDefault();
  ballDontLie($homepageplayers.value);
  const storage = [];
  $homepage.classList.add('hidden');
  $playerprofilepage.classList.remove('hidden');
  $headerlink.classList.remove('hidden');
  if ($playername.textContent === 'Player Name') {
    $playername.textContent = 'Player not found. Please try again.'
  }
  $homepageplayers.value = '';
});

// //page fails to load
// function failed() {
//   for (var i = 0; i <= $loading.length - 1; i++) {
//     if (i !== 5) {
//       $loading[i].classList.add('hidden');
//     } else {
//       $loading[i].classList.remove('hidden');
//       $bannertextlink.classList.remove('hidden');
//     }
//   }
// }

// //loading page
// function loading() {
//   for (var i = 0; i <= $playerprofilepage.length - 1; i++) {
//     if (i !== 6) {
//       $playerprofilepage.classList.add('hidden');
//     } else {
//       $playerprofilepage.classList.remove('hidden');
//     }
//   }
// }

// //loads different pages depending on the click event that is triggered
// function viewSwap(index) {
//   for (var i = 0; i <= $loading.length - 1; i++) {
//     if (i === index) {
//       $loading[i].classList.remove('hidden');
//     } else {
//       $loading[i].classList.add('hidden');
//     }
//   }
// }

// get players from specific teams
