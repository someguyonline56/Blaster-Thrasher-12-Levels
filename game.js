// Game Canvas Setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Screen Elements
const introScreen = document.getElementById("introScreen");
const introVideoScreen = document.getElementById("introVideoScreen");
const titleScreen = document.getElementById("titleScreen");
const intermissionScreen = document.getElementById("intermissionScreen");
const creditScreen = document.getElementById("creditScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const levelClearedContainer = document.getElementById("levelClearedContainer");

// High Score Elements
const nameInput = document.getElementById("playerNameInput");
const highScoreEntry = document.getElementById("highScoreEntry");
const highScoresContainer = document.getElementById("highScoresContainer");
const highScoresList = document.getElementById("highScoresList");
const submitScoreBtn = document.getElementById("submitScoreBtn");

// Audio Elements
const titleMusic = document.getElementById("titleMusic");
const creditMusic = document.getElementById("creditMusic");
const warpSound = document.getElementById("warpSound");
const gameOverMusic = document.getElementById("gameOverMusic");
const enemyLaserSound = document.getElementById("enemyLaserSound");
const playerLaserSound = document.getElementById("playerLaserSound");
const enemyDestroyedSound = document.getElementById("enemyDestroyedSound");
const playerDestroyedSound = document.getElementById("playerDestroyedSound");
const bulletsDestroyedSound = document.getElementById("bulletsDestroyedSound");
const powerupSound = document.getElementById("powerupSound");
const bossfightMusic = document.getElementById("bossfightMusic");
const levelclearMusic = document.getElementById("levelclearMusic");
const enemydetectedSound = document.getElementById("enemydetectedSound");
const bossDestroyedSound = document.getElementById("bossDestroyedSound");
const victoryMusic = document.getElementById("victoryMusic");
const oneupSound = document.getElementById("oneupSound");

// Video Element
const introVideo = document.getElementById("introVideo");

// Level music elements (1-12)
const levelMusic = [
  document.getElementById("level1Music"),
  document.getElementById("level2Music"),
  document.getElementById("level3Music"),
  document.getElementById("level4Music"),
  document.getElementById("level5Music"),
  document.getElementById("level6Music"),
  document.getElementById("level7Music"),
  document.getElementById("level8Music"),
  document.getElementById("level9Music"),
  document.getElementById("level10Music"),
  document.getElementById("level11Music"),
  document.getElementById("level12Music"),
];

// Set default volume levels
titleMusic.volume = 1.0;
creditMusic.volume = 1.0;
gameOverMusic.volume = 1.0;
warpSound.volume = 1.0;
enemyLaserSound.volume = 0.5;
playerLaserSound.volume = 0.5;
enemyDestroyedSound.volume = 0.5;
playerDestroyedSound.volume = 0.5;
bulletsDestroyedSound.volume = 0.5;
powerupSound.volume = 0.7;
bossfightMusic.volume = 1.0;
levelclearMusic.volume = 1.0;
enemydetectedSound.volume = 1.0;
bossDestroyedSound.volume = 0.5;
victoryMusic.volume = 1.0;
oneupSound.volume = 0.7;

// Set volume for all level music tracks
levelMusic.forEach((music) => {
  music.volume = 1.0;
});

// Game Constants
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 50;
const BULLET_WIDTH = 9;
const BULLET_HEIGHT = 24;
const ENEMY_BULLET_WIDTH = 15;
const ENEMY_BULLET_HEIGHT = 26;
const EXPLOSION_DURATION = 750;
const ENEMY_BULLET_DESTROY_DURATION = 500;
const SHOOT_INTERVAL = 66;
const POWERUP_WIDTH = 30;
const POWERUP_HEIGHT = 30;
const POWERUP_DURATION = 10000;
const MAX_HIGH_SCORES = 10;
const NAME_LENGTH = 10;
const FPS = 120;
const FRAME_TIME = 1000 / FPS;
const BASE_ENEMY_SPEED = 1;
const BASE_ENEMY_VERTICAL_SPEED = 0.5;
const BASE_PLAYER_BULLET_SPEED = 5;
const BASE_ENEMY_BULLET_SPEED = 3;
const LEVEL_SPEED_MULTIPLIERS = [
  1.0, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 2.8, 2.8, 2.8, 2.8, 2.8,
];
const MAX_LEVELS = 12;
const PLAYER_RESPAWN_DELAY = 1500;
const GET_READY_DURATION = 1000;
const LEVEL_CLEAR_DURATION = 2000;
const ENEMY_ENTRY_DURATION = 1500;
const BOSS_WIDTH = (canvas.width / 4) * 1.4 * 1.55;
const BOSS_HEIGHT = (canvas.height / 4) * 1.4 * 1.55;
const BOSS_HIT_POINTS = 100;
const BOSS_SHAKE_DURATION = 100;
const BOSS_EXPLOSION_COUNT = 5;
const BOSS_EXPLOSION_DURATION = 1000;

// Game State Variables
let player;
let enemies = [];
let playerBullets = [];
let enemyBullets = [];
let explosions = [];
let enemyBulletDestructions = [];
let destroyedEnemies = 0;
let gameOver = false;
let score = 0;
let level = 0;
let isMouseDown = false;
let lastShotTime = 0;
let levelWon = false;
let lastFrameTime = 0;
let powerups = [];
let powerupActive = false;
let powerupType = null;
let powerupEndTime = 0;
let powerupSpawned = 0;
let creditScreenClickCount = 0;
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let isIntermission = false;
let intermissionAudioPlaying = false;
let playerLives = 3;
let isPlayerRespawning = false;
let respawnStartTime = 0;
let getReadyStartTime = 0;
let showGetReady = false;
let gamePaused = false;
let waitingForLevelClick = false;
let bossActive = false;
let boss = null;
let bossHitPoints = 0;
let bossShakeStartTime = 0;
let bossExplosions = [];
let bossDefeated = false;
let enemiesEntering = false;
let enemyEntryStartTime = 0;
let extraLives = [];
let showLevelClearedAfterExplosions = false;
let levelClearedShown = false;

// Image Assets
const assets = {
  player: new Image(),
  enemy: new Image(),
  enemy2: new Image(),
  enemy3a: new Image(),
  enemy3b: new Image(),
  enemy4a: new Image(),
  enemy4b: new Image(),
  bullet: new Image(),
  bulletblue: new Image(),
  bulletgreen: new Image(),
  bulletred: new Image(),
  enemyBullet: new Image(),
  explosion: new Image(),
  playerExplosion: new Image(),
  downenemybullets: new Image(),
  powerup: new Image(),
  playerLife: new Image(),
  backgrounds: Array(12)
    .fill()
    .map(() => new Image()),
  level10bossa: new Image(),
  level10bossb: new Image(),
  level15bossa: new Image(),
  level15bossb: new Image(),
  level20bossa: new Image(),
  level20bossb: new Image(),
  level25bossa: new Image(),
  level25bossb: new Image(),
};

// Load images
assets.player.src = "assets/player.png";
assets.enemy.src = "assets/enemy.png";
assets.enemy2.src = "assets/enemy2.png";
assets.enemy3a.src = "assets/enemy3a.png";
assets.enemy3b.src = "assets/enemy3b.png";
assets.enemy4a.src = "assets/enemy4a.png";
assets.enemy4b.src = "assets/enemy4b.png";
assets.bullet.src = "assets/bullet.png";
assets.bulletblue.src = "assets/bulletblue.png";
assets.bulletgreen.src = "assets/bulletgreen.png";
assets.bulletred.src = "assets/bulletred.png";
assets.enemyBullet.src = "assets/enemyBullet.png";
assets.explosion.src = "assets/explosion.png";
assets.playerExplosion.src = "assets/playerexplosion.png";
assets.downenemybullets.src = "assets/downenemybullets.png";
assets.powerup.src = "assets/powerup.png";
assets.playerLife.src = "assets/playerlife.png";
assets.level10bossa.src = "assets/level10bossa.png";
assets.level10bossb.src = "assets/level10bossb.png";
assets.level15bossa.src = "assets/level15bossa.png";
assets.level15bossb.src = "assets/level15bossb.png";
assets.level20bossa.src = "assets/level20bossa.png";
assets.level20bossb.src = "assets/level20bossb.png";
assets.level25bossa.src = "assets/level25bossa.png";
assets.level25bossb.src = "assets/level25bossb.png";

// Load all 12 backgrounds
for (let i = 0; i < 12; i++) {
  assets.backgrounds[i].src = `assets/background${i + 1}.png`;
}

// Extra Life Powerup Class
class ExtraLife {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = POWERUP_WIDTH;
    this.height = POWERUP_HEIGHT;
    this.dy = 2;
  }

  draw() {
    ctx.drawImage(assets.powerup, this.x, this.y, this.width, this.height);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("1UP", this.x + this.width / 2, this.y + this.height / 2 + 5);
  }

  move() {
    if (gamePaused || waitingForLevelClick || showGetReady || enemiesEntering)
      return;
    this.y += this.dy;
  }
}

// Player Class
class Player {
  constructor() {
    this.x = canvas.width / 2 - PLAYER_WIDTH / 2;
    this.y = canvas.height - PLAYER_HEIGHT - 10;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.speed = 5;
    this.exploding = false;
  }

  draw() {
    if (this.exploding) {
      ctx.drawImage(
        assets.playerExplosion,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      ctx.drawImage(assets.player, this.x, this.y, this.width, this.height);
    }
  }

  move(mouseX, mouseY) {
    this.x = mouseX - this.width / 2;
    this.y = mouseY - this.height / 2;

    // Boundary checks
    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    this.y = Math.max(
      canvas.height * 0.6,
      Math.min(canvas.height - this.height, this.y)
    );
  }

  shoot() {
    if (
      !gameOver &&
      !levelWon &&
      !isPlayerRespawning &&
      !waitingForLevelClick &&
      !showGetReady &&
      !enemiesEntering
    ) {
      const bulletCount = powerupActive ? powerupType : 1;

      for (let i = 0; i < bulletCount; i++) {
        let offset = 0;
        if (bulletCount > 1) {
          offset = (i - (bulletCount - 1) / 2) * 15;
        }

        const bullet = new Bullet(
          this.x + this.width / 2 - BULLET_WIDTH / 2 + offset,
          this.y,
          powerupType
        );
        playerBullets.push(bullet);
      }

      playerLaserSound.currentTime = 0;
      playerLaserSound.play();
    }
  }
}

// Enemy Classes
class Enemy {
  constructor(x, y, entryDirection) {
    this.width = ENEMY_WIDTH;
    this.height = ENEMY_HEIGHT;
    const speedMultiplier = LEVEL_SPEED_MULTIPLIERS[level];
    this.speed = BASE_ENEMY_SPEED * speedMultiplier * 0.7;
    this.verticalSpeed = BASE_ENEMY_VERTICAL_SPEED * speedMultiplier * 0.7;

    this.targetX = x;
    this.targetY = y;

    if (entryDirection === "top") {
      this.x = x;
      this.y = -this.height;
    } else if (entryDirection === "left") {
      this.x = -this.width;
      this.y = y;
    } else {
      this.x = canvas.width;
      this.y = y;
    }

    this.dx = Math.random() < 0.5 ? -this.speed : this.speed;
    this.dy = this.verticalSpeed;
    this.currentImage = Math.random() < 0.5 ? assets.enemy : assets.enemy2;
    this.imageSwitchTimer = Math.floor(Math.random() * 10);
    this.willDropPowerup = Math.random() < 0.25;
    this.willDropExtraLife =
      level > 0 && (level + 1) % 2 === 0 && Math.random() < 0.1;
    this.entryDirection = entryDirection;
    this.hasEntered = false;
    this.entryProgress = 0;
  }

  draw() {
    this.imageSwitchTimer++;
    if (this.imageSwitchTimer >= 10) {
      this.currentImage =
        this.currentImage === assets.enemy ? assets.enemy2 : assets.enemy;
      this.imageSwitchTimer = 0;
    }
    ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height);
  }

  move() {
    if (gamePaused || waitingForLevelClick || showGetReady) return;

    if (!this.hasEntered) {
      this.entryProgress = Math.min(
        1,
        (Date.now() - enemyEntryStartTime) / ENEMY_ENTRY_DURATION
      );

      if (this.entryProgress >= 1) {
        this.hasEntered = true;
      } else {
        if (this.entryDirection === "top") {
          this.y = this.targetY * this.entryProgress;
        } else if (this.entryDirection === "left") {
          this.x = this.targetX * this.entryProgress;
        } else {
          this.x =
            canvas.width -
            (canvas.width - this.targetX) * (1 - this.entryProgress);
        }
        return;
      }
    }

    this.x += this.dx;

    if (this.x <= 0 || this.x + this.width >= canvas.width) {
      this.dx = -this.dx;
      this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    }

    this.y += this.dy;
    if (this.y > canvas.height * 0.4 || this.y < canvas.height * 0.1) {
      this.dy = -this.dy;
      this.y = Math.max(
        canvas.height * 0.1,
        Math.min(canvas.height * 0.4, this.y)
      );
    }

    if (
      Math.random() < 0.02 &&
      !levelWon &&
      !gamePaused &&
      !waitingForLevelClick &&
      !showGetReady &&
      !enemiesEntering
    ) {
      this.shoot();
    }
  }

  shoot() {
    if (
      !levelWon &&
      !gamePaused &&
      !waitingForLevelClick &&
      !showGetReady &&
      !enemiesEntering
    ) {
      const enemyBullet = new EnemyBullet(
        this.x + this.width / 2 - ENEMY_BULLET_WIDTH / 2,
        this.y + this.height
      );
      enemyBullets.push(enemyBullet);
      enemyLaserSound.currentTime = 0;
      enemyLaserSound.play();
    }
  }
}

class Enemy3 {
  constructor(entryDirection) {
    this.width = ENEMY_WIDTH;
    this.height = ENEMY_HEIGHT;
    const speedMultiplier = LEVEL_SPEED_MULTIPLIERS[level];
    this.speed = BASE_ENEMY_SPEED * speedMultiplier * 0.7;
    this.entryDirection = entryDirection;

    this.targetX = canvas.width / 2 - this.width / 2;
    this.targetY = canvas.height * 0.25;

    if (entryDirection === "top") {
      this.x = this.targetX;
      this.y = -this.height;
    } else if (entryDirection === "left") {
      this.x = -this.width;
      this.y = this.targetY;
    } else {
      this.x = canvas.width;
      this.y = this.targetY;
    }

    this.dx = this.speed;
    this.dy = 0;
    this.currentImage = assets.enemy3a;
    this.imageSwitchTimer = 0;
    this.willDropPowerup = Math.random() < 0.25;
    this.willDropExtraLife =
      level > 0 && (level + 1) % 2 === 0 && Math.random() < 0.1;
    this.verticalMovementTimer = 0;
    this.verticalMovementDirection = 1;
    this.hasEntered = false;
    this.entryProgress = 0;
  }

  draw() {
    this.imageSwitchTimer++;
    if (this.imageSwitchTimer >= 10) {
      this.currentImage =
        this.currentImage === assets.enemy3a ? assets.enemy3b : assets.enemy3a;
      this.imageSwitchTimer = 0;
    }
    ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height);
  }

  move() {
    if (gamePaused || waitingForLevelClick || showGetReady) return;

    if (!this.hasEntered) {
      this.entryProgress = Math.min(
        1,
        (Date.now() - enemyEntryStartTime) / ENEMY_ENTRY_DURATION
      );

      if (this.entryProgress >= 1) {
        this.hasEntered = true;
      } else {
        if (this.entryDirection === "top") {
          this.y = this.targetY * this.entryProgress;
        } else if (this.entryDirection === "left") {
          this.x = this.targetX * this.entryProgress;
        } else {
          this.x =
            canvas.width -
            (canvas.width - this.targetX) * (1 - this.entryProgress);
        }
        return;
      }
    }

    this.x += this.dx;

    if (this.x <= 0 || this.x + this.width >= canvas.width) {
      this.dx = -this.dx;
      this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    }

    this.verticalMovementTimer++;
    if (this.verticalMovementTimer >= 60) {
      this.verticalMovementDirection *= -1;
      this.verticalMovementTimer = 0;
    }
    this.y += this.verticalMovementDirection * (this.speed * 0.3);

    if (
      Math.random() < 0.02 &&
      !levelWon &&
      !gamePaused &&
      !waitingForLevelClick &&
      !showGetReady &&
      !enemiesEntering
    ) {
      this.shoot();
    }
  }

  shoot() {
    if (
      !levelWon &&
      !gamePaused &&
      !waitingForLevelClick &&
      !showGetReady &&
      !enemiesEntering
    ) {
      const enemyBullet = new EnemyBullet(
        this.x + this.width / 2 - ENEMY_BULLET_WIDTH / 2,
        this.y + this.height
      );
      enemyBullets.push(enemyBullet);
      enemyLaserSound.currentTime = 0;
      enemyLaserSound.play();
    }
  }
}

class Enemy4 {
  constructor(entryDirection) {
    this.width = ENEMY_WIDTH;
    this.height = ENEMY_HEIGHT;
    const speedMultiplier = LEVEL_SPEED_MULTIPLIERS[level];
    this.speed = BASE_ENEMY_SPEED * speedMultiplier * 0.7;
    this.entryDirection = entryDirection;

    this.targetX = Math.random() * (canvas.width - this.width);
    this.targetY = canvas.height * 0.25;

    if (entryDirection === "top") {
      this.x = this.targetX;
      this.y = -this.height;
    } else if (entryDirection === "left") {
      this.x = -this.width;
      this.y = this.targetY;
    } else {
      this.x = canvas.width;
      this.y = this.targetY;
    }

    this.dx = Math.random() < 0.5 ? -this.speed : this.speed;
    this.dy = this.speed * 0.3;
    this.currentImage = assets.enemy4a;
    this.imageSwitchTimer = 0;
    this.willDropPowerup = Math.random() < 0.25;
    this.willDropExtraLife =
      level > 0 && (level + 1) % 2 === 0 && Math.random() < 0.1;
    this.movingDown = true;
    this.hasEntered = false;
    this.entryProgress = 0;
  }

  draw() {
    this.imageSwitchTimer++;
    if (this.imageSwitchTimer >= 10) {
      this.currentImage =
        this.currentImage === assets.enemy4a ? assets.enemy4b : assets.enemy4a;
      this.imageSwitchTimer = 0;
    }
    ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height);
  }

  move() {
    if (gamePaused || waitingForLevelClick || showGetReady) return;

    if (!this.hasEntered) {
      this.entryProgress = Math.min(
        1,
        (Date.now() - enemyEntryStartTime) / ENEMY_ENTRY_DURATION
      );

      if (this.entryProgress >= 1) {
        this.hasEntered = true;
      } else {
        if (this.entryDirection === "top") {
          this.y = this.targetY * this.entryProgress;
        } else if (this.entryDirection === "left") {
          this.x = this.targetX * this.entryProgress;
        } else {
          this.x =
            canvas.width -
            (canvas.width - this.targetX) * (1 - this.entryProgress);
        }
        return;
      }
    }

    this.x += this.dx;

    if (this.x <= 0 || this.x + this.width >= canvas.width) {
      this.dx = -this.dx;
      this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    }

    if (this.movingDown) {
      this.y += this.dy;
      if (this.y >= this.targetY + 50) {
        this.movingDown = false;
      }
    } else {
      this.y -= this.dy;
      if (this.y <= this.targetY - 50) {
        this.movingDown = true;
      }
    }

    if (
      Math.random() < 0.02 &&
      !levelWon &&
      !gamePaused &&
      !waitingForLevelClick &&
      !showGetReady &&
      !enemiesEntering
    ) {
      this.shoot();
    }
  }

  shoot() {
    if (
      !levelWon &&
      !gamePaused &&
      !waitingForLevelClick &&
      !showGetReady &&
      !enemiesEntering
    ) {
      const enemyBullet = new EnemyBullet(
        this.x + this.width / 2 - ENEMY_BULLET_WIDTH / 2,
        this.y + this.height
      );
      enemyBullets.push(enemyBullet);
      enemyLaserSound.currentTime = 0;
      enemyLaserSound.play();
    }
  }
}

// Boss Class
class Boss {
  constructor(level) {
    this.width = BOSS_WIDTH;
    this.height = BOSS_HEIGHT;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = 50;
    this.speed = BASE_ENEMY_SPEED * LEVEL_SPEED_MULTIPLIERS[level];
    this.dx = this.speed;
    this.dy = 0;
    this.level = level;
    this.imageSwitchTimer = 0;
    this.verticalMovementTimer = 0;
    this.verticalMovementDirection = 1;
    this.hitPoints = BOSS_HIT_POINTS;
    this.shootTimer = 0;
    this.shakeOffset = 0;
    this.shaking = false;
    this.defeated = false;

    if (level === 2) {
      this.imageA = assets.level10bossa;
      this.imageB = assets.level10bossb;
    } else if (level === 5) {
      this.imageA = assets.level15bossa;
      this.imageB = assets.level15bossb;
    } else if (level === 8) {
      this.imageA = assets.level20bossa;
      this.imageB = assets.level20bossb;
    } else if (level === 11) {
      this.imageA = assets.level25bossa;
      this.imageB = assets.level25bossb;
    }

    this.currentImage = this.imageA;
  }

  draw() {
    this.imageSwitchTimer++;
    if (this.imageSwitchTimer >= 10) {
      this.currentImage =
        this.currentImage === this.imageA ? this.imageB : this.imageA;
      this.imageSwitchTimer = 0;
    }

    let drawX = this.x;
    if (this.shaking) {
      drawX += this.shakeOffset;
      if (Date.now() - bossShakeStartTime > BOSS_SHAKE_DURATION) {
        this.shaking = false;
        this.shakeOffset = 0;
      }
    }

    if (this.defeated) {
      ctx.drawImage(assets.explosion, drawX, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.currentImage, drawX, this.y, this.width, this.height);
    }

    const healthPercent = this.hitPoints / BOSS_HIT_POINTS;
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y - 20, this.width, 10);
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y - 20, this.width * healthPercent, 10);
  }

  move() {
    if (
      gamePaused ||
      waitingForLevelClick ||
      showGetReady ||
      enemiesEntering ||
      this.defeated
    )
      return;

    this.x += this.dx;
    if (this.x <= 0 || this.x + this.width >= canvas.width) {
      this.dx = -this.dx;
    }

    this.verticalMovementTimer++;
    if (this.verticalMovementTimer >= 60) {
      this.verticalMovementDirection *= -1;
      this.verticalMovementTimer = 0;
    }
    this.y += this.verticalMovementDirection * (this.speed * 0.5);

    this.y = Math.max(0, Math.min(canvas.height * 0.4, this.y));

    this.shootTimer++;
    if (this.shootTimer >= 20 && !showGetReady) {
      this.shoot();
      this.shootTimer = 0;
    }
  }

  shoot() {
    if (!showGetReady && !enemiesEntering && !this.defeated) {
      for (let i = 0; i < 5; i++) {
        const offsetX = (i - 2) * 30;
        const enemyBullet = new EnemyBullet(
          this.x + this.width / 2 - ENEMY_BULLET_WIDTH / 2 + offsetX,
          this.y + this.height
        );
        enemyBullets.push(enemyBullet);
      }
      enemyLaserSound.currentTime = 0;
      enemyLaserSound.play();
    }
  }

  takeHit() {
    if (this.defeated) return;

    this.hitPoints--;
    this.shaking = true;
    this.shakeOffset = Math.random() * 10 - 5;
    bossShakeStartTime = Date.now();
    bossDestroyedSound.currentTime = 0;
    bossDestroyedSound.play();

    if (this.hitPoints <= 0) {
      this.defeat();
    }
  }

  defeat() {
    this.defeated = true;
    bossDefeated = true;
    bossActive = false;

    // Create 5 explosions in specific positions around the boss
    const positions = [
      { x: this.x + this.width, y: this.y + this.height / 2 }, // Right side
      { x: this.x, y: this.y + this.height / 2 }, // Left side
      { x: this.x + this.width / 2, y: this.y }, // Top
      { x: this.x + this.width / 2, y: this.y + this.height }, // Bottom
      { x: this.x + this.width / 2, y: this.y + this.height / 2 }, // Center
    ];

    positions.forEach((pos) => {
      bossExplosions.push({
        x: pos.x,
        y: pos.y,
        startTime: Date.now(),
        radius: ENEMY_WIDTH, // Size of regular enemies
        maxScale: 2.0,
      });
    });

    enemyDestroyedSound.currentTime = 0;
    enemyDestroyedSound.play();

    bossfightMusic.pause();
    if (this.level === 11) {
      victoryMusic.currentTime = 0;
    }

    showLevelClearedAfterExplosions = true;
    levelClearedShown = false;
  }
}

// Bullet Classes
class Bullet {
  constructor(x, y, powerupType = null) {
    this.x = x;
    this.y = y;
    this.width = BULLET_WIDTH;
    this.height = BULLET_HEIGHT;
    const speedMultiplier = LEVEL_SPEED_MULTIPLIERS[level];
    this.dy = -BASE_PLAYER_BULLET_SPEED * speedMultiplier;
    this.powerupType = powerupType;
  }

  draw() {
    let bulletImage;
    switch (this.powerupType) {
      case 2:
        bulletImage = assets.bulletblue;
        break;
      case 3:
        bulletImage = assets.bulletgreen;
        break;
      case 4:
        bulletImage = assets.bulletred;
        break;
      default:
        bulletImage = assets.bullet;
    }
    ctx.drawImage(bulletImage, this.x, this.y, this.width, this.height);
  }

  move() {
    if (gamePaused || waitingForLevelClick || showGetReady || enemiesEntering)
      return;
    this.y += this.dy;
  }
}

class EnemyBullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = ENEMY_BULLET_WIDTH;
    this.height = ENEMY_BULLET_HEIGHT;
    const speedMultiplier = LEVEL_SPEED_MULTIPLIERS[level];
    this.dy = BASE_ENEMY_BULLET_SPEED * speedMultiplier;
  }

  draw() {
    ctx.drawImage(assets.enemyBullet, this.x, this.y, this.width, this.height);
  }

  move() {
    if (gamePaused || waitingForLevelClick || showGetReady || enemiesEntering)
      return;
    this.y += this.dy;
  }
}

// Powerup Class
class Powerup {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = POWERUP_WIDTH;
    this.height = POWERUP_HEIGHT;
    this.dy = 2;
    this.type = Math.floor(Math.random() * 3) + 2;
  }

  draw() {
    ctx.drawImage(assets.powerup, this.x, this.y, this.width, this.height);
    ctx.fillStyle = "white";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      `${this.type}x`,
      this.x + this.width / 2,
      this.y + this.height / 2 + 5
    );
  }

  move() {
    if (gamePaused || waitingForLevelClick || showGetReady || enemiesEntering)
      return;
    this.y += this.dy;
  }
}

// Effect Classes
class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.startTime = Date.now();
  }

  draw() {
    const elapsed = Date.now() - this.startTime;
    if (elapsed < EXPLOSION_DURATION) {
      const alpha = 1 - elapsed / EXPLOSION_DURATION;
      ctx.globalAlpha = alpha;
      ctx.drawImage(
        assets.explosion,
        this.x - this.radius / 2,
        this.y - this.radius / 2,
        this.radius,
        this.radius
      );
      ctx.globalAlpha = 1;
    }
  }
}

class EnemyBulletDestruction {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 25;
    this.startTime = Date.now();
  }

  draw() {
    const elapsed = Date.now() - this.startTime;
    if (elapsed < ENEMY_BULLET_DESTROY_DURATION) {
      const alpha = 1 - elapsed / ENEMY_BULLET_DESTROY_DURATION;
      ctx.globalAlpha = alpha;
      ctx.drawImage(
        assets.downenemybullets,
        this.x - this.radius / 2,
        this.y - this.radius / 2,
        this.radius,
        this.radius
      );
      ctx.globalAlpha = 1;
    }
  }
}

// Game Functions
function resizeCanvas() {
  const canvasWidth = window.innerWidth * 0.65;
  const canvasHeight = window.innerHeight * 0.65;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const offsetX = (window.innerWidth - canvasWidth) / 2;
  const offsetY = (window.innerHeight - canvasHeight) / 2;
  canvas.style.position = "absolute";
  canvas.style.left = `${offsetX}px`;
  canvas.style.top = `${offsetY}px`;

  updateScoreboard();
}

function updateScoreboard() {
  const scoreboard = document.getElementById("scoreboard");
  scoreboard.innerHTML = `
    <div style="font-size: 24px; margin-bottom: 10px;">Score: ${score}</div>
    <div id="powerupDisplay" style="font-size: 18px; color: ${
      powerupActive ? "#00ff00" : "white"
    }; margin-bottom: 10px;">
      Powerup: ${powerupActive ? powerupType + "x" : "None"}
    </div>
    <div id="livesDisplay" style="display: flex; align-items: center; font-size: 18px;">
      <img src="assets/playerlife.png" style="width: 20px; height: 20px; margin-right: 5px;">
      <span>${playerLives}</span>
    </div>
  `;
}

function detectCollisions() {
  if (
    levelWon ||
    isPlayerRespawning ||
    waitingForLevelClick ||
    showGetReady ||
    enemiesEntering
  )
    return;

  enemyBullets.forEach((bullet, index) => {
    if (
      bullet.y + bullet.height >= player.y &&
      bullet.y <= player.y + player.height &&
      bullet.x + bullet.width >= player.x &&
      bullet.x <= player.x + player.width
    ) {
      enemyBullets.splice(index, 1);
      playerExplosion();

      playerBullets = [];
      enemyBullets = [];
      explosions = [];

      playerLives--;
      updateScoreboard();

      if (playerLives <= 0) {
        setTimeout(() => {
          gameOver = true;
          showGameOverScreen();
        }, EXPLOSION_DURATION);
      } else {
        isPlayerRespawning = true;
        respawnStartTime = Date.now();
        gamePaused = true;
      }
    }
  });

  playerBullets.forEach((bullet, bulletIndex) => {
    if (bossActive && boss && !boss.defeated) {
      if (
        bullet.y <= boss.y + boss.height &&
        bullet.y + bullet.height >= boss.y &&
        bullet.x + bullet.width >= boss.x &&
        bullet.x <= boss.x + boss.width
      ) {
        playerBullets.splice(bulletIndex, 1);
        boss.takeHit();
        return;
      }
    }

    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.y <= enemy.y + enemy.height &&
        bullet.y + bullet.height >= enemy.y &&
        bullet.x + bullet.width >= enemy.x &&
        bullet.x <= enemy.x + enemy.width
      ) {
        playerBullets.splice(bulletIndex, 1);
        enemies.splice(enemyIndex, 1);
        destroyedEnemies++;
        score += 10;
        updateScoreboard();
        enemyExplosion(enemy.x, enemy.y);
        enemyDestroyedSound.currentTime = 0;
        enemyDestroyedSound.play();

        if (enemy.willDropPowerup && powerupSpawned < 4) {
          powerups.push(new Powerup(enemy.x, enemy.y));
          powerupSpawned++;
        }

        if (enemy.willDropExtraLife) {
          extraLives.push(new ExtraLife(enemy.x, enemy.y));
        }
      }
    });
  });

  powerups.forEach((powerup, index) => {
    if (
      powerup.y + powerup.height >= player.y &&
      powerup.y <= player.y + player.height &&
      powerup.x + powerup.width >= player.x &&
      powerup.x <= player.x + player.width
    ) {
      powerups.splice(index, 1);
      activatePowerup(powerup.type);
    }
  });

  extraLives.forEach((life, index) => {
    if (
      life.y + life.height >= player.y &&
      life.y <= player.y + player.height &&
      life.x + life.width >= player.x &&
      life.x <= player.x + player.width
    ) {
      extraLives.splice(index, 1);
      playerLives++;
      updateScoreboard();
      oneupSound.currentTime = 0;
      oneupSound.play();
    }
  });

  playerBullets.forEach((bullet, bulletIndex) => {
    enemyBullets.forEach((enemyBullet, enemyBulletIndex) => {
      if (
        bullet.y <= enemyBullet.y + enemyBullet.height &&
        bullet.y + bullet.height >= enemyBullet.y &&
        bullet.x + bullet.width >= enemyBullet.x &&
        bullet.x <= enemyBullet.x + enemyBullet.width
      ) {
        playerBullets.splice(bulletIndex, 1);
        enemyBullets.splice(enemyBulletIndex, 1);
        enemyBulletDestructions.push(
          new EnemyBulletDestruction(enemyBullet.x, enemyBullet.y)
        );
        bulletsDestroyedSound.currentTime = 0;
        bulletsDestroyedSound.play();
        score += [50, 70, 90][Math.floor(Math.random() * 3)];
        updateScoreboard();
      }
    });
  });
}

function activatePowerup(type) {
  powerupActive = true;
  powerupType = type;
  powerupEndTime = Date.now() + POWERUP_DURATION;
  powerupSound.currentTime = 0;
  powerupSound.play();
  updateScoreboard();
}

function deactivatePowerup() {
  powerupActive = false;
  powerupType = null;
  updateScoreboard();
}

function playerExplosion() {
  player.exploding = true;
  playerDestroyedSound.currentTime = 0;
  playerDestroyedSound.play();
}

function enemyExplosion(x, y) {
  explosions.push(new Explosion(x, y));
}

function respawnPlayer() {
  player.exploding = false;
  player.x = canvas.width / 2 - PLAYER_WIDTH / 2;
  player.y = canvas.height - PLAYER_HEIGHT - 10;

  playerBullets = [];
  enemyBullets = [];
  explosions = [];

  showGetReady = true;
  getReadyStartTime = Date.now();
}

function handleLevelProgression() {
  if (enemies.length === 0 && !bossActive && !bossDefeated) {
    if ([2, 5, 8, 11].includes(level)) {
      startBossFight();
    } else if (!waitingForLevelClick) {
      showLevelClearedMessage();
      waitingForLevelClick = true;
      gamePaused = true;
      levelclearMusic.currentTime = 0;
      levelclearMusic.play();
    }
  }

  if (bossDefeated && !waitingForLevelClick && !levelClearedShown) {
    if (bossExplosions.length === 0) {
      showLevelClearedMessage();
      levelClearedShown = true;
    }
  }
}

function startBossFight() {
  bossActive = true;
  bossDefeated = false;
  boss = new Boss(level);
  bossHitPoints = BOSS_HIT_POINTS;
  bossExplosions = [];

  stopLevelMusic();
  bossfightMusic.currentTime = 0;
  bossfightMusic.play();

  enemydetectedSound.currentTime = 0;
  enemydetectedSound.play();
}

function showLevelClearedMessage() {
  const levelClearedText = document.getElementById("levelClearedText");
  if (level === 11) {
    levelClearedText.textContent = "Congrats Blaster Thrasher!";
    levelclearMusic.pause();
    victoryMusic.currentTime = 0;
    victoryMusic.play();
  } else {
    levelClearedText.textContent = "Level Cleared!" + (level + 2);
    levelclearMusic.currentTime = 0;
    levelclearMusic.play();
  }
  levelClearedContainer.classList.remove("hidden");
  waitingForLevelClick = true;
  gamePaused = true;
}

function hideLevelClearedMessage() {
  levelClearedContainer.classList.add("hidden");
}

function handleLevelClearedClick() {
  if (waitingForLevelClick) {
    hideLevelClearedMessage();
    waitingForLevelClick = false;
    gamePaused = false;
    boss = null;
    bossActive = false;
    bossDefeated = false;
    bossExplosions = [];
    showLevelClearedAfterExplosions = false;
    levelClearedShown = false;

    if (level < MAX_LEVELS - 1) {
      levelWon = true;

      if (level >= 0 && level <= 10) {
        showIntermissionScreen();
      } else if (level === 11) {
        levelWon = true;
        gameOver = true;
        showCreditScreen();
      }
    } else {
      levelWon = true;
      gameOver = true;
      showCreditScreen();
    }
  }
}

// Screen Management
function showIntroScreen() {
  introScreen.classList.remove("hidden");
  canvas.classList.add("hidden");
  introVideoScreen.classList.add("hidden");
  titleScreen.classList.add("hidden");
}

function hideIntroScreen() {
  introScreen.classList.add("hidden");
  showIntroVideoScreen();
}

function showIntroVideoScreen() {
  introVideoScreen.classList.remove("hidden");
  canvas.classList.add("hidden");
  introScreen.classList.add("hidden");
  titleScreen.classList.add("hidden");

  const videoContainer = document.getElementById("introVideoContainer");
  videoContainer.style.display = "flex";
  videoContainer.style.flexDirection = "column";
  videoContainer.style.alignItems = "center";
  videoContainer.style.justifyContent = "center";
  videoContainer.style.height = "100vh";

  introVideo.style.maxWidth = "65vw";
  introVideo.style.maxHeight = "65vh";
  introVideo.style.margin = "0 auto";

  const continueButton = document.getElementById("videoContinueButton");
  continueButton.style.fontFamily = "'Arial Black', sans-serif";
  continueButton.style.fontSize = "18px";
  continueButton.style.color = "#00ff00";
  continueButton.style.backgroundColor = "transparent";
  continueButton.style.border = "2px solid #00ff00";
  continueButton.style.padding = "10px 20px";
  continueButton.style.marginTop = "20px";
  continueButton.style.cursor = "pointer";
  continueButton.textContent = "Continue";

  introVideo.src = "assets/introvid.mp4";
  introVideo.load();
  introVideo.play().catch((e) => console.log("Video play error:", e));
}

function hideIntroVideoScreen() {
  introVideoScreen.classList.add("hidden");
  introVideo.pause();
  introVideo.currentTime = 0;
  showTitleScreen();
}

function showTitleScreen() {
  titleScreen.classList.remove("hidden");
  canvas.classList.add("hidden");
  introScreen.classList.add("hidden");
  introVideoScreen.classList.add("hidden");
  titleMusic.currentTime = 0;
  titleMusic.play();
}

function hideTitleScreen() {
  titleScreen.classList.add("hidden");
  startGame();
}

function showIntermissionScreen() {
  intermissionScreen.classList.remove("hidden");
  canvas.classList.add("hidden");
  stopLevelMusic();
  isIntermission = true;
  intermissionAudioPlaying = false;

  const intermissionText = document.getElementById("intermissionText");
  intermissionText.style.fontFamily = "'Arial Black', sans-serif";
  intermissionText.style.fontSize = "24px";
  intermissionText.style.color = "#00ff00";
  intermissionText.style.textAlign = "center";
  intermissionText.style.marginTop = "20px";

  const continueText = document.getElementById("continueText");
  continueText.style.fontFamily = "'Arial Black', sans-serif";
  continueText.style.fontSize = "18px";
  continueText.style.color = "#00ff00";
  continueText.style.textAlign = "center";
  continueText.style.marginTop = "20px";
  continueText.style.border = "2px solid #00ff00";
  continueText.style.padding = "10px";
  continueText.style.display = "inline-block";
  continueText.style.cursor = "pointer";

  warpSound.loop = false;
  warpSound.currentTime = 0;
  warpSound
    .play()
    .then(() => {
      intermissionAudioPlaying = true;
    })
    .catch((error) => {
      console.log("Error playing warp sound:", error);
    });
}

function hideIntermissionScreen() {
  intermissionScreen.classList.add("hidden");
  isIntermission = false;
  intermissionAudioPlaying = false;

  warpSound.pause();
  warpSound.currentTime = 0;

  level++;
  destroyedEnemies = 0;
  levelWon = false;
  powerupSpawned = 0;
  extraLives = [];

  playerBullets = [];
  enemyBullets = [];

  spawnEnemies();
  playLevelMusic();
  canvas.classList.remove("hidden");

  showGetReady = true;
  getReadyStartTime = Date.now();

  gameLoop();
}

function showCreditScreen() {
  if (window.creditScreenShown) return;
  window.creditScreenShown = true;

  creditScreen.classList.remove("hidden");
  canvas.classList.add("hidden");
  stopLevelMusic();
  creditMusic.currentTime = 0;
  creditMusic.play();

  const minHighScore =
    highScores.length > 0 ? highScores[highScores.length - 1].score : 0;
  if (highScores.length < MAX_HIGH_SCORES || score > minHighScore) {
    showHighScoreEntry();
  } else {
    showHighScores();
  }
}

function showHighScoreEntry() {
  highScoreEntry.classList.remove("hidden");
  nameInput.value = "";
  nameInput.focus();
}

function showHighScores() {
  highScoresContainer.classList.remove("hidden");
  renderHighScores();
}

function renderHighScores() {
  highScoresList.innerHTML = "";

  const sortedScores = highScores
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_HIGH_SCORES);

  if (sortedScores.length === 0) {
    sortedScores.push({ name: "PLAYER", score: 0 });
  }

  sortedScores.forEach((entry, index) => {
    const scoreElement = document.createElement("div");
    scoreElement.className = "high-score-entry";
    scoreElement.innerHTML = `
      <span class="high-score-name">${index + 1}. ${entry.name}</span>
      <span class="high-score-value">${entry.score}</span>
    `;
    highScoresList.appendChild(scoreElement);
  });

  setTimeout(() => {
    highScoresList.style.animation = "none";
    highScoresList.style.transition = "none";
    highScoresList.style.transform = "translateY(0)";

    const listHeight = highScoresList.offsetHeight;
    const screenHeight = window.innerHeight;

    const totalDistance = listHeight + screenHeight;

    const scrollSpeed = 800;

    const duration = Math.max(totalDistance / scrollSpeed, 10);

    let startTime = null;
    let animationId = null;

    function scrollStep(timestamp) {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = elapsed / (duration * 1000);

      if (progress < 1) {
        const translateY = progress * -totalDistance;
        highScoresList.style.transition = "none";
        highScoresList.style.transform = `translateY(${translateY}px)`;
        animationId = requestAnimationFrame(scrollStep);
      } else {
        highScoresList.style.transition = "none";
        highScoresList.style.transform = "translateY(0)";
        startTime = null;
        animationId = requestAnimationFrame(scrollStep);
      }
    }

    animationId = requestAnimationFrame(scrollStep);
    highScoresList.dataset.animationId = animationId;
  }, 0);
}

function saveHighScore() {
  const name =
    nameInput.value.trim().toUpperCase().substring(0, NAME_LENGTH) || "PLAYER";
  highScores.push({ name, score });
  highScores.sort((a, b) => b.score - a.score);
  if (highScores.length > MAX_HIGH_SCORES) {
    highScores.length = MAX_HIGH_SCORES;
  }
  localStorage.setItem("highScores", JSON.stringify(highScores));
  highScoreEntry.classList.add("hidden");
  showHighScores();
}

function showGameOverScreen() {
  gameOverScreen.classList.remove("hidden");
  canvas.classList.add("hidden");
  stopLevelMusic();
  gameOverMusic.currentTime = 0;
  gameOverMusic.play();

  const gameOverText = document.getElementById("gameOverText");
  gameOverText.style.fontFamily = "'Arial Black', sans-serif";
  gameOverText.style.fontSize = "24px";
  gameOverText.style.color = "#ff0000";
  gameOverText.style.textAlign = "center";
  gameOverText.style.marginTop = "20px";

  const restartText = document.getElementById("restartText");
  restartText.style.fontFamily = "'Arial Black', sans-serif";
  restartText.style.fontSize = "18px";
  restartText.style.color = "#00ff00";
  restartText.style.textAlign = "center";
  restartText.style.marginTop = "20px";
  restartText.style.border = "2px solid #00ff00";
  restartText.style.padding = "10px";
  restartText.style.display = "inline-block";
  restartText.style.cursor = "pointer";
}

function restartGame() {
  location.reload();
}

// Audio Control Functions
function playLevelMusic() {
  stopAllAudio();
  if (level >= 0 && level < levelMusic.length) {
    levelMusic[level].currentTime = 0;
    levelMusic[level].play();
  }
}

function stopLevelMusic() {
  levelMusic.forEach((music) => music.pause());
  bossfightMusic.pause();
}

function stopAllAudio() {
  titleMusic.pause();
  creditMusic.pause();
  gameOverMusic.pause();
  warpSound.pause();
  stopLevelMusic();
  levelclearMusic.pause();
  victoryMusic.pause();
}

// Game Loop
function gameLoop(timestamp) {
  if (isIntermission) {
    return;
  }

  if (!lastFrameTime) lastFrameTime = timestamp;
  const elapsed = timestamp - lastFrameTime;

  if (elapsed > FRAME_TIME) {
    lastFrameTime = timestamp - (elapsed % FRAME_TIME);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (assets.backgrounds[level].complete) {
      ctx.drawImage(
        assets.backgrounds[level],
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    if (gameOver) return;

    if (showGetReady) {
      const getReadyElapsed = Date.now() - getReadyStartTime;

      if (getReadyElapsed >= GET_READY_DURATION) {
        showGetReady = false;
        enemiesEntering = true;
        enemyEntryStartTime = Date.now();
        if (isPlayerRespawning) {
          isPlayerRespawning = false;
          gamePaused = false;
        }
      } else {
        ctx.fillStyle = "white";
        ctx.font = "bold 36px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GET READY!", canvas.width / 2, canvas.height / 2);
      }
    }

    if (enemiesEntering) {
      const entryElapsed = Date.now() - enemyEntryStartTime;

      if (entryElapsed >= ENEMY_ENTRY_DURATION) {
        enemiesEntering = false;
        enemies.forEach((enemy) => (enemy.hasEntered = true));
      }
    }

    if (isPlayerRespawning && !showGetReady) {
      const respawnElapsed = Date.now() - respawnStartTime;

      if (respawnElapsed >= PLAYER_RESPAWN_DELAY) {
        respawnPlayer();
      }
    }

    player.draw();
    enemies.forEach((enemy) => {
      enemy.move();
      enemy.draw();
    });

    if (bossActive && boss) {
      boss.move();
      boss.draw();
    }

    playerBullets.forEach((bullet) => {
      bullet.move();
      bullet.draw();
    });
    enemyBullets.forEach((bullet) => {
      bullet.move();
      bullet.draw();
    });
    explosions.forEach((explosion) => explosion.draw());
    enemyBulletDestructions.forEach((destruction, index) => {
      destruction.draw();
      if (Date.now() - destruction.startTime > ENEMY_BULLET_DESTROY_DURATION) {
        enemyBulletDestructions.splice(index, 1);
      }
    });
    powerups.forEach((powerup, index) => {
      powerup.move();
      powerup.draw();
      if (powerup.y > canvas.height) {
        powerups.splice(index, 1);
      }
    });

    extraLives.forEach((life, index) => {
      life.move();
      life.draw();
      if (life.y > canvas.height) {
        extraLives.splice(index, 1);
      }
    });

    bossExplosions.forEach((explosion, index) => {
      const elapsed = Date.now() - explosion.startTime;
      if (elapsed < BOSS_EXPLOSION_DURATION) {
        const alpha = 1 - elapsed / BOSS_EXPLOSION_DURATION;
        const scale =
          1 + (elapsed / BOSS_EXPLOSION_DURATION) * (explosion.maxScale - 1);
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          assets.explosion,
          explosion.x - (explosion.radius * scale) / 2,
          explosion.y - (explosion.radius * scale) / 2,
          explosion.radius * scale,
          explosion.radius * scale
        );
        ctx.globalAlpha = 1;
      } else {
        bossExplosions.splice(index, 1);
      }
    });

    if (powerupActive && Date.now() > powerupEndTime) {
      deactivatePowerup();
    }

    if (
      isMouseDown &&
      Date.now() - lastShotTime > SHOOT_INTERVAL &&
      !levelWon &&
      !isPlayerRespawning &&
      !waitingForLevelClick &&
      !showGetReady &&
      !enemiesEntering
    ) {
      player.shoot();
      lastShotTime = Date.now();
    }

    detectCollisions();
    handleLevelProgression();
  }

  requestAnimationFrame(gameLoop);
}

// Game Setup
function spawnEnemies() {
  enemies = [];
  const directions = ["top", "left", "right"];

  for (let i = 0; i < 15; i++) {
    let enemyType;
    const levelRatio = level / MAX_LEVELS;
    const entryDirection = directions[i % directions.length];

    if (levelRatio < 0.33) {
      enemyType = Math.random();
      if (enemyType < 0.8) {
        let x =
          (i % 5) * (canvas.width / 5) + canvas.width / 10 - ENEMY_WIDTH / 2;
        let y = Math.floor(i / 5) * 70 + 50;
        enemies.push(new Enemy(x, y, entryDirection));
      } else if (enemyType < 0.9) {
        enemies.push(new Enemy3(entryDirection));
      } else {
        enemies.push(new Enemy4(entryDirection));
      }
    } else if (levelRatio < 0.66) {
      enemyType = Math.random();
      if (enemyType < 0.5) {
        let x =
          (i % 5) * (canvas.width / 5) + canvas.width / 10 - ENEMY_WIDTH / 2;
        let y = Math.floor(i / 5) * 70 + 50;
        enemies.push(new Enemy(x, y, entryDirection));
      } else if (enemyType < 0.8) {
        enemies.push(new Enemy3(entryDirection));
      } else {
        enemies.push(new Enemy4(entryDirection));
      }
    } else {
      enemyType = Math.random();
      if (enemyType < 0.3) {
        let x =
          (i % 5) * (canvas.width / 5) + canvas.width / 10 - ENEMY_WIDTH / 2;
        let y = Math.floor(i / 5) * 70 + 50;
        enemies.push(new Enemy(x, y, entryDirection));
      } else if (enemyType < 0.6) {
        enemies.push(new Enemy3(entryDirection));
      } else {
        enemies.push(new Enemy4(entryDirection));
      }
    }
  }

  enemiesEntering = true;
  enemyEntryStartTime = Date.now();
}

function startGame() {
  player = new Player();
  playerBullets = [];
  enemyBullets = [];
  explosions = [];
  enemyBulletDestructions = [];
  destroyedEnemies = 0;
  gameOver = false;
  score = 0;
  level = 0;
  levelWon = false;
  powerups = [];
  powerupActive = false;
  powerupType = null;
  powerupSpawned = 0;
  creditScreenClickCount = 0;
  playerLives = 3;
  isPlayerRespawning = false;
  gamePaused = false;
  waitingForLevelClick = false;
  bossActive = false;
  boss = null;
  bossHitPoints = 0;
  bossShakeStartTime = 0;
  bossExplosions = [];
  bossDefeated = false;
  enemiesEntering = false;
  extraLives = [];
  showLevelClearedAfterExplosions = false;
  levelClearedShown = false;

  updateScoreboard();
  spawnEnemies();
  playLevelMusic();
  canvas.classList.remove("hidden");

  showGetReady = true;
  getReadyStartTime = Date.now();

  lastFrameTime = 0;
  gameLoop();
}

// Event Listeners
function initEventListeners() {
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if (player && !isPlayerRespawning) player.move(mouseX, mouseY);
  });

  canvas.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      isMouseDown = true;
      if (waitingForLevelClick) {
        handleLevelClearedClick();
      }
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (e.button === 0) isMouseDown = false;
  });

  document
    .getElementById("startButton")
    .addEventListener("click", hideTitleScreen);

  document
    .getElementById("videoContinueButton")
    .addEventListener("click", hideIntroVideoScreen);

  creditScreen.addEventListener("click", (e) => {
    if (!e.target.closest("#highScoreEntry")) {
      creditScreenClickCount++;
      if (creditScreenClickCount >= 3) restartGame();
    }
  });

  submitScoreBtn.addEventListener("click", saveHighScore);
  nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") saveHighScore();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !intermissionScreen.classList.contains("hidden")) {
      hideIntermissionScreen();
    }
  });

  intermissionScreen.addEventListener("click", () => {
    if (!intermissionAudioPlaying) {
      warpSound.currentTime = 0;
      warpSound
        .play()
        .then(() => {
          intermissionAudioPlaying = true;
        })
        .catch(console.error);
    } else {
      hideIntermissionScreen();
    }
  });

  gameOverScreen.addEventListener("click", restartGame);

  window.addEventListener("resize", resizeCanvas);
}

// Initialize Game
function initGame() {
  resizeCanvas();
  initEventListeners();

  let assetsLoaded = 0;
  const totalAssets = Object.keys(assets).length + assets.backgrounds.length;

  function assetLoaded() {
    assetsLoaded++;
    if (assetsLoaded === totalAssets) {
      showIntroScreen();
    }
  }

  Object.values(assets).forEach((asset) => {
    if (Array.isArray(asset)) {
      asset.forEach((img) => {
        img.onload = assetLoaded;
        img.onerror = assetLoaded;
      });
    } else {
      asset.onload = assetLoaded;
      asset.onerror = assetLoaded;
    }
  });
}

window.onload = initGame;

function handleVisibilityChange() {
  if (isIntermission && !document.hidden && !intermissionAudioPlaying) {
    warpSound.currentTime = 0;
    warpSound
      .play()
      .then(() => {
        intermissionAudioPlaying = true;
      })
      .catch(console.error);
  }
}
