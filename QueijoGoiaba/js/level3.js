"use strict"; 

var Level3State = function(game) {};


Level3State.prototype.preload = function() {
	
	this.game.load.image('mapTiles', 'Assets/spritesheets/fase3.png');
	
	this.game.load.spritesheet('player', 'Assets/spritesheets/player.png', 32, 32, 8);
    this.game.load.spritesheet('itens', 'Assets/spritesheets/itens.png', 32, 32, 16);
    this.game.load.spritesheet('enemies', 'Assets/spritesheets/enemies.png', 32, 32, 12);
	
	this.game.load.tilemap('level3', 'Assets/maps/fase3.json', null, Phaser.Tilemap.TILED_JSON);
	
	
	// Para carregar os sons, basta informar a chave e dizer qual é o arquivo
    this.game.load.audio('jumpSound', 'Assets/sounds/jump.ogg');
    this.game.load.audio('pickupSound', 'Assets/sounds/inimigodead.wav');
    this.game.load.audio('playerDeath', 'Assets/sounds/morte.ogg');
    this.game.load.audio('enemyDeath', 'Assets/sounds/inimigodead.ogg');
    this.game.load.audio('music', 'Assets/sounds/salgado.ogg');


}


Level3State.prototype.create = function() {
	
	this.level3 = this.game.add.tilemap('level3');
     this.level3.addTilesetImage('fase3', 'mapTiles');

    this.bgLayer = this.level1.createLayer('BG');
    this.lavaLayer = this.level1.createLayer('Lava');
    this.wallsLayer = this.level1.createLayer('Walls');
    // Mais informações sobre tilemaps:
	
	
	this.wallsLayer.resizeWorld();
	
	
	this.level3.setCollisionByExclusion([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 352], true, this.wallsLayer);
    
    this.level3.setCollision([88], true, this.lavaLayer);
	
	
	// Inicializando jogador
    // Adicionando o sprite do jogador na posição (160, 64) usando o asset 'player'
    // Como estamos usando um spritesheet, é necessário informar qual sprite vamos usar
    // A contagem é da mesma forma do que nos tiles do mapa, mas o primeiro sprite recebe
    // o número 0 ao invés de 1.
    this.player = this.game.add.sprite(160, 64, 'player', 5);
    // Ajustando âncora do jogador (ponto de referência para posicionamento)
    this.player.anchor.setTo(0.5, 0.5);
    // Ativando física para o jogador
    this.game.physics.enable(this.player);
    // Ativando gravidade para o jogador
    // Como é positiva no eixo Y, o jogador terá uma gravidade "normal",
    // ou seja, irá acelerar para baixo
    this.player.body.gravity.y = 800;
    // Como o "mundo" é maior do que a área visível, é necessário que a câmera siga o jogador.
    // https://photonstorm.github.io/phaser-ce/Phaser.Camera.html#follow
    this.game.camera.follow(this.player);
    
    // Animações do jogador
    // Animações, no contexto do Phaser, nada mais são do que sequências de frames do spritesheet
    // Para criar uma animação, utilizamos animations.add()
    // Parâmetros: nome da animação, lista de quadros, quadros por segundo da animação
    // https://photonstorm.github.io/phaser-ce/Phaser.AnimationManager.html
    this.player.animations.add('walk', [0, 1, 2, 1], 6);
    this.player.animations.add('idle', [5, 5, 5, 5, 5, 5, 6, 5, 6, 5], 6);
    this.player.animations.add('jump', [4], 8);
    
    // Adicionando entradas
    // createCursorKeys() cria automaticamente mapeamentos para as 4 teclas de direção
    // https://photonstorm.github.io/phaser-ce/Phaser.Keyboard.html#createCursorKeys
    // Lista de teclas disponíveis: https://photonstorm.github.io/phaser-ce/Phaser.KeyCode.html
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	
	 // Criando assets de som com this.game.add.audio()
    // O parâmetro é o nome do asset definido no preload()
    this.jumpSound = this.game.add.audio('jumpSound');
    this.pickupSound = this.game.add.audio('pickupSound');
    this.playerDeathSound = this.game.add.audio('playerDeath');
    this.enemyDeathSound = this.game.add.audio('enemyDeath');
    
    // Música de fundo - criada da mesma forma, mas com o parâmetro loop = true
    this.music = this.game.add.audio('music');
    this.music.loop = true;
    // Já iniciamos a música aqui mesmo pra ficar tocando ao fundo
    this.music.play();
	
    
}

Level3State.prototype.update = function() {
	
	 // Detecção de colisões
    // Todas as colisões entre os objetos do jogo são avaliadas com arcade.collide() ou 
    // arcade.overlap(). O Phaser irá automaticamente calcular a colisão dos objetos
    // Inicialmente, adicionando colisões do player com as paredes da fase, que é um layer:
    this.game.physics.arcade.collide(this.player, this.wallsLayer);

    // Adicionando colisões do jogador com outros elementos, onde há uma função de tratamento
    // Cada colisão terá um callback, que é o terceiro parâmetro, que irá fazer alguma coisa
    // sempre que essa quando essa colisão ocorrer; este callback receberá os 2 objetos que 
    // colidiram; veremos mais abaixo na implementação
    // Colisão com a lava - o jogador morre
    this.game.physics.arcade.collide(this.player, this.lavaLayer, this.lavaDeath, null, this);
    
	
	// Movimentação do player
    // Para detectar se uma das teclas referenciadas foi pressionada,
    // basta verificar a variável .isDown da mesma
    // Caso seja a tecla para a esquerda, ajustar uma velocidade negativa
    // ao eixo X, que fará a posição X diminuir e consequentemente o jogador
    // ir para a esquerda;
    if(this.keys.left.isDown){
        this.player.body.velocity.x = -150; // Ajustar velocidade
        // Se o jogador estiver virado para a direita, inverter a escala para que ele vire para o outro lado
        if(this.player.scale.x == 1) this.player.scale.x = -1;
        // Iniciando a animação 'walk'
        this.player.animations.play('walk');
    }
    // Se a tecla direita estiver pressionada (this.keys.right.isDown == true),
    // mover o sprite para a direita
    else if(this.keys.right.isDown){
        // se a tecla direita estiver pressionada
        this.player.body.velocity.x = 150;  // Ajustar velocidade
        // Se o jogador estiver virado para a direita, inverter a escala para que ele vire para o outro lado
        if(this.player.scale.x == -1) this.player.scale.x = 1;
        this.player.animations.play('walk');
    }
    else {
        // Ajustar velocidade para zero
        this.player.body.velocity.x = 0;
        this.player.animations.play('idle');
    }

    // Se o a barra de espaço ou a tecla cima estiverem pressionadas, e o jogador estiver com a parte de baixo tocando em alguma coisa
    if((this.jumpButton.isDown || this.keys.up.isDown) && (this.player.body.touching.down || this.player.body.onFloor())){
        // Adicione uma velocidade no eixo Y, fazendo o jogador pular
        this.player.body.velocity.y = -400;
        // Tocando o som de pulo
        this.jumpSound.play();
    }

    // Se o jogador não estiver no chão, inicie a animação 'jump'
    if(!this.player.body.touching.down && !this.player.body.onFloor()){
        this.player.animations.play('jump');
    }
	
}


Level3State.prototype.lavaDeath = function(player, lava){
    this.level3.setCollision([5, 6, 13], false, this.lavaLayer);
    this.music.stop(); // parando a música
    this.lose();
}

// Condição de derrota: guarde o score e siga para o próximo estado
Level3State.prototype.lose = function(){
		console.debug("No céu tem pão?");
		Globals.score = this.score;
		this.playerDeathSound.play();
		this.game.state.start('lose');
}