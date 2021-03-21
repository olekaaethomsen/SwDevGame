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
  }
  startSprint(){
    document.getElementById("sprintPlanning").style.visibility = "hidden";
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
    document.getElementById("sprintReview").style.visibility = "hidden";
    this.state.currentSprint = new Sprint(this.state);
    this.state.startNextTurn();
  }
}

class EndTurnPhase extends Phase {
  start(){
    let endTurnDiv = document.getElementById("phaseEndTurn");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">end turn</a>";
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
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">draw action card</a>";
  }
  end(){
    var card = this.state.actionDeck.draw();
    this.player.addActionCard(card);
    document.getElementById("phaseDrawActionCard").style.visibility = "hidden";
    this.state.currentTurn.startNextAction();
  }
}
class DrawIncidentCardPhase extends Phase{
  start(){
    let endTurnDiv = document.getElementById("phaseDrawIncidentCard");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">draw incident card</a>";
  }
  end(){
    document.getElementById("phaseDrawIncidentCard").style.visibility = "hidden";
    this.state.currentTurn.startNextAction();
  }
}
class PerformActionPhase extends Phase{
  constructor(state, player){
    super(state, player);
    this.actions = [
      new PlayCardAction(this.state, this.player),
    ];
  }
  start(){
    let endTurnDiv = document.getElementById("phasePerformAction");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">perform action</a>";
  }
  end(){
    document.getElementById("phasePerformAction").style.visibility = "hidden";
    this.state.currentTurn.startNextAction();
  }
}
class PlayCardAction extends Action{
  start(){
    let endTurnDiv = document.getElementById("actionPlayCard");
    endTurnDiv.style.visibility = "visible"; 
    let cardLink = "";
    this.player.actionCards.forEach(card => {
      cardLink += `<a href="alert(${card})>${card}</a>`;   
    });
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">play card</a>";
  }
  play(cardIndex){
    this.state.currentTurn.startNextAction();
  }
  end(){
    document.getElementById("actionPlayCard").style.visibility = "hidden";
    this.state.currentTurn.startNextAction();
  }
}