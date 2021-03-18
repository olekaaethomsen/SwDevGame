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
    this.startNextTurn();
  }
  startNextTurn(){
    console.log(`turn ${this.turnIndex}`);
    var player = this.players[this.turnIndex++ % this.players.length];
    this.currentTurn = new Turn(this, player);
  }
}
class Turn{
  constructor(state, player){
    this.state = state;
    this.player = player;
    this.actions = [
      new DrawActionCardAction(this.state, this.player),
      new DrawIncidentCardAction(this.state, this.player),
      new PlayCardAction(this.state, this.player),
      new EndTurnAction(this.state, this.player)
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
    this.actionCards = [];
  }
  addActionCard(card){
    this.actionCards.push(card);
  }
}

