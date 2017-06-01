var MenuState = function(game) {};


MenuState.prototype.preload = function(){
    
    this.game.load.image('newGame', 'Assets/buttons/player.png');
    this.game.load.image('credits', 'Assets/buttons/coin.png');
    this.game.load.audio('musicMenu', 'Assets/sounds/menu.ogg');
    
}

MenuState.prototype.create = function(){
    
    this.newGame = game.add.image(150, 300, 'newGame');
    this.newGame.anchor.set(0.5);
    this.newGame.inputEnabled = true;
    this.newGame.events.onInputDown.add(this.listener, this);
    
    
    this.credits = game.add.sprite(400, 300, 'credits');
    this.credits.anchor.set(0.5);
    this.credits.inputEnabled = true;
    this.credits.events.onInputDown.add(this.listenerCredits, this);
    
    
    this.musicMenu = game.add.audio('musicMenu');
    this.musicMenu.loop = true;
    this.musicMenu.play();
    
}


MenuState.prototype.update = function(){
    
    
}


MenuState.prototype.listener = function(){
    this.musicMenu.stop();
    this.game.state.start('game');
    
}

MenuState.prototype.listenerCredits = function(){
    
    console.debug("clicou creditos");
    this.game.state.start('credits');
    
}