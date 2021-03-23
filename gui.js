class Gui{
  constructor(){}

  hideDiv(id){
    document.getElementById(id).style.visibility ="hidden";
  }
  showDiv(id){
    document.getElementById(id).style.visibility ="visible";
  }
  showPlayer(player){
    let id = `player${player.name}`;
    let cards = `${player.name} : `;
    player.actionCards.cards.forEach(card => {
      cards += `[${card.score} / ${card.effect.name()} ]`;
    });
    document.getElementById(id).innerText = cards;
  }
  showSprint(sprint){
    let tasks = "Sprint : ";
    sprint.tasks.forEach(task => {
      tasks += `[${task.score}/${task.estimate}/${task.workDone} (${task.status})] `;
    });
    document.getElementById("activeSprint").innerText = tasks;
  }
  showCards(cards){
    let cardStr = "";
    let i;
    for(i = 0; i<cards.length;i++){
      cardStr += `[ <a href=\"javascript:state.currentPhase.currentAction.work(${i})\">work ${cards[i].score}</a> / <a href=\"javascript:state.currentPhase.currentAction.play(${i})\">${cards[i].effect.name()}</a> ]`;
    }
    document.getElementById("actionPlayCard").innerHTML = cardStr;
  }
  selectTask(cardIndex, sprint){
    let tasks = "";
    let i;
    for(i = 0;i<sprint.tasks.length;i++){
      let task = sprint.tasks[i];
      let description = `${task.score}/${task.estimate}/${task.workDone}`;
      if(task.status == actionStatus.Active){
        let link = `javascript:state.currentPhase.currentAction.workOnTask(${cardIndex}, ${i})`;
        tasks += `[<a href=\"${link}\">${description}</a>]`;
      } else {
        tasks += `[${description} - ${task.status}]`;
      }
    }
    document.getElementById("actionPlayCard").innerHTML = tasks;
  }
  selectTaskToFinish(sprint){
    this.showDiv("actionPlayCard");
    let tasks = "";
    let i;
    for(i = 0;i<sprint.tasks.length;i++){
      let task = sprint.tasks[i];
      let text = `Finish ${task.estimate}:${task.workDone}`;
      let link = `javascript:state.currentPhase.currentAction.finishTask(${i})`;
      if(task.workDone >= task.minEstimate && task.status == actionStatus.Active){
        tasks += `[<a href=\"${link}\">${text}</a>]`;
      }
      else {
        tasks += `[${text}]`;
      }
    }
    document.getElementById("actionPlayCard").innerHTML = tasks;
  }
  showBackLog(state){
    let tasks = "BackLog : ";
    state.backLog.forEach( task => {
      tasks += `[${task.score}/${task.estimate}]`;
    });
    document.getElementById("activeBackLog").innerText = tasks;
  }
  selectTaskFromBackLog(state){
    let tasks = "";
    let i = 0;
    state.backLog.forEach( task => {
      tasks += `[ <a href=\"javascript:state.currentPhase.addTaskToSprint(${i++})\">${task.score}/${task.estimate}</a>]`;
    });
    document.getElementById("actionPlayCard").innerHTML = tasks;
    this.showDiv("actionPlayCard");
  }


}