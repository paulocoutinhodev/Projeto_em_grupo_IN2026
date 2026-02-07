import { buscarLoboPorId } from "../API/api_get_lista_de_lobinhos.js";
import { excluirLobo } from "../API/api_delete_show_lobinho.js";

const imgLobo = document.querySelector('.wolf-image img')
const nomeLoboTexto = document.querySelector('.title')
const idLoboTexto = document.querySelector('.paragraph')
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
            const adoptButton = `
             <a href = "${linkDestino}" id="destiny">
                    <button class = "btn-adopt">ADOTAR</button>
            </a>`;
            const deleteButton = `<button id="btn-excluir" class="btn-delete">Excluir</button>`;

            adoptionDiv.innerHTML = adoptButton + deleteButton;

            const btnDeletWolf = document.getElementById('btn-excluir');
            btnDeletWolf.addEventListener('click', async () => {
                try {
                    await excluirLobo(id);
                    window.location.href="lista_de_lobinhos.html";
                    alert("Lobo excluído com sucesso!");

                } catch (error) {
                    alert("Erro ao excluir")
                }                
            });
        }
    } catch (error) {       
        console.error("Erro ao carregar lobo:", error);
        nomeLoboTexto.textContent = "Erro ao carregar informações.";
    }

}
carregarLobo();

