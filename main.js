fetch('/players.json')
    .then(Response => {
        if(!Response.ok) {
            throw new Error('Erreur de chargement de JSON');
        } 
    return Response.json();
    } )

  .then (data => {
    console.log(data);
})
.catch(erreur => {
    console.error('Erreur:', erreur);
})

function displayplayers(){
const showplayers = document.createElement('div');
showplayers.innerHTML = `
 <div id="showplayer" class="card">
        <div class="firt_part">
        <div class="informations">
        <div>${position}</div>
        <div>${nationality}</div>
        <img src="${flag}" alt="">
        <div>${club}</div>
        <img src="${logo}" alt="">
        </div>
        <div class="player_img">
            <img src="${photo}" alt="">
        </div>
        </div>
        <div class="second_part">
            <div>
                <div>"rating": ${rating}</div><br>
                <div>"pace": ${pace}</div><br>
                <div>  "shooting": ${shooting}</div><br>
            </div>
            <div>
                <div>"passing": ${passing}</div><br>
                <div>"dribbling": ${dribbling}</div><br>
                <div>"defending": ${defending}</div><br>
                 <div>"physical": ${physical}</div>

            </div>

        </div>
`
document.getElementById('player').appendChild(showplayers) 
}





