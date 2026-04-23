const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonTierra = document.getElementById("boton-tierra")
const botonReiniciar = document.getElementById("reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquedelJugador = document.getElementById("ataque-del-Jugador")
const ataquedelEnemigo = document.getElementById("ataque-del-Enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let mascotaJugador
let inputHipodoge
let inputCapipepo
let inputRatigueya
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 3)
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 3)
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 3)

hipodoge.ataques.push(
    {nombre: "💧", id:"boton-agua"},
    {nombre: "💧", id:"boton-agua"},
    {nombre: "💧", id:"boton-agua"},
    {nombre: "🔥", id:"boton-fuego"},
    {nombre: "🍀", id:"boton-tierra"},
)

capipepo.ataques.push(
    {nombre: "🍀", id:"boton-tierra"},
    {nombre: "🍀", id:"boton-tierra"},
    {nombre: "🍀", id:"boton-tierra"},
    {nombre: "💧", id:"boton-agua"},
    {nombre: "🔥", id:"boton-fuego"},
)

ratigueya.ataques.push(
    {nombre: "🔥", id:"boton-fuego"},
    {nombre: "🔥", id:"boton-fuego"},
    {nombre: "🔥", id:"boton-fuego"},
    {nombre: "💧", id:"boton-agua"},
    {nombre: "🍀", id:"boton-tierra"},
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {

    mokepones.forEach((mokepon) =>{
        opcionDeMokepones = `
        <input type="radio" name="mascota" id= ${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for= ${mokepon.nombre}>
            <p> ${mokepon.nombre}</p>
            <img src= ${mokepon.foto} alt= ${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })
    
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    botonReiniciar.addEventListener("click", reiniciarJuego)

}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = "none"   
    sectionSeleccionarAtaque.style.display = "flex"

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("Selecciona una mascota")
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(0,mokepones.length -1) 

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    
}

function ataqueFuego(){
    ataqueJugador = "Fuego"
    ataqueAleatorioEnemigo()
}

function ataqueAgua(){
    ataqueJugador = "Agua"
    ataqueAleatorioEnemigo()
}

function ataqueTierra(){
    ataqueJugador = "Tierra"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)

    if(ataqueAleatorio == 1){
        ataqueEnemigo = "Fuego"
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = "Agua"
    } else {
        ataqueEnemigo = "Tierra"
    }

    combate()
}

function combate(){
    
     if (ataqueEnemigo == ataqueJugador){
            crearMensaje("EMPATE")
        } else if(ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra"){
            crearMensaje("GANASTE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        } else if(ataqueJugador == "Agua" && ataqueEnemigo == "Fuego"){
            crearMensaje("GANASTE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }else if(ataqueJugador == "Tierra" && ataqueEnemigo == "Agua"){
            crearMensaje("GANASTE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        } else {
            crearMensaje("PERDISTE")
            vidasJugador--
            spanVidasJugador.innerHTML = vidasJugador
        }

        revisarvidas()
    }

function revisarvidas(){
    if(vidasEnemigo == 0){
        crearMensajeFinal("FELICIDADES GANASTE 🎉")
    } else if (vidasJugador == 0){
        crearMensajeFinal("LO SIENTO, PERDISTE 😢")
    }
}

function crearMensaje(resultado){   
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")
    
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataquedelJugador.appendChild(nuevoAtaqueJugador)
    ataquedelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoVidas){
    sectionMensajes.innerHTML = resultadoVidas   
    botonFuego.disabled = true  
    botonAgua.disabled = true  
    botonTierra.disabled = true   
    sectionReiniciar.style.display = "block"
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}

window.addEventListener('load', iniciarJuego)