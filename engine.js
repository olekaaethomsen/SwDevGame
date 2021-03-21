function init(){
  state = new GameState();
}
const numberOfTurnsInSprint = 3;
const numberOfSprintsInRelease = 2;
const numberOfReleases = 3;
let state;

class GameState{
  constructor(){
    this.players = [new Player("dev"), new Player("proj"), new Player("sales")];
    this.turnIndex = 0;
    this.actionDeck = new Deck(actionDeck);
    this.incidentDeck = new Deck(incidentDeck);
    this.backLog = [];
    this.currentSprint = new Sprint(this);
    this.currentPhase;
    this.startNextTurn();
  }
  startNextTurn(){
    if(this.currentSprint.isSprintEnded()){
      this.setCurrentPhase(new ReviewPhase(this, this.currentSprint)); 
    }
    else if(!this.currentSprint.isSprintStarted()){
      this.setCurrentPhase(new PlanningPhase(this, this.currentSprint))
    }
    else{
      console.log(`turn ${this.turnIndex}`);
      document.getElementById("turnIndex").innerText = this.turnIndex;
      let player = this.players[this.turnIndex++ % this.players.length];
      document.getElementById("activePlayer").innerText = player.name;
      this.currentTurn = new Turn(this, player);
    }
  }
  setCurrentPhase(phase){
    this.currentPhase = phase;
  }

}
class Turn{
  constructor(state, player){
    this.state = state;
    this.player = player;
    this.actions = [
      new DrawActionCardPhase(this.state, this.player),
      new DrawIncidentCardPhase(this.state, this.player),
      new PerformActionPhase(this.state, this.player),
      new EndTurnPhase(this.state, this.player)
    ];
    
    this.actionIndex = 0;
    this.startNextAction();
  }
  startNextAction(){
    
    this.currentAction = this.actions[this.actionIndex++];
    this.currentAction.start();
  }
  endTurn(){
    this.state.startNextTurn();
  }
}

class Player{
  constructor(name){
    this.name = name;
    this.activeEffect = [];
    this.actionCards = [];
  }
  addActionCard(card){
    this.actionCards.push(card);
  }
}
class Sprint{
  constructor(state){
    this.state = state;
    this.sprintStarted = false;
    this.turnIndex = 0;
    this.tasks = [];
  }
  addTaskToSprint(task){
    this.tasks.push(task);
  }
  startSprint(){
    this.sprintStarted = true;
    this.state.startNextTurn();
  }
  endSprint(){

  }
  isSprintStarted(){
    if(this.sprintStarted && this.state.turnIndex%this.state.players.length == 0)this.turnIndex++;
    return this.sprintStarted;
  }
  isSprintEnded(){
    if(!this.sprintStarted)return false;
    console.log(`isSprintEnded turnIndex=${this.turnIndex} > ${numberOfTurnsInSprint}`);
    return this.turnIndex >= numberOfTurnsInSprint;
  }
}
class Release{
  constructor(){
    this.completedTasks = [];
    this.technicalDebt =0;    
  }
}

