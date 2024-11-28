const players = document.getElementById('players');
const addplayer = document.querySelectorAll('.emptycard');
const pop_up = document.getElementById('pop_up');
const EXITE = document.getElementById('EXITE');
let stars = [];
let selectedPlayers = [];

fetch('/players.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de chargement de JSON');
        }
        return response.json();
    })
    .then(data => {
        stars = data;
        console.log(stars);
    })
    .catch(erreur => {
        console.error('Erreur:', erreur);
    });

function displayplayers(position) {
    players.innerHTML = ""; 

    const filteredPlayers = stars.players.filter(player => {
        if (selectedPlayers.includes(player.name)) return false; 
        if (position === "CM/CDM") {
            return player.position === "CM" || player.position === "CDM";
        }
        return player.position === position;
    });

    filteredPlayers.forEach(player => {
        const showplayers = document.createElement('div');
        showplayers.classList.add('card');

        if (player.position !== 'GK') {
            showplayers.innerHTML = `
                <div class="player_name">${player.name}</div>
                <div class="firt_part">
                    <div>
                        <div>${player.position}</div><br>
                        <img class='flag' src="${player.flag}" alt=""><br><br>
                        <div>${player.club}</div>
                    </div>
                    <div class="player_img">
                        <img class='playerphoto' src="${player.photo}" alt="">
                    </div>
                </div>
                <div class="second_part">
                    <div>
                        <span>passing: ${player.passing}</span><br><br>
                        <span>pace: ${player.pace}</span><br><br>
                        <span>shooting: ${player.shooting}</span>
                    </div>
                    <div>
                        <span>dribbling: ${player.dribbling}</span><br><br>
                        <span>defending: ${player.defending}</span><br><br>
                        <span>physical: ${player.physical}</span>
                    </div>
                </div>`;
        } else {
            showplayers.innerHTML = `
                <div class="player_name">${player.name}</div>
                <div class="firt_part">
                    <div>
                        <div>${player.position}</div><br>
                        <img class='flag' src="${player.flag}" alt=""><br><br>
                        <div>${player.club}</div>
                    </div>
                    <div class="player_img">
                        <img class='playerphoto' src="${player.photo}" alt="">
                    </div>
                </div>
                <div class="second_part">
                    <div>
                        <span>diving: ${player.diving}</span><br><br>
                        <span>handling: ${player.handling}</span><br><br>
                        <span>kicking: ${player.kicking}</span>
                    </div>
                    <div>
                        <span>reflexes: ${player.reflexes}</span><br><br>
                        <span>speed: ${player.speed}</span><br><br>
                        <span>positioning: ${player.positioning}</span>
                    </div>
                </div>`;
        }

        players.appendChild(showplayers);

        showplayers.addEventListener('click', () => {
            chooseplayer(player);
        });
    });
}

function chooseplayer(player) {
    const selectedCard = document.querySelector('.emptycard.selected');
    if (selectedCard) {
        if (player.position !== 'GK') {
            selectedCard.innerHTML = `
                <div class="player_card_selected">
                    <div class="player_name_selected">${player.name}</div>
                    <img class="playerphoto_selected" src="${player.photo}" alt="">
                </div>
                <div class="second_part_selected">
                    <div>
                        <span>passing: ${player.passing}</span><br><br>
                        <span>pace: ${player.pace}</span><br><br>
                        <span>shooting: ${player.shooting}</span>
                    </div>
                    <div>
                        <span>dribbling: ${player.dribbling}</span><br><br>
                        <span>defending: ${player.defending}</span><br><br>
                        <span>physical: ${player.physical}</span>
                    </div>
                </div>
                <div>
                    <img class='flag' src="${player.flag}" alt="">
                    <span class="player_position_selected">${player.club}</span>
                </div>
                <div class="player_position_selected">${player.position}</div>`;
        } else {
            selectedCard.innerHTML = `
                <div class="player_card_selected">
                    <div class="player_name_selected">${player.name}</div>
                    <img class="playerphoto_selected" src="${player.photo}" alt="">
                </div>
                <div class="second_part_selected">
                    <div>
                        <span>diving: ${player.diving}</span><br><br>
                        <span>handling: ${player.handling}</span><br><br>
                        <span>kicking: ${player.kicking}</span>
                    </div>
                    <div>
                        <span>reflexes: ${player.reflexes}</span><br><br>
                        <span>speed: ${player.speed}</span><br><br>
                        <span>positioning: ${player.positioning}</span>
                    </div>
                </div>
                <div>
                    <img class='flag' src="${player.flag}" alt="">
                    <span class="player_position_selected">${player.club}</span>
                </div>
                <div class="player_position_selected">${player.position}</div>`;
        }
        selectedPlayers.push(player.name);
        pop_up.style.display = 'none';
    }
}

addplayer.forEach(element => {
    element.addEventListener("click", () => {
        addplayer.forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        const position = element.getAttribute('data-position'); 
        pop_up.style.display = 'block';
        displayplayers(position); 
    });
});

EXITE.addEventListener('click', () => {
    pop_up.style.display = 'none';
});

