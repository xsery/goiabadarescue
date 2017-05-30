var MenuState = function(game) {};


MenuState.prototype.preload = function(){
    
    this.game.load.image('button','Assets/buttons/phaserlogo.png');
    
}

MenuState.prototype.create = function(){
    
    this.buttonPlay = game.add.sprite(game.world.centerX, 300, 'button');
    this.buttonPlay.anchor.set(0.5);
    this.buttonPlay.inputEnabled = true;
    this.buttonPlay.events.onInputDown.add(this.listener, this);
}


MenuState.prototype.update = function(){
    
}


MenuState.prototype.listener = function(){
    
    this.game.state.start('game');
}