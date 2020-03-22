const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK"; // MODE_ATTACK = 0;
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; // MODE_STRONG_ATTACK = 1;
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = prompt("Maximum life for you and the monster.", "100");

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonserHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife; 
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: currentMonserHealth,
    finalPlayerHealth: playerHealth
  };
  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (ev === LOG_EVENT_MONSTER_ATACK) {
    logEntry.target = "PLAYER";
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry.target = "PLAYER";
  } else if (ev === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: ev,
      value: val,
      finalMonsterHealth: currentMonserHealth,
      finalPlayerHealth: playerHealth
    };
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonserHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealt = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATACK,
    playerDamage,
    currentMonserHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealt;
    setPlayerHealth(initialPlayerHealt);
    alert("You would be dead, but bonus live saved you!");
  }

  if (currentMonserHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WIN!",
      currentMonserHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonserHealth > 0) {
    alert("Monster win!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WIN!",
      currentMonserHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonserHealth <= 0) {
    alert("You have a draw!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "A DRWA!",
      currentMonserHealth,
      currentPlayerHealth
    );
  }

  if (currentMonserHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonserHealth -= damage;
  writeToLog(logEvent, damage, currentMonserHealth, currentPlayerHealth);
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal more than your max initial health");
  }

  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonserHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
