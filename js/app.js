//variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//addevent listener
eventListeners();
function eventListeners(){
    //Cuando el usuario agrega un nuevo twwet
    formulario.addEventListener('submit', agregarTweet);
    //documento listo
    document.addEventListener('DOMContentLoaded',() =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
        
    });
}

//funciones
function agregarTweet(e){
    e.preventDefault();
    //Text area para escribir
    const tweet = document.querySelector('#tweet').value;
    //validacion
    if(tweet ===''){
        mostrarError('El mensaje no puede estar vacio');
        return;//evita qe se ejecuten mas lineas de codigo solo en un if dentro de una funcion
    }
    //añador al arreglo de tweets
    const tweetObj = {
        id: Date.now(),
        tweet // llave y valor son iguales solo se pasa uno
    }
    tweets = [...tweets,tweetObj];
    console.log(tweets);
    
    //CREARhtML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();

}
   //mostrar mensaje de error
function mostrarError(error){
   
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    
    //Elimina alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    },3000)

    
}
//muestra el listado de los tweets
function crearHTML(){
    limpiarHTML();

    if(tweets.length>0){
        tweets.forEach(tweet =>{
            //agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';
             //añadoir funcione de eliminar

            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }
            //crear HTML
            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            //asignar el btn
            li.appendChild(btnEliminar);
            //agregar en el html al lista tweets
            listaTweets.appendChild(li);
        })
    }
    sincronizarStorage();
}
//agregar a localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}
//eliminar
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    
}
//limpiar html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
