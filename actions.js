class Action{
  constructor(state, player){
    this.state = state;
    this.player = player;
  }
}

class ScrumAction{
  constructor(state, sprint){
    this.state = state;
    this.sprint = sprint;
    this.start();
  }
  start(){}
}
class PlanningAction extends ScrumAction{


  start(){
    let endTurnDiv = document.getElementById("sprintPlanning");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentAction.startSprint()\">Start sprint</a>";
  }
  startSprint(){
    document.getElementById("sprintPlanning").style.visibility = "hidden";
    this.sprint.startSprint();
    this.state.startNextTurn();
  }
}
class ReviewAction extends ScrumAction{
  start(){
    let endTurnDiv = document.getElementById("sprintReview");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentAction.endSprint()\">End sprint</a>";
  }
  endSprint(){
    document.getElementById("sprintReview").style.visibility = "hidden";
    this.state.currentSprint = new Sprint(this.state);
    this.state.startNextTurn();
  }
}

class EndTurnAction extends Action {
  start(){
    let endTurnDiv = document.getElementById("actionEndTurn");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">end turn</a>";
  }
  end(){
    document.getElementById("actionEndTurn").style.visibility = "hidden";
    this.state.currentTurn.endTurn();
  }
}
class DrawActionCardAction extends Action {
  start(){
    let endTurnDiv = document.getElementById("actionDrawActionCard");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">draw action card</a>";
  }
  end(){
    var card = this.state.actionDeck.draw();
    this.player.addActionCard(card);
    document.getElementById("actionDrawActionCard").style.visibility = "hidden";
    this.state.currentTurn.startNextAction();
  }
}
class DrawIncidentCardAction extends Action{
  start(){
    var endTurnDiv = document.getElementById("actionDrawIncidentCard");
    endTurnDiv.style.visibility = "visible"; 
    endTurnDiv.innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">draw incident card</a>";
  }
  end(){
    document.getElementById("actionDrawIncidentCard").style.visibility = "hidden";
    this.state.currentTurn.startNextAction();
  }
}
class PlayCardAction extends Action{
  start(){
    var endTurnDiv = document.getElementById("actionPlayCard");
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