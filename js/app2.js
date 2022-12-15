const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const contenido = document.querySelector('#contenido');


let tweets = [];

addEventListener();
function addEventListener(){
    formulario.addEventListener('submit',agregarTweet);
    document.addEventListener('DOMContentLoaded',() =>{
        tweets = JSON.parse(localStorage.getItem('tweets')|| "");
        mostrarHTML();
    })



}

function agregarTweet(e){

    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    //validar
    if(!tweet){
        mostrarError('El texto no puede estar vacio');
        return;
    }
    tweetObj = {
        id : Date.now(),
        tweet
    }
    tweets = [...tweets, tweetObj]
    localStorage.setItem('tweets',JSON.stringify(tweets));
    formulario.reset();
    mostrarHTML();
    
}
function mostrarHTML(){
    limpiarHTML();
    tweets.forEach(tweet => {
        const li = document.createElement('li');
        li.textContent = tweet.tweet;
        listaTweets.appendChild(li);
        const btnEliminar = document.createElement('a');
        btnEliminar.textContent = 'X';
        btnEliminar.classList.add('borrar-tweet');
        li.appendChild(btnEliminar);

        btnEliminar.onclick = () =>{
            borrarTweet(tweet.id);
        };
    })
        
    
    
}
function mostrarError(error){
        const errordiv = document.querySelector('.errordiv') || '';
        console.log(errordiv);
        if(errordiv !== ''){
            
            while(errordiv.firstChild){
                errordiv.removeChild(errordiv.firstChild);
                
            }
            console.log(errordiv);  
            
            
        }
        
        const div = document.createElement('div');
        div.classList.add('errordiv');
        
        const error1 = document.createElement('p');

        error1.textContent = error;
        error1.classList.add('error');
        div.appendChild(error1)
        contenido.appendChild(div);
        
      

}
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    localStorage.setItem('tweets', JSON.stringify(tweets));
    mostrarHTML();

}

