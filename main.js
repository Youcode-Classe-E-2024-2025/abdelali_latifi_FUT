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







