import { buscarLoboPorId } from "../API/api_get_lista_de_lobinhos.js";

const imgLobo = document.querySelector('.wolf-image img')
const nomeLoboTexto = document.querySelector('.title')
const idLoboTexto = document.querySelectorAll('.paragraph')
const adoptionDiv = document.getElementById('botoes');

async function carregarLobo() {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            console.error("Nenhum ID fornecido na URL");
            return;
        }
        const lobo = await buscarLoboPorId(id);

        if(lobo){
            nomeLoboTexto.textContent = `${lobo.nome}`;
            idLoboTexto.textContent = `${lobo.descricao}`
            imgLobo.src = lobo.imagem;
            imgLobo.alt = `Foto do lobo${lobo.nome}`;
            const linkDestino = `adotar_lobinho.html?id=${lobo.id}`;
            adoptionDiv.innerHTML += `
             <a href = "${linkDestino}" id="destiny">
                    <button class = "btn-adopt">ADOTAR</button>
            </a>`;
        }
            
    } catch (error) {       
        console.error("Erro ao carregar lobo:", error);
        nomeLoboTexto.textContent = "Erro ao carregar informações.";
    }

}
carregarLobo();

