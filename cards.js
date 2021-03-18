class ActionCard{
  constructor(score, effect){}
}
class IncidentCard{
  constructor(effect){}
}
class Deck{
  constructor(deck){
    this.deck = deck;
    this.discardPile = [];
  }
  draw(){
    return this.deck.pop();
  }
  discard(card){
    this.discardPile.push(card); 
  }
}
class Task{
  constructor(estimate){
    this.estimate = estimate;
  }
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