// Initialisation globale de la progression
let state = {
    stars: 0,
    completedLessons: [],
    badges: []
};

function loadState() {
    const saved = localStorage.getItem('yahya_aventure_state');
    if (saved) {
        state = JSON.parse(saved);
    }
    updateUI();
}

function saveState() {
    localStorage.setItem('yahya_aventure_state', JSON.stringify(state));
    updateUI();
}

function updateUI() {
    const progressPercent = Math.round((state.completedLessons.length / 20) * 100);
    
    const progressEl = document.getElementById('global-progress-bar');
    if (progressEl) {
        progressEl.style.width = `${progressPercent}%`;
        progressEl.innerText = `${progressPercent}%`;
    }

    const starsEl = document.getElementById('stars-count');
    if (starsEl) {
        starsEl.innerText = state.stars;
    }

    // Gestion des Badges
    state.badges = [];
    if (state.completedLessons.length >= 1) state.badges.push('Novice');
    if (state.completedLessons.length >= 10) state.badges.push('Aventurier');
    if (state.completedLessons.length === 20) state.badges.push('Champion');

    const badgesContainer = document.getElementById('badges-container');
    if (badgesContainer) {
        badgesContainer.innerHTML = '';
        const allBadges = [
            { id: 'Novice', icon: '🎯' },
            { id: 'Aventurier', icon: '📚' },
            { id: 'Champion', icon: '🏆' }
        ];
        allBadges.forEach(b => {
            const hasIt = state.badges.includes(b.id);
            const span = document.createElement('span');
            span.className = `badge ${hasIt ? '' : 'locked'}`;
            span.innerText = `${b.icon} ${b.id}`;
            badgesContainer.appendChild(span);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadState);