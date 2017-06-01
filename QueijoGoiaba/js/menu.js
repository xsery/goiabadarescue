var MenuState = function(game) {};


MenuState.prototype.preload = function(){
    
    this.game.load.image('newGame', 'Assets/buttons/ButtonPlayMenuLigado.png');
    this.game.load.image('tacima', 'Assets/buttons/ButtonPlayMenuDesligado.png');
    this.game.load.image('credits', 'Assets/buttons/ButtonInformacaoLigado.png');
    this.game.load.image('creditscima', 'Assets/buttons/ButtonInformacaoDesligado.png');
    this.game.load.image('informacao', 'Assets/spritesheets/Credits.png');
    this.game.load.image('menu', 'Assets/spritesheets/bgmenu.png');
    this.game.load.audio('musicMenu', 'Assets/sounds/menu.ogg');
    this.game.load.audio('musicButton', 'Assets/sounds/button.ogg');
    this.game.load.image('som', 'Assets/buttons/ButtonSomLigado.png');
    this.game.load.image('mute', 'Assets/buttons/ButtonSomDesligado.png');
}

MenuState.prototype.create = function(){
    
    game.add.image(0,0,'menu');
    
    this.newGame = game.add.image(430, 430, 'newGame');
    this.newGame.anchor.set(0.5);
    this.newGame.inputEnabled = true;
    this.newGame.events.onInputDown.add(this.listener, this);
    this.newGame.events.onInputOver.add(this.overPlay, this);
    this.newGame.events.onInputOut.add(this.outPlay, this);
    
    this.credits = game.add.sprite(775, 70, 'credits');
    this.credits.anchor.set(0.5);
    this.credits.inputEnabled = true;
    this.credits.events.onInputDown.add(this.listenerCredits, this);
    this.credits.events.onInputOver.add(this.overInformacao, this);
    this.credits.events.onInputOut.add(this.outInformacao, this);
    
    this.som = game.add.sprite(775, 20, 'som');
    this.som.anchor.set(0.5);
    this.som.inputEnabled = true;
    this.som.events.onInputDown.add(this.listenerMute, this);
    
    this.informacao = game.add.image(225, 25, 'informacao');
    this.informacao.inputEnabled = true;
    this.informacao.events.onInputDown.add(this.listenerCredits, this);
    this.informacao.visible =! this.informacao.visible;
    
    this.musicMenu = game.add.audio('musicMenu');
    this.musicMenu.loop = true;
    this.musicMenu.play();
    
    this.musicButton = game.add.audio('musicButton');
}

MenuState.prototype.update = function(){
    
    
    
}


MenuState.prototype.listener = function(){
    this.musicButton.play();
    this.musicMenu.stop();
    this.game.state.start('game');
    
}

MenuState.prototype.overPlay = function(){
    this.newGame.loadTexture('tacima', 0);
    
}

MenuState.prototype.outPlay = function(){
    this.newGame.loadTexture('newGame', 0);
    
}

MenuState.prototype.overInformacao = function(){
    this.credits.loadTexture('creditscima', 0);
    
}

MenuState.prototype.outInformacao = function(){
    this.credits.loadTexture('credits', 0);
    
}

MenuState.prototype.listenerCredits = function(){
    this.musicButton.play();
    this.informacao.visible =! this.informacao.visible;
    
}

MenuState.prototype.listenerMute = function(){
    if (!game.sound.mute){
        this.som.loadTexture('mute', 0);
    }
    if (game.sound.mute){
        this.som.loadTexture('som', 0);
    }
    game.sound.mute =! game.sound.mute;
}