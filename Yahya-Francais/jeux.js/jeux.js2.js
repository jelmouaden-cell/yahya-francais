const gameWindow = document.getElementById('active-game-window');

// 1. JEU DE MÉMOIRE
let memoryCards = [];
let flippedCards = [];
let matchedCount = 0;

function startMemoryGame() {
    gameWindow.innerHTML = `
        <h3>🧠 Jeu de Mémoire</h3>
        <p>Trouve les paires de mots cachés !</p>
        <div id="mem-board" class="memory-board"></div>
        <p id="mem-feedback" style="margin-top:15px; font-weight:bold; color:green;"></p>
    `;
    
    const words = ['Livre', 'Chat', 'École', 'Stylo', 'Livre', 'Chat', 'École', 'Stylo'];
    // Mélange simple
    words.sort(() => Math.random() - 0.5);
    
    const board = document.getElementById('mem-board');
    matchedCount = 0;
    flippedCards = [];
    
    words.forEach((w, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.word = w;
        card.dataset.id = index;
        card.innerText = '❓';
        card.onclick = () => handleMemoryClick(card);
        board.appendChild(card);
    });
}

function handleMemoryClick(card) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.innerText = card.dataset.word;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        if (flippedCards[0].dataset.word === flippedCards[1].dataset.word) {
            matchedCount += 2;
            flippedCards = [];
            if (matchedCount === 8) {
                document.getElementById('mem-feedback').innerText = "🎉 Gagné ! +10 Étoiles !";
                state.stars += 10;
                saveState();
            }
        } else {
            setTimeout(() => {
                flippedCards[0].classList.remove('flipped');
                flippedCards[0].innerText = '❓';
                flippedCards[1].classList.remove('flipped');
                flippedCards[1].innerText = '❓';
                flippedCards = [];
            }, 1000);
        }
    }
}

// 2. JEU DE MOTS MÉLANGÉS
const anagrams = [
    { secret: "ECOLE", hint: "Le lieu où l'on apprend." },
    { secret: "CAHIER", hint: "On écrit ses devoirs dedans." },
    { secret: "STYLO", hint: "Sert à écrire avec de l'encre." }
];
let currentAna = 0;

function startAnagramGame() {
    currentAna = Math.floor(Math.random() * anagrams.length);
    const item = anagrams[currentAna];
    
    // Mélanger les lettres
    let mixed = item.secret.split('').sort(() => Math.random() - 0.5).join(' ');

    gameWindow.innerHTML = `
        <h3>🔤 Jeu des Mots Mélangés</h3>
        <p>Recompose le mot correct à partir des lettres mélangées.</p>
        <p style="font-size:1.4rem; font-weight:bold; margin:15px 0;">${mixed}</p>
        <p><strong>Indice :</strong> ${item.hint}</p>
        <input type="text" id="ana-input" placeholder="Ton mot ici" style="padding:10px; font-size:1rem; border-radius:5px; border:1px solid #ccc; width:200px; margin-top:10px;"><br>
        <button class="btn btn-primary" style="margin-top:15px;" onclick="checkAnagram()">Vérifier</button>
        <p id="ana-feedback" style="margin-top:15px; font-weight:bold;"></p>
    `;
}

function checkAnagram() {
    const input = document.getElementById('ana-input').value.trim().toUpperCase();
    const feedback = document.getElementById('ana-feedback');
    if(input === anagrams[currentAna].secret) {
        feedback.innerText = "⭐ Bravo Yahya ! C'est le mot correct. +10 Étoiles !";
        feedback.style.color = "green";
        state.stars += 10;
        saveState();
    } else {
        feedback.innerText = "❌ Ce n'est pas le bon mot, essaie encore !";
        feedback.style.color = "red";
    }
}

// 3. QUIZ RAPIDE
let currentQuizStep = 0;
const speedQuizQuestions = [
    { q: "Quel est le pluriel de 'Le journal' ?", o: ["Les journals", "Les journaux", "Les journaleux"], r: 1 },
    { q: "Quel mot remplace un nom ?", o: ["Un verbe", "Un adjectif", "Un pronom"], r: 2 },
    { q: "Quelle est la majuscule de la lettre g ?", o: ["G", "J", "Q"], r: 0 }
];

function startLightningQuiz() {
    currentQuizStep = 0;
    renderLightningQuestion();
}

function renderLightningQuestion() {
    if(currentQuizStep >= speedQuizQuestions.length) {
        gameWindow.innerHTML = `
            <h3>⚡ Quiz Rapide Complété !</h3>
            <p>Superbe rapidité Yahya. Tu as empoché +10 Étoiles !</p>
            <button class="btn btn-success" onclick="startLightningQuiz()">Rejouer</button>
        `;
        state.stars += 10;
        saveState();
        return;
    }

    const qItem = speedQuizQuestions[currentQuizStep];
    gameWindow.innerHTML = `
        <h3>⚡ Quiz Rapide (${currentQuizStep + 1}/3)</h3>
        <p style="margin-bottom:15px; font-weight:bold;">${qItem.q}</p>
        ${qItem.o.map((opt, i) => `
            <button class="quiz-option" onclick="handleLightningAnswer(${i}, ${qItem.r})">${opt}</button>
        `).join('')}
        <p id="quiz-speed-feedback" style="margin-top:15px; font-weight:bold;"></p>
    `;
}

function handleLightningAnswer(chosen, correct) {
    const f = document.getElementById('quiz-speed-feedback');
    if(chosen === correct) {
        f.innerText = "Bonne réponse ! Passage à la question suivante...";
        f.style.color = "green";
        currentQuizStep++;
        setTimeout(renderLightningQuestion, 1200);
    } else {
        f.innerText = "Faux ! Recommence le quiz du début.";
        f.style.color = "red";
        setTimeout(startLightningQuiz, 1500);
    }
}

// 4. JEU DE CORRESPONDANCE CORRIGÉ (SANS DRAG & DROP COMPLEXE MOBILE)
function startMatchGame() {
    gameWindow.innerHTML = `
        <h3>🤝 Jeu de Correspondance</h3>
        <p>Associe l'animal à son habitat naturel en cliquant d'abord sur l'animal puis sur l'habitat.</p>
        <div class="match-container">
            <div class="match-column">
                <button class="drag-item" id="item-lion" onclick="selectMatch('Lion')">🦁 Lion</button>
                <button class="drag-item" id="item-dauphin" onclick="selectMatch('Dauphin')">🐬 Dauphin</button>
            </div>
            <div class="match-column">
                <button class="drop-zone" id="zone-ocean" onclick="targetMatch('Océan')">🌊 Océan</button>
                <button class="drop-zone" id="zone-savane" onclick="targetMatch('Savane')">🌾 Savane</button>
            </div>
        </div>
        <p id="match-feedback" style="margin-top:15px; font-weight:bold;"></p>
    `;
}

let selectedAnimal = null;
function selectMatch(animal) {
    selectedAnimal = animal;
    document.getElementById('match-feedback').innerText = `Animal sélectionné : ${animal}. Clique maintenant sur son habitat.`;
}

function targetMatch(habitat) {
    const fb = document.getElementById('match-feedback');
    if(!selectedAnimal) {
        fb.innerText = "Sélectionne d'abord un animal à gauche !";
        return;
    }
    
    if((selectedAnimal === 'Lion' && habitat === 'Savane') || (selectedAnimal === 'Dauphin' && habitat === 'Océan')) {
        fb.innerText = "🎉 Bonne correspondance ! +5 Étoiles !";
        fb.style.color = "green";
        state.stars += 5;
        saveState();
        selectedAnimal = null;
    } else {
        fb.innerText = "❌ Mauvaise association, réessaie !";
        fb.style.color = "red";
    }
}