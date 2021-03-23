class Action{
  constructor(state, player){
    this.state = state;
    this.player = player;
  }
}
class Phase{
  constructor(state, player){
    this.state = state;
    this.player = player;
  }
}
class ScrumPhase{
  constructor(state, sprint){
    this.state = state;
    this.sprint = sprint;
    this.start();
  }
  start(){}
}
class PlanningPhase extends ScrumPhase{
  start(){
    let endTurnDiv = document.getElementById("sprintPlanning");
    endTurnDiv.style.visibility = "visible";
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentPhase.startSprint()\">Start sprint</a>";
    let gui = new Gui();
    gui.selectTaskFromBackLog(this.state); 
  }
  addTaskToSprint(taskIndex){
    var task = this.state.backLog.splice(taskIndex, 1)[0];
    this.sprint.addTaskToSprint(task);
    gui.showBackLog(this.state);
    gui.selectTaskFromBackLog(this.state);
  }
  startSprint(){
    gui.hideDiv("sprintPlanning");
    gui.hideDiv("actionPlayCard");
    //document.getElementById("sprintPlanning").style.visibility = "hidden";
    this.sprint.startSprint();
    this.state.startNextTurn();
  }
}
class ReviewPhase extends ScrumPhase{
  start(){
    let endTurnDiv = document.getElementById("sprintReview");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentPhase.endSprint()\">End sprint</a>";
  }
  endSprint(){
    gui.hideDiv("sprintReview");
    //document.getElementById("sprintReview").style.visibility = "hidden";
    this.state.currentSprint = new Sprint(this.state);
    this.state.startNextTurn();
  }
}
class EndTurnPhase extends Phase {
  start(){
    let endTurnDiv = document.getElementById("phaseEndTurn");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentPhase.end()\">end turn</a>";
  }
  end(){
    document.getElementById("phaseEndTurn").style.visibility = "hidden";
    this.state.currentTurn.endTurn();
  }
}
class DrawActionCardPhase extends Phase {
  start(){
    let endTurnDiv = document.getElementById("phaseDrawActionCard");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentPhase.end()\">draw action card</a>";
  }
  end(){
    var card = this.state.actionDeck.draw();
    this.player.addActionCard(card);
    document.getElementById("phaseDrawActionCard").style.visibility = "hidden";
    this.state.currentTurn.startNextPhase();
  }
}
class DrawIncidentCardPhase extends Phase{
  start(){
    let endTurnDiv = document.getElementById("phaseDrawIncidentCard");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentPhase.end()\">draw incident card</a>";
  }
  end(){
    document.getElementById("phaseDrawIncidentCard").style.visibility = "hidden";
    this.state.currentTurn.startNextPhase();
  }
}
class PerformActionPhase extends Phase{
  constructor(state, player){
    super(state, player);
    this.actions = [
      new PlayCardAction(this.state, this.player),
      new EndTaskAction(this.state, this.player),
    ];
  }
  start(){
    let endTurnDiv = document.getElementById("phasePerformAction");
    endTurnDiv.style.visibility = "visible"; 
    let actionStr = "";
    actionStr += "[<a href=\"javascript:state.currentTurn.currentPhase.performAction(0)\">play card</a>]";
    actionStr += "[<a href=\"javascript:state.currentTurn.currentPhase.performAction(1)\">end task</a>]";
    endTurnDiv.innerHTML = actionStr;
  }
  performAction(index){
    this.currentAction = this.actions[index];
    this.currentAction.start();
  }
  end(){
    document.getElementById("phasePerformAction").style.visibility = "hidden";
    this.state.currentTurn.startNextPhase();
  }
}
class PlayCardAction extends Action{
  start(){
    let endTurnDiv = document.getElementById("actionPlayCard");
    endTurnDiv.style.visibility = "visible"; 
    gui.showCards(this.player.actionCards.cards);
  }
  play(cardIndex){
    let card = this.player.actionCards.getCard(cardIndex);
    card.play(this.state.currentSprint);
    this.end();
  }
  work(cardIndex){
    gui.selectTask(cardIndex,this.state.currentSprint);
  }
  workOnTask(cardIndex, taskIndex){
    let task = this.state.currentSprint.tasks[taskIndex];
    let card = this.player.actionCards.cards[cardIndex];
    card.doWork(task);
    this.end();
  }
  end(){
    document.getElementById("actionPlayCard").style.visibility = "hidden";
    gui.hideDiv("actionPlayCard");
    this.state.currentTurn.currentPhase.end();
  }
}
class EndTaskAction extends Action{
  start(){
    let endTurnDiv = document.getElementById("actionEndTask");
    endTurnDiv.style.visibility = "visible"; 
    gui.selectTaskToFinish(this.state.currentSprint);
    //endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentPhase.currentAction.end()\">end task</a>";
  }
  finishTask(taskIndex){
    let task = this.state.currentSprint.tasks[taskIndex];
    task.finishTask();
    this.end();
  }
  end(){
    //document.getElementById("actionEndTask").style.visibility = "hidden";
    gui.hideDiv("actionEndTask");
    gui.hideDiv("actionPlayCard");
    this.state.currentTurn.currentPhase.end();
  }
}