function update(){
  const gamepads = navigator.getGamepads();

  players.forEach((player, i) => {
    const gp = gamepads[i]; // each player uses a different controller
    if (!gp) return;

    //PLAYER MOVEMENT
    let moveX = applyDeadzone(gp.axes[0]);
    let moveY = applyDeadzone(gp.axes[1]);
    let aimX = applyDeadzone(gp.axes[2]);
    let aimY = applyDeadzone(gp.axes[3]);
    let newX = player.x;
    let newY = player.y;


    if(gameLive){
      newX += moveX * player.speed;
      newY += moveY * player.speed;

      if(!checkCollision(player, newX, player.y) && newX > 0 && newX < (canvas.width - (player.size / 2)) && player.alive) {
         player.x = newX;
        }
        if(!checkCollision(player, player.x, newY) && newY > 0 && newY < (canvas.height - (player.size / 2)) && player.alive) {
         player.y = newY;
       }

       if(aimX > 0.4 || aimX < -0.4 || aimY > 0.4 || aimY < -0.4){
        if(player.alive){
       player.angle = (Math.atan2(aimY, aimX) * (180 / Math.PI)) - 90;
        }
       }
       //console.log(player.angle)
       if(gp.buttons[6].pressed && player.alive){
        player.flags.leftTrigger = false;
       }
       if(!gp.buttons[6].pressed){
        player.flags.leftTrigger = true;
       }

       if(gp.buttons[7].pressed && player.alive){
        if(player.equippedItem === "launcher" && player.flags.rightTrigger && player.Item1quantity > 0){
          player.flags.rightTrigger = false;
          player.Item1quantity--
          shootRocket(player)
        }
        if(player.equippedItem === "primary" && player.primary.chambered && player.primary.loaded && player.primary.ammo > 0){
          const angleRad = (player.angle + 90) * Math.PI / 180;
          const offset = player.size / 2;

          var bullet = {
            x: (player.x + player.size / 2) + Math.cos(angleRad) * offset,
            y: (player.y + player.size / 2) + Math.sin(angleRad) * offset,
            size: 3,
            speed: 20,
            damage: player.primary.damage,
            color: (map === "Outpost" || map === "Winter" || map === "Desert" || map === "Train") ? "black" : "yellow",
            dx: Math.cos(angleRad) + (Math.floor(Math.random() * ((player.primary.accuracy - 6) * -1)) / 28),
            dy: Math.sin(angleRad) + (Math.floor(Math.random() * ((player.primary.accuracy - 6) * -1)) / 28),
          };
          bullets.push(bullet);
          playSound(player.primary.sound);
          player.primary.chambered = false;
          player.primary.ammo--
          if(player.primary.fullAuto){
            setTimeout(() => {
            player.primary.chambered = true;
          }, player.primary.rateOfFire);
          }
          if(player.primary.ammo <= 0){
            player.primary.loaded = false;
            playSound(audio.reload);
            setTimeout(() => {
              if(player.primary.ammoCount > 0){
                if(player.primary.ammoCount < player.primary.maxAmmo){
                  player.primary.ammo = player.primary.ammoCount
                  player.primary.ammoCount = 0;
                }
              else {
              player.primary.ammoCount -= player.primary.maxAmmo;
              player.primary.ammo = player.primary.maxAmmo;
              }
              player.primary.loaded = true;
              }
            }, player.primary.reloadTime);
          }
        }
        if(player.equippedItem === "secondary" && player.secondary.chambered && player.secondary.loaded && player.secondary.ammo > 0){
          const angleRad = (player.angle + 90) * Math.PI / 180;
          const offset = player.size / 2;

          var bullet = {
            x: (player.x + player.size / 2) + Math.cos(angleRad) * offset,
            y: (player.y + player.size / 2) + Math.sin(angleRad) * offset,
            size: 3,
            speed: 20,
            damage: player.secondary.damage,
            color: (map === "Outpost" || map === "Winter" || map === "Desert" || map === "Train") ? "black" : "yellow",
            dx: Math.cos(angleRad) + (Math.floor(Math.random() * ((player.secondary.accuracy - 6) * -1)) / 28),
            dy: Math.sin(angleRad) + (Math.floor(Math.random() * ((player.secondary.accuracy - 6) * -1)) / 28),
          };
          bullets.push(bullet);
          playSound(player.secondary.sound);
          player.secondary.chambered = false;
          player.secondary.ammo--
          if(player.secondary.fullAuto){
            setTimeout(() => {
            player.secondary.chambered = true;
          }, player.secondary.rateOfFire);
          }
          if(player.secondary.ammo <= 0){
            player.secondary.loaded = false;
            setTimeout(() => {
              if(player.secondary.ammoCount > 0){
                if(player.secondary.ammoCount < player.secondary.maxAmmo){
                  player.secondary.ammo = player.secondary.ammoCount
                  player.secondary.ammoCount = 0;
                }
              else {
              player.secondary.ammoCount -= player.secondary.maxAmmo;
              player.secondary.ammo = player.secondary.maxAmmo;
              }
              player.secondary.loaded = true;
              }
            }, player.secondary.reloadTime);
          }
        }
       }
       if(!gp.buttons[7].pressed && !player.primary.fullAuto){
        player.primary.chambered = true;
       }
       if(!gp.buttons[7].pressed && !player.secondary.fullAuto){
        player.secondary.chambered = true;
       }
       if(!gp.buttons[7].pressed){
        player.flags.rightTrigger = true;
       }
       if(gp.buttons[2].pressed && player.equippedItem === "primary" && player.primary.ammoCount > 0 && player.primary.ammo > 0 && player.primary.loaded){
        player.primary.ammoCount += player.primary.ammo;
        player.primary.ammo = 0;
        player.primary.loaded = false;
        setTimeout(() => {
              if(player.primary.ammoCount > 0){
                if(player.primary.ammoCount < player.primary.maxAmmo){
                  player.primary.ammo = player.primary.ammoCount
                  player.primary.ammoCount = 0;
                }
              else {
              player.primary.ammoCount -= player.primary.maxAmmo;
              player.primary.ammo = player.primary.maxAmmo;
              }
              player.primary.loaded = true;
              }
            }, player.primary.reloadTime);
       }
       if(gp.buttons[2].pressed && player.equippedItem === "secondary" && player.secondary.ammoCount > 0 && player.secondary.ammo > 0 && player.secondary.loaded){
        player.secondary.ammoCount += player.secondary.ammo;
        player.secondary.ammo = 0;
        player.secondary.loaded = false;
        setTimeout(() => {
              if(player.secondary.ammoCount > 0){
                if(player.secondary.ammoCount < player.secondary.maxAmmo){
                  player.secondary.ammo = player.secondary.ammoCount
                  player.secondary.ammoCount = 0;
                }
              else {
              player.secondary.ammoCount -= player.secondary.maxAmmo;
              player.secondary.ammo = player.secondary.maxAmmo;
              }
              player.secondary.loaded = true;
              }
            }, player.secondary.reloadTime);
       }

       //ITEMS
       if(!player.flags.leftDPad){
        player.flags.leftDPadHold++
       }
       else player.flags.leftDPadHold = 0;

       if(gp.buttons[14].pressed && player.flags.leftDPad){
        player.flags.leftDPad = false;
        if(player.Item1 === "landmine" && player.Item1quantity > 0){
          player.Item1quantity--
          placeMine(player)
          audio.landmineplace.play();
        }
        else if(player.Item1 === "grenade" && player.Item1quantity > 0){
          player.Item1quantity--
          throwGrenade(player);
          audio.grenadethrow.play();
        }
        else if(player.Item1 === "launcher"){
          player.equippedItem = "launcher";
          loadPlayerImage(player)
        }
        else if(player.Item1 === "incendiary" && player.Item1quantity > 0){
          player.Item1quantity--
          throwIncendiary(player)
          audio.grenadethrow.play();
          setTimeout(() => {
            audio.fire.play();
          }, 750);
        }
       }
       else if(!gp.buttons[14].pressed){
        player.flags.leftDPad = true;
       }
       if(!gp.buttons[14].pressed && player.Item1 === "c4" && player.flags.leftDPadHold < 60 && player.flags.leftDPadHold > 0 && player.Item1quantity > 0){
          player.Item1quantity--
          throwC4(player)
          player.flags.leftDPadHold = 0;
        }
       

       if(gp.buttons[15].pressed && player.flags.rightDPad && player.Item2quantity > 0){
        player.flags.rightDPad = false;
        player.Item2quantity--
        if(player.Item2 === "Medkit"){
          audio.medkit.play();
          player.health += 100;
          player.health = Math.min(player.health, 100);
          colorMonitor();
        }
        if(player.Item2 === "Adrenaline"){
          audio.adrenaline.play();
          player.speed = 3;
          setTimeout(() => {
            calculateSpeed(player);
          }, 5000)
        }
        if(player.Item2 === "Ammobox"){
          player.primary.ammoCount = player.primary.ammoCountOG;
          player.secondary.ammoCount = player.secondary.ammoCountOG;
          audio.ammobox.play();
        }
        if(player.Item2 === "Concussion"){
          throwConcussion(player);
          audio.grenadethrow.play();
        }
        if(player.Item2 === "Drone"){
          let target = findEnemy(player, 0);
          launchDrone(player, target);
          audio.drone.play();
        }
       }
       else if(!gp.buttons[15].pressed){
        player.flags.rightDPad = true;
       }

       //INVENTORY
       if(gp.buttons[4].pressed && player.flags.leftBumper){
        player.flags.leftBumper = false;
        player.equippedItem = "primary";
        loadPlayerImage(player);
       }
       else if(!gp.buttons[4].pressed){
        player.flags.leftBumper = true;
       }
       if(gp.buttons[5].pressed && player.flags.rightBumper){
        player.flags.rightBumper = false;
        player.equippedItem = "secondary";
        loadPlayerImage(player);
       }
       else if(!gp.buttons[5].pressed){
        player.flags.rightBumper = true;
       }

           }

           //LEAVING FUNCTION

           if(gp.buttons[9].pressed && player.flags.menu2 && !leaving && gameLive){
      leaving = true;
      $(".leaveNotification").addClass("poptop");
      player.flags.menu2 = false;
    }
    if(gp.buttons[9].pressed && player.flags.menu2 && leaving && gameLive){
      leaving = false;
      $(".leaveNotification").removeClass("poptop");
      player.flags.menu2 = false;
      p1Leaving = false;
      p2Leaving = false;
    }
    if(gp.buttons[8].pressed && player.flags.menu1 && leaving && gameLive){
      if(player.team === 1){
        p1Leaving = true;
      }
      if(player.team === 2){
        p2Leaving = true;
      }

      if(p1Leaving && p2Leaving && gameLive){ //REVERT BACK TO NORMAL
        leaving = false;
        $(".leaveNotification").removeClass("poptop");
        player.flags.menu2 = false;
        p1Leaving = false;
        p2Leaving = false;
          $(".transitiontwo").addClass("fade-in-out");
          backgroundSound.pause();
          audio.fire.pause();
          setTimeout(() => {
            $(".transitiontwo").removeClass("fade-in-out");
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
      }
    }

    if(!gp.buttons[9].pressed){
      player.flags.menu2 = true;
    }
    if(!gp.buttons[8].pressed){
      player.flags.menu1 = true;
    }
  });

       //BULLET MOVEMENT
       bullets.forEach(bullet => {
        bullet.x += bullet.dx * bullet.speed;
        bullet.y += bullet.dy * bullet.speed;
       });
        walls.forEach(wall => {
          bullets = bullets.filter(bullet => {
          if(bullet.x + bullet.size > wall.x &&
            bullet.x < wall.x + wall.width &&
            bullet.y + bullet.size > wall.y &&
            bullet.y < wall.y + wall.height && wall.bulletCollide
          ){
            return false;
          }
          else return true;
        });
       });
      players.forEach(player => {
        bullets = bullets.filter(bullet => {
          if(bullet.x + bullet.size > player.x + (player.size / 3) &&
            bullet.x < (player.x + (player.size / 3)) + (player.size / 3) &&
            bullet.y + bullet.size > player.y + (player.size / 3) &&
            bullet.y < (player.y + (player.size / 3)) + (player.size / 3)
          ){
            if(player.Item2 === "shield" && player.equippedItem === "secondary"){
              player.health -= ((bullet.damage * 8) / (100 + player.Item2quantity)) * 100;
              playSound(audio.hurt)
              player.Item2quantity -= bullet.damage * 2;
              player.Item2quantity = Math.max(player.Item2quantity, 0);
            }
            else player.health -= bullet.damage * 8;
            loadPlayerImage(player);
            if(bloodOn){
            var nblood = {
            x: (player.x + (player.size / 2) + (Math.random() - 0.5) * 75),
            y: (player.y + (player.size / 2) + (Math.random() - 0.5) * 75),
            size: 0,
            maxSize: Math.floor(Math.random() * (11 - 8) + 8),
            }
            blood.push(nblood);
          }
            colorMonitor();
            return false;
          }
          else return true;
            });
          });

       rockets.forEach(rocket => {
        if(rocket.explode){
          rocket.speed = 0;
          rocket.timing--
          if(rocket.timing === 19){
          rocket.src = effects.explosion[0];
          rocket.x -= 150;
          rocket.y -= 150;
          rocket.drawwidth = 300;
          rocket.drawheight = 300;

          damagePlayersInArea(rocket.x, rocket.y, rocket.drawwidth, rocket.drawheight, rocket.damage);
        }
        if(rocket.timing === 15){
          playSound(audio.explosionTwo)
          rocket.src = effects.explosion[1];
        }
        if(rocket.timing === 10){
          rocket.src = effects.explosion[2];
        }
        if(rocket.timing === 5){
          rocket.src = effects.explosion[3];
        }
        if(rocket.timing === 0){
          rocket.src = effects.explosion[4];
        }
        }
        if(!checkCollisionItem(rocket.x, rocket.y, rocket.width, rocket.height))rocket.x += rocket.dx * rocket.speed; rocket.speed += 0.3;
        if(!checkCollisionItem(rocket.x, rocket.y, rocket.width, rocket.height))rocket.y += rocket.dy * rocket.speed;
        if(checkCollisionItem(rocket.x, rocket.y, rocket.width, rocket.height) || checkCollisionItem(rocket.x, rocket.y, rocket.width, rocket.height)){
          rocket.speed = 0;
          rocket.explode = true;
        }
       });
       rockets = rockets.filter(rocket => {
        if(rocket.timing < 0){
          return false;
        }
        else return true;
       });
       drones.forEach(drone => {
        const Y = (drone.target.y - drone.y);
  const X = (drone.target.x - drone.x);
  const newAngle = Math.atan2(Y, X);

  drone.dx = Math.cos(newAngle);
  drone.dy = Math.sin(newAngle);
  drone.angle = newAngle + 96;// * (180 / Math.PI);

        if(!checkCollisionItem(drone.x, drone.y, drone.size, drone.size))drone.x += drone.dx * drone.speed;
        if(!checkCollisionItem(drone.x, drone.y, drone.size, drone.size))drone.y += drone.dy * drone.speed;
        if(checkCollisionItem(drone.x, drone.y, drone.size, drone.size) || checkCollisionItem(drone.x, drone.y, drone.size, drone.size)){
          drone.crashed = true;
          audio.drone.pause();
        }
       });
        players.forEach(player => {
          drones = drones.filter(drone => {
          if(drone.x + drone.size > player.x + (player.size / 3) &&
            drone.x < (player.x + (player.size / 3)) + (player.size / 3) &&
            drone.y + drone.size > player.y + (player.size / 3) &&
            drone.y < (player.y + (player.size / 3)) + (player.size / 3) && player.team !== drone.team)
            {
              player.speed = 0;
              audio.drone.pause();
            setTimeout(() => {
              calculateSpeed(player);
            }, 2000);
          return false;
        }
        else return true;
        });
       });
       grenades.forEach(grenade => {
        let newX = grenade.x;
        let newY = grenade.y;

        newX += grenade.dx * grenade.speed;
        newY += grenade.dy * grenade.speed;

        if(!checkCollisionItem(newX, grenade.y, grenade.size, grenade.size))grenade.x = newX;
        if(!checkCollisionItem(grenade.x, newY, grenade.size, grenade.size))grenade.y = newY;
        if(checkCollisionItem(newX, grenade.y, grenade.size, grenade.size) || checkCollisionItem(grenade.x, newY, grenade.size, grenade.size)){
          grenade.speed *= -1;
          grenade.ricochet = true;
        }

        if(!grenade.ricochet){
        grenade.speed -= 0.20;
        grenade.speed = Math.max(grenade.speed, 0);
        }
        else {
          grenade.speed += 0.20;
        grenade.speed = Math.min(grenade.speed, 0);
        }

        grenade.timing--
        if(grenade.timing === 0){
          grenade.src = effects.explosion[0];
          audio.explosionOne.play();
          grenade.x -= 100;
          grenade.y -= 100;
          grenade.size = 200;

          damagePlayersInArea(grenade.x, grenade.y, grenade.size, grenade.size, grenade.damage);
        }
        if(grenade.timing === -5){
          grenade.src = effects.explosion[1];
        }
        if(grenade.timing === -10){
          grenade.src = effects.explosion[2];
        }
        if(grenade.timing === -15){
          grenade.src = effects.explosion[3];
        }
        if(grenade.timing === -20){
          grenade.src = effects.explosion[4];
        }
       });
       grenades = grenades.filter(grenade => {
        if(grenade.timing < -20){
          return false;
        }
        else return true;
       });
       c4s.forEach(c4 => {
        let newX = c4.x;
        let newY = c4.y;

        newX += c4.dx * c4.speed;
        newY += c4.dy * c4.speed;

        c4.speed -= 0.20;
        c4.speed = Math.max(c4.speed, 0);

        if(!checkCollisionItem(newX, c4.y, c4.size, c4.size))c4.x = newX;
        if(!checkCollisionItem(c4.x, newY, c4.size, c4.size))c4.y = newY;
        if(checkCollisionItem(newX, c4.y, c4.size, c4.size) || checkCollisionItem(c4.x, newY, c4.size, c4.size)){
          c4.speed = 0;
        }
        
        players.forEach(player => {
          if(player.team === c4.team){
            if(!player.flags.leftDPad){
              c4.hold--
            }
            else c4.hold = 60;

            if(c4.hold <= 0 && !c4.activated){
              c4.activated = true;
            }
            if(c4.activated){
              c4.timing--
        if(c4.timing === 19){
          c4.src = effects.explosion[0];
          c4.x -= 100;
          c4.y -= 100;
          c4.size = 200;

          audio.explosionTwo.play();

          damagePlayersInArea(c4.x, c4.y, c4.size, c4.size, c4.damage);
        }
        if(c4.timing === 15){
          c4.src = effects.explosion[1];
        }
        if(c4.timing === 10){
          c4.src = effects.explosion[2];
        }
        if(c4.timing === 5){
          c4.src = effects.explosion[3];
        }
        if(c4.timing === 0){
          c4.src = effects.explosion[4];
        }
            }
          }
        });
       });
       c4s = c4s.filter(c4 => {
        if(c4.timing < 0){
          return false;
        }
        else return true;
       })
       concussions.forEach(concussion => {
        let newX = concussion.x;
        let newY = concussion.y;

        newX += concussion.dx * concussion.speed;
        newY += concussion.dy * concussion.speed;

        if(!checkCollisionItem(newX, concussion.y, concussion.size, concussion.size))concussion.x = newX;
        if(!checkCollisionItem(concussion.x, newY, concussion.size, concussion.size))concussion.y = newY;
        if(checkCollisionItem(newX, concussion.y, concussion.size, concussion.size) || checkCollisionItem(concussion.x, newY, concussion.size, concussion.size)){
          concussion.speed *= -1;
          concussion.ricochet = true;
        }

        if(!concussion.ricochet){
        concussion.speed -= 0.20;
        concussion.speed = Math.max(concussion.speed, 0);
        }
        else {
          concussion.speed += 0.20;
        concussion.speed = Math.min(concussion.speed, 0);
        }

        concussion.timing--
        if(concussion.timing === 8){
          audio.flashbang.play();
          concussion.src = effects.explosion[0];
          concussion.x -= 250;
          concussion.y -= 250;
          concussion.size = 500;
          let playInArea = findPlayersInArea(concussion.x + (concussion.size / 3), concussion.y + (concussion.size / 3), concussion.size / 3, concussion.size / 3);
          playInArea.forEach(player => {
            player.speed = 0.5;
            let OGaccuracy = player.primary.accuracy;
            player.primary.accuracy = 0;
            setTimeout(() => {
              calculateSpeed(player);
              player.primary.accuracy = OGaccuracy;
            }, 5000);
          });
        }
        if(concussion.timing === 3){
          concussion.src = effects.explosion[1];
        }
       });
       concussions = concussions.filter(concussion => {
        if(concussion.timing <= 0){
          return false;
        }
        else return true;
       })
       incendiaries.forEach(incendiary => {
        let newX = incendiary.x;
        let newY = incendiary.y;

        newX += incendiary.dx * incendiary.speed;
        newY += incendiary.dy * incendiary.speed;

        if(!checkCollisionItem(newX, incendiary.y, incendiary.size, incendiary.size) && !incendiary.exploded)incendiary.x = newX;
        if(!checkCollisionItem(incendiary.x, newY, incendiary.size, incendiary.size) && !incendiary.exploded)incendiary.y = newY;
        if(checkCollisionItem(newX, incendiary.y, incendiary.size, incendiary.size) || checkCollisionItem(incendiary.x, newY, incendiary.size, incendiary.size) && !incendiary.exploded){
          incendiary.speed *= -1;
          incendiary.ricochet = true;
        }

        if(!incendiary.ricochet && !incendiary.exploded){
        incendiary.speed -= 0.20;
        incendiary.speed = Math.max(incendiary.speed, 0);
        }
        else if(incendiary.ricochet && !incendiary.exploded){
          incendiary.speed += 0.20;
        incendiary.speed = Math.min(incendiary.speed, 0);
        }
        if(incendiary.speed === 0 && !incendiary.exploded){
          incendiary.exploded = true;
          incendiary.x -= 200;
          incendiary.y -= 200;
          incendiary.size = 400;
        }
        if(incendiary.exploded){
          incendiary.timing--
          if(incendiary.timing % 5 === 0){
            incendiary.src = effects.fire[incendiary.frame - 1];
            incendiary.frame++
            if(incendiary.frame === 7){
              incendiary.frame = 1;
            }
          }
          if(incendiary.timing % 10 === 0){
          damagePlayersInArea(incendiary.x + (incendiary.size / 3), incendiary.y + (incendiary.size / 3), incendiary.size / 3, incendiary.size / 3, incendiary.damage)
          }
        }
       });
       incendiaries = incendiaries.filter(incendiary => {
        if(incendiary.timing < 0){
          return false;
        }
        else return true;
       });
       mines.forEach(mine => {
        players.forEach(player => {
          if(player.x + (player.size / 3) > mine.x &&
          player.x < mine.x + mine.size &&
          player.y + (player.size / 3) > mine.y &&
          player.y < mine.y + mine.size && mine.team !== player.team
        ){
          mine.activated = true;
        }
        })
        if(mine.activated){
          mine.timing--
          if(mine.timing === 19){
            audio.explosionOne.play();
          mine.x -= 50;
          mine.y -= 50;
          mine.size *= 6;
          mine.src = effects.explosion[0];

          damagePlayersInArea(mine.x, mine.y, mine.size, mine.size, mine.damage)
        }
        if(mine.timing === 15){
          mine.src = effects.explosion[1];
        }
        if(mine.timing === 10){
          mine.src = effects.explosion[2];
        }
        if(mine.timing === 5){
          mine.src = effects.explosion[3];
        }
        if(mine.timing === 0){
          mine.src = effects.explosion[4];
        }
        }
       });
       mines = mines.filter(mine => {
        if(mine.timing < 0){
          return false;
        }
        else return true;
       });

       //END GAME

       missileStrikes.forEach(strike => {
        strike.timing--
        if(strike.timing === 50){
          damagePlayersInArea(strike.x, strike.y, strike.size, strike.size, strike.damage)
        }
        if(strike.timing % 5 === 0){
          strike.src = effects.explosion2[strike.frame];
          strike.frame++
        }
       });
       missileStrikes = missileStrikes.filter(strike => {
        if(strike.frame > 9){
          return false;
        }
        else return true;
       });
       gunRuns.forEach(gunrun => {
        gunrun.timing--
        switch(gunrun.timing){
          case 50:
          damagePlayersInArea(gunrun.x, gunrun.y, gunrun.size, gunrun.size, gunrun.damage)
          gunrun.src = effects.explosion2[0]
          break;
          case 45:
          gunrun.src = effects.explosion2[1]
          break;
          case 40:
          gunrun.src = effects.explosion2[2]
          break;
          case 35:
          gunrun.src = effects.explosion2[3]
          break;
          case 30:
          gunrun.src = effects.explosion2[4]
          break;
          case 25:
          gunrun.src = effects.explosion2[5]
          break;
          case 20:
          gunrun.src = effects.explosion2[6]
          break;
          case 15:
          gunrun.src = effects.explosion2[7]
          break;
          case 10:
          gunrun.src = effects.explosion2[8]
          break;
          case 5:
          gunrun.src = effects.explosion2[9]
          break;
        }
       });
       gunRuns = gunRuns.filter(gunrun => {
        if(gunrun.timing < 0){
          return false;
        }
        else return true;
       });

       if(inMenus){
        requestAnimationFrame(menuUpdate);
       }
       else if(!inMenus){
  requestAnimationFrame(update);
  draw();
       }
}
function menuUpdate(){
  const gamepads = navigator.getGamepads();

  players.forEach((player, i) => {
    const gp = gamepads[i]; // each player uses a different controller
    if (!gp) return;
    
    let leftRight = (gp.axes[0]);
    let upDown = (gp.axes[1]);

    if(leftRight > 0.5 && inLoadout && player.flags.right){
      player.flags.right = false;
      let activatedSlot;
      for(var r = 0; r < loadoutItems[player.team - 1].length; r++){
        if(loadoutItems[player.team - 1][r].activated){
          activatedSlot = loadoutItems[player.team - 1][r]
        }
      }
      if(activatedSlot.right){
      moveFocus(loadoutItems[player.team - 1], activatedSlot.right, `p${player.team}`, "right");
      audio.move.play();
      }
    }
    if(leftRight < -0.5 && inLoadout && player.flags.left){
      player.flags.left = false;
      let activatedSlot;
      for(var r = 0; r < loadoutItems[player.team - 1].length; r++){
        if(loadoutItems[player.team - 1][r].activated){
          activatedSlot = loadoutItems[player.team - 1][r]
        }
      }
      if(activatedSlot.left){
      moveFocus(loadoutItems[player.team - 1], activatedSlot.left, `p${player.team}`, "left");
      audio.move.play();
      }
    }
    if(upDown > 0.5 && inLoadout && player.flags.down){
      player.flags.down = false;
      let activatedSlot;
      for(var r = 0; r < loadoutItems[player.team - 1].length; r++){
        if(loadoutItems[player.team - 1][r].activated){
          activatedSlot = loadoutItems[player.team - 1][r]
        }
      }
      if(activatedSlot.down){
      moveFocus(loadoutItems[player.team - 1], activatedSlot.down, `p${player.team}`, "down");
      audio.move.play();
      }
    }
    if(upDown < -0.5 && inLoadout && player.flags.up){
      player.flags.up = false;
      let activatedSlot;
      for(var r = 0; r < loadoutItems[player.team - 1].length; r++){
        if(loadoutItems[player.team - 1][r].activated){
          activatedSlot = loadoutItems[player.team - 1][r]
        }
      }
      if(activatedSlot.up){
      moveFocus(loadoutItems[player.team - 1], activatedSlot.up, `p${player.team}`, "up");
      audio.move.play();
      }
    }

    if(leftRight > 0.5 && !inLoadout && player.flags.right && inMenus && !inSettings){
      player.flags.right = false;
      let activatedSlot;
      for(var r = 0; r < menuItems.length; r++){
        if(menuItems[r].activated){
          activatedSlot = menuItems[r]
        }
      }
      if(activatedSlot.right){
      moveFocusMenu(menuItems, activatedSlot.right);
      }
    }
    if(leftRight < -0.5 && !inLoadout && player.flags.left && inMenus && !inSettings){
      player.flags.left = false;
      let activatedSlot;
      for(var r = 0; r < menuItems.length; r++){
        if(menuItems[r].activated){
          activatedSlot = menuItems[r]
        }
      }
      if(activatedSlot.left){
      moveFocusMenu(menuItems, activatedSlot.left);
      }
    }
    if(leftRight > 0.5 && !inLoadout && player.flags.right && inMenus && inSettings){
      player.flags.right = false;
      let activatedSlot;
      for(var r = 0; r < menuItems.length; r++){
        if(menuItems[r].activated){
          activatedSlot = menuItems[r]
        }
      }
      activatedSlot.right();
    }
    if(leftRight < -0.5 && !inLoadout && player.flags.left && inMenus && inSettings){
      player.flags.left = false;
      let activatedSlot;
      for(var r = 0; r < menuItems.length; r++){
        if(menuItems[r].activated){
          activatedSlot = menuItems[r]
        }
      }
      activatedSlot.left();

    }
    if(upDown > 0.5 && !inLoadout && player.flags.down && inMenus){
      player.flags.down = false;
      let activatedSlot;
      for(var r = 0; r < menuItems.length; r++){
        if(menuItems[r].activated){
          activatedSlot = menuItems[r]
        }
      }
      if(activatedSlot.down){
      moveFocusMenu(menuItems, activatedSlot.down);
      audio.move.play();
      }
    }
    if(upDown < -0.5 && !inLoadout && player.flags.up && inMenus){
      player.flags.up = false;
      let activatedSlot;
      for(var r = 0; r < menuItems.length; r++){
        if(menuItems[r].activated){
          activatedSlot = menuItems[r]
        }
      }
      if(activatedSlot.up){
      moveFocusMenu(menuItems, activatedSlot.up);
      audio.move.play();
      }
    }

    if(leftRight > -0.4 && leftRight < 0.4){
      player.flags.left = true;
      player.flags.right = true;
    }
    if(upDown > -0.4 && upDown < 0.4){
      player.flags.up = true;
      player.flags.down = true;
    }

    if(gp.buttons[0].pressed && player.flags.a){
      player.flags.a = false;
      if(inLoadout && !inSettings){
      for(var r = 0; r < loadoutItems[player.team - 1].length; r++){
        if(loadoutItems[player.team - 1][r].activated && loadoutItems[player.team - 1][r].name[1] !== "p" && loadoutItems[player.team - 1][r].name[1] !== "s"){
          loadoutItems[player.team - 1][r].select(player);
          r += 100;
        }
        else if(loadoutItems[player.team - 1][r].activated && loadoutItems[player.team - 1][r].name[1] === "p"){
          loadoutItems[player.team - 1][r].select(player, loadoutItems[player.team - 1][r].gun);
          r += 100;
        }
        else if(loadoutItems[player.team - 1][r]?.activated && loadoutItems[player.team - 1][r].name[1] === "s"){
          loadoutItems[player.team - 1][r].select(player, loadoutItems[player.team - 1][r].gun);
          r += 100;
        }
      }
     }
     if(inMenus && !inLoadout && !inSettings && player.team === 1){
      for(var r = 0; r < menuItems.length; r++){
        if(menuItems[r].activated){
          menuItems[r].select();
          audio.select.play();
          r += 100;
        }
      }
     }
     if(inMenus && !inLoadout && inSettings && player.team === 1){
      for(var r = 0; r < menuItems.length; r++){
        if(menuItems[r].activated){
          menuItems[r].select();
          audio.select.play();
          r += 100;
        }
      }
     }
    }

    if(gp.buttons[1].pressed && player.flags.b && inMenus && inLocalPlay && !inLoadout && !inSettings && !inControls){
      player.flags.b = false;
      loadMainMenu();
      inLocalPlay = false;
    }
    if(gp.buttons[1].pressed && player.flags.b && inMenus && !inLocalPlay && !inLoadout && inSettings && inControls){
      player.flags.b = false;
      $(".controls").css({
        "z-index": -1,
        "opacity": 0,
      })
      inControls = false;
    }
    if(gp.buttons[1].pressed && player.flags.b && inMenus && !inLocalPlay && !inLoadout && inSettings && !inControls){
      player.flags.b = false;
      inSettings = false;
      menuItems.forEach(item => {
        if(item.activated){
          item.activated = false;
        }
        else if(item.type === "settingsOption"){
          item.activated = true;
        }
      });
      $(".settings").css({
        "opacity": 0,
        "z-index": -1,
      })
    }

    if(!gp.buttons[0].pressed){
      player.flags.a = true;
    }
    if(gp.buttons[1].pressed && player.flags.b && inLoadout){
      player.flags.b = false;
      loadLoadoutScreen(`p${player.team}`);
    }
    if(!gp.buttons[1].pressed){
      player.flags.b = true;
    }

    if(gp.buttons[9].pressed && player.flags.menu2 && !leaving && inLoadout){
      leaving = true;
      $(".leaveNotification").addClass("poptop");
      player.flags.menu2 = false;
    }
    if(gp.buttons[9].pressed && player.flags.menu2 && leaving){
      leaving = false;
      $(".leaveNotification").removeClass("poptop");
      player.flags.menu2 = false;
      p1Leaving = false;
      p2Leaving = false;
    }
    if(gp.buttons[8].pressed && player.flags.menu1 && leaving){
      if(player.team === 1){
        p1Leaving = true;
      }
      if(player.team === 2){
        p2Leaving = true;
      }

      if(p1Leaving && p2Leaving){ //REVERT BACK TO NORMAL
        leaving = false;
      $(".leaveNotification").removeClass("poptop");
      player.flags.menu2 = false;
      p1Leaving = false;
      p2Leaving = false;
      $(".transitiontwo").addClass("fade-in-out");
      setTimeout(() => {
        gameLive = false;
        inMenus = true;
        inLoadout = false;
        inLocalPlay = true;
        $(".loadoutScreen").css("z-index", -1);
        $(".loadoutScreen").css("opacity", 0);
        $(".loadoutScreen").css("display", "none");
        $(".menu").css("z-index", 10);
        $(".menu").css("opacity", 1);
      }, 2000);
      setTimeout(() => {
        $(".transitiontwo").removeClass("fade-in-out");
      }, 4000);
      }
    }

    if(!gp.buttons[9].pressed){
      player.flags.menu2 = true;
    }
    if(!gp.buttons[8].pressed){
      player.flags.menu1 = true;
    }
  });

  if(inMenus){
        requestAnimationFrame(menuUpdate);
       }
       else if(!inMenus){
  requestAnimationFrame(update);
  draw();
       }
}

//TIME
setInterval(() => {
   if(gameLive){
      time--
      time = Math.max(time, 0)
      if(time % 60 < 10){
   $(".time").text(`${Math.floor(time / 60)}:0${time % 60}`)
}
else $(".time").text(`${Math.floor(time / 60)}:${time % 60}`)
      players.forEach(player => {
        if(player.health <= 35 && bloodOn){
         var nblood = {
            x: (player.x + (player.size / 2) + (Math.random() - 0.5) * 30),
            y: (player.y + (player.size / 2) + (Math.random() - 0.5) * 30),
            size: 0,
            maxSize: Math.floor(Math.random() * (9 - 6) + 6),
            }
            blood.push(nblood);
      }
      if(player.health <= 20 && bloodOn){
        setTimeout(() => {
          var nblood = {
            x: (player.x + (player.size / 2) + (Math.random() - 0.5) * 30),
            y: (player.y + (player.size / 2) + (Math.random() - 0.5) * 30),
            size: 0,
            maxSize: Math.floor(Math.random() * (9 - 6) + 6),
            }
            blood.push(nblood);
        }, 500);
      }
      if(player.health <= 10 && bloodOn){
        setTimeout(() => {
          var nblood = {
            x: (player.x + (player.size / 2) + (Math.random() - 0.5) * 30),
            y: (player.y + (player.size / 2) + (Math.random() - 0.5) * 30),
            size: 0,
            maxSize: Math.floor(Math.random() * (9 - 6) + 6),
            }
            blood.push(nblood);
        }, 250);
      }

      });
   }
}, 1000);


function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxhud.clearRect(0, 0, canvas.width, canvas.height);

  mines.forEach(mine => {
    ctx.drawImage(mine.src, mine.x, mine.y, mine.size, mine.size);
  });
  grenades.forEach(grenade => {
    ctx.drawImage(grenade.src, grenade.x, grenade.y, grenade.size, grenade.size);
  });
  incendiaries.forEach(incendiary => {
    ctx.drawImage(incendiary.src, incendiary.x, incendiary.y, incendiary.size, incendiary.size);
  });
  concussions.forEach(concussion => {
    ctx.drawImage(concussion.src, concussion.x, concussion.y, concussion.size, concussion.size);
  });
  rockets.forEach(rocket => {
    if(!rocket.explode){
      ctx.save();
    ctx.translate(
    rocket.x + (rocket.width / 2),
    rocket.y + (rocket.height / 2)
  );
    ctx.rotate(rocket.angle);
    ctx.drawImage(rocket.src, -rocket.drawwidth / 2, -rocket.drawheight / 2, rocket.drawwidth, rocket.drawheight);
    ctx.restore();
    }
    else {
      ctx.drawImage(rocket.src, rocket.x, rocket.y, rocket.drawwidth, rocket.drawheight);
    }
  });
  drones.forEach(drone => {
    if(!drone.crashed){
      ctx.save();
    ctx.translate(
    drone.x + (drone.size / 2),
    drone.y + (drone.size / 2)
  );
    ctx.rotate(drone.angle);
    ctx.drawImage(drone.src, -drone.size / 2, -drone.size / 2, drone.size, drone.size);
    ctx.restore();
    }
  });
  c4s.forEach(c4 => {
    ctx.drawImage(c4.src, c4.x, c4.y, c4.size, c4.size);
  });
  missileStrikes.forEach(strike => {
    ctx.drawImage(strike.src, strike.x, strike.y, strike.size, strike.size);
  });
  gunRuns.forEach(gunrun => {
    if(gunrun.timing <= 50){
    ctx.drawImage(gunrun.src, gunrun.x, gunrun.y, gunrun.size, gunrun.size);
    }
  });

  blood.forEach(blood => {
    ctx.fillStyle = 'rgb(177, 0, 0)';
    ctx.fillRect(blood.x, blood.y, blood.size, blood.size);

    if(blood.size < blood.maxSize){
      blood.size += 0.5;
    }
  });
  players.forEach(player => {
    ctx.save();
    ctx.translate(
    player.x + (player.size / 2),
    player.y + (player.size / 2)
  );
    ctx.rotate(player.angle * (Math.PI / 180));
    ctx.drawImage(player.src, (-player.size / 2) + 10, (-player.size / 2) + 15);
    if(player.equippedItem === "secondary" && player.Item2 === "shield"){
    ctx.fillStyle = "black";
    ctx.fillRect((-player.size / 2) + 26, (-player.size / 2) + 46, 20, 3.5);
    }
    if(player.primary.attachments.laser && player.equippedItem === "primary"){
    ctx.fillStyle = "red";
    ctx.fillRect((-player.size / 2) + 30, (-player.size / 2) + 56, 0.75, 700);  
    }
    if(player.secondary.attachments.laser && player.equippedItem === "secondary"){
    ctx.fillStyle = "red";
    ctx.fillRect((-player.size / 2) + 30, (-player.size / 2) + 56, 0.75, 1000);  
    }
    if(!player.primary.chambered && player.primary.ammo % 2 === 0){
      ctx.drawImage(effects.muzzleFlash, (-player.size / 3) + 8, (-player.size / 3) + 42, 20, 20);
    }
    if(!player.secondary.chambered){
      ctx.drawImage(effects.muzzleFlash, (-player.size / 3) + 8, (-player.size / 3) + 42, 20, 20);
    }
    ctx.restore();

    //ctx.fillStyle = "yellow";
    //ctx.fillRect(player.x, player.y, player.size, player.size)
  });

 /* walls.forEach(wall => {
    ctx.fillStyle = "yellow",
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });*/

  /*ctx.fillStyle = "White";
  ctx.fillRect(pointer.x, pointer.y, pointer.width, pointer.height);*/

  bullets.forEach(bullet => {
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size)
  });

  //HUD
  ctxhud.drawImage(players[0].styles[0], 5, 30, 100, 100);
  ctxhud.drawImage(players[1].styles[0], canvas.width - players[1].size - 25, 30, 100, 100);
  ctxhud.font = "20px Courier";
  ctxhud.fillStyle = "white";
  ctx.fillStyle = "white";
  ctxhud.drawImage(players[0].Item1Icon, 5, 140, 60, 60);
  ctxhud.fillText(`${players[0].Item1quantity}`, 5, 140);
  ctxhud.drawImage(players[0].Item2Icon, 5, 190, 60, 60);
  ctxhud.fillText(`${players[0].Item2quantity}`, 5, 190);
  ctxhud.drawImage(players[1].Item1Icon, canvas.width - 45, 140, 60, 60);
  ctxhud.fillText(`${players[1].Item1quantity}`, canvas.width - 45, 140);
  ctxhud.drawImage(players[1].Item2Icon, canvas.width - 45, 190, 60, 60);
  ctxhud.fillText(`${players[1].Item2quantity}`, canvas.width - 45, 190);
  if(players[0].equippedItem === "primary"){
    if(!players[0].flags.leftTrigger){
  ctx.fillText(`${players[0].primary.ammo} / ${players[0].primary.ammoCount}`, players[0].x + 20, players[0].y);
    }
  ctxhud.drawImage(players[0].primary.icon, 250, 5, 100, 100);
  ctxhud.fillText(players[0].primary.name, 250, 20);
  }
  else if(players[0].equippedItem === "secondary"){
    if(!players[0].flags.leftTrigger){
  ctx.fillText(`${players[0].secondary.ammo} / ${players[0].secondary.ammoCount}`, players[0].x + 20, players[0].y);
    }
  ctxhud.drawImage(players[0].secondary.icon, 250, 5, 100, 100);
  ctxhud.fillText(players[0].secondary.name, 250, 20);
  }

  if(players[1].equippedItem === "primary"){
    if(!players[1].flags.leftTrigger){
  ctx.fillText(`${players[1].primary.ammo} / ${players[1].primary.ammoCount}`, players[1].x + 20, players[1].y);
    }
  ctxhud.drawImage(players[1].primary.icon, canvas.width - 350, 5, 100, 100);
  ctxhud.fillText(players[1].primary.name, canvas.width - 350, 20);
  }
  else if(players[1].equippedItem === "secondary"){
    if(!players[1].flags.leftTrigger){
  ctx.fillText(`${players[1].secondary.ammo} / ${players[1].secondary.ammoCount}`, players[1].x + 20, players[1].y);
    }
  ctxhud.drawImage(players[1].secondary.icon, canvas.width - 350, 5, 100, 100);
  ctxhud.fillText(players[1].secondary.name, canvas.width - 350, 20);
  }
}
update();

window.addEventListener("gamepadconnected", (event) => {
  if(!controllerCalled){
    $(".controllerNotification h1").text("Controller Connected!");
    $(".controllerNotification").addClass("poptop");
  }
  controllerCalled = true;

  setTimeout(() => {
    $(".controllerNotification").removeClass("poptop");
  }, 5000);
});
window.addEventListener("gamepaddisconnected", (event) => {
  if(!controllerCalled){
    $(".controllerNotification h1").text("Controller Disconnected!");
    $(".controllerNotification").addClass("poptop");
  }
  controllerCalled = true;

  setTimeout(() => {
    $(".controllerNotification").removeClass("poptop");
  }, 5000);
});

/*document.addEventListener("click", () => {
  console.log(`{
    x: ${pointer.x},
    y: ${pointer.y},
    width: ${pointer.width},
    height: ${pointer.height},
    bulletCollide: false,
    },`);
});*/
