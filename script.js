let mensagens = [];
let nome;
let ultimo = '';
let penultimo = '';

function showSidebar(iconesidebar){
    const show = document.querySelector(".sidebar").parentNode
    show.classList.remove("hidden")
    searchPeople()
}

function hiddenSidebar(divsidebar){
    const hidden = document.querySelector(".sidebar").parentNode
    hidden.classList.add("hidden")

}

function SearchMessage(){
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then( function (response){
        let mensagens = response.data;
        WriteMenssageHTML(mensagens);
        scroll();
    });
    
}

function typeOfMessage(typeMessage){
    if (typeMessage == 'message'){
        return 'normal'
    }
    if (typeMessage == 'status'){
        return 'status'
    }
    if (typeMessage == 'private_message'){
        return 'private'
    }
}

function AtualizarMensagens(){
    setInterval(Connection, 5000);
    setInterval(SearchMessage, 3000);
    setInterval(searchPeople, 5000);
}

function WriteMenssageHTML(mensagens) {
    let containerMessager = document.querySelector(".container-menssage");
    containerMessager.innerHTML = ' ';
    
    for (let i = 0; i < mensagens.length; i++){
        let typeMessage = mensagens[i].type;
        if (typeMessage === 'private_message' && (mensagens[i].to === nome || mensagens[i].from === nome)){
            containerMessager.innerHTML +=  `
            <div class="menssage ${typeOfMessage(typeMessage)}">
                <p> <span> (${mensagens[i].time})</span> <strong>${mensagens[i].from}</strong> (Reservadamente) para <strong>${mensagens[i].to}</strong> : ${mensagens[i].text} </p>
            </div>`
        }
        if (typeMessage === 'message' || typeMessage === 'status'){
            containerMessager.innerHTML +=  `
            <div class="menssage ${typeOfMessage(typeMessage)}">
                <p> <span> (${mensagens[i].time})</span> <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> : ${mensagens[i].text} </p>
            </div>`
        }
    }
}

function logIn() {
    nome = document.querySelector(".initial input").value;
    const primeira = document.querySelector(".initial");
    const segunda = document.querySelector(".loading");

    let promise2 = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {
        name: `${nome}`
      })

    promise2.then(function(){
        primeira.classList.add("hidden");
        segunda.classList.remove("hidden");
        AtualizarMensagens();
        setTimeout(removeloading, 3000)
    });
    promise2.catch(dealWithError);
}

function removeloading() {
    const loginparentnode = document.querySelector(".login").parentNode;
    loginparentnode.classList.add("hidden");
}

function dealWithError(){
    document.querySelector(".initial").innerHTML += `<p class="erro-login"> Erro ! Já existe alguem com o mesmo nome, tente com outro nome. </p>`;
    
}

function Connection(){
    nome = document.querySelector(".initial input").value;
    let promise3 = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {
        name: `${nome}`
      });
    promise3.then(function (response){
        response.data;
    }) 
}

function sendMessage(){
    let envio = document.querySelector(".baseboard input").value;
    if (envio !== ""){
        let send = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", {
        from: `${nome}`,
        to: "Todos",
        text: `${envio}`,
        type: "message"
        })
        send.then(function (response){
            response.data;
            SearchMessage();
        })
        document.querySelector(".baseboard input").value = ''
        send.catch(ErrorMensage);
    }
}

function ErrorMensage(){
    alert("Usuário desconectado");
    window.location.reload();
}

function scroll() {
    const chat  = document.querySelector(".container-menssage");
    const ultimochat = chat.lastElementChild;
    ultimochat.scrollIntoView()
}

function enterlogin(event){
    const keyCode = event.which;
    if (keyCode == 13) {
      document.querySelector(".login button").click();
    }
}

function entermenssage(event){
    const Tecla = event.which;
    if (Tecla == 13){
        document.querySelector(".baseboard ion-icon").click();
    }
} 

function searchPeople(){
    let people = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    people.then(function(response){
        let online = response.data; 
        writeSideBar(online);

    })
}

function writeSideBar(online){
    let onlinePeople = document.querySelector(".online-people");
    onlinePeople.innerHTML = ' ';
    for (let i = 0; i < online.length; i++){
    onlinePeople.innerHTML +=  `
        <div class="display-flex">
             <ion-icon name="person-circle"></ion-icon>
             <h3> ${online[i].name} </h3>
        </div>
    
   `}

}