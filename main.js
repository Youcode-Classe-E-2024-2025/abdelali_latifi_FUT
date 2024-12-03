const players = document.getElementById('players');
const addplayer = document.querySelectorAll('.emptycard');
const pop_up = document.getElementById('pop_up');
const EXITE = document.getElementById('EXITE');
const SHOW_ALL_PLAYERS = document.getElementById('SHOW_ALL_PLAYERS'); 
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
        const previousPlayerName = selectedCard.querySelector('.player_name_selected');
        if (previousPlayerName) {
            const index = selectedPlayers.indexOf(previousPlayerName);
            if (index !== -1) {
                selectedPlayers.splice(index, 1); 
            }
        }   
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
                <div class="player_position_selected">${player.position}</div>` ;
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

function displayallplayers() {
    players.innerHTML = "";

    stars.players.forEach((player, index) => {
        const showallplayers = document.createElement('div');
        showallplayers.classList.add('card');

        if (player.position !== 'GK'){
        showallplayers.innerHTML = `
            <div class="buttons">
                <button class="edite" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            </div>
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
            </div>
        `;}
        else{
            showallplayers.innerHTML = `
            <div class="buttons">
                <button class="edite" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            </div>
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
            </div>
        `;
        }

        players.appendChild(showallplayers);

        const editBtn = showallplayers.querySelector('.edite');
        editBtn.addEventListener('click', () => {
            editPlayer(player, showallplayers);
        });

        const deleteBtn = showallplayers.querySelector('.delete');
        deleteBtn.addEventListener('click', () => {
            deletePlayer(index);
        });
    });
}

function editPlayer(player, cardElement) {
    const formHtml = `
        <div class="edit_form">
            <label>Nom : <input type="text" value="${player.name}" id="edit_name"></label><br>
            <label>PST : <input type="text" value="${player.position}" id="edit_position"></label><br>
            <label>CLB : <input type="text" value="${player.club}" id="edit_club"></label><br>
            <label>PSS : <input type="number" value="${player.passing}" id="edit_passing"></label><br>
            <label>PAC : <input type="number" value="${player.pace}" id="edit_pace"></label><br>
            <button id="save"> save </button>
            <button id="cancel">cancel</button>
        </div>
    `;

    cardElement.innerHTML = formHtml;

    const saveBtn = cardElement.querySelector('#save');
    saveBtn.addEventListener('click', () => {
        const editedName = cardElement.querySelector('#edit_name').value;
        const editedPosition = cardElement.querySelector('#edit_position').value;
        const editedClub = cardElement.querySelector('#edit_club').value;
        const editedPassing = parseInt(cardElement.querySelector('#edit_passing').value, 10);
        const editedPace = parseInt(cardElement.querySelector('#edit_pace').value, 10);

        player.name = editedName;
        player.position = editedPosition;
        player.club = editedClub;
        player.passing = editedPassing;
        player.pace = editedPace;

        displayallplayers();
    });

    const cancelBtn = cardElement.querySelector('#cancel');
    cancelBtn.addEventListener('click', () => {
        displayallplayers();
    });
}

function deletePlayer(index) {
    stars.players.splice(index, 1); 
    displayallplayers(); 
}

SHOW_ALL_PLAYERS.addEventListener('click', () => {
    displayallplayers();
    pop_up.style.display = 'block';
});

const addnewplayer = document.getElementById('addnewplayer');

addnewplayer.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const nationality = document.getElementById('nationality').value;
    const club = document.getElementById('club').value;
    const pace = document.getElementById('pace').value;
    const shooting = document.getElementById('shooting').value;
    const passing = document.getElementById('passing').value;
    const dribbling = document.getElementById('dribling').value;
    const defending = document.getElementById('definding').value;
    const physical = document.getElementById('physical').value;
    const position = document.getElementById('post').value;

    if (!name || !image || !club) {
        alert("Please fill in all required fields");
        return;
    }
    const playerexists = stars.players.some(player => player.name.toLowerCase() === name.toLowerCase());

    if (playerexists) {
        alert("A player with this name already exists.");
        return;
    }

    const newplayer = {
        name,
        photo: image,
        club,
        pace,
        shooting,
        passing,
        dribbling,
        defending,
        physical,
        position,
        flag: nationality,
    };

    stars.players.push(newplayer);
    displayallplayers(); 
    alert("Player added successfully!");
    document.getElementById('form').reset();    
});


