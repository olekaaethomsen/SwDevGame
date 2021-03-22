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
    let tasks = "";
    sprint.tasks.forEach(task => {
      tasks += `[ value=${task.score} estimate=${task.estimate} work done=${task.workDone} ] `;
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
      let link = `javascript:state.currentPhase.currentAction.workOnTask(${cardIndex}, ${i})`;
      tasks += `[<a href=\"${link}\">${task.score}/${task.estimate}/${task.workDone}</a>]`;
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
      if(task.workDone >= task.minEstimate){
        tasks += `[<a href=\"${link}\">${text}</a>]`;
      }
      else {
        tasks += `[${text}]`;
      }
    }
    document.getElementById("actionPlayCard").innerHTML = tasks;
  }


}