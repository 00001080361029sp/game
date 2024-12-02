let cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = 0;
let score = 0;

// Função para virar a carta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Função para checar se as cartas viradas formam um par
function checkMatch() {
    let [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        // Se for um par, incrementar o número de acertos
        matchedCards += 2;
        score++;
        document.getElementById('score').textContent = score;

        // Se o jogo acabar, exibir mensagem
        if (matchedCards === cards.length) {
            document.getElementById('game-message').textContent = 'Você Ganhou!';
        }
        
        flippedCards = [];
    } else {
        // Se não for um par, desvirar as cartas após um tempo
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Função para embaralhar as cartas
function shuffleCards() {
    let order = Array.from(Array(cards.length).keys());
    order = order.sort(() => Math.random() - 0.5);

    cards.forEach((card, index) => {
        card.style.order = order[index];
    });
}

// Adicionar o evento de click para virar as cartas
cards.forEach(card => card.addEventListener('click', flipCard));

// Embaralhar as cartas quando o jogo começar
shuffleCards();
