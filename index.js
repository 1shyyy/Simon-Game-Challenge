var ordemCores = []
var tentativas = []
var level = 0;
var numCor = 0;

$(document).keydown(function(event){
    if(event.key == 'a' && (level == 1 || level == 0)){
        $('h1').fadeOut(500);
        ordemCores = []
        tentativas = []
        level = 1
        setTimeout(function(){
            $('h1').text(`Level ${level}`);
        }, 500)
        $('h1').fadeIn();
        ordemCores.push(random())
        setTimeout(function(){
            reproduzirCores(ordemCores)
        }, 800)
    }else{
        console.log('nada acontece')
    }
})

$('.btn').click(function (event) {
    if(level != 0){
        tentativas.push(event.target.id);
        verificarTentativa(event.target.id)
    }
});

function reproduzirSom(cor){
    let audio = new Audio(`sounds/${cor}.mp3`)
    audio.play();
}

function reproduzirAnimacao(cor){
    $(`#${cor}`).addClass('pressed');
    setTimeout(function(){
        $(`#${cor}`).removeClass('pressed');
    }, 300)
}

function reproduzirCores(cores){
    for(let i=0; cores.length > i; i++){
        setTimeout(function(){
            reproduzirAnimacao(cores[i]);
            reproduzirSom(cores[i]);
        }, i * 1000)
    }
}

function verificarTentativa(cor){
    if(ordemCores[numCor] == tentativas[numCor]){
        numCor++;
        reproduzirAnimacao(cor)
        reproduzirSom(cor)
        if(numCor == level){
            level++;
            $('h1').text(`Level ${level}`);
            numCor = 0
            tentativas = []
            ordemCores.push(random())
            setTimeout(function(){
                reproduzirCores(ordemCores)
            }, 1250)
        }
    }else{
        reproduzirErro();
        setTimeout(function () {
            $(`body`).addClass('game-over');
        }, 200)
        setTimeout(function () {
            $(`body`).removeClass('game-over');
        }, 300)
        $('h1').fadeOut(500);
        setTimeout(function(){
            $('h1').text(`Press A key to reset`);
        }, 500)
        $('h1').fadeIn();
        level = 0;
        numCor = 0;
    }
}

function reproduzirErro(){
    $(`body`).addClass('game-over');
    reproduzirSom('wrong');
    setTimeout(function(){
        $(`body`).removeClass('game-over');
    }, 100)
}

function random(){
    num = parseInt(Math.random() * 4 + 1)
    switch (num) {
        case 1:
            return 'green'
            break;
        case 2:
            return 'red'
            break;
        case 3:
            return 'yellow'
            break;
        case 4:
            return 'blue'
            break;
        default:
            break;
    }
}