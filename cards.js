class ActionCard{
  // story points of work
  // effect , task || action || effect || instant
  // 
  constructor(score, effect){
    this.score = score;
    this.effect = effect;
  }
  play(sprint){
    this.effect.play(sprint);
  }
  doWork(task){
    task.addWork(this.score);
  }
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
const actionStatus = { OnHold: 'onHold' , Active : 'active' , Done : 'done'};
class Task{
  //feature, support, refactor
  //estimate delt op i refinement, development, salg? => feature ref+dev, support dev, refactor dev+salg (optional)
  //feature estimate: virker=>færdigt=>test => teknisk gæld +;0;-
  //support estimate: samme? kan support fjerne teknisk gæld
  //refactor estimate: fjerner altid teknisk gæld   
  constructor(score, estimate){
    this.estimate = estimate;
    this.minEstimate = estimate - Math.round(estimate*0.2);
    this.maxEstimate = estimate + Math.round(estimate*0.2);
    this.score = score;
    this.workDone =0;
    this.status = actionStatus.Active;
  }
  play(sprint){
    state.backLog.push(this);
    //sprint.addTaskToSprint(this);
  }
  addWork(sp)
  {
    this.workDone += sp;
  }
  finishTask(){
    this.status = actionStatus.Done;
  }
  pauseTask(){
    if(this.status == actionStatus.Active){
      this.status = actionStatus.OnHold;
    }
  }
  activateTask(){
    if(this.status == actionStatus.OnHold){
      this.status = actionStatus.Active;
    }

  }
  name(){
    return `Task ${this.score}`;
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
  new ActionCard(1,new Task(1,1)),
  new ActionCard(1,new Task(1,1)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,5)),
  new ActionCard(1,new Task(1,1)),
  new ActionCard(1,new Task(1,1))
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