class Action{
  constructor(state, player){
    this.state = state;
    this.player = player;
  }
}
class PlanningAction extends Action{
  start(){
    document.getElementById("action").innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">Start sprint</a>";
  }
}
class ReviewAction extends Action{
  start(){
    document.getElementById("action").innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">Start sprint</a>";
  }
}


class EndTurnAction extends Action {
  start(){
    document.getElementById("action").innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">end turn</a>";
  }
  end(){
    this.state.currentTurn.endTurn();
  }
}
class DrawActionCardAction extends Action {
  start(){
    document.getElementById("action").innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">draw action card</a>";
  }
  end(){
    var card = this.state.actionDeck.draw();
    this.player.addActionCard(card);
    this.state.currentTurn.startNextAction();
  }
}
class DrawIncidentCardAction extends Action{
  start(){
    document.getElementById("action").innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">draw incident card</a>";
  }
  end(){
    this.state.currentTurn.startNextAction();
  }
}
class PlayCardAction extends Action{
  start(){
    let cardLink = "";
    this.player.actionCards.forEach(card => {
      cardLink += `<a href="alert(${card})>${card}</a>`;   
    });
    document.getElementById("action").innerHTML = "<a href=\"javascript:state.currentTurn.currentAction.end()\">play card</a>";
  }
  play(cardIndex){
    this.state.currentTurn.startNextAction();
  }
  end(){
    this.state.currentTurn.startNextAction();
  }
}