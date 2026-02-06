import { buscarLoboPorId } from "../API/api_get_lista_de_lobinhos.js";

const imgLobo = document.querySelector('.divfoto img')
const nomeLoboTexto = document.querySelector('.divmensagem_adote')
const idLoboTexto = document.querySelector('.divmensagem_id')

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
            nomeLoboTexto.textContent = `Adote o(a) ${lobo.nome}`;
            idLoboTexto.textContent = `id:${lobo.id}`
            imgLobo.src = lobo.imagem;
            imgLobo.alt = `Foto do lobo${lobo.nome}`;
        }
    } catch (error) {       
        console.error("Erro ao carregar lobo:", error);
        nomeLoboTexto.textContent = "Erro ao carregar informações.";
    }

}
carregarLobo();