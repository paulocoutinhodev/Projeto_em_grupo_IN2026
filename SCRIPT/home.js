import { listaDeLobos } from "../API/api_get_lista_de_lobinhos.js";

// Variável HTML(NodeList) com os cards dos lobinhos 
const cards = document.querySelectorAll('.wolf-card');


// Função para gerar um número inteiro aleatório em um intervalo dado
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function startHomePage() {
    try {
        const basePages = await listaDeLobos(
            1,
            2,
            '',
            false
        );
            
        let randomPage = randomNumber(1, basePages.totalPaginas);

        const result = await listaDeLobos(
            randomPage,
            2,
            '',
            false
        );

        renderExampleLobos(cards, result.listaLobos);

    } catch (error) {
        console.error('Erro ao buscar lobinhos para Exemplos na Home Page.', error);
        throw error;
    }
}

function renderExampleLobos(cards, lobos) {
    cards.forEach((card, index) => {
        card.innerHTML = `<div class="wolf-image">
                            <div></div>
                            <img src="${lobos[index].imagem}" alt="Exemplo de Lobo ${index + 1}">
                        </div>
                        
                        <div class="wolf-info">
                            <div>
                                <h3 class="sub-subtitle">${lobos[index].nome}</h3>
                                <p><span>Idade: ${lobos[index].idade} anos</span></p>
                            </div>

                            <p class="paragraph">
                                ${lobos[index].descricao}
                            </p>
                        </div>`;
    });
}

startHomePage()

