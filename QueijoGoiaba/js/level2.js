"use strict"; 

var Level2State = function(game) {};


Level2State.prototype.preload = function() {
	
	this.game.load.image('mapTiles', 'Assets/spritesheets/fase2.png');
	
	// Para carregar um spritesheet, é necessário saber a altura e largura de cada sprite, e o número de sprites no arquivo
    // No caso do player.png, os sprites são de 32x32 pixels, e há 8 sprites no arquivo
    this.game.load.spritesheet('player', 'Assets/spritesheets/player.png', 32, 32, 8);
    this.game.load.spritesheet('itens', 'Assets/spritesheets/itens.png', 32, 32, 16);
    this.game.load.spritesheet('enemies', 'Assets/spritesheets/enemies.png', 32, 32, 12);
	
	// Para carregar um arquivo do Tiled, o mesmo precisa estar no formato JSON
	this.game.load.tilemap('level2', 'Assets/maps/fase2.json', null, Phaser.Tilemap.TILED_JSON);

	
	 // Para carregar os sons, basta informar a chave e dizer qual é o arquivo
    this.game.load.audio('jumpSound', 'Assets/sounds/jump.ogg');
    this.game.load.audio('pickupSound', 'Assets/sounds/inimigodead.wav');
    this.game.load.audio('playerDeath', 'Assets/sounds/morte.ogg');
    this.game.load.audio('enemyDeath', 'Assets/sounds/inimigodead.ogg');
    this.game.load.audio('music', 'Assets/sounds/salgado.ogg');
	
	
}


Level2State.prototype.create = function() {
	
	// Inicializando sistema de física
    // o sistema Arcade é o mais simples de todos, mas também é o mais eficiente em termos de processamento.
    // https://photonstorm.github.io/phaser-ce/Phaser.Physics.Arcade.html
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
	
	this.level2 = this.game.add.tilemap('level2');
     this.level2.addTilesetImage('fase2', 'mapTiles');

    this.bgLayer = this.level2.createLayer('BG');
    this.lavaLayer = this.level2.createLayer('Itens');
    this.lavaLayer = this.level2.createLayer('Lava');
    this.wallsLayer = this.level2.createLayer('Walls');
	
	this.level2.setCollisionByExclusion([2, 22, 96, 97, 171, 246, 321, 322, 396, 397, 471, 546, 621, 696, 771, 846, 922, 995, 1070, 1145], true, this.wallsLayer);
    
    this.level2.setCollision([247], true, this.lavaLayer);
	
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
    
    // Adicionando objetos do Tiled, utilizando grupos
    // Um grupo é como se fosse um array de sprites, mas com várias facilidades adicionais, 
    // como por exemplo alterar atributos e facilitar detectar colisões com objetos do grupo
    // Especificamente, estamos criando physicsGroups, que já armazenam objetos com física ativada
    // https://photonstorm.github.io/phaser-ce/Phaser.GameObjectFactory.html#physicsGroup
    
    // Criando objetos que foram criados em um layer de objetos do Tiled
    // Parâmetros do createFromObjects():
    // nome do layer do Tiled de onde vamos criar os objetos
    // nome dos objetos do Tiled que serão criados
    // nome do spritesheet carregado no preload() com os objetos
    // frame do spritesheet, basta setar para um dos frames do objeto em questão
    // true, false - estes dois parâmetros podem ficar com estes valores
    // grupo - qual grupo do Phaser devemos adicionar esses objetos
    
    // Grupo de diamantes
    this.diamonds = this.game.add.physicsGroup();
    this.level1.createFromObjects('Itens', 'diamond', 'itens', 5, true, false, this.diamonds);
    // Para cada objeto do grupo, vamos executar uma função
    this.diamonds.forEach(function(diamond){
        // body.immovable = true indica que o objeto não é afetado por forças externas
        diamond.body.immovable = true;
        // Adicionando animações; o parâmetro true indica que a animação é em loop
        diamond.animations.add('spin', [4, 5, 6, 7, 6, 5], 6, true);
        diamond.animations.play('spin');
    });

    // Grupo de morcegos:
    this.bats = this.game.add.physicsGroup();
    this.level1.createFromObjects('Enemies', 'bat', 'enemies', 8, true, false, this.bats);
    this.bats.forEach(function(bat){
        bat.anchor.setTo(0.5, 0.5);
        bat.body.immovable = true;
        bat.animations.add('fly', [8, 9, 10], 6, true);
        bat.animations.play('fly');
        // Velocidade inicial do inimigo
        bat.body.velocity.x = 100;
        // bounce.x=1 indica que, se o objeto tocar num objeto no eixo x, a força deverá
        // ficar no sentido contrário; em outras palavras, o objeto é perfeitamente elástico
        bat.body.bounce.x = 1;
    });

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
    
    // HUD de score
    // A linha abaixo adiciona um texto na tela, e a próxima faz com o que o texto fique
    // fixo na câmera, dessa forma não vai se deslocar quando a câmera mudar
    this.scoreText = this.game.add.text(10, 0, "Score: 0", 
                            {font: "20px ", fill: "#000000"});
    this.scoreText.fixedToCamera = true;
    
    // Estado do jogo - Variáveis para guardar quaisquer informações pertinentes para as condições de 
    // vitória/derrota, ações do jogador, etc
    this.totalDiamonds = this.diamonds.length;
    this.collectedDiamonds = 0;
    this.score = 0;
    
}



Level2State.prototype.update = function() {
	
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
    
    // Adicionando objetos do Tiled, utilizando grupos
    // Um grupo é como se fosse um array de sprites, mas com várias facilidades adicionais, 
    // como por exemplo alterar atributos e facilitar detectar colisões com objetos do grupo
    // Especificamente, estamos criando physicsGroups, que já armazenam objetos com física ativada
    // https://photonstorm.github.io/phaser-ce/Phaser.GameObjectFactory.html#physicsGroup
	
}

Level2State.prototype.lavaDeath = function(player, lava){
    this.level2.setCollision([5, 6, 13], false, this.lavaLayer);
    this.music.stop(); // parando a música
    this.lose();
}

	// Condição de derrota: guarde o score e siga para o próximo estado
Level2State.prototype.lose = function(){
		console.debug("No céu tem pão?");
		Globals.score = this.score;
		this.playerDeathSound.play();
		this.game.state.start('lose');
}