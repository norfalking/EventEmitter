function EventEmitter() { 
  // liste des événements, chaque événement est associé à une liste de fonctions appelées lorsque l'événement est déclenché
  this.ca_events = {}; 
};

// Redéclaration du prototype de EventEmitter
EventEmitter.prototype = {
  
  // Fonction permettant d'associer une fonction à un événement
  on: function (ps_event, pf_func) {
    if(!this.ca_events.hasOwnProperty(ps_event)) { // Si l'événement n'existe pas encore ...
      this.ca_events[ps_event] = []; // ... on le crée et on lui associe une liste de fonctions vide.
    }
    this.ca_events[ps_event].push(pf_func); // On ajoute la fonction à la liste
    return this; // permet le "chaining"
  },
  
  // Fonction permettant de reinitialiser la liste des événements
  off: function (ps_event, pf_func) {
    if(ps_event != undefined) {
      if(this.ca_events.hasOwnProperty(ps_event)) {
        if(pf_func != undefined) {
          if(this.ca_events[ps_event].indexOf(pf_func) != -1) {
            this.ca_events[ps_event].splice(this.ca_events[ps_event].indexOf(pf_func), 1);
          }
        }
        else {
          delete this.ca_events[ps_event];
        }
      }
    }
    else {
      this.ca_events = {}; // réinitialisation de la liste des événements
    }
    return this; // permet le "chaining"
  },
  
  // Fonction permettant de lancer un événement
  emit: function (ps_event, pa_args) {
    if(this.ca_events.hasOwnProperty(ps_event)) { // Si l'événement existe ...
      this.ca_events[ps_event].forEach(function(pf_func) { // On appelle chaque fonction de l'événement une par une
        pf_func.apply(this, pa_args);
      });
    }
    return this; // permet le "chaining"
  },
  
  // Fonction permettant d'associer une fonction à un événement pour qu'elle ne soit lancée qu'une fois
  // C'est un "sucre syntaxique" de la fonction times
  once: function (ps_event, pf_func) {    
    return this.times(ps_event, 1, pf_func); // permet le "chaining"
  },
  
  // Fonction permettant d'associer une fonction à un événement pour qu'elle ne soit lancée qu'un certain nombre de fois
  times: function (ps_event, pi_times, pf_func) {
    let li_currentTimes = 0; // Compteur du nombre de fois que la fonction a été appelée
    if(!this.ca_events.hasOwnProperty(ps_event)) // Si l'événement n'existe pas encore ...
      this.ca_events[ps_event] = []; // ... on le crée et on lui associe une liste de fonctions vide.
    let lf_funcClosure = function(pa_args) { // Closure qui va rajouter une couche à la fonction pour permettre de gérer le nombre de fois qu'elle doit être appelée
      li_currentTimes++; // Incrémentation di compteur
      if(li_currentTimes <= pi_times) { // Si la fonction n'a pas encore atteint son quota d'appel ...
        pf_func.apply(this, pa_args); // ... on l'appelle
      }
    };
    return this.on(ps_event, lf_funcClosure); // permet le "chaining"
  }
  
};






/*let eventEmitter = new EventEmitter(); // instanciation d'un EventEmitter

let x = function (){
  console.log('Test de la fonction on');
};

let y = function (){
  console.log('Test de la fonction on 2');
};

// TEST "on"
eventEmitter.on('onClick', x);
eventEmitter.on('onClick', y);



// TEST "emit"
eventEmitter.emit('onClick'); // Affiche "Test de la fonction on"



// TEST "off"
eventEmitter.off('onClick', y)
.emit('onClick'); // N'affiche rien



// TEST "once"
eventEmitter.once('onClick', function (){
  console.log('Test de la fonction once');
})
.emit('onClick') // Affiche "Test de la fonction once"
.emit('onClick'); // N'affiche rien



// TEST "times"
eventEmitter.times('onClick', 3, function (){
  console.log('Test de la fonction times');
})
.emit('onClick') // Affiche "Test de la fonction times"
.emit('onClick') // Affiche "Test de la fonction times"
.emit('onClick') // Affiche "Test de la fonction times"
.emit('onClick'); // N'affiche rien*/