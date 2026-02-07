
import {adicionar_lobinho} from "../API/api_post_adicionar_lobinho.js"

const formAdd = document.getElementById("form_adicionar_lobinho");

formAdd.addEventListener("submit", (e) => {
(e).preventDefault()

    
    const lobinho = {

        "nome":  e.target.elements.nome.value,
        "idade":  e.target.elements.anos.value,
        "descricao":  e.target.elements.descricao.value,
        "imagem":  e.target.elements.link_foto.value,
        "adotado": false,
        "nomeDono": null,
        "idadeDono": null,
        "emailDono": null
    }
    adicionar_lobinho(lobinho) 
    



})



