var MenuState = function(game) {};


MenuState.prototype.preload = function(){
    
    this.game.load.image('newGame', 'Assets/buttons/player.png');
    this.game.load.image('credits', 'Assets/buttons/player.png');
    this.game.load.audio('musicMenu', 'Assets/sounds/menu.ogg');
    
}

MenuState.prototype.create = function(){
    
    
    
    //adiciona o botao a tela
    this.newGame = game.add.sprite(150, 300, 'newGame');
    
    //defini a posicao da ancora do botao
    this.newGame.anchor.set(0.5);
    
    //habilita a iteração ao botao
    this.newGame.inputEnabled = true;
    
    aqui chama o evento de clique e passa a função que vai chamar a tela
    this.newGame.events.onInputDown.add(this.listener, this);
    
    
    
    
    
    
    this.credits = game.add.sprite(400, 300, 'credits');
    this.credits.anchor.set(0.5);
    this.credits.inputEnabled = true;
    this.credits.events.onInputDown.add(this.listenerCredits, this);
    
    this.musicMenu = game.add.audio('musicMenu');
    this.musicMenu.play();
    
}


MenuState.prototype.update = function(){
    
    
}


MenuState.prototype.listener = function(){
    
    this.game.state.start('game');
    
}

MenuState.prototype.listenerCredits = function(){
    
    this.game.state.start('credits');
    
}