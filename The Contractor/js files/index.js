//THIS FILE IS RESPONSIBLE FOR ALL THE INNER WORKINGS OF THE GAME, LIKE UPDATE, DRAW, MOVING, AND ALL THE MAIN GAME FUNCTIONS
function update(){
  let newX = player.x;
  let newY = player.y;
  
  let xFree;
  let yFree;

  if(moving.w && player.alive && !player.magicAttacking && !player.attacking && !player.defending){newY -= player.speed; playerWalk.maxDelay = player.speed * 2;}
  if(moving.a && player.alive && !player.magicAttacking && !player.attacking && !player.defending){newX -= player.speed; player.direction = -1; playerWalk.maxDelay = player.speed * 2;}
  if(moving.s && player.alive && !player.magicAttacking && !player.attacking && !player.defending){newY += player.speed; playerWalk.maxDelay = player.speed * 2;}
  if(moving.d && player.alive && !player.magicAttacking && !player.attacking && !player.defending){newX += player.speed; player.direction = 1; playerWalk.maxDelay = player.speed * 2;}

  if(!player.frozen && !moving.w && !moving.a && !moving.s && !moving.d && player.alive && moving.space && player.stamina > 0){
    player.defending = true;
    player.relaxed = false;
    player.stamina -= 0.35;
      setTimeout(() => {
        player.relaxed = true;
      }, 2500);
  }
  else {
    player.defending = false;
  }

  if(outside){

  xFree = !checkCollision(newX, player.y);
  yFree = !checkCollision(player.x, newY);

  if (xFree && newX > 0 && newX + player.width < GAME_WIDTH) player.x = newX;
  if (yFree && newY > 0 && newY + player.height < GAME_HEIGHT) player.y = newY;


      if(checkEntrance(newX, newY)){
    $(".info").text("Press Enter to Enter");
    if(moving.enter){
      $(".transitionScreen").addClass("slideUp");
    setTimeout(() => {
      clearAmbience();
      SFX.enter.currentTime = 0;
      SFX.enter.play();
      ambience.dungeon.play();
      player.x = 100;
    player.y = 75;
    outside = false;
    inside = true;
    ground = grounds.dungeon;
    $(".flashlight").css("opacity", 1);
    $(".blizzard").css("opacity", 0);
    $(".rain").css("opacity", 0);
    determineMission();
    }, 1500);
    setTimeout(() => {
      $(".transitionScreen").removeClass("slideUp");
    }, 3000);
    }
  }
  else if(checkBeacon(newX, newY)){
    $(".info").text("Press Enter to Leave");
    if(moving.enter && !player.left){
      player.left = true;
      setTimeout(() => {
        $(".transitionScreen").css("top", "0%").addClass("fade-in");
        allSoundStop();
      setTimeout(() => {
        days++
        player.left = false;
        outside = false;
        inside = false;
        inMenu = true;
        inGame = false;
        walls = [];
        loot = [];
        enemies = [
          {
    type: 'PLACEHOLDER',
    x: 101010,
    y: 101010,
    health: 50,
  },
        ];
        code = "";
        contractItemCollected = false;
        contractItem = "";
        $('.menu').css("z-index", 5);
        $(".canvas").css("z-index", -1);
        $(".HUD").css("z-index", -1);
        $(".blizzard").css("opacity", 0);
        $(".rain").css("opacity", 0);
        for(var i = 0; i < sites.length - 1; i++){
          sites[i].type = "";
        }
      }, 3000);
      setTimeout(() => {
        $(".transitionScreen").removeClass("fade-in");
        $(".transitionScreen").addClass("fade-out");
        for(var i = 0; i < inventory.length; i++){
          player.coins += inventory[i].cost;
        }
        inventory = [];
        rating += multiplier;
        rating = Math.min(rating, 10);
        stars = Math.floor(rating / 2);
        //BONUS COINS
        player.coins += (stars * 5);
        if(biome === "Underworld"){
          player.coins += (stars * 5);
        }
        setTimeout(() => {
          $(".transitionScreen").removeClass("fade-out");
          $(".transitionScreen").css("top", "100%");
        }, 3000);
      }, 3000);
      }, 500);
    }
  }
    else{
    $(".info").text("");
  }
  }
  else if(inside){
    xFree = !checkCollisionInside(newX, player.y);
    yFree = !checkCollisionInside(player.x, newY);

    if(xFree && newX > 0 && newX < (ground.naturalWidth * 2.5) - 100)player.x = newX;
    if(yFree && newY > 50 && newY < (ground.naturalHeight * 2.5) - 600)player.y = newY;
    
        if(checkExit()){
    $(".info").text("Press Enter to Exit");
    if(moving.enter){
      $(".transitionScreen").addClass("slideUp");
    setTimeout(() => {
      walls.forEach(wall => {
        if(wall.entrance){
          player.x = wall.x + wall.width;
          player.y = (wall.y + wall.height) + 2;
        }
      })
      clearAmbience();
      SFX.enter.currentTime = 0;
      SFX.enter.play();
    outside = true;
    inside = false;
  switch(biome){
    case "Forest":
    ground = grounds.grass;
    ambience.forest.play();
    break;
    case "Winter":
    ground = grounds.winter;
    ambience.winter.play();
    break;
    case "Underworld":
    ground = grounds.underworld;
    ambience.underworld.play();
    break;
    case "Thunderstorm":
    ground = grounds.grass;
    ambience.rain.play();
    break;
    case "Desert":
    ground = grounds.desert;
    ambience.desert.play();
    break;
    default: ground = grounds.grass;
  }
    $(".flashlight").css("opacity", 0);
    $(".blizzard").css("opacity", 0);
    $(".rain").css("opacity", 0);
    }, 1500);
    setTimeout(() => {
      $(".transitionScreen").removeClass("slideUp");
    }, 3000);
    }
  }
  else{
    $(".info").text("");
  }
  }

  //Dead Player
  if(!player.alive){
    playerWalk.delay--;
    playerWalk.frame = Math.min(playerWalk.frame, playerWalk.totalFrames);
  }

  //Stamina
  if(!moving.w && !moving.a && !moving.s && !moving.d && player.alive && !player.attacking && player.relaxed){
    player.stamina += 0.25;
    player.stamina = Math.min(player.stamina, player.maxStamina);
  }
  $(".stamina").css("width", `${player.stamina * 5}px`);

  if(player.magic <= player.maxMagic){
    player.magic += 0.1;
  }
  $(".magic").css("width", `${player.magic * 2.5}px`);

  //Enemy Moving
  //Slime
  enemies.forEach(enemy => {
      

      if(enemy.type === "Slime" || enemy.type === "blackSlime" && outside){
      if(player.x > enemy.x)enemy.x += enemy.speed;
      if(player.x < enemy.x)enemy.x -= enemy.speed;
      if(player.y > enemy.y)enemy.y += enemy.speed;
      if(player.y < enemy.y)enemy.y -= enemy.speed;

        if (Math.abs(enemy.x - player.x) > rDWidth * 1.5 ||
    Math.abs(enemy.y - player.y) > rDHeight * 1.5) return;
      if(player.x + player.width > enemy.x &&
        player.x < enemy.x + enemy.width &&
        player.y + player.height > enemy.y &&
        player.y < enemy.y + enemy.height && !player.defending && outside
      ){
        player.health -= enemy.damage;
        player.health = Math.max(player.health, 0);
        drawHearts();
        SFX.hurt.currentTime = 0;
        SFX.hurt.play();
        enemy.speed *= -10;
        setTimeout(() => {
          enemy.speed *= -0.1;
        }, 2000);
      }
      else if(player.x + player.width > enemy.x &&
        player.x < enemy.x + enemy.width &&
        player.y + player.height > enemy.y &&
        player.y < enemy.y + enemy.height && player.defending){
        SFX.defend.currentTime = 0;
        SFX.defend.play();
        enemy.speed *= -10;
        setTimeout(() => {
          enemy.speed *= -0.15;
        }, 2000);
       }
      }
      if(enemy.type === "WinterSlime"){
        if(player.x > enemy.x && outside)enemy.x += enemy.speed;
        if(player.x < enemy.x && outside)enemy.x -= enemy.speed;
        if(player.y > enemy.y && outside)enemy.y += enemy.speed;
        if(player.y < enemy.y && outside)enemy.y -= enemy.speed;

        if (Math.abs(enemy.x - player.x) > rDWidth * 1.5 ||
    Math.abs(enemy.y - player.y) > rDHeight * 1.5) return;
      if(player.x + player.width > enemy.x &&
        player.x < enemy.x + enemy.width &&
        player.y + player.height > enemy.y &&
        player.y < enemy.y + enemy.height && !player.defending && outside && !player.frozen
      ){
        player.frozen = true;
        moving.w = false;
        moving.a = false;
        moving.s = false;
        moving.d = false;
        playerWalk.animation = playerSprites.frozen;
        playerWalk.frame = 0;
        monsters.winterSlime.currentTime = 0; 
        monsters.winterSlime.play();
        setTimeout(() => {
          player.frozen = false;
          playerWalk.animation = playerSprites.idle;
          playerWalk.frame = 0;
        }, player.frozenTime * 1000);
        enemy.speed *= -10;
        enemy.x += 10;
        setTimeout(() => {
          enemy.speed *= -0.1;
        }, 2000);
      }
      else if(player.x + player.width > enemy.x &&
        player.x < enemy.x + enemy.width &&
        player.y + player.height > enemy.y &&
        player.y < enemy.y + enemy.height && player.defending){
          SFX.defend.currentTime = 0;
        SFX.defend.play();
        enemy.speed *= -10;
        setTimeout(() => {
          enemy.speed *= -0.15;
        }, 2000);
       }
      }


      //Child
      if(player.x - ((window.innerWidth / 2) + 300) > enemy.x && enemy.type === "Child" && enemy.stalking)enemy.x += enemy.speed;
      if(player.x + ((window.innerWidth / 2) + 300) < enemy.x && enemy.type === "Child" && enemy.stalking)enemy.x -= enemy.speed;
      if(player.y - ((window.innerHeight / 2) + 300) > enemy.y && enemy.type === "Child" && enemy.stalking)enemy.y += enemy.speed;
      if(player.y + ((window.innerHeight / 2) + 300) < enemy.y && enemy.type === "Child" && enemy.stalking)enemy.y -= enemy.speed;

      if(outside && enemy.type === "Child"){
        if (Math.abs(enemy.x - player.x) > rDWidth * 1.5 ||
    Math.abs(enemy.y - player.y) > rDHeight * 1.5) return;

        if(player.x + player.width + ((window.innerWidth / 2) + 300) > enemy.x &&
        player.x - ((window.innerWidth / 2) + 300) < enemy.x + enemy.width &&
        player.y + player.height + ((window.innerWidth / 2) + 300) > enemy.y &&
        player.y - ((window.innerWidth / 2) + 300) < enemy.y + enemy.height
      ){
        monsters.childGiggle.currentTime = 0;
        monsters.childGiggle.play();
      }

        if(player.x + player.width + 250 > enemy.x &&
        player.x - 250 < enemy.x + enemy.width &&
        player.y + player.height + 250 > enemy.y &&
        player.y - 250 < enemy.y + enemy.height
      ){
        player.health -= enemy.damage;
        player.health = Math.max(player.health, 0);
        drawHearts();
        SFX.hurt.currentTime = 0;
        SFX.hurt.play();
        monsters.childYell.currentTime = 0;
        monsters.childYell.play();
        enemy.x = Math.floor(Math.random() * (GAME_WIDTH - 1000) + 1000);
        enemy.y = Math.floor(Math.random() * (GAME_HEIGHT - 1000) + 1000);
        $("body").addClass("flickerOnce");
        setTimeout(() => {
          $("body").removeClass("flickerOnce");
        }, 3000);
      }
    }

      //Bees
      if(enemy.type === "Bees" && outside){
        if (Math.abs(enemy.x - player.x) > rDWidth * 1.5 ||
    Math.abs(enemy.y - player.y) > rDHeight * 1.5) return;

        if(player.x + player.width + 450 > enemy.Hx &&
        player.x - 450 < enemy.Hx + enemy.width &&
        player.y + player.height + 300 > enemy.Hy &&
        player.y - 300 < enemy.Hy + enemy.height && player.alive){
          if(player.x > enemy.x)enemy.x += enemy.speed;
          else if(player.x < enemy.x)enemy.x -= enemy.speed;
          if(player.y > enemy.y)enemy.y += enemy.speed;
          else if(player.y < enemy.y)enemy.y -= enemy.speed;
          monsters.bees.play();
        }
        else {
          monsters.bees.pause();
          if(enemy.Hx > enemy.x)enemy.x += enemy.speed;
          else if(enemy.Hx < enemy.x)enemy.x -= enemy.speed;
          if(enemy.Hy > enemy.y)enemy.y += enemy.speed;
          else if(enemy.Hy < enemy.y)enemy.y -= enemy.speed;
        }

        if(player.x + player.width > enemy.x &&
        player.x < enemy.x + enemy.width &&
        player.y + player.height > enemy.y &&
        player.y < enemy.y + enemy.height && player.alive){
          enemy.tick--
          if(enemy.tick <= 0){
            player.health--
            drawHearts();
            SFX.hurt.currentTime = 0;
            SFX.hurt.play();
            enemy.tick = enemy.maxTick;
          }
        }
      }

      //Skeletons
      if(enemy.type === "Skeleton" && outside){
        if (Math.abs(enemy.x - player.x) > rDWidth * 1.5 ||
    Math.abs(enemy.y - player.y) > rDHeight * 1.5) return;

        if((player.x + player.width) + (window.innerWidth / 3) > enemy.x &&
          player.x < (enemy.x + enemy.width) + (window.innerWidth / 3) &&
          (player.y + player.height) + (window.innerHeight / 3) > enemy.y &&
          player.y < (enemy.y + enemy.height) + (window.innerHeight / 3)
        ){
          if(enemy.awake){
            if(player.x < enemy.x){enemy.direction = -1;}
            if(player.x > enemy.x){enemy.direction = 1;}

            if(enemy.frame === enemy.totalFrames - 2){
              monsters.skeleton.currentTime = 0;
              monsters.skeleton.play();
              var reloadTime = (enemy.afraid) ? 7000 : 9000;
              var arrow = {
                x: enemy.x,
                y: enemy.y,
                tX: player.x,
                tY: player.y,
                speed: 20,
                damage: enemy.damage,
                timing: 80,
              }
              arrow.src = arrowImg;
              arrow.width = arrowImg.naturalWidth;
              arrow.height = arrowImg.naturalHeight;
              arrows.push(arrow);

              setTimeout(() => {
                enemy.frame = 0;
              }, reloadTime);
              if(enemy.frame >= enemy.totalFrames && enemy.afraid){
                enemy.frame = 0;
                enemy.afraid = false;
              }
            }
          }
        }
        else {
          if(enemy.awake){
            if(player.x < enemy.x){enemy.x -= enemy.speed; enemy.direction = -1;}
            if(player.x > enemy.x){enemy.x += enemy.speed; enemy.direction = 1;}
            if(player.y < enemy.y)enemy.y -= enemy.speed;
            if(player.y > enemy.y)enemy.y += enemy.speed;
          }
        }
      }
      //TORNADO
      if(enemy.type === "Tornado" && outside){
        enemy.x -= (enemy.direction * enemy.speed);
        if(enemy.x <= 0 || enemy.x >= GAME_WIDTH){
          enemy.direction *= -1;
        }
        if(player.x + player.width + ((window.innerWidth / 2)) > enemy.x &&
        player.x - ((window.innerWidth / 2)) < enemy.x + enemy.width &&
        player.y + player.height + ((window.innerWidth / 2)) > enemy.y &&
        player.y - ((window.innerWidth / 2)) < enemy.y + enemy.height
      ){
        monsters.tornado.play();
      }
      else monsters.tornado.pause();
        if(player.x + player.width > enemy.x &&
          player.x < enemy.x + enemy.width&&
          player.y + player.height > enemy.y &&
          player.y < enemy.y + enemy.height
        ){
          enemy.tick--
          if(enemy.tick <= 0){
            player.health--
            drawHearts();
            SFX.hurt.currentTime = 0;
            SFX.hurt.play();
            enemy.tick = enemy.maxTick;
          }
        }
      }
      if(enemy.type === "Spike"){
        if(player.x > enemy.x)enemy.x += enemy.speed;
        if(player.x < enemy.x)enemy.x -= enemy.speed;
        if(player.y > enemy.y)enemy.y += enemy.speed;
        if(player.y < enemy.y)enemy.y -= enemy.speed;

        if(player.x + player.width > enemy.x &&
          player.x < enemy.x + enemy.width &&
          player.y + player.height > enemy.y &&
          player.y < enemy.y + (enemy.height / 2)
        ){
          if(!player.defending){
          player.health--
          drawHearts();
          SFX.hurt.currentTime = 0;
        SFX.hurt.play();
          enemy.x = Math.floor(Math.random() * (GAME_WIDTH - 500) + 500);
          enemy.y = Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500);
          }
          else {
            SFX.defend.currentTime = 0;
            SFX.defend.play();
            enemy.speed *= -1;
            setTimeout(() => {
              enemy.speed *= -1;
            }, 10000);
          }
        }
      }
      if(enemy.type === "Scorpion"){
        if(player.x > enemy.x && !enemy.attacking && enemy.awake){
          enemy.direction = 1; enemy.walking = true; enemy.x += enemy.speed;
        }
        if(player.x < enemy.x && !enemy.attacking && enemy.awake){
          enemy.direction = -1;enemy.walking = true; enemy.x -= enemy.speed;
        }
        if(player.y > enemy.y && !enemy.attacking && enemy.awake){
          enemy.walking = true;enemy.y += enemy.speed;
        }
        if(player.y < enemy.y && !enemy.attacking && enemy.awake){
          enemy.walking = true;enemy.y -= enemy.speed;
        }

        if(player.x + player.width > enemy.x &&
          player.x < enemy.x + enemy.width &&
          player.y + player.height > enemy.y &&
          player.y < enemy.y + (enemy.height / 2)
        ){
          if(enemy.awake && !enemy.attacking){
          enemy.src = scorpionImg.attack;
          enemy.attacking = true;
          enemy.walking = false;
          enemy.frame = 0;
          if(!player.defending){
            player.health -= enemy.damage;
            drawHearts();
            SFX.hurt.currentTime = 0;
        SFX.hurt.play();
          }
          else {
            SFX.defend.currentTime = 0;
            SFX.defend.play();
          }
            setTimeout(() => {
              enemy.src = scorpionImg.walk;
            enemy.attacking = false;
            enemy.walking = true;
            enemy.frame = 0;
            enemy.speed *= -2;
            setTimeout(() => {
              enemy.speed /= -2;
            }, 6000);
            }, 800);
         }
        }
        else {
          if(enemy.awake){
            enemy.src = scorpionImg.walk;
          }
        }
      }
      if(enemy.type === "Knight"){
      if(enemy.forceMove){
        if(player.x < enemy.x){
            enemy.x -= enemy.speed;
            enemy.direction = -1;
          }
          if(player.x > enemy.x){
            enemy.x += enemy.speed;
            enemy.direction = 1;
          }
          if(player.y < enemy.y){
            enemy.y -= enemy.speed;
          }
          if(player.y > enemy.y){
            enemy.y += enemy.speed;
          }
      }
        if(player.x + player.width + enemy.range > enemy.x &&
          player.x - enemy.range < enemy.x + enemy.width &&
          player.y + player.height + enemy.range > enemy.y &&
          player.y - enemy.range < enemy.y + (enemy.height / 2)
        ){
          if(enemy.stamina >= 25 && player.stamina < 25 && enemy.alive && !enemy.attacking && !enemy.defending && !enemy.running){
            enemy.src = playerSprites.attack;
            enemy.stamina -= 25;
            enemy.walking = false;
            enemy.attacking = true;
            enemy.defending = false;
            enemy.frame = 0;
            enemy.delay = 2;
            enemy.maxDelay = 2;
            enemy.totalFrames = 4;
            setTimeout(() => {
              if(player.x + player.width + enemy.range > enemy.x &&
          player.x - enemy.range < enemy.x + enemy.width &&
          player.y + player.height + enemy.range > enemy.y &&
          player.y - enemy.range < enemy.y + (enemy.height / 2) && !player.defending
        ){
          player.health -= enemy.damage;
          drawHearts();
          SFX.hurt.currentTime = 0;
        SFX.hurt.play();
            enemy.walking = true;
            enemy.attacking = false;
            enemy.defending = false;
            enemy.forceMove = true;
            enemy.speed = (player.speed / -1.5);
            setTimeout(() => {
              enemy.speed = (player.speed / 1.5);
            }, 2000);
        }
        if(player.defending){
          SFX.defend.currentTime = 0;
          SFX.defend.play();
        }
            setTimeout(() => {
              enemy.forceMove = false;
            }, 2000);
            }, 500);
            setTimeout(() => {
              enemy.frame = 0;
            }, 600);
          }
          else if(enemy.stamina >= 15 && player.stamina > 25 && enemy.alive && !enemy.attacking && !player.attacking && !enemy.running){
            enemy.src = playerSprites.defend;
            enemy.stamina -= 0.25;
            enemy.walking = false;
            enemy.attacking = false;
            enemy.defending = true;
            enemy.frame = 0;
            enemy.delay = 2;
            enemy.maxDelay = 2;
            enemy.totalFrames = 5;
          }
          else if(player.attacking && enemy.stamina >= 15){
            enemy.src = playerSprites.defend;
            enemy.stamina -= 0.25;
            enemy.walking = false;
            enemy.attacking = false;
            enemy.defending = true;
            enemy.frame = 0;
            enemy.delay = 2;
            enemy.maxDelay = 2;
            enemy.totalFrames = 5;
          }
          else {
            if(!enemy.running){
            enemy.src = playerSprites.idle;
            enemy.stamina += 0.25;
            enemy.walking = false;
            enemy.attacking = false;
            enemy.defending = false;
            enemy.frame = 0;
            enemy.delay = 2;
            enemy.maxDelay = 2;
            enemy.totalFrames = 5;
            }
          }
          if(enemy.stamina < 15){
            enemy.speed = (player.speed / -1.5);
            enemy.running = true;
          }
          else if(enemy.stamina >= 25){
            enemy.speed = (player.speed / 1.5);
            enemy.running = false;
          }
        }
        else {
          enemy.src = playerSprites.walk;
          enemy.totalFrames = 8;
          enemy.maxDelay = player.speed * 2;
          enemy.walking = true;
          enemy.attack = false;
          enemy.defending = false;
          enemy.stamina += 0.25;
          enemy.stamina = Math.min(enemy.stamina, 50);
          enemy.forceMove = false;

          if(player.x < enemy.x){
            enemy.x -= enemy.speed;
            enemy.direction = -1;
          }
          if(player.x > enemy.x){
            enemy.x += enemy.speed;
            enemy.direction = 1;
          }
          if(player.y < enemy.y){
            enemy.y -= enemy.speed;
          }
          if(player.y > enemy.y){
            enemy.y += enemy.speed;
          }

          if(enemy.stamina < 15){
            enemy.speed = (player.speed / -1.5);
            enemy.running = true;
          }
          else if(enemy.stamina >= 25){
            enemy.speed = (player.speed / 1.5);
            enemy.running = false;
          }
        }
      }
      if(enemy.type === "Father"){
        if(player.x - ((window.innerWidth / 2) + 300) > enemy.x)enemy.x += enemy.speed;
      if(player.x + ((window.innerWidth / 2) + 300) < enemy.x)enemy.x -= enemy.speed;
      if(player.y - ((window.innerHeight / 2) + 300) > enemy.y)enemy.y += enemy.speed;
      if(player.y + ((window.innerHeight / 2) + 300) < enemy.y)enemy.y -= enemy.speed;

        if(player.x + player.width + 600 > enemy.x &&
        player.x - 600 < enemy.x + enemy.width &&
        player.y + player.height + 400 > enemy.y &&
        player.y - 400 < enemy.y + enemy.height
      ){
        monsters.father.currentTime = 0;
        monsters.father.play();
        enemy.tick--
        if(enemy.tick <= 0){
          enemy.encounters++
          enemy.tick = enemy.maxTick;
          var blackSlime = {
            type: "blackSlime",
            x: (enemy.x + enemy.width),
            y: (enemy.y + enemy.height) - 50,
            src: blackSlimeImg,
            width: blackSlimeImg.naturalWidth,
            height: blackSlimeImg.naturalHeight,
            speed: 1,
            health: 20,
            damage: enemy.damage,
          }
          enemies.push(blackSlime);
        }
       }
      }
  });

  enemies = enemies.filter(enemy => {
    if(enemy.health > 0){
      return true;
    }
    else return false;
  });

  arrows.forEach(arrow => {
    arrow.timing--
    if(arrow.x !== arrow.tX && arrow.y !== arrow.tY){
      let angle = Math.atan2(arrow.tY - arrow.y, arrow.tX - arrow.x);
      arrow.x += (Math.cos(angle) * arrow.speed);
      arrow.y += (Math.sin(angle) * arrow.speed);

      if(player.x + player.width > arrow.x &&
        player.x < arrow.x + arrow.width &&
        player.y + player.height > arrow.y &&
        player.y < arrow.y + arrow.height
      ){
        if(!player.defending){
          player.health -= arrow.damage;
        drawHearts();
        SFX.hurt.currentTime = 0;
        SFX.hurt.play();
        }
        else {
          SFX.defend.currentTime = 0;
          SFX.defend.play();
        }
      }
    }
    
  });
  arrows = arrows.filter(arrow => {
    if(player.x + player.width > arrow.x &&
        player.x < arrow.x + arrow.width &&
        player.y + player.height > arrow.y &&
        player.y < arrow.y + arrow.height || arrow.timing <= 0
      ){
        return false;
      }
      else return true;
  });

  loot = loot.filter(item => {
    if(player.x + player.width + 200 > item.x &&
       player.x < item.x + item.width + 200 &&
       player.y + player.height + 200 > item.y &&
       player.y < item.y + item.height + 200 && outside && item.mirage
    ){
      return false;
    }
    else if(player.x + player.width > item.x &&
       player.x < item.x + item.width &&
       player.y + player.height > item.y &&
       player.y < item.y + item.height && isInventoryOpen() === true && outside && !item.mirage
    ){
      SFX.itemCollect.currentTime = 0;
      SFX.itemCollect.play();
      addToInventory(item);
      drawInInventory();
      return false;
    }
    else return true;
  });
  
  if(player.attacking && playerWalk.frame >= playerWalk.totalFrames - 1){
    player.attacking = false;
    playerWalk.frame = 0;
    playerWalk.maxDelay = 3;
  }
  if(playerWalk.delay <= 0){playerWalk.delay = playerWalk.maxDelay; playerWalk.frame++}
  if(playerWalk.frame >= playerWalk.totalFrames && player.alive)playerWalk.frame = 0;

  //SITES AND PUZZLE
if (inside) {

  let touching = false;
  let activeSite = null;

  sites.forEach(site => {
    if (
      player.x + player.width > site.x &&
      player.x < site.x + site.width &&
      player.y + player.height > site.y &&
      player.y < site.y + site.height
    ) {
      touching = true;
      activeSite = site;
    }
  });

  if (touching) {
    if (activeSite.type === "box") {
      $(".info").text("ENTER to search");//Will later include GIF of ENter pressed down.
      if (moving.enter) {
      $(".page").text(activeSite.text);
      $(".page").css("opacity", 1);
      $(".page").css("pointer-events", "none");
      SFX.paper.currentTime = 0;
      SFX.paper.play();
     }
    } 
    else if(activeSite.type === "chest" && !contractItemCollected){
      $(".info").text("ENTER to search");
      if (moving.enter && !contractItemCollected) {
        moving.enter = false;
      $(".page").empty();
      $(".page").css("opacity", 1);
      $(".page").text("Enter code to access chest");
      $(".page").css("pointer-events", "auto");
      let input = $("<input>").attr("type", "text").appendTo(".page");
      let button = $("<button>").text("Enter").appendTo(".page");
      button.on("click", () => {
        if(Number(input.val()) === code){
          SFX.contractItemCollect.currentTime = 0;
          SFX.contractItemCollect.play();
          contractItemCollected = true;
          $(".canvas").addClass("fade-out-in");
          $(".collectedItem img").css("display", "block").attr("src", `Sprites/World/Loot/1/${contractItem}.png`).addClass("collected");
          setTimeout(() => {
            $(".collectedItem img").css("display", "none").attr("src", "").removeClass("collected");
            $(".canvas").removeClass("fade-out-in");
            $(".missions").text("Exit the realm using the beacon back where you entered.");
          }, 4000);
          input.val("");

          var beacon = {
            x: 0,
            y: 0,
            exit: true,
          }
          const img = new Image();
          img.src = (biome === "Forest") ? "Sprites/World/Beacons/Recall Beacon.png" : "Sprites/World/Beacons/Evil Recall Beacon.png";
          img.onload = () => {
            beacon.type = img;
            beacon.imgYOffset = (img.naturalHeight * 2) / 2;
            beacon.width = (img.naturalWidth * 2) - 30;
            beacon.height = (img.naturalHeight * 2) - beacon.imgYOffset;
            beacon.imgW = img.naturalWidth * 2;
            beacon.imgH = img.naturalHeight * 2;
          }
          walls.push(beacon);
        }
        else {
          //Input error sound signaling input is wrong
        }
      });

      setTimeout(() => input.trigger("focus"), 0);
      gamePaused = true;
      input.on("blur", () => {
        gamePaused = false;
        $(".page").css("opacity", 0);
      });
     }
    }
  } else {
    // Not touching any sites at all
    $(".info").text("");
    $(".page").css("opacity", 0);
  }

}

if(!inMenu){
  requestAnimationFrame(update);
  draw();
}
}

function draw(){
ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.save(); //FOR CAMERA
ctx.translate(-player.x + (canvasContainer.offsetWidth / 2) - 20, -player.y + (canvasContainer.offsetHeight / 2) - 30)

if(outside){
  ctx.fillStyle = ctx.createPattern(ground, "repeat");
  ctx.fillRect(player.x - rDWidth, player.y - rDHeight, (player.x + rDWidth) - (player.x - rDWidth), (player.y + rDHeight) - (player.y - rDHeight));
}
else if(inside){
  ctx.drawImage(ground, 0, 0, 2500, 2500);
}

//KNIGHT ANIMATIONS

ctx.save();

if(player.direction === 1 && player.alive){
ctx.drawImage(
    playerWalk.animation,
    playerWalk.frame * playerWalk.frameWidth, 50,          // crop start (x, y)
    playerWalk.frameWidth, playerWalk.frameHeight * 4,        // crop size
    player.x, player.y, playerWalk.frameWidth, playerWalk.frameHeight * 4   // draw location and size
  );
}
else if(player.direction === -1 && player.alive) {
  ctx.scale(-1, 1);
  ctx.drawImage(
    playerWalk.animation,
    playerWalk.frame * playerWalk.frameWidth, 50,          // crop start (x, y)
    playerWalk.frameWidth, playerWalk.frameHeight * 4,        // crop size
    -player.x - (playerWalk.frameWidth / 2), player.y, playerWalk.frameWidth, playerWalk.frameHeight * 4   // draw location and size
  )
}
else if(!player.alive){
  ctx.drawImage(
    playerSprites.dead,
    playerWalk.frame * playerWalk.frameWidth, 50,          // crop start (x, y)
    playerWalk.frameWidth, playerWalk.frameHeight * 4,        // crop size
    player.x, player.y, playerWalk.frameWidth, playerWalk.frameHeight * 4   // draw location and size
  );
}

  ctx.restore();

  //ANIMATIONS
  if(moving.w || moving.a || moving.s || moving.d){
    if(player.alive && !player.attacking && !player.defending && !player.magicAttacking){
      playerWalk.animation = playerSprites.walk;
    playerWalk.frameWidth = 129;
    playerWalk.frameHeight = 129; 
    playerWalk.totalFrames = 8;
    playerWalk.delay--;
    }
  }
  else if(!moving.w && !moving.a && !moving.s && !moving.d && player.alive && !player.attacking && !player.magicAttacking && !player.frozen){
    playerWalk.frame = 0;
    if(!player.defending){
    playerWalk.animation = playerSprites.idle;
    }
    else if(player.defending){
      playerWalk.animation = playerSprites.defend;
    }
  }
  else if(!player.alive){
    playerWalk.animation = playerSprites.dead;
  }
  else if(player.attacking && player.alive){
    playerWalk.animation = playerSprites.attack;
    playerWalk.delay--;
  }
  else if(player.magicAttacking && player.alive){
    playerWalk.animation = playerSprites.magic;
    playerWalk.frame = 0;
  }


loot.forEach(item => {
  if((player.x + player.width) + rDWidth > item.x &&
      player.x < (item.x + item.width) + rDWidth  &&
      (player.y + player.height) + rDHeight > item.y &&
      player.y < (item.y + item.height) + rDHeight && outside){
        ctx.drawImage(item.type, item.x, item.y, item.width, item.height);
      }
});

enemies.forEach(enemy => {
   if(Math.abs(enemy.x - player.x) < rDWidth &&
    Math.abs(enemy.y - player.y) < rDHeight && outside && enemy.type !== "Bees" && enemy.type !== "Skeleton" && enemy.type !== "Tornado" && enemy.type !== "Spike" && enemy.type !== "Scorpion" && enemy.type !== "Knight"){
        ctx.drawImage(enemy.src, enemy.x, enemy.y, enemy.width, enemy.height)
      };

      if(Math.abs(enemy.x - player.x) < rDWidth &&
    Math.abs(enemy.y - player.y) < rDHeight && enemy.type === "Bees" && outside){
        ctx.drawImage(enemy.src, bugsSprite.frame * bugsSprite.frameWidth, 0, bugsSprite.frameWidth, bugsSprite.frameHeight, enemy.x, enemy.y, enemy.width, enemy.height);
        bugsSprite.delay--
        if(bugsSprite.delay <= 0){
          bugsSprite.frame++
          bugsSprite.delay = bugsSprite.maxDelay;
          if(bugsSprite.frame === bugsSprite.totalFrames){
            bugsSprite.frame = 0;
          }
        }
      }
      if(Math.abs(enemy.x - player.x) < rDWidth &&
    Math.abs(enemy.y - player.y) < enemy.height + rDHeight && enemy.type === "Tornado" && outside){
        ctx.drawImage(enemy.src, (enemy.frame * enemy.frameWidth), 0, enemy.frameWidth, enemy.frameHeight, enemy.x, enemy.y, enemy.width, enemy.height);
        enemy.delay--
        if(enemy.delay <= 0){
          enemy.frame++
          enemy.delay = enemy.maxDelay;
          if(enemy.frame === enemy.totalFrames){
            enemy.frame = 0;
          }
        }
      }
      if(Math.abs(enemy.x - player.x) < rDWidth &&
    Math.abs(enemy.y - player.y) < enemy.height + rDHeight && enemy.type === "Spike" && outside){
        ctx.drawImage(enemy.src, (enemy.frame * enemy.frameWidth), 0, enemy.frameWidth, enemy.frameHeight, enemy.x, enemy.y, enemy.width, enemy.height);
        enemy.delay--
        if(enemy.delay <= 0){
          enemy.frame++
          enemy.delay = enemy.maxDelay;
          if(enemy.frame === enemy.totalFrames){
            enemy.frame = 0;
          }
        }
      }
      if(Math.abs(enemy.x - player.x) < rDWidth &&
    Math.abs(enemy.y - player.y) < enemy.height + rDHeight && enemy.type === "Scorpion" && outside){
      ctx.save();
      if(enemy.direction === -1){
        ctx.drawImage(enemy.src, (enemy.frame * enemy.frameWidth), 0, enemy.frameWidth, enemy.frameHeight, enemy.x, enemy.y, enemy.width, enemy.height);
      }
      else {
        ctx.scale(-1, 1);
        ctx.drawImage(enemy.src, (enemy.frame * enemy.frameWidth), 0, enemy.frameWidth, enemy.frameHeight, -enemy.x - (enemy.frameWidth / 2), enemy.y, enemy.width, enemy.height);
      }
        ctx.restore();
        enemy.delay--
        if(enemy.delay <= 0){
          enemy.frame++
          enemy.delay = enemy.maxDelay;
          if(enemy.frame === enemy.totalFrames && enemy.walking){
            enemy.frame = 0;
          }
        }
        if(!enemy.walking){
          enemy.frame = Math.min(enemy.frame, enemy.totalFrames);
        }
      }

      if(Math.abs(enemy.x - player.x) < rDWidth &&
    Math.abs(enemy.y - player.y) < enemy.height + rDHeight && enemy.type === "Knight" && outside){
      ctx.save();
      if(enemy.direction === 1){
        ctx.drawImage(enemy.src, (enemy.frame * enemy.frameWidth), 0, enemy.frameWidth, enemy.frameHeight, enemy.x, enemy.y, enemy.width, enemy.height);
      }
      else {
        ctx.scale(-1, 1);
        ctx.drawImage(enemy.src, (enemy.frame * enemy.frameWidth), 0, enemy.frameWidth, enemy.frameHeight, -enemy.x - (enemy.frameWidth / 2), enemy.y, enemy.width, enemy.height);
      }
        ctx.restore();
        enemy.delay--
        if(enemy.delay <= 0){
          enemy.frame++
          enemy.delay = enemy.maxDelay;
          if(enemy.frame === enemy.totalFrames && enemy.walking){
            enemy.frame = 0;
          }
        }
        if(!enemy.walking){
          enemy.frame = Math.min(enemy.frame, enemy.totalFrames);
        }
      }

      if(enemy.type === "Skeleton" && outside){
        ctx.save();
        if((player.x + player.width) + (window.innerWidth / 3) > enemy.x &&
          player.x < (enemy.x + enemy.width) + (window.innerWidth / 3) &&
          (player.y + player.height) + (window.innerHeight / 3) > enemy.y &&
          player.y < (enemy.y + enemy.height) + (window.innerHeight / 3)
        ){
          if(enemy.awake){
            skeletonSprites.animation = skeletonSprites.shot;
          enemy.totalFrames = 14;
          enemy.maxDelay = 2;
          enemy.delay--
            if(enemy.delay <= 0){
              enemy.frame++
              enemy.frame = Math.min(enemy.frame, enemy.totalFrames)
              enemy.delay = enemy.maxDelay;
            }
            if(enemy.direction === -1){
              ctx.scale(-1, 1);
              ctx.drawImage(
    skeletonSprites.animation,
    enemy.frame * enemy.frameWidth, 50,          // crop start (x, y)
    enemy.frameWidth, enemy.frameHeight * 4,        // crop size
    -enemy.x - (enemy.frameWidth / 2), enemy.y, enemy.frameWidth, enemy.frameHeight * 4   // draw location and size
  );
            }
            else {
              ctx.drawImage(
    skeletonSprites.animation,
    enemy.frame * enemy.frameWidth, 50,          // crop start (x, y)
    enemy.frameWidth, enemy.frameHeight * 4,        // crop size
    enemy.x, enemy.y, enemy.frameWidth, enemy.frameHeight * 4   // draw location and size
  );
            }
            
          }
        }
        else{
          if(enemy.awake){
            skeletonSprites.animation = skeletonSprites.walk;
            enemy.totalFrames = 7;
            enemy.maxDelay = player.speed * 2;
            enemy.delay--
            if(enemy.delay <= 0){
              enemy.frame++
              if(enemy.frame > enemy.totalFrames){
                enemy.frame = 0;
              }
              enemy.delay = enemy.maxDelay;
            }
            if(enemy.direction === -1){
              ctx.scale(-1, 1);
              ctx.drawImage(
    skeletonSprites.animation,
    enemy.frame * enemy.frameWidth, 50,          // crop start (x, y)
    enemy.frameWidth, enemy.frameHeight * 4,        // crop size
    -enemy.x - (enemy.frameWidth / 2), enemy.y, enemy.frameWidth, enemy.frameHeight * 4   // draw location and size
  );
            }
            else {
              ctx.drawImage(
    skeletonSprites.animation,
    enemy.frame * enemy.frameWidth, 50,          // crop start (x, y)
    enemy.frameWidth, enemy.frameHeight * 4,        // crop size
    enemy.x, enemy.y, enemy.frameWidth, enemy.frameHeight * 4   // draw location and size
  );
            }
          } 
        }
        if(!enemy.awake){
          skeletonSprites.animation = skeletonSprites.dead;
          enemy.totalFrames = 4;
            enemy.maxDelay = player.speed * 2;
            enemy.delay--
            if(enemy.delay <= 0){
              enemy.frame++
              enemy.frame = Math.min(enemy.frame, enemy.totalFrames)
              enemy.delay = enemy.maxDelay;
            }
          if(enemy.direction === -1){
              ctx.scale(-1, 1);
              ctx.drawImage(
    skeletonSprites.animation,
    enemy.frame * enemy.frameWidth, 50,          // crop start (x, y)
    enemy.frameWidth, enemy.frameHeight * 4,        // crop size
    -enemy.x - (enemy.frameWidth / 2), enemy.y, enemy.frameWidth, enemy.frameHeight * 4   // draw location and size
  );
            }
            else {
              ctx.drawImage(
    skeletonSprites.animation,
    enemy.frame * enemy.frameWidth, 50,          // crop start (x, y)
    enemy.frameWidth, enemy.frameHeight * 4,        // crop size
    enemy.x, enemy.y, enemy.frameWidth, enemy.frameHeight * 4   // draw location and size
  );
            }
        }
        ctx.restore();
      }

    });
arrows.forEach(arrow => {
  ctx.drawImage(arrow.src, arrow.x, arrow.y, arrow.width, arrow.height);
})

walls.forEach(wall => {  //EACH wall WILL HAS A TYPE, WHICH WILL BE PASSED TO CHECK 'World/Trees' FOLDER AND WILL APPLY ITS IMAGE
  if((player.x + player.width) + 1200 > wall.x &&
      player.x < (wall.x + wall.width) + 1200  &&
      (player.y + player.height) + 600 > wall.y &&
      player.y < (wall.y + wall.height) + 600 && outside){
        ctx.drawImage(wall.type, wall.x, wall.y - wall.imgYOffset, wall.imgW, wall.imgH);
      };
});



sites.forEach(site => {
  ctx.fillStyle = "red";
  if(site.type === "chest"){
    //ctx.fillRect(site.x, site.y, site.width, site.height);
  }
})

  ctx.restore();
}

