var MenuState = function(game) {};


MenuState.prototype.preload = function(){
    
    this.game.load.image('newGame', 'Assets/buttons/player.png');
    this.game.load.image('credits', 'Assets/buttons/player.png');
    
}

MenuState.prototype.create = function(){
    
    this.newGame = game.add.sprite(100, 100, 'newGame');
    this.newGame.anchor.set(0.5);
    this.newGame.inputEnabled = true;
    this.newGame.events.onInputDown.add(this.listener, this);
    
    this.credits = game.add.sprite(300, 300, 'credits');
    this.credits.anchor.set(0.5);
    this.credits.inputEnabled = true;
    this.credits.events.onInputDown.add(this.listenerCredits, this);
    
}


MenuState.prototype.update = function(){
    
}


MenuState.prototype.listener = function(){
    
    this.game.state.start('game');
}

MenuState.prototype.listenerCredits = function(){
    
    this.game.state.start('credits');
    
}