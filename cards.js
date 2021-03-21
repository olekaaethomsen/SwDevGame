class ActionCard{
  // story points of work
  // effect , task || action || effect || instant
  // 
  constructor(score, effect){}
}
class IncidentCard{
  //support eller intet (andet?)
  //support, blocker, critical, major
  //blocker => skal laves før andet
  //critical => direkte ind i sprint
  //major => top af backlog
  constructor(effect){}
}
class Deck{
  constructor(deck){
    this.deck = deck;
    this.discardPile = [];
  }
  draw(){
    if(this.deck.length == 0){
      this.turnDiscardPile();
    }
    return this.deck.pop();
  }
  discard(card){
    this.discardPile.push(card); 
  }
  turnDiscardPile(){
    this.deck = this.discardPile;
    this.discardPile = [];
    this.shuffle();
  }
  shuffle(){
    //shuffle
    return this.deck;
  }
}
class Task{
  //feature, support, refactor
  //estimate delt op i refinement, development, salg? => feature ref+dev, support dev, refactor dev+salg (optional)
  //feature estimate: virker=>færdigt=>test => teknisk gæld +;0;-
  //support estimate: samme? kan support fjerne teknisk gæld
  //refactor estimate: fjerner altid teknisk gæld   
  constructor(estimate){
    this.estimate = estimate;
  }
}
class Effect{
  //effect on player => 
  constructor(player){
    this.player = player;
  }
}
class Instant{
  //counter || ?
}
let actionDeck = [
  new ActionCard(1,new Task(1)),
  new ActionCard(1,new Task(1)),
  new ActionCard(1,new Task(1)),
  new ActionCard(1,new Task(1)),
  new ActionCard(1,new Task(1)),
  new ActionCard(1,new Task(1)),
  new ActionCard(1,new Task(1)),
  new ActionCard(1,new Task(1))
];
let incidentDeck = [
  new IncidentCard(null),
  new IncidentCard(null),
  new IncidentCard(null),
  new IncidentCard(null),
  new IncidentCard(null),
  new IncidentCard(null),
  new IncidentCard(null),
];