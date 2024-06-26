//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Número Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 50
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1


//Exibir um texto na tela
function exibirTextoNaTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'French Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela ('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela ('p', `${mensagemTentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela ('p', 'O número secreto é menor');
        } else {
             exibirTextoNaTela ('p', 'O número secreto é maior');
        }
    }
    tentativas++;
    limparCampo();

}

function limparCampo() {
    chute = document.querySelector ('input');
    chute.value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 50 + 1);
    let quantidadeElementoLista = listaDeNumerosSorteados.length;

    if (quantidadeElementoLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}