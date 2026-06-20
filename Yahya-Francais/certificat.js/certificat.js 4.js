function checkCertificateLock() {
    const lockScreen = document.getElementById('lock-screen');
    const certContainer = document.getElementById('certificate-container');
    const dateEl = document.getElementById('cert-date');

    const saved = localStorage.getItem('yahya_aventure_state');
    if (saved) {
        const localState = JSON.parse(saved);
        // Vérification que les 20 leçons sont bien validées
        if (localState.completedLessons && localState.completedLessons.length === 20) {
            if(lockScreen) lockScreen.style.display = 'none';
            if(certContainer) certContainer.style.display = 'block';
            
            // Attribution de la date du jour automatique
            const aujourdhui = new Date();
            if(dateEl) dateEl.innerText = aujourdhui.toLocaleDateString('fr-FR');
        }
    }
}

function downloadPDF() {
    const element = document.getElementById('print-area');
    const opt = {
        margin:       1,
        filename:     'Certificat_Yahya_Armich.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
}

document.addEventListener('DOMContentLoaded', checkCertificateLock);