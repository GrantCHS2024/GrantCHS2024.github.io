const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

function resizeCanvas() {
  const scaleX = window.innerWidth / BASE_WIDTH;
  const scaleY = window.innerHeight / BASE_HEIGHT;
  const scale = Math.min(scaleX, scaleY); // 👈 keeps aspect ratio

  canvas.width = BASE_WIDTH;
  canvas.height = BASE_HEIGHT;

  canvas.style.width = `${BASE_WIDTH * scale}px`;
  canvas.style.height = `${BASE_HEIGHT * scale}px`;

  canvashud.width = BASE_WIDTH;
  canvashud.height = BASE_HEIGHT;

  canvashud.style.width = `${BASE_WIDTH * scale}px`;
  canvashud.style.height = `${BASE_HEIGHT * scale}px`;

  $(".map").css({
    "width": `${BASE_WIDTH * scale}px`,
    "height": `${BASE_HEIGHT * scale}px`,
  });
  $(".coverMap").css({
    "width": `${BASE_WIDTH * scale}px`,
    "height": `${BASE_HEIGHT * scale}px`,
  });

  canvasContainer.style.display = "flex";
  canvasContainer.style.justifyContent = "center";
  canvasContainer.style.alignItems = "center";
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// - - - - - - - - IMAGES/AUDIO - - - - - - - - 


//- - - - - - - - - - - - - - - - - - - - - - - 

function loadMap(map){
  var bottom;
  var top;
  switch (map) {
    case maps[0]:
    bottom = mapImage.Forest;
    top = mapImage.CForest;
    walls = Forest;
    backgroundSound = backgroundAudio.forest;
    break;
    case maps[1]:
    bottom = mapImage.Winter;
    top = mapImage.CWinter;
    walls = Winter;
    backgroundSound = backgroundAudio.winter;
    break;
    case maps[2]:
    bottom = mapImage.Outpost;
    top = mapImage.COutpost;
    walls = Outpost;
    backgroundSound = backgroundAudio.outpost;
    break;
    case maps[3]:
    bottom = mapImage.Shootout;
    top = mapImage.CShootout;
    walls = Shootout;
    backgroundSound = backgroundAudio.shootout;
    break;
    case maps[4]:
    bottom = mapImage.Desert;
    top = mapImage.CDesert;
    walls = Desert;
    backgroundSound = backgroundAudio.desert;
    break;
    case maps[5]:
    bottom = mapImage.Containers;
    top = mapImage.CContainers;
    walls = Containers;
    backgroundSound = backgroundAudio.containers;
    break;
    case maps[6]:
    bottom = mapImage.Urban;
    top = mapImage.CUrban;
    walls = Urban;
    backgroundSound = backgroundAudio.urban;
    break;
    case maps[7]:
    bottom = mapImage.Train;
    top = mapImage.CTrain;
    walls = Train;
    backgroundSound = backgroundAudio.train;
    break;
  }

  players[0].x = walls[0].spawn1X;
  players[0].y = walls[0].spawn1Y;
  players[1].x = walls[0].spawn2X;
  players[1].y = walls[0].spawn2Y;
  players[0].size = walls[0].playerSize;
  players[1].size = walls[0].playerSize;

  $(".map").attr("src", bottom);
  $(".coverMap").attr("src", top);
}
//loadMap(map);

function loadGame(){
  $(".loadoutScreen").css("z-index", -1);
  $(".loadoutScreen").css("opacity", 0);
  $(".loadoutScreen").css("display", "none");
  //$(".canvas").css("display", "block");
  //$("#canvashud").css("display", "block");
  //$(".map").css("display", "block");
  //$(".coverMap").css("display", "block");
  rounds++
  time = 121;
  bullets = [];
  mines = [];
  grenades = [];
  incendiaries = [];
  rockets = [];
  concussions = [];
  drones = [];
  c4s = [];
  blood = [];
  missileStrikes = [];
  gunRuns = [];
  walls = [];

    players.forEach(player => {
    if(player.Item1 === "landmine"){
      player.Item1quantity = items.mineQuantity;
    }
    else if(player.Item1 === "grenade"){
       player.Item1quantity = items.grenadeQuantity;
    }
    else if(player.Item1 === "launcher"){
      player.Item1quantity = items.rocketQuantity;
    }
    else if(player.Item1 === "incendiary"){
      player.Item1quantity = items.incendiaryQuantity;
    }
    else if(player.Item1 === "c4"){
      player.Item1quantity = items.c4Quantity;
    }

    if(player.Item2 === "Medkit"){
      player.Item2quantity = items.medkitQuantity;
    }
    else if(player.Item2 === "Adrenaline"){
      player.Item2quantity = items.adrenalineQuantity;
    }
    else if(player.Item2 === "Ammobox"){
      player.Item2quantity = items.ammoboxQuantity;
    }
    else if(player.Item2 === "Concussion"){
      player.Item2quantity = items.concussionQuantity;
    }
    else if(player.Item2 === "Drone"){
      player.Item2quantity = items.droneQuantity;
    }
    else if(player.Item2 === "shield"){
      player.Item2quantity = items.shieldQuantity;
    }

    player.alive = true;
    player.armor = player.OGarmor;
    player.health = 100 + player.armor * 20;
    player.flags = {
      leftDPad: true,
      rightDPad: true,
      leftBumper: true,
      rightBumper: true,
      rightTrigger: true,
      leftTrigger: true,
      leftDPadHold: 0,
    };
    calculateSpeed(player);
    player.primary.ammo = player.primary.maxAmmo;
    player.primary.ammoCount = player.primary.ammoCountOG;
    player.secondary.ammo = player.secondary.maxAmmo;
    player.secondary.ammoCount = player.secondary.ammoCountOG;
    player.primary.chambered = true;
    player.primary.loaded = true;
    player.secondary.chambered = true;
    player.secondary.loaded = true;
    loadPlayerImage(player);
  });
  if(rounds % 4 === 0){
  let mapNum = Math.floor(Math.random() * 8);
  map = maps[mapNum];
  }
  colorMonitor();
  loadMap(map);

  backgroundSound.currentTime = 0;
  backgroundSound.play();

  inMenus = false;
  inLoadout = false;
  gameLive = true;
}

let walls = [];

setTimeout(() => {
  players[0].primary = structuredClone(guns[4]);
  players[0].secondary = structuredClone(guns[0]);
  players[1].primary = structuredClone(guns[4]);
  players[1].secondary = structuredClone(guns[0]);

  players[0].primary.icon = gunIcons[guns[4].icon];
  players[0].primary.sound = gunAudio[guns[4].icon];
  players[0].secondary.sound = gunAudio[guns[0].icon];
  players[0].secondary.icon = gunIcons[guns[0].icon];
  players[1].primary.icon = gunIcons[guns[4].icon];
  players[1].primary.sound = gunAudio[guns[4].icon];
  players[1].secondary.sound = gunAudio[guns[0].icon];
  players[1].secondary.icon = gunIcons[guns[0].icon];

}, 2000);

// - - - - - - - - - - - - - - - - - - - - - - GAME - - - - - - - - - - - - - - - - - - - - - - 

function checkCollision(player, x, y){
    return walls.some(wall => 
        x + (player.size / 2) > wall.x &&
        x + (player.size / 2) < wall.x + wall.width &&
        y + (player.size / 2) > wall.y &&
        y + (player.size / 2) < wall.y + wall.height
   );                    
}
function checkCollisionItem(x, y, width, height){
  return walls.some(wall => 
    x + width > wall.x &&
    x < wall.x + wall.width &&
    y + height > wall.y &&
    y < wall.y + wall.height
  );
}

function applyDeadzone(value, threshold = 0.2) {
      return Math.abs(value) < threshold ? 0 : value;
    }

function calculateSpeed(player){
  var originalSpeed = 3;
  originalSpeed -= Number(player.primary.weight / 3);
  originalSpeed -= Number(player.secondary.weight / 3);
  originalSpeed -= Number(player.armor / 4);
  player.speed = originalSpeed;
}
function loadPlayerImage(player){
  if(player.health < 0 && flags.game){
    flags.game = false;
    player.alive = false;
    setTimeout(() => {
      if(players[0].health > players[1].health && gameLive){
      players[0].score++
      }
      else if(players[0].health < players[1].health && gameLive) players[1].score++;
      gameLive = false;
      $(".score .playerOne").css("font-size", "15cqw");
      $(".score .playerTwo").css("font-size", "15cqw");
      $(".score .playerOne").css("color", "black");
      $(".score .playerTwo").css("color", "black");
      $(".score .playerOne").text(players[0].score);
      $(".score .playerTwo").text(players[1].score);
      $(".transition").addClass("fade-in");
      $(".score").addClass("fade-in");
      if(players[0].score !== maxRounds && players[1].score !== maxRounds){
        clearSounds();
        audio.fire.pause();
        setTimeout(() => {
        $(".transitiontwo").addClass("fade-in-out");
        backgroundSound.pause();
      }, 4000);
      setTimeout(() => {
        flags.game = true;
        loadGame();
        $(".transition").removeClass("fade-in");
        $(".score").removeClass("fade-in");
        setTimeout(() => {
          $(".transitiontwo").removeClass("fade-in-out");
        }, 1000);
      }, 7000);
    }
    else {
      clearSounds();
      audio.fire.pause();
      setTimeout(() => {
        if(players[0].score > players[1].score){
          $(".score .playerOne").css("color", "gold");
          $(".score .playerTwo").css("font-size", "5cqw");
          $(".score .playerTwo").text("WINNER!");
        }
        else {
          $(".score .playerTwo").css("color", "gold");
          $(".score .playerOne").css("font-size", "5cqw");
          $(".score .playerOne").text("WINNER!");
        }
        setTimeout(() => {
          $(".transitiontwo").addClass("fade-in-out");
          backgroundSound.pause();
          setTimeout(() => {
            $(".transitiontwo").removeClass("fade-in-out");
            $(".score").removeClass("fade-in");
            $(".transition").removeClass("fade-in");
          }, 4000);
          setTimeout(() => {
            gameLive = false;
            inMenus = true;
            inLoadout = true;
            $(".loadoutScreen").css("z-index", 10);
            $(".loadoutScreen").css("opacity", 1);
            $(".loadoutScreen").css("display", "block");
            loadLoadoutScreen("p1");
            loadLoadoutScreen("p2");
            rounds = -1;
          //$(".canvas").css("display", "none");
          //$("#canvashud").css("display", "none");
          //$(".map").css("display", "none");
          //$(".coverMap").css("display", "none");
          }, 2000);
        }, 4000);
      }, 5000);
    }
    }, 3000);
  }
  if(player.equippedItem === "primary" && player.alive){
    switch (player.primary.type) {
      case "rifle":
      player.src = player.styles[2]
      break;
      case "smg":
      player.src = player.styles[3]
      break;
      case "sniper":
      player.src = player.styles[4]
      break;
    }
  }
  else if(player.equippedItem === "secondary" && player.alive){
    player.src = player.styles[0]
  }
  else if(player.equippedItem === "launcher" && player.alive){
    player.src = player.styles[1]
  }
  else if(!player.alive){
    player.src = player.styles[5]
  }
}
calculateSpeed(players[0])
loadPlayerImage(players[0])

function placeMine(player){
  var mine = {
    team: player.team,
    x: Number(player.x + (player.size / 2)),
    y: Number(player.y + (player.size / 2)),
    src: items.mine,
    damage: 75,
    size: 25,
    timing: 20,
    activated: false,
    ready: false,
  }
  mines.push(mine);
}
function throwGrenade(player){
  const angleRad = (player.angle + 90) * Math.PI / 180;
  const offset = player.size / 2;
  var grenade = {
            x: (player.x + player.size / 2) + Math.cos(angleRad) * offset,
            y: (player.y + player.size / 2) + Math.sin(angleRad) * offset,
            size: 20,
            speed: 13,
            src: items.grenade,
            dx: Math.cos(angleRad),
            dy: Math.sin(angleRad),
            damage: 30,
            timing: 200,
            ricochet: false,
          };
          grenades.push(grenade);
}
function throwC4(player){
  const angleRad = (player.angle + 90) * Math.PI / 180;
  const offset = player.size / 2;
  var c4 = {
            x: (player.x + player.size / 2) + Math.cos(angleRad) * offset,
            y: (player.y + player.size / 2) + Math.sin(angleRad) * offset,
            size: 20,
            speed: 6,
            team: player.team,
            src: items.c4,
            dx: Math.cos(angleRad),
            dy: Math.sin(angleRad),
            damage: 31, //EXPERIMEnTAL
            timing: 20,
            hold: 60,
            activated: false,
          };
          c4s.push(c4);
}
function throwIncendiary(player){
  const angleRad = (player.angle + 90) * Math.PI / 180;
  const offset = player.size / 2;
  var grenade = {
            x: (player.x + player.size / 2) + Math.cos(angleRad) * offset,
            y: (player.y + player.size / 2) + Math.sin(angleRad) * offset,
            size: 20,
            speed: 13,
            src: items.incendiary,
            dx: Math.cos(angleRad),
            dy: Math.sin(angleRad),
            damage: 6,
            timing: 1501,
            frame: 1,
            exploded: false,
            ricochet: false,
          };
          incendiaries.push(grenade);
}
function throwConcussion(player){
  const angleRad = (player.angle + 90) * Math.PI / 180;
  const offset = player.size / 2;
  var grenade = {
            x: (player.x + player.size / 2) + Math.cos(angleRad) * offset,
            y: (player.y + player.size / 2) + Math.sin(angleRad) * offset,
            size: 20,
            speed: 13,
            src: items.concussion,
            dx: Math.cos(angleRad),
            dy: Math.sin(angleRad),
            timing: 100,
            ricochet: false,
          };
          concussions.push(grenade);
}
function shootRocket(player){
  const angleRad = (player.angle + 90) * Math.PI / 180;
  const offset = player.size / 2;
  var rocket = {
            x: (player.x + player.size / 2) + Math.cos(angleRad) * offset,
            y: (player.y + player.size / 2) + Math.sin(angleRad) * offset,
            width: 10,
            height: 10,
            drawwidth: 10,
            drawheight: 40,
            speed: 0,
            src: items.rocket,
            dx: Math.cos(angleRad),
            dy: Math.sin(angleRad),
            angle: ((player.angle + 90) * Math.PI / 180) + (-Math.PI / 2),
            damage: 45,
            timing: 20,
            explode: false,
          };
          rockets.push(rocket);
          playSound(audio.rocketlaunch)
}
function launchDrone(player, target){
  const angleRad = (player.angle + 90) * Math.PI / 180;
  const offset = player.size / 2;
  var drone = {
            team: player.team,
            x: (player.x + player.size / 2) + Math.cos(angleRad) * offset,
            y: (player.y + player.size / 2) + Math.sin(angleRad) * offset,
            size: 50,
            speed: 5.3,
            src: items.drone,
            dx: Math.cos(angleRad),
            dy: Math.sin(angleRad),
            angle: ((player.angle + 90) * Math.PI / 180) + (-Math.PI / 2),
            //friend: player,
            target: target,
            crashed: false,
          };
          drones.push(drone);
}
function findEnemy(player, i){
  let is = i;
  if(players[i].team === player.team && player.alive){
    is++
    return findEnemy(player, is)
  }
  else {
    return players[i];
  }
}

function damagePlayersInArea(x, y, width, height, damage){
  players.forEach(player => {
    if(x + width > player.x + (player.size / 3) &&
      x < (player.x + (player.size / 3)) + (player.size / 3) &&
      y + height > player.y + (player.size / 3) &&
      y < (player.y + (player.size / 3)) + (player.size / 3)
  ){
      player.health -= damage;
      loadPlayerImage(player);
      if(bloodOn){
      for(var i = 0; i < Math.floor(damage / 10); i++){
        var nblood = {
      x: (player.x + (player.size / 2) + (Math.random() - 0.5) * 75),
      y: (player.y + (player.size / 2) + (Math.random() - 0.5) * 75),
      size: 0,
      maxSize: Math.floor(Math.random() * (10 - 5) + 5),
      }
      blood.push(nblood);
    }
  }
    }
  });
  colorMonitor()
}
function findPlayersInArea(x, y, width, height){
  var playersInArea = [];
  players.forEach(player => {
    if(x + width > player.x + (player.size / 3) &&
      x < (player.x + (player.size / 3)) + (player.size / 3) &&
      y + height > player.y + (player.size / 3) &&
      y < (player.y + (player.size / 3)) + (player.size / 3)
  ){
    playersInArea.push(player);
  }
  });
  return playersInArea;
}

function colorMonitor(){
  if(players[0].health <= 100){
    $(".playerOneHealth").css("filter", `sepia(${((players[0].health - 100) * -1) / 100}) hue-rotate(-50deg) saturate(3)`)
  }
  else $(".playerOneHealth").css("filter", `sepia(0) hue-rotate(-50deg) saturate(3)`);
  if(players[1].health <= 100){
    $(".playerTwoHealth").css("filter", `sepia(${((players[1].health - 100) * -1) / 100}) hue-rotate(-50deg) saturate(3)`)
  }
  else $(".playerTwoHealth").css("filter", `sepia(0) hue-rotate(-50deg) saturate(3)`);

  if(players[0].health < 0){
      $(".playerOneHealth img").attr("src", "Sprites/flatline.gif");
  }
  else $(".playerOneHealth img").attr("src", "Sprites/monitor.gif");
  if(players[1].health < 0){
    $(".playerTwoHealth img").attr("src", "Sprites/flatline.gif");
  }
  else $(".playerTwoHealth img").attr("src", "Sprites/monitor.gif");
}

function mortarStrike(){

}

//END GAME

function missileStrike(){
  let x = Math.floor(Math.random() * ((window.innerWidth - 100) + 100));
  let y = Math.floor(Math.random() * ((window.innerHeight - 100) + 100));

  playSound(audio.helicopter)
  playSound(audio.rocketlaunch)

  let strike = {
    x: x,
    y: y,
    src: effects.explosion2[0],
    size: 350,
    damage: 75,
    timing: 51,
    frame: 0,
  }
  missileStrikes.push(strike);

  $(".helicopter").css("top", `${y - 350}px`)
  $(".helicopter").addClass("flyBy");
  setTimeout(() => {
    $(".helicopter").removeClass("flyBy");
  }, 1000);
}
function gunRun(){
  let x = Math.floor(Math.random() * ((window.innerWidth - 700)));
  let y = Math.floor(Math.random() * ((window.innerHeight - 100) + 100));

  playSound(audio.flyby)
  playSound(audio.gunrun)

  for(var i = 0; i < 15; i++){
    let gunrun = {
    x: x + (i * 100),
    y: y,
    src: "",
    size: 200,
    damage: 20,
    timing: 51 + (i * 5),
  }
  gunRuns.push(gunrun);
  }

  setTimeout(() => {
    $(".helicopter").css("top", `${y - 350}px`)
  $(".helicopter").addClass("flyBy");
  setTimeout(() => {
    $(".helicopter").removeClass("flyBy");
  }, 1000);
  }, 1000);
}
setInterval(() => {
  if(time <= 0 && gameLive){
  gunRun();
  }
}, 5000);
setInterval(() => {
  if(time <= 0 && gameLive){
  missileStrike();
  }
}, 7500);

//- - - - - - - - - - - - - - - - - - - - - - - - - - - 

// - - - - - - - - - - - - - - - - - - - MENU - - - - - - - - - - - - - - - - - - - - -

let menuItems = [
  {
    type: "local",
    name: "1",
    activated: true,
    left: null,
    right: null,
    up: null,
    down: "2",
    select: () => {
      loadLocalPlay();
    },
    activate: () => {
      $(".local").css("background", "linear-gradient(to right, white, rgba(0, 0, 0, 0))");
      $(".campaign").css("background", "none");
      $(".battle").css("background", "none");
      $(".settingsOption").css("background", "none");
    },
  },
  {
    type: "campaign",
    name: "2",
    activated: false,
    left: null,
    right: null,
    up: "1",
    down: "3",
    select: () => {
      
    },
    activate: () => {
      $(".campaign").css("background", "linear-gradient(to right, white, rgba(0, 0, 0, 0))");
      $(".local").css("background", "none");
      $(".battle").css("background", "none");
      $(".settingsOption").css("background", "none");
    },
  },
  {
    type: "battle",
    name: "3",
    activated: false,
    left: null,
    right: null,
    up: "2",
    down: "4",
    select: () => {
      
    },
    activate: () => {
      $(".battle").css("background", "linear-gradient(to right, white, rgba(0, 0, 0, 0))");
      $(".local").css("background", "none");
      $(".campaign").css("background", "none");
      $(".settingsOption").css("background", "none");
    },
  },
  {
    type: "settingsOption",
    name: "4",
    activated: false,
    left: null,
    right: null,
    up: "3",
    down: null,
    select: () => {
      inSettings = true;
      $(".settings").css({
        "opacity": 1,
        "z-index": 12,
      });
      loadSettings();
    },
    activate: () => {
      $(".settingsOption").css("background", "linear-gradient(to right, white, rgba(0, 0, 0, 0))");
      $(".local").css("background", "none");
      $(".battle").css("background", "none");
      $(".campaign").css("background", "none");
    },
  },
  {
    type: "ambienceAudio",
    name: "1s",
    activated: false,
    left: function(){
      let value = $("#ambienceAudio").val();
      let newValue = Number(value) - 0.1;
      $("#ambienceAudio").val(newValue);
      adjustAmbienceVolume();
    },
    right: function(){
      let value = $("#ambienceAudio").val();
      let newValue = Number(value) + 0.1;
      $("#ambienceAudio").val(newValue);
      adjustAmbienceVolume();
    },
    up: null,
    down: "2s",
    select: () => {
      
    },
    activate: () => {
      $(".settings div").css("border", "none");
      $(".ambienceAudio").css("border", "2px solid white");
    },
  },
  {
    type: "effectsAudio",
    name: "2s",
    activated: false,
    left: function(){
      let value = $("#effectsAudio").val();
      let newValue = Number(value) - 0.1;
      $("#effectsAudio").val(newValue);
      adjustEffectsVolume();
    },
    right: function(){
      let value = $("#effectsAudio").val();
      let newValue = Number(value) + 0.1;
      $("#effectsAudio").val(newValue);
      adjustEffectsVolume();
    },
    up: "1s",
    down: "3s",
    select: () => {
      
    },
    activate: () => {
      $(".settings div").css("border", "none");
      $(".effectsAudio").css("border", "2px solid white");
    },
  },
  {
    type: "bloodChoice",
    name: "3s",
    activated: false,
    left: function(){
      
    },
    right: function(){
      
    },
    up: "2s",
    down: "4s",
    select: () => {
      if($("#bloodChoice").prop("checked")){
        $("#bloodChoice").prop("checked", false);
        bloodOn = false;
      }
      else {
        $("#bloodChoice").prop("checked", true);
        bloodOn = true;
      }
    },
    activate: () => {
      $(".settings div").css("border", "none");
      $(".bloodChoice").css("border", "2px solid white");
    },
  },
  {
    type: "controlSetting",
    name: "4s",
    activated: false,
    left: function(){
      
    },
    right: function(){
      
    },
    up: "3s",
    down: null,
    select: () => {
      inControls = true;
      $(".controls").css({
        "z-index": 14,
        "opacity": 1,
      })
    },
    activate: () => {
      $(".settings div").css("border", "none");
      $(".controlSetting").css("border", "2px solid white");
    },
  },
  {
    type: "dodCard",
    name: "1c",
    activated: false,
    left: null,
    right: "2c",
    up: null,
    down: null,
    select: () => {
      
    },
    activate: () => {
      $(".dodCard").removeClass("blurIn");
      $(".dodCard").removeClass("blurOut");
      $(".casualCard").removeClass("blurIn");
      $(".casualCard").removeClass("blurOut");

      $(".dodCard").addClass("blurOut");
      $(".casualCard").addClass("blurIn");
    },
  },
  {
    type: "casualCard",
    name: "2c",
    activated: false,
    left: "1c",
    right: null,
    up: null,
    down: null,
    select: () => {
      $(".transitiontwo").addClass("fade-in-out");

      setTimeout(() => {
        gameLive = false;
        inMenus = true;
        inLoadout = true;
        inLocalPlay = false;
        $(".loadoutScreen").css("z-index", 10);
        $(".loadoutScreen").css("opacity", 1);
        $(".loadoutScreen").css("display", "block");
        $(".menu").css("z-index", -1);
        $(".menu").css("opacity", 0);
        loadLoadoutScreen("p1");
        loadLoadoutScreen("p2");
        rounds = -1;
      }, 2000);
      setTimeout(() => {
        $(".transitiontwo").removeClass("fade-in-out");
      }, 4000);
    },
    activate: () => {
      $(".dodCard").removeClass("blurIn");
      $(".dodCard").removeClass("blurOut");
      $(".casualCard").removeClass("blurIn");
      $(".casualCard").removeClass("blurOut");

      $(".dodCard").addClass("blurIn");
      $(".casualCard").addClass("blurOut");
    },
  },
];
let loadoutItems = [
  [
      {
    type: "primarySlot",
    name: "1l",
    activated: false,
    left: null,
    right: "2l",
    up: null,
    down: "3l",
    select: () => {
      loadPrimaryScreen("p1");
    },
  },
  {
    type: "secondarySlot",
    name: "2l",
    activated: false,
    left: "1l",
    right: null,
    up: null,
    down: "4l",
    select: () => {loadSecondaryScreen("p1")}, //THEN MOVE FOCUS TO NEW ITEM
  },
  {
    type: "primaryAttachmentSlot",
    name: "3l",
    activated: false,
    left: null,
    right: "4l",
    up: "1l",
    down: "5l",
    select: (player) => {
      loadPrimaryAttachmentScreen("p1", player)
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
  {
    type: "secondaryAttachmentSlot",
    name: "4l",
    activated: false,
    left: "3l",
    right: null,
    up: "2l",
    down: "7l",
    select: (player) => {
      loadSecondaryAttachmentScreen("p1", player)
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
  {
    type: "item1Slot",
    name: "5l",
    activated: false,
    left: null,
    right: "6l",
    up: "3l",
    down: "8l",
    select: (player) => {
      loadItem1Screen("p1");
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
  {
    type: "item2Slot",
    name: "6l",
    activated: false,
    left: "5l",
    right: "7l",
    up: "4l",
    down: "8l",
    select: (player) => {
      loadItem2Screen("p1")
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
 {
    type: "armorSlot",
    name: "7l",
    activated: false,
    left: "6l",
    right: null,
    up: "4l",
    down: "9l",
    select: (player) => {
      //console.log(player)
      loadArmorScreen("p1");
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
   {
    type: "appearanceSlot",
    name: "8l",
    activated: false,
    left: null,
    right: "9l",
    up: "5l",
    down: null,
    select: (player) => {
      loadAppearanceScreen("p1");
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
  {
    type: "readyButton",
    name: "9l",
    activated: false,
    left: "8l",
    right: null,
    up: "7l",
    down: null,
    select: (player) => {
      if(player.team === 1 && !playerOneReady && !starting){
        playerOneReady = true;
        audio.ready.play();
        $(".p1 .readyButton").css("background", "limegreen").text("READY!");
      }
      else if(player.team === 1 && playerOneReady && !starting){
        playerOneReady = false;
        $(".p1 .readyButton").css("background", "red").text("READY?");
      }
      if(player.team === 2 && !playerTwoReady && !starting){
        playerTwoReady = true;
        playSound(audio.ready);
        $(".p2 .readyButton").css("background", "limegreen").text("READY!");
      }
      else if(player.team === 2 && playerTwoReady && !starting){
        playerTwoReady = false;
        $(".p2 .readyButton").css("background", "red").text("READY?");
      }
      if(playerOneReady && !starting){ //REVERT BACK TO NORMAL
        starting = true;
        players[0].score = 0;
        players[1].score = 0;
        if(players[0].Item2 === "shield"){
          players[0].secondary.accuracy -= 1;
        }
        if(players[1].Item2 === "shield"){
          players[1].secondary.accuracy -= 1;
        }
        adjustGuns();
        $(".transitiontwo").addClass("fade-in-out");
        setTimeout(() => {
        $(".p1 .readyButton").css("background", "red").text("READY?");
        $(".p2 .readyButton").css("background", "red").text("READY?");
          starting = false;
          loadGame();
          clearSounds();
        }, 2000);
        setTimeout(() => {
          $(".transitiontwo").removeClass("fade-in-out");
        }, 4000)
      }
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
  ],
  [
    {
    type: "primarySlot",
    name: "1l",
    activated: true,
    left: null,
    right: "2l",
    up: null,
    down: "3l",
    select: () => {
      loadPrimaryScreen("p2");
    },
  },
  {
    type: "secondarySlot",
    name: "2l",
    activated: false,
    left: "1l",
    right: null,
    up: null,
    down: "4l",
    select: () => {loadSecondaryScreen("p2")}, //THEN MOVE FOCUS TO NEW ITEM
  },
  {
    type: "primaryAttachmentSlot",
    name: "3l",
    activated: false,
    left: null,
    right: "4l",
    up: "1l",
    down: "5l",
    select: (player) => {
      loadPrimaryAttachmentScreen("p2", player)
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
  {
    type: "secondaryAttachmentSlot",
    name: "4l",
    activated: false,
    left: "3l",
    right: null,
    up: "2l",
    down: "7l",
    select: (player) => {
      loadSecondaryAttachmentScreen("p2", player)
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
  {
    type: "item1Slot",
    name: "5l",
    activated: false,
    left: null,
    right: "6l",
    up: "3l",
    down: "8l",
    select: (player) => {
      loadItem1Screen("p2");
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
  {
    type: "item2Slot",
    name: "6l",
    activated: false,
    left: "5l",
    right: "7l",
    up: "4l",
    down: "8l",
    select: (player) => {
      loadItem2Screen("p2")
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
 {
    type: "armorSlot",
    name: "7l",
    activated: false,
    left: "6l",
    right: null,
    up: "4l",
    down: "9l",
    select: (player) => {
      //console.log(player)
      loadArmorScreen("p2");
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
   {
    type: "appearanceSlot",
    name: "8l",
    activated: false,
    left: null,
    right: "9l",
    up: "5l",
    down: null,
    select: (player) => {
      loadAppearanceScreen("p2");
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
  {
    type: "readyButton",
    name: "9l",
    activated: false,
    left: "8l",
    right: null,
    up: "7l",
    down: null,
    select: (player) => {
      if(player.team === 1 && !playerOneReady && !starting){
        playerOneReady = true;
        playSound(audio.ready)
        $(".p1 .readyButton").css("background", "limegreen").text("READY!");
      }
      else if(player.team === 1 && playerOneReady && !starting){
        playerOneReady = false;
        $(".p1 .readyButton").css("background", "red").text("READY?");
      }
      if(player.team === 2 && !playerTwoReady && !starting){
        playerTwoReady = true;
        audio.ready.play();
        $(".p2 .readyButton").css("background", "limegreen").text("READY!");
      }
      else if(player.team === 2 && playerTwoReady && !starting){
        playerTwoReady = false;
        $(".p2 .readyButton").css("background", "red").text("READY?");
      }
      if(playerOneReady && playerTwoReady && !starting){
        starting = true;
        players[0].score = 0;
        players[1].score = 0;
        $(".p1 .readyButton").css("background", "red").text("READY?");
        $(".p2 .readyButton").css("background", "red").text("READY?");
        if(players[0].Item2 === "shield"){
          players[0].secondary.accuracy -= 1;
        }
        if(players[1].Item2 === "shield"){
          players[1].secondary.accuracy -= 1;
        }
        adjustGuns();
        $(".transitiontwo").addClass("fade-in-out");
        setTimeout(() => {
          starting = false;
          loadGame();
          clearSounds();
        }, 2000);
        setTimeout(() => {
          $(".transitiontwo").removeClass("fade-in-out");
        }, 4000)
      }
    }, //THEN MOVE FOCUS TO NEW ITEM
  },
  ],
];
for(var p = 0; p < guns.length; p++){
  if(guns[p].type === "smg" || guns[p].type === "rifle" || guns[p].type === "sniper"){
  var item = {
    type: `primarySlot:nth-child(${p})`,
    name: `${p}p`,
    activated: false,
    left: null,
    right: null,
    up: null,
    down: null,
    select: function(player, gun){
      player.primary = structuredClone(gun);
      player.primary.icon = gunIcons[gun.icon];
      player.primary.sound = gunAudio[gun.icon];
      loadLoadoutScreen(`p${player.team}`);
      playSound(audio.equip);
    }, //THEN MOVE FOCUS TO NEW ITEM
  }
  item.gun = guns[p];
  if(p !== 0 && p !== guns.length){
    if(guns[p-1]?.type && guns[p-1]?.type === "smg" || guns[p-1]?.type === "rifle" || guns[p-1]?.type === "sniper"){
      item.up = `${p-1}p`;
    }
    if(guns[p+1]?.type && guns[p+1]?.type === "smg" || guns[p+1]?.type === "rifle" || guns[p+1]?.type === "sniper"){
      item.down = `${p+1}p`;
    }
  }
  loadoutItems[0].push(item);
  loadoutItems[1].push(item);
 }
}
for(var s = 0; s < guns.length; s++){
  if(guns[s].type === "pistol"){
  var item = {
    type: `secondarySlot:nth-child(${s+2})`,
    name: `${s}s`,
    activated: false,
    left: null,
    right: null,
    up: null,
    down: null,
    select: function(player, gun){
      player.secondary = structuredClone(gun);
      player.secondary.icon = gunIcons[gun.icon];
      player.secondary.sound = gunAudio[gun.icon];
      loadLoadoutScreen(`p${player.team}`);
      playSound(audio.equip);
    }, //THEN MOVE FOCUS TO NEW ITEM
  }
  item.gun = guns[s];
    if(guns[s-1]?.type && guns[s-1]?.type === "pistol"){
      item.up = `${s-1}s`;
    }
    if(guns[s+1]?.type && guns[s+1]?.type === "pistol"){
      item.down = `${s+1}s`;
    }
  loadoutItems[0].push(item);
  loadoutItems[1].push(item);
 }
}
for(var k = 0; k < loadoutMenuItems.length; k++){
  loadoutItems[0].push(loadoutMenuItems[k])
  loadoutItems[1].push(loadoutMenuItems[k])
}
var t = -1;
for(let key in playerImages){
  if(key === "src") continue;
  t++
  var item = {
    type: `appearanceSlot:nth-child(${t+1})`,
    name: `${t}ap`,
    activated: false,
    left: null,
    right: null,
    up: null,
    down: null,
    src: playerImages.src[key],
    select: function(player){
      player.styles = playerImages[key];
      player.src = playerImages[key][0];
      player.appearance = playerImages.src[key];
      loadLoadoutScreen(`p${player.team}`);
      playSound(audio.equip);
    }, //THEN MOVE FOCUS TO NEW ITEM
  }
  if(t % 2 === 0 && t !== 0 && t !== 12 && t !== 1){
    item.down = `${t + 2}ap`;
    item.up = `${t - 2}ap`;
    item.right = `${t + 1}ap`;
  }
  if(t % 2 !== 0 && t !== 0 && t !== 11 && t !== 12){
    item.left = `${t - 1}ap`;
    item.up = `${t - 2}ap`;
    item.down = `${t + 2}ap`;
  }
  if(t === 0){
    item.right = "1ap";
    item.down = "2ap";
  }
  if(t === 11){
    item.left = `${t - 1}ap`;
    //item.right = `${t + 1}ap`;
    item.up = `${t - 2}ap`;
  }
  if(t === 12){
    item.up = `${t - 2}ap`;
  }
  if(t === 1){
    item.left = `${t - 1}ap`;
    item.down = `${t + 2}ap`;
  }
  loadoutItems[0].push(item);
  loadoutItems[1].push(item);
}
//console.log(loadoutItems[0])

function moveFocusMenu(array, newSpot){
  for(var i = 0; i < array.length; i++){
    if(array[i].activated && array[i].name !== newSpot){
      array[i].activated = false;
    }
    if(array[i].name === newSpot){
      array[i].activated = true;
      array[i].activate();
    }
  }
}

function moveFocus(array, newSpot, p, direction){
  for(var i = 0; i < array.length; i++){
    if(array[i].activated && array[i].name !== newSpot){
      array[i].activated = false;
      $(`.${p} .${array[i].type}`).css("border", "2px solid #222");

      if(direction === "down" && array[i+1]?.name[1] === "p" && array[i+1]?.name[2] !== "a"){
        $(`.${p} .primarySlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value - (window.innerHeight * 0.25);
          return new_value + "px";
        });
        displayStats(array[i+1].gun, p)
      }
      if(direction === "up" && array[i-1]?.name[1] === "p" && array[i-1]?.name[2] !== "a"){
        $(`.${p} .primarySlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value + (window.innerHeight * 0.25);
          return new_value + "px";
        });
         displayStats(array[i-1].gun, p)
      }

      if(direction === "down" && array[i+1]?.name[1] === "s" && array[i+1]?.name[2] !== "a"){
        $(`.${p} .secondarySlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value - (window.innerHeight * 0.25);
          return new_value + "px";
        });
        displayStats(array[i+1].gun, p)
      }
      if(direction === "up" && array[i-1]?.name[1] === "s" && array[i-1]?.name[2] !== "a"){
        $(`.${p} .secondarySlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value + (window.innerHeight * 0.25);
          return new_value + "px";
        });
         displayStats(array[i-1].gun, p)
      }

      if(direction === "down" && array[i+1]?.name[1] + array[i+1]?.name[2] === "pa"){
        $(`.${p} .primaryAttachmentSlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value - (window.innerHeight * 0.25);
          return new_value + "px";
        });
        $(`.${p} .sidebar .description`).text(array[i+1].description);
      }
      if(direction === "up" && array[i-1]?.name[1] + array[i-1]?.name[2] === "pa"){
        $(`.${p} .primaryAttachmentSlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value + (window.innerHeight * 0.25);
          return new_value + "px";
        });
        $(`.${p} .sidebar .description`).text(array[i-1].description);
      }

      if(direction === "down" && array[i+1]?.name[1] + array[i+1]?.name[2] === "sa"){
        $(`.${p} .secondaryAttachmentSlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value - (window.innerHeight * 0.25);
          return new_value + "px";
        });
        $(`.${p} .sidebar .description`).text(array[i+1].description);
      }
      if(direction === "up" && array[i-1]?.name[1] + array[i-1]?.name[2] === "sa"){
        $(`.${p} .secondaryAttachmentSlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value + (window.innerHeight * 0.25);
          return new_value + "px";
        });
        $(`.${p} .sidebar .description`).text(array[i-1].description);
      }

      if(direction === "down" && array[i+1]?.name[2] === "1"){
        $(`.${p} .item1Slot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value - (window.innerHeight * 0.25);
          return new_value + "px";
        });
        $(`.${p} .sidebar .description`).text(array[i+1].description);
        $(`.${p} .sidebar .name`).text(array[i+1].displayname);
      }
      if(direction === "up" && array[i-1]?.name[2] === "1"){
        $(`.${p} .item1Slot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value + (window.innerHeight * 0.25);
          return new_value + "px";
        });
        $(`.${p} .sidebar .description`).text(array[i-1].description);
        $(`.${p} .sidebar .name`).text(array[i-1].displayname);
      }

      if(direction === "down" && array[i+1]?.name[2] === "2"){
        $(`.${p} .item2Slot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value - (window.innerHeight * 0.25);
          return new_value + "px";
        });
        $(`.${p} .sidebar .description`).text(array[i+1].description);
        $(`.${p} .sidebar .name`).text(array[i+1].displayname);
      }
      if(direction === "up" && array[i-1]?.name[2] === "2"){
        $(`.${p} .item2Slot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value + (window.innerHeight * 0.25);
          return new_value + "px";
        });
        $(`.${p} .sidebar .description`).text(array[i-1].description);
        $(`.${p} .sidebar .name`).text(array[i-1].displayname);
      }

      if(direction === "down" && array[i+1]?.name[1] + array[i+1]?.name[2] === "ar"){
        $(`.${p} .armorSlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value - (window.innerHeight * 0.25);
          return new_value + "px";
        });
        $(`.${p} .sidebar .description`).text(array[i+1].description);
        $(`.${p} .sidebar .name`).text(array[i+1].displayname);
      }
      if(direction === "up" && array[i-1]?.name[1] + array[i-1]?.name[2] === "ar"){
        $(`.${p} .armorSlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value + (window.innerHeight * 0.25);
          return new_value + "px";
        });
        $(`.${p} .sidebar .description`).text(array[i-1].description);
        $(`.${p} .sidebar .name`).text(array[i-1].displayname);
      }

      if(direction === "down" && array[i+1]?.name[1] + array[i+1]?.name[2] === "ap"){
        $(`.${p} .appearanceSlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value - (window.innerHeight * 0.25);
          return new_value + "px";
        });
      }
      if(direction === "up" && array[i-1]?.name[1] + array[i-1]?.name[2] === "ap"){
        $(`.${p} .appearanceSlot`).css("top", function(index, currentvalue){
          let current_value = parseInt(currentvalue, 10);
          let new_value = current_value + (window.innerHeight * 0.25);
          return new_value + "px";
        });
      }

    }
    if(array[i].name === newSpot){
      array[i].activated = true;
      $(`.${p} .${array[i].type}`).css("border", "2px solid white");
    }
  }

}
function displayStats(item, side){
  $(`.${side} .sidebar .name`).text(item.name);
  $(`.${side} .sidebar .ammoCapacity`).css("background", `linear-gradient(
    to right, 
    #4CAF50 ${item.ammoCountOG}%,
    #999 ${item.ammoCountOG}%  
  )`);
  $(`.${side} .sidebar .accuracy`).css("background", `linear-gradient(
    to right, 
    #4CAF50 ${item.accuracy * 20}%,
    #999 ${item.accuracy * 20}%  
  )`);
  $(`.${side} .sidebar .damage`).css("background", `linear-gradient(
    to right, 
    #4CAF50 ${item.damage * 20}%,
    #999 ${item.damage * 20}% 
  )`);
  $(`.${side} .sidebar .weight`).css("background", `linear-gradient(
    to right, 
    #4CAF50 ${item.weight * 20}%,
    #999 ${item.weight * 20}%
  )`);
  $(`.${side} .sidebar .rateOfFire`).css("background", `linear-gradient(
    to right, 
    #4CAF50 ${(2500 - item.rateOfFire) / 30}%,
    #999 ${(2500 - item.rateOfFire) / 30}% 
  )`);
}

function loadLoadoutScreen(side){
  loadoutItems[Number(side[1]-1)] = loadoutItems[Number(side[1]-1)].filter(item => {
    if(item.name[1] + item.name[2] === "pa" || item.name[1] + item.name[2] === "sa"){
      return false;
    }
    else return true;
  });

  $(`.${side}`).empty();
  $("<div>").addClass("primarySlot").appendTo(`.${side}`);
  let primaryAttachmentSlot = $("<div>").addClass("primaryAttachmentSlot").appendTo(`.${side}`);
  primaryAttachmentSlot.css({
    "top": "27.5%",
    "margin-left": "5%",
  })
  let secondarySlot = $("<div>").addClass("secondarySlot").appendTo(`.${side}`);
  secondarySlot.css("margin-left", "30%");
  let secondaryAttachmentSlot = $("<div>").addClass("secondaryAttachmentSlot").appendTo(`.${side}`);
  secondaryAttachmentSlot.css({
    "top": "27.5%",
    "margin-left": "32%",
  })
  $("<div>").addClass("item1Slot").appendTo(`.${side}`);
  $("<div>").addClass("item2Slot").appendTo(`.${side}`);
  $("<div>").addClass("armorSlot").appendTo(`.${side}`);
  $("<div>").addClass("appearanceSlot").appendTo(`.${side}`);
  $("<div>").addClass("readyButton").text("READY?").appendTo(`.${side}`);

  $("<img>").attr("src", players[Number(side[1] - 1)].primary.iconsrc).appendTo(`.${side} .primarySlot`);
  if(players[Number(side[1] - 1)]?.primary.attachments.laser){
    $("<img>").attr("src", "Sprites/items/laser.png").appendTo(`.${side} .primaryAttachmentSlot`);
  }
  if(players[Number(side[1] - 1)]?.primary.attachments.grip){
    $("<img>").attr("src", "Sprites/items/grip.png").appendTo(`.${side} .primaryAttachmentSlot`);
  }
  if(players[Number(side[1] - 1)]?.primary.attachments.extendedMag){
    $("<img>").attr("src", "Sprites/items/rifleExtended.png").appendTo(`.${side} .primaryAttachmentSlot`);
  }
  $("<img>").attr("src", players[Number(side[1] - 1)].secondary.iconsrc).appendTo(`.${side} .secondarySlot`);
  if(players[Number(side[1] - 1)]?.secondary.attachments.laser){
    $("<img>").attr("src", "Sprites/items/laser.png").appendTo(`.${side} .secondaryAttachmentSlot`);
  }
  if(players[Number(side[1] - 1)]?.secondary.attachments.grip){
    $("<img>").attr("src", "Sprites/items/grip.png").appendTo(`.${side} .secondaryAttachmentSlot`);
  }
  if(players[Number(side[1] - 1)]?.secondary.attachments.extendedMag){
    $("<img>").attr("src", "Sprites/items/pistolExtended.png").appendTo(`.${side} .secondaryAttachmentSlot`);
  }
  $("<img>").attr("src", players[Number(side[1] - 1)].Item1Iconsrc).appendTo(`.${side} .item1Slot`);
  $("<img>").attr("src", players[Number(side[1] - 1)].Item2Iconsrc).appendTo(`.${side} .item2Slot`);
  $("<img>").attr("src", players[Number(side[1] - 1)].armorIcon).appendTo(`.${side} .armorSlot`);
  $("<img>").attr("src", players[Number(side[1] - 1)].appearance).appendTo(`.${side} .appearanceSlot`);

  moveFocus(loadoutItems[Number(side[1])-1], "1l", side);
}

function adjustGuns(){
  players.forEach(player => {
    player.primary.maxAmmo = player.primary.OGammo;
    player.primary.ammo = player.primary.OGammo;
    player.secondary.maxAmmo = player.secondary.OGammo;
    player.secondary.ammo = player.secondary.OGammo;
    player.primary.accuracy = player.primary.OGaccuracy;
    player.secondary.accuracy = player.secondary.OGaccuracy;

    if(player.primary.attachments.grip){
      player.primary.accuracy++
    }
    if(player.primary.attachments.extendedMag){
      player.primary.ammo = Math.ceil(player.primary.ammo * 1.75);
      player.primary.maxAmmo = Math.ceil(player.primary.maxAmmo * 1.75);
    }
    if(player.secondary.attachments.grip){
      player.secondary.accuracy++
    }
    if(player.secondary.attachments.extendedMag){
      player.secondary.ammo = Math.ceil(player.secondary.ammo * 1.75);
      player.secondary.maxAmmo = Math.ceil(player.secondary.maxAmmo * 1.75);
    }
  });
}

function loadPrimaryScreen(side){
  let c = -1;
  let newSlot = null;
  let gun = null;
  while(newSlot === null){
    c++
    if(String(loadoutItems[Number(side[1])-1][c].name)[1] === "p"){
      newSlot = loadoutItems[Number(side[1])-1][c].name;
      gun = loadoutItems[Number(side[1])-1][c].gun;
    }
  }
  moveFocus(loadoutItems[Number(side[1])-1], newSlot, side);
  $(`.${side}`).empty();
  let sidebar = $("<div>").addClass("sidebar").appendTo(`.${side}`);
  $("<div>").addClass("name").text("").appendTo(sidebar);
  $("<div>").addClass("ammoCapacity").text("Ammo Capacity").appendTo(sidebar);
  $("<div>").addClass("accuracy").text("Accuracy").appendTo(sidebar);
  $("<div>").addClass("damage").text("Damage").appendTo(sidebar);
  $("<div>").addClass("weight").text("Weight").appendTo(sidebar);
  $("<div>").addClass("rateOfFire").text("Rate of Fire").appendTo(sidebar);
  let set = 0;
    for(var i = 0; i < guns.length; i++){
    if(guns[i].type === "smg"){
      set++
      let option = $("<div>").addClass("primarySlot").css("top", `${(25 * set) - 15}%`).appendTo(`.${side}`);
      $("<img>").attr("src", guns[i].iconsrc).appendTo(option)
    }
  }
  for(var i = 0; i < guns.length; i++){
    if(guns[i].type === "rifle"){
      set++
      let option = $("<div>").addClass("primarySlot").css("top", `${(25 * set) - 15}%`).appendTo(`.${side}`);
      $("<img>").attr("src", guns[i].iconsrc).appendTo(option)
    }
  }
  for(var i = 0; i < guns.length; i++){
    if(guns[i].type === "sniper"){
      set++
      let option = $("<div>").addClass("primarySlot").css("top", `${(25 * set) - 15}%`).appendTo(`.${side}`);
      $("<img>").attr("src", guns[i].iconsrc).appendTo(option)
    }
  }
  $(`.${side} .primarySlot`).css("border", "2px solid #222");
  $(`.${side} .primarySlot:nth-child(2)`).css("border", "2px solid white")
}

function loadSecondaryScreen(side){
  let c = -1;
  let newSlot = null;
  let gun = null;
  while(newSlot === null){
    c++
    if(String(loadoutItems[Number(side[1])-1][c].name)[1] === "s"){
      newSlot = loadoutItems[Number(side[1])-1][c].name;
      gun = loadoutItems[Number(side[1])-1][c].gun;
    }
  }
  moveFocus(loadoutItems[Number(side[1])-1], newSlot, side);
  $(`.${side}`).empty();
  let sidebar = $("<div>").addClass("sidebar").appendTo(`.${side}`);
  $("<div>").addClass("name").text("").appendTo(sidebar);
  $("<div>").addClass("ammoCapacity").text("Ammo Capacity").appendTo(sidebar);
  $("<div>").addClass("accuracy").text("Accuracy").appendTo(sidebar);
  $("<div>").addClass("damage").text("Damage").appendTo(sidebar);
  $("<div>").addClass("weight").text("Weight").appendTo(sidebar);
  $("<div>").addClass("rateOfFire").text("Rate of Fire").appendTo(sidebar);
  let set = 0;
    for(var i = 0; i < guns.length; i++){
    if(guns[i].type === "pistol"){
      set++
      let option = $("<div>").addClass("secondarySlot").css("top", `${(25 * set) - 15}%`).appendTo(`.${side}`);
      $("<img>").attr("src", guns[i].iconsrc).appendTo(option)
    }
  }
  $(`.${side} .secondarySlot`).css("border", "2px solid #222");
  $(`.${side} .secondarySlot`).css("margin-left", "5%");
  $(`.${side} .secondarySlot:nth-child(2)`).css("border", "2px solid white")
}

function loadItem1Screen(side){
  let c = -1;
  let newSlot = null;
  while(newSlot === null){
    c++
    if(String(loadoutItems[Number(side[1])-1][c]?.name)[2] === "1"){
      newSlot = loadoutItems[Number(side[1])-1][c].name;
    }
  }
  moveFocus(loadoutItems[Number(side[1])-1], newSlot, side);
  $(`.${side}`).empty();
  let sidebar = $("<div>").addClass("sidebar").appendTo(`.${side}`);
  $("<div>").addClass("name").text("").appendTo(sidebar);
  $("<pre>").addClass("description").text("").appendTo(sidebar);
  let set = 0;
    for(var i = 0; i < loadoutItems[Number(side[1])-1].length; i++){
    if(loadoutItems[Number(side[1])-1][i]?.name[2] === "1"){
      set++
      let option = $("<div>").addClass("item1Slot").css("top", `${(25 * set) - 15}%`).appendTo(`.${side}`);
      $("<img>").attr("src", loadoutItems[Number(side[1])-1][i].src).appendTo(option)
    }
  }
  $(`.${side} .item1Slot`).css("border", "2px solid #222");
  $(`.${side} .item1Slot`).css("margin-left", "5%");
  $(`.${side} .item1Slot:nth-child(2)`).css("border", "2px solid white")
}

function loadItem2Screen(side){
  let c = -1;
  let newSlot = null;
  while(newSlot === null){
    c++
    if(String(loadoutItems[Number(side[1])-1][c]?.name)[2] === "2"){
      newSlot = loadoutItems[Number(side[1])-1][c].name;
    }
  }
  moveFocus(loadoutItems[Number(side[1])-1], newSlot, side);
  $(`.${side}`).empty();
  let sidebar = $("<div>").addClass("sidebar").appendTo(`.${side}`);
  $("<div>").addClass("name").text("").appendTo(sidebar);
  $("<pre>").addClass("description").text("").appendTo(sidebar);
  let set = 0;
    for(var i = 0; i < loadoutItems[Number(side[1])-1].length; i++){
    if(loadoutItems[Number(side[1])-1][i]?.name[2] === "2"){
      set++
      let option = $("<div>").addClass("item2Slot").css("top", `${(25 * set) - 15}%`).appendTo(`.${side}`);
      $("<img>").attr("src", loadoutItems[Number(side[1])-1][i].src).appendTo(option)
    }
  }
  $(`.${side} .item2Slot`).css("border", "2px solid #222");
  $(`.${side} .item2Slot`).css("margin-left", "5%");
  $(`.${side} .item2Slot:nth-child(2)`).css("border", "2px solid white")
}

function loadArmorScreen(side){
  let c = -1;
  let newSlot = null;
  while(newSlot === null){
    c++
    if(String(loadoutItems[Number(side[1])-1][c]?.name[1] + loadoutItems[Number(side[1])-1][c]?.name[2]) === "ar"){
      newSlot = loadoutItems[Number(side[1])-1][c].name;
    }
  }
  moveFocus(loadoutItems[Number(side[1])-1], newSlot, side);
  $(`.${side}`).empty();
  let sidebar = $("<div>").addClass("sidebar").appendTo(`.${side}`);
  $("<div>").addClass("name").text("").appendTo(sidebar);
  $("<pre>").addClass("description").text("").appendTo(sidebar);
  let set = 0;
    for(var i = 0; i < loadoutItems[Number(side[1])-1].length; i++){
    if(String(loadoutItems[Number(side[1])-1][i].name[1] + loadoutItems[Number(side[1])-1][i].name[2]) === "ar"){
      set++
      let option = $("<div>").addClass("armorSlot").css("top", `${(25 * set) - 15}%`).appendTo(`.${side}`);
      $("<img>").attr("src", loadoutItems[Number(side[1])-1][i].src).appendTo(option)
    }
  }
  $(`.${side} .armorSlot`).css("border", "2px solid #222");
  $(`.${side} .armorSlot`).css("margin-left", "5%");
  $(`.${side} .armorSlot:nth-child(2)`).css("border", "2px solid white")
}

function loadAppearanceScreen(side){
  let c = -1;
  let newSlot = null;
  while(newSlot === null){
    c++
    if(String(loadoutItems[Number(side[1])-1][c]?.name[1] + loadoutItems[Number(side[1])-1][c]?.name[2]) === "ap"){
      newSlot = loadoutItems[Number(side[1])-1][c].name;
    }
  }
  moveFocus(loadoutItems[Number(side[1])-1], newSlot, side);
  $(`.${side}`).empty();
  let setY = 1;
  let setX = -1;
    for(var i = 0; i < loadoutItems[Number(side[1])-1].length; i++){
    if(String(loadoutItems[Number(side[1])-1][i].name[1] + loadoutItems[Number(side[1])-1][i].name[2]) === "ap" || String(loadoutItems[Number(side[1])-1][i].name[2] + loadoutItems[Number(side[1])-1][i].name[3]) === "ap"){
      setX++
      if(setX === 2){
        setY++
        setX = 0;
      }
      let option = $("<div>").addClass("appearanceSlot").css({
        "top": `${(25 * setY) - 15}%`,
        "margin-left": `${(25 * setX) + 4}%`,
      }).appendTo(`.${side}`);
      $("<img>").attr("src", loadoutItems[Number(side[1])-1][i].src).appendTo(option)
    }
  }
  $(`.${side} .appearanceSlot`).css("border", "2px solid #222");
  $(`.${side} .appearanceSlot:nth-child(2)`).css("border", "2px solid white")
}

function loadPrimaryAttachmentScreen(side, player){
  let c = -1;
  let newSlot = null;
  $(`.${side}`).empty();
  let sidebar = $("<div>").addClass("sidebar").appendTo(`.${side}`);
  $("<pre>").addClass("description").text("").appendTo(sidebar);
  $(`.${side} .primaryAttachmentSlot`).css("top", "15%");
    $(`.${side} .primaryAttachmentSlot`).css("margin-left", "5%");

  let set = 0;
  
    for(var key in player.primary.attachments){
      const keys = Object.keys(player.primary.attachments);
      const index = keys.indexOf(key);
      player.primary.attachments[key] = false;
      set++
      let option = $("<div>").addClass("primaryAttachmentSlot").css("top", `${(25 * set) - 15}%`).appendTo(`.${side}`);
      if(key === "laser"){
      $("<img>").attr("src", "Sprites/items/laser.png").appendTo(option);
      var item = {
        type: `primaryAttachmentSlot:nth-child(${set+1})`,
        name: `${set}pa`,
        description: "Adds a visble laser to your rifle.",
        activated: false,
        left: null,
        right: null,
        up: null,
        down: null,
        select: function(player){
          player.primary.attachments.laser = true;
          loadLoadoutScreen(side)
        }, //THEN MOVE FOCUS TO NEW ITEM
      }
      if(index > 0){
        item.up = `${set-1}pa`;
      }
      if(index < keys.length - 1){
        item.down = `${set+1}pa`;
      }
      loadoutItems[Number(side[1])-1].push(item);
      }
      else if(key === "grip"){
      $("<img>").attr("src", "Sprites/items/grip.png").appendTo(option);
      var item = {
        type: `primaryAttachmentSlot:nth-child(${set+1})`,
        name: `${set}pa`,
        description: "Increases the accuracy of your rifle.",
        activated: false,
        left: null,
        right: null,
        up: null,
        down: null,
        select: function(player){
          player.primary.attachments.grip = true;
          loadLoadoutScreen(side)
        }, //THEN MOVE FOCUS TO NEW ITEM
      }
      if(index > 0){
        item.up = `${set-1}pa`;
      }
      if(index < keys.length - 1){
        item.down = `${set+1}pa`;
      }
      loadoutItems[Number(side[1])-1].push(item);
      }
      else if(key === "extendedMag"){
      $("<img>").attr("src", "Sprites/items/rifleExtended.png").appendTo(option);
      var item = {
        type: `primaryAttachmentSlot:nth-child(${set+1})`,
        name: `${set}pa`,
        description: "Increases the magazine capactiy of your rifle.",
        activated: false,
        left: null,
        right: null,
        up: null,
        down: null,
        select: function(player){
          player.primary.attachments.extendedMag = true;
          loadLoadoutScreen(side)
        }, //THEN MOVE FOCUS TO NEW ITEM
      }
      if(index > 0){
        item.up = `${set-1}pa`;
      }
      if(index < keys.length - 1){
        item.down = `${set+1}pa`;
      }
      loadoutItems[Number(side[1])-1].push(item);
      }
    }
  while(newSlot === null){
    c++
    if(String(loadoutItems[Number(side[1])-1][c].name)[1] + String(loadoutItems[Number(side[1])-1][c].name)[2] === "pa"){
      newSlot = loadoutItems[Number(side[1])-1][c].name;
    }
  }
    moveFocus(loadoutItems[Number(side[1])-1], newSlot, side);
  $(`.${side} .primaryAttachmentSlot`).css("border", "2px solid #222");
  $(`.${side} .primaryAttachmentSlot:nth-child(2)`).css("border", "2px solid white")
}

function loadSecondaryAttachmentScreen(side, player){
  let c = -1;
  let newSlot = null;
  $(`.${side}`).empty();
  let sidebar = $("<div>").addClass("sidebar").appendTo(`.${side}`);
  $("<pre>").addClass("description").text("").appendTo(sidebar);
  $(`.${side} .secondaryAttachmentSlot`).css("top", "15%");

  let set = 0;
  
    for(var key in player.secondary.attachments){
      const keys = Object.keys(player.secondary.attachments);
      const index = keys.indexOf(key);
      player.secondary.attachments[key] = false;
      set++
      let option = $("<div>").addClass("secondaryAttachmentSlot").css("top", `${(25 * set) - 15}%`).appendTo(`.${side}`);
      if(key === "laser"){
      $("<img>").attr("src", "Sprites/items/laser.png").appendTo(option);
      var item = {
        type: `secondaryAttachmentSlot:nth-child(${set+1})`,
        name: `${set}sa`,
        description: "Adds a visble laser to your pistol.",
        activated: false,
        left: null,
        right: null,
        up: null,
        down: null,
        select: function(player){
          player.secondary.attachments.laser = true;
          loadLoadoutScreen(side)
        }, //THEN MOVE FOCUS TO NEW ITEM
      }
      if(index > 0){
        item.up = `${set-1}sa`;
      }
      if(index < keys.length - 1){
        item.down = `${set+1}sa`;
      }
      loadoutItems[Number(side[1])-1].push(item);
      }
      else if(key === "grip"){
      $("<img>").attr("src", "Sprites/items/grip.png").appendTo(option);
      var item = {
        type: `secondaryAttachmentSlot:nth-child(${set+1})`,
        name: `${set}sa`,
        description: "Increases the accuracy of your pistol.",
        activated: false,
        left: null,
        right: null,
        up: null,
        down: null,
        select: function(player){
          player.secondary.attachments.grip = true;
          loadLoadoutScreen(side)
        }, //THEN MOVE FOCUS TO NEW ITEM
      }
      if(index > 0){
        item.up = `${set-1}pa`;
      }
      if(index < keys.length - 1){
        item.down = `${set+1}pa`;
      }
      loadoutItems[Number(side[1])-1].push(item);
      }
      else if(key === "extendedMag"){
      $("<img>").attr("src", "Sprites/items/pistolExtended.png").appendTo(option);
      var item = {
        type: `secondaryAttachmentSlot:nth-child(${set+1})`,
        name: `${set}sa`,
        description: "Increases the magazine capactiy of your pistol.",
        activated: false,
        left: null,
        right: null,
        up: null,
        down: null,
        select: function(player){
          player.secondary.attachments.extendedMag = true;
          loadLoadoutScreen(side)
        }, //THEN MOVE FOCUS TO NEW ITEM
      }
      if(index > 0){
        item.up = `${set-1}sa`;
      }
      if(index < keys.length - 1){
        item.down = `${set+1}sa`;
      }
      loadoutItems[Number(side[1])-1].push(item);
      }
    }
  while(newSlot === null){
    c++
    if(String(loadoutItems[Number(side[1])-1][c].name)[1] + String(loadoutItems[Number(side[1])-1][c].name)[2] === "sa"){
      newSlot = loadoutItems[Number(side[1])-1][c].name;
    }
  }
    moveFocus(loadoutItems[Number(side[1])-1], newSlot, side);
  $(`.${side} .secondaryAttachmentSlot`).css("border", "2px solid #222");
      $(`.${side} .secondaryAttachmentSlot`).css("margin-left", "5%");
  $(`.${side} .secondaryAttachmentSlot:nth-child(2)`).css("border", "2px solid white")
}

function loadLocalPlay(){
  menuItems[0].activated = false;
  menuItems.forEach(item => {
    if(item.type === "dodCard"){
      item.activated = true;
    }
  });
  $(".menu").children().not(".background").remove();
  $(".background").css("filter", "blur(10px)")
  let dodCard = $("<div>").addClass("dodCard fade-in").appendTo(".menu");
  $("<h1>").text("Defuse or Defend").appendTo(dodCard);
  $("<h2>").text("COMING SOON").appendTo(dodCard);
  let casCard = $("<div>").addClass("casualCard fade-in").appendTo(".menu");
  $("<h1>").text("Casual").appendTo(casCard);
  $("<h2>").text("Classic timed one on one gunfight").appendTo(casCard);
  inLocalPlay = true;
}

function loadMainMenu(){
  menuItems[0].activated = true;
  menuItems.forEach(item => {
    if(item.type === "dodCard" || item.type === "casualCard"){
      item.activated = false;
    }
  });
  $(".menu").children().not(".background").remove();
  $(".background").css("filter", "none")
  $("<div>").addClass("local fade-in").text("Classic").appendTo(".menu");
  $("<div>").addClass("campaign fade-in").text("Campaign").appendTo(".menu");
  $("<div>").addClass("battle fade-in").text("Battle Front").appendTo(".menu");
  $("<div>").addClass("settingsOption fade-in").text("Settings").appendTo(".menu");
  $("<img>").addClass("logo fade-in").attr("src", "Sprites/Logos/Standoff Logo.png").appendTo(".menu");
  inLocalPlay = false;
}

function loadSettings(){
  menuItems.forEach(item => {
    if(item.activated){
      item.activated = false;
    }
    if(item.type === "ambienceAudio" && !item.activated){
      item.activated = true;
    }
  });
}

function loadMenuBackground(){
  $(".menu .background").attr("src", posters[Math.floor(Math.random() * posters.length - 1)]);
}
setTimeout(() => {
  loadMenuBackground();
}, 2000);
$(".intro video").on('ended', () => {
  if(!videoEnded){
  $(".intro").addClass("fade-out");
  videoEnded = true;
  }
});
document.addEventListener("keydown", (e) => {
  if(e.key === " " && !videoEnded){
    $(".intro").addClass("fade-out");
    $(".intro video").prop("muted", true);
    videoEnded = true;
  }
});

/*window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});*/