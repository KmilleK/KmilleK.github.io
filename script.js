document.addEventListener("DOMContentLoaded", () => {
    
    
    // Total number of cases in the calendar
    const totalDays = 24;

    // Track opened cases
    let openedDays_number = 0;

    // Example list of images corresponding to each milestone (you can customize the URLs)
    const milestoneImages = [
        'gift/anti_vibrateur.png', // Image for 18% milestone
        'gift/porte_cle.png', // Image for 36% milestone
        'gift/tshirt.png', // Image for 54% milestone
        'gift/porte_gourde.png', // Image for 72% milestone
        'gift/tenue.png'  // Image for 90% milestone
    ];

    const milestones = [18,36,54, 72, 90]; // Milestones as percentages
    const unlockedMilestones = new Set();

    // Get the current day of the month
    const today = new Date().getDate();
    //const today = 10;
    console.log('// We are in december: ' +today );

    // Get DOM elements
    const questionElement = document.getElementById("question");
    const userAnswerInput = document.getElementById("user-answer");
    const submitAnswerButton = document.getElementById("submit-answer");
    const feedbackElement = document.getElementById("feedback");
    const rewardBar = document.getElementById("reward-bar");
    const milestoneFeedback = document.getElementById("milestone-feedback");
    const milestoneElements = document.querySelectorAll(".milestone-bar");
    const milestoneImagesElements = document.querySelectorAll('.gift-image');
    let progress = (openedDays_number / totalDays) * 90;

    // Function to update the reward bar
    function updateRewardBar() {
        
        progress = (openedDays_number / totalDays) * 90;
        rewardBar.style.width = `${progress}%`;

        // Check for milestone unlock
        milestones.forEach((milestone, index) => {
            if (progress >= milestone && !unlockedMilestones.has(milestone)) {
                console.log('// we unlox the bar at index ' + index );
                unlockedMilestones.add(milestone);
                milestoneElements[index].classList.add("unlocked");
                console.log('// will update image '+ milestoneImagesElements[index].src);
                milestoneImagesElements[index].src = milestoneImages[index];
                console.log('// I update the image'+ milestoneImages[index]);
                showMilestoneFeedback(`Milestone ${milestone}% unlocked! 🎉`);
            }
        });
        saveState();
    }

    // Function to display milestone feedback
    function showMilestoneFeedback(message) {
        milestoneFeedback.textContent = message;
        milestoneFeedback.style.opacity = 1;
        setTimeout(() => {
            milestoneFeedback.style.opacity = 0;
        }, 3000); // Feedback fades out after 3 seconds
    }

    // Fonction pour sauvegarder l'état dans localStorage
    function saveState() {
        // Sauvegarder les cases ouvertes
        const openedDays = [...document.querySelectorAll('.day.opened')].map(day =>
            parseInt(day.getAttribute('data-day'), 10)
        );
        console.log('// the days saved are: ' +openedDays );
        localStorage.setItem('openedDays', JSON.stringify(openedDays));
        
        
        // Sauvegarder la progression
        localStorage.setItem('progress', progress);

        // Sauvegarder les milestones débloqués
        localStorage.setItem('unlockedMilestones', JSON.stringify([...unlockedMilestones]));
        }
        
    // Fonction pour restaurer l'état à partir de localStorage
    function restoreState() {
        // Restaurer les cases ouvertes
        const openedDays = JSON.parse(localStorage.getItem('openedDays')) || [];
        openedDays.forEach(dayNumber => {
            const dayElement = document.querySelector(`.day[data-day="${dayNumber}"]`);
            if (dayElement) {
                dayElement.classList.add('opened');
            }
        });
        openedDays_number = openedDays.length;
        
        // Restaurer la progression
        const savedProgress = parseInt(localStorage.getItem('progress'), 10);
        if (!isNaN(savedProgress)) {
            progress = savedProgress;
            document.getElementById('reward-bar').style.width = progress + '%';
        }

        // Restaurer les milestones débloqués
        const savedMilestones = JSON.parse(localStorage.getItem('unlockedMilestones')) || [];
        savedMilestones.forEach(milestone => {
            unlockedMilestones.add(milestone);
            const index = milestones.indexOf(milestone);
            if (index !== -1) {
                milestoneElements[index].classList.add('unlocked');
                milestoneImagesElements[index].src = milestoneImages[index]; // Restaurer les images des milestones
            }
        });
    }


    // Question and answer for each day
    const qaData = {
        1: { question: "Quel joueur détient le record de titres en Grand Chelem masculin ?", answer: "Novak Djokovic" },
        2: { question: "Sur quelle surface se joue le tournoi de Roland-Garros ?", answer: "Terre battue" },
        3: { question: "Combien de tournois du Grand Chelem y a-t-il chaque année ?", answer: "4" },
        4: { question: "Quelle joueuse française a remporté Roland-Garros en 2000 ?", answer: "Mary Pierce" },
        5: { question: "Quel est le surnom de Rafael Nadal ?", answer: "Le roi de la terre battue" },
        6: { question: "Dans quel pays se déroule le tournoi de Wimbledon ?", answer: "Royaume-Uni" },
        7: { question: "Quel tournoi du Grand Chelem est le plus récent dans le calendrier annuel ?", answer: "US Open" },
        8: { question: "Comment appelle-t-on un score de 40-40 dans un jeu de tennis ?", answer: "Égalité" },
        9: { question: "Combien de sets un joueur doit-il gagner pour remporter un match en Grand Chelem masculin ?", answer: "3" },
        10: { question: "Quelle joueuse détient le record de titres en Grand Chelem féminin ?", answer: "Margaret Court" },
        11: { question: "Quel tournoi est surnommé 'la quinzaine' ?", answer: "Roland-Garros" },
        12: { question: "Comment appelle-t-on un service non retourné par l'adversaire ?", answer: "Ace" },
        13: { question: "Quel joueur suisse est considéré comme l'un des plus grands joueurs de tennis ?", answer: "Roger Federer" },
        14: { question: "Quel est le pays d'origine de Novak Djokovic ?", answer: "Serbie" },
        15: { question: "Qui est le plus jeune vainqueur de Roland-Garros masculin ?", answer: "Michael Chang" },
        16: { question: "Quelle couleur est associée aux balles de tennis modernes ?", answer: "Jaune" },
        17: { question: "Quel joueur français a été finaliste à Roland-Garros en 1983 ?", answer: "Yannick Noah" },
        18: { question: "Comment appelle-t-on une balle qui touche la ligne de délimitation du court ?", answer: "Bonne" },
        19: { question: "Quelle compétition oppose chaque année des équipes nationales masculines de tennis ?", answer: "Coupe Davis" },
        20: { question: "Quelle compétition féminine est l'équivalent de la Coupe Davis ?", answer: "Coupe Billie Jean King" },
        21: { question: "Quel tournoi du Grand Chelem a lieu en Australie ?", answer: "Open d'Australie" },
        22: { question: "Quel est le surnom de la finale du Masters de tennis masculin ?", answer: "ATP Finals" },
        23: { question: "Quelle est la durée maximale d’un tie-break classique ?", answer: "7 points avec 2 d'écart" },
        24: { question: "Qui a remporté Roland-Garros en 2023 (hommes) ?", answer: "Novak Djokovic" }
        
    };

    let currentDay = null; // Track the current day being answered

    // Handle click on cases
    const days = document.querySelectorAll(".day");

    days.forEach(day => {
        day.addEventListener("click", () => {
            
            const dayNumber = parseInt(day.getAttribute("data-day"), 10);
            console.log('// We click on the day: ' + dayNumber );
            // Check if the case can be opened based on today's date
            if (dayNumber > today) {
                console.log('this day is too early ' );
                questionElement.textContent = `Vous ne pouvez pas ouvrir le jour ${dayNumber} avant le jour actuel ${today}.`;
                return;
            }

            // Check if the case is already opened or locked
            if (day.classList.contains("opened") || day.classList.contains("locked")) {
                questionElement.textContent = `Jour ${dayNumber} est déjà traité.`;
                return;
            }

            // Reset all other days (remove clicked and opened states)
            days.forEach(otherDay => {
                if (otherDay !== day) {
                    otherDay.classList.remove('clicked');
                }
            });

            // If the case isn't opened yet, mark it as clicked
            if (!day.classList.contains('opened')) {
                console.log('this is not open');
                day.classList.add('clicked');
            }

            // Display the question
            currentDay = dayNumber;
            const qa = qaData[dayNumber];

            if (qa) {
                questionElement.textContent = `Question : ${qa.question}`;
                userAnswerInput.value = ""; // Clear previous input
                feedbackElement.textContent = ""; // Clear feedback
            } else {
                questionElement.textContent = `Question pour le jour ${dayNumber} : Non disponible.`;
            }

             // Scroll to the question section
            questionElement.scrollIntoView({
                behavior: "smooth", // Smooth scrolling animation
                block: "start"     // Align to the top of the section
            });
        });
    });

    // Handle answer submission
    submitAnswerButton.addEventListener("click", () => {
        if (currentDay === null) {
            feedbackElement.textContent = "Cliquez sur une case pour répondre à une question !";
            return;
        }

        const userAnswer = userAnswerInput.value.trim();
        const correctAnswer = qaData[currentDay]?.answer;

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            // Correct answer
            feedbackElement.textContent = "Bonne réponse ! Point ajouté.";
            feedbackElement.style.color = "green";

            // Add progress if the case is not already marked as opened
            const dayElement = document.querySelector(`.day[data-day="${currentDay}"]`);
            if (!dayElement.classList.contains("opened")) {
                dayElement.classList.add("opened");
                openedDays_number++;
                
                // Update reward bar
                updateRewardBar();
            }

            currentDay = null; // Reset current day
        } else {
            // Incorrect answer
            feedbackElement.textContent = "Mauvaise réponse. Essayez encore.";
            feedbackElement.style.color = "red";
        }
    });

    restoreState();

    function resetCalendar() {
        // Clear localStorage
        localStorage.removeItem('openedDays');
        localStorage.removeItem('progress');
        localStorage.removeItem('unlockedMilestones');
    
        // Reset progress bar
        const rewardBar = document.getElementById('reward-bar');
        rewardBar.style.width = '0%';
        
        // Reset milestones
        milestoneElements.forEach((milestone, index) => {
            milestone.classList.remove('unlocked');
            milestoneImagesElements[index].src = 'gift.png'; // Reset to initial image
        });
    
        // Reset days (cases)
        const dayElements = document.querySelectorAll('.day');
        dayElements.forEach(day => {
            day.classList.remove('opened', 'clicked');
        });
    
        // Reset variables
        progress = 0;
        openedDays_number = 0
        unlockedMilestones.clear();
    
        // Clear feedback messages
        const milestoneFeedback = document.getElementById('milestone-feedback');
        milestoneFeedback.textContent = '';
        const questionElement = document.getElementById('question');
        if (questionElement) questionElement.textContent = '';
    }

    document.getElementById('reset-button').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset everything?')) {
            resetCalendar();
        }
    });
    
    
});
