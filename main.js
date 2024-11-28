const players = document.getElementById('players');
const addplayer = document.querySelectorAll('.emptycard');
const pop_up = document.getElementById('pop_up');
const EXITE = document.getElementById('EXITE');

fetch('/players.json')
    .then(Response => {
        if(!Response.ok) {
            throw new Error('Erreur de chargement de JSON');
        } 
    return Response.json();
    } )

  .then (data => {
      stars = data;
      console.log(stars);
})
.catch(erreur => {
    console.error('Erreur:', erreur);
})

function displayplayers(){
    players.innerHTML = "";
    stars.players.forEach( player => {
    const showplayers = document.createElement('div');
    
    if (player.position !== 'GK'){
    showplayers.innerHTML = `
    <div id="showplayer" class="card">
        <div class = player_name>${player.name}</div>
        <div class="firt_part">
        <div>
        <div>${player.position}</div><br>
        <div>${player.nationality}</div><br>
        <img class ='flag' src="${player.flag}" alt=""><br>
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
    `
    }
    else{
        
        showplayers.innerHTML = `
 <div id="showplayer" class="card">
        <div class = player_name>${player.name}</div>
        <div class="firt_part">
        <div>
        <div>${player.position}</div><br>
        <div>${player.nationality}</div><br>
        <img class ='flag' src="${player.flag}" alt=""><br>
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
    `
    }
       players.appendChild(showplayers);
    
});

}
addplayer.forEach(Element => {
    Element.addEventListener("click", ()=>{
        pop_up.style.display ='block';
        displayplayers() ;
    })
})

EXITE.addEventListener('click', ()=>{
    pop_up.style.display ='none';

})


