# SwDevGame

Test gui for ide til spil

Spil er baseret på software udvikling, med udgangspunkt i  *kvalitet* vs *til tiden* vs *features*

* tre spillere, *udvikler*, *projekt* og *sælger*
* 2 sæt kort
  * action kort
  * incident kort
*

### ActionKort
* antal story point der kan lægges i en opgave
* en action
  * Task, der kan tilføjes til back log
  * Effect, der kan spilles på en spiller (tidsbegrænsede?)
  * instant, kort der kan spilles også i andres tur

### Incident kort
* support sager
* 

### Tasks
* task værdi
* task estimat i story point
  * refinement, kan udføres af proj, sales. 
  * dev, kan udføres af dev. 3 værdier, (måske statisk plus/minus sp)
    * kan afsluttes efter første, men tilføjer teknisk gæld
    * højeste fjerner teknisk gæld 
  * sales, kan udføres af salg
* Feature
  * tilføjes af salg
  * estimat for refinement og dev, ikke salg
* Refactor
  * ingen værdi
  * estimate for dev og salg (score for salg/værdi ift release?)
    * refactor kan ikke tilføje teknisk gæld
* Support
  * ingen værdi
  * severity
    * blocker, skal løses før alle andre tasks
    * critical, tilføjes til sprint, forbliver aktiv til den er løst, opskaleres til blocker ved sprint afslutning?
    * major, i toppen af backlog, 
    * minor, ?

### Instant kort
* not a bug, afviser support sag
* chip in, proj eller salg kan lægge dev point, tilføjer teknisk gæld
* counter/prioritets kort, prioriterede : CEO har hørt om det > VP > afdelingschef > ?
* 

### Effect
* spilles på spiller
* +x sp
* dev kan refine
*

### Faser af spil
* sprint start
  * træk task ind i sprint fra backlog
* Spiller
  * træk action kort
  * udfør action
    * afslut task
    * spil kort
    *
  * træk incident kort => hvis support, placer korrekt
* Sprint afslutning
  * tasks der kan afsluttes, afsluttes og scores
  * task der ikke kan afsluttes overføres til næste sprint, igangværende point fjernes
* Release afslutning
  * Er release bestået? f(sum(task.value), teknisk gæld) > min score
  * score pr spiller
  * tilføj support sager til incident deck baseret på teknisk gæld
  * teknisk gæld overføres til næste release
  
### Scoring
* hvis release ikke virker, taber alle
* dev, scorer refactor + f(teknisk gæld)
* salg, scorer (antal?) features + solgte refactor
* proj, scorer ift features - uafsluttede features


