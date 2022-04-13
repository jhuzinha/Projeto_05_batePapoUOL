let mensagens = [];


function showSidebar(iconesidebar){
    let show = document.querySelector(".sidebar").parentNode
    show.classList.remove("hidden")
}

function hiddenSidebar(divsidebar){
    let hidden = document.querySelector(".sidebar").parentNode
    hidden.classList.add("hidden")
}

function SearchMessage(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then( function (response){
        let mensagens = response.data
        console.log(mensagens)
        WriteMenssageHTML(mensagens)
    });
}

// function FormatTime(timing){
    
// }

function typeOfMessage(typeMessage){
    if (typeMessage == 'status'){
        return 'status'
    }
    if (typeMessage == 'private_message'){
        return "private"
    }
    if (typeMessage == 'message'){
        return "normal"
    }
}


function WriteMenssageHTML(mensagens) {
    let containerMessager = document.querySelector(".container-menssage")
    for (let i = 0; i < mensagens.length; i++){
        let timing = Number(mensagens[i].time)
        let typeMessage = mensagens[i].type
        typeOfMessage(typeMessage) 

        containerMessager.innerHTML +=  `
        <div class="menssage ${typeMessage}">
            <p> <span> (${mensagens[i].time})</span> <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> : ${mensagens[i].text} </p>
        </div>`
    }
}

function logIn() {
    let nome = document.querySelector(".name input").value 
    
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {
        name: `${nome}`
      })
    let loginparentnode = document.querySelector(".login").parentNode
    promise.then(function(){
        SearchMessage()
        loginparentnode.classList.add("hidden")
    });

    promise.catch(dealWithError);
}

function dealWithError(){
    document.querySelector(".name").innerHTML += `<p> Erro ! Já existe alguem com o mesmo nome </p>`
}