import { buscarLoboPorId } from "../API/api_get_lista_de_lobinhos.js";
import { excluirLobo } from "../API/api_delete_show_lobinho.js";

const imgLobo = document.querySelector('.wolf-image img')
const nomeLoboTexto = document.querySelector('.title')
const idLoboTexto = document.querySelector('.paragraph')
const adoptionDiv = document.getElementById('botoes');
const bttnAdopt = document.getElementById('adoption-bttn');
const bttnExclude = document.getElementById('exclude-bttn')


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
        }
    } catch (error) {       
        console.error("Erro ao carregar lobo:", error);
        nomeLoboTexto.textContent = "Erro ao carregar informações.";
    }

}
carregarLobo();
bttnExclude.addEventListener('click', async () => {
                try {
                    const params = new URLSearchParams(window.location.search);
                    const id = params.get('id');
                    await excluirLobo(id);
                    window.location.href="lista_de_lobinhos.html";
                    alert("Lobo excluído com sucesso!");

                } catch (error) {
                    alert("Erro ao excluir")
                }                
});

bttnAdopt.addEventListener('click', async () => {
                try {
                    const params = new URLSearchParams(window.location.search);
                    const id = params.get('id');
                    window.location.href=`adotar_lobinho.html?id=${id}`;

                } catch (error) {
                    alert("Erro ao ir para página de adotar")
                }                
});

