"use strict"; 

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var MenuState = function(game) {};

// preload: carregar todos os assets necessários para esta scene ou para as próximas
MenuState.prototype.preload = function() {
    game.load.image('fundo', 'Assets/spritesheets/blackgroundMenu.png');
    game.load.image('buttonOn', 'Assets/spritesheets/buttonOn.png');
    game.load.image('buttonOff', 'Assets/spritesheets/buttonOff.png');
    game.load.image('playOff', 'Assets/spritesheets/playOff.png');
    game.load.image('playOn', 'Assets/spritesheets/playOn.png');
}

MenuState.prototype.create = function() {
    game.add.image(game.world.centerX, game.world.centerY, 'fundo').anchor.set(0.5);
}

MenuState.prototype.update = function() {
    
}


