# L'Aventure de Yahya - Plateforme Éducative d'Été

Ce projet est une plateforme web sur mesure, moderne et interactive, conçue spécialement pour **Yahya Armich** afin de consolider ses compétences en français et assurer sa transition de la 5e à la 6e année primaire au Maroc.

## ✨ Fonctionnalités clés
- **Progression sur-mesure** : 20 leçons complètes étalées sur 4 semaines d'étude.
- **Autonome et léger** : Développé exclusivement en HTML5, CSS3, et Vanilla JavaScript.
- **Sauvegarde Automatique** : Le score d'étoiles, la complétion des leçons et les badges se stockent automatiquement à l'aide de `localStorage`.
- **Jeux interactifs** : Contient 4 jeux fonctionnels adaptés (Mémoire, Anagrammes, Quiz Express, Match).
- **Génération de diplôme** : Un certificat officiel se déverrouille au moment où la 20e leçon est complétée.

## 🚀 Lancement local
1. Téléchargez l'ensemble des fichiers dans un dossier unique sur votre machine.
2. Double-cliquez sur `index.html` pour ouvrir le site directement dans n'importe quel navigateur (Chrome, Edge, Safari).
3. Pour tester le certificat immédiatement sans faire les 20 leçons, ouvrez la console de votre navigateur (F12) et exécutez la commande suivante :
   `localStorage.setItem('yahya_aventure_state', JSON.stringify({stars:100, completedLessons:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], badges:['Novice','Aventurier','Champion']})); location.reload();`