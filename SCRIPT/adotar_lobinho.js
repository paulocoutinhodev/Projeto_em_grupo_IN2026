import { buscarLoboPorId } from "../API/api_get_lista_de_lobinhos.js";
import {atualizarLobinhoParcial} from "../API/api_patch_adotar_lobinho.js";

const imgLobo = document.querySelector('.divfoto img')
const nomeLoboTexto = document.querySelector('.divmensagem_adote')
const idLoboTexto = document.querySelector('.divmensagem_id')
const nomeDonoAdotar = document.getElementById('nome')
const idadeDonoAdotar = document.getElementById('idade')
const emailDonoAdotar = document.getElementById('email')



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


const FormAdoptation = document.getElementById('formAdopt');
    FormAdoptation.addEventListener('submit',async(e) => {
        e.preventDefault();
        try{
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            
            await atualizarLobinhoParcial(id,nomeDonoAdotar.value,idadeDonoAdotar.value,emailDonoAdotar.value);
            window.location.href="lista_de_lobinhos.html";
            alert("Dono " + nomeDonoAdotar.value + " adicionado com sucesso!");
            
        }
        catch(error){
            console.error(error);
            alert("Erro ao adotar");
        }
    })
