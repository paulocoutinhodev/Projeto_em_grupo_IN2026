import { listaDeLobos } from "../API/api_get_lista_de_lobinhos.js";

const pageStatus = {
    pagina: 1,
    limite: 4,
    busca: '',
    adotados: false
};
const listaElement = document.getElementById('lista-lobos');
const paginationElement = document.getElementById('pagination');
const inputSearchButton= document.getElementById('search-paw');
const inputSearch = document.getElementById('bar')
const inputCheck = document.getElementById('check');
const inputBar = document.getElementById('error-case')


async function startPage() {
    try {
        const result = await listaDeLobos(
            pageStatus.pagina,
            pageStatus.limite,
            pageStatus.busca,
            pageStatus.adotados
        );
    renderList(result.listaLobos)
    renderPage(result.totalPaginas)        
    } catch (error) {
       inputBar.innerHTML = "<p>Nenhum lobinho encontrado.</p>";
    }
}

function renderList(Wolfs) {
    listaElement.innerHTML="";
    if (!Wolfs||Wolfs.length === 0) {
        inputBar.innerHTML = "<p>Nenhum lobinho encontrado.</p>";
    }
    else{inputBar.innerHTML = ""}    
    Wolfs.forEach((lobo,index) => {
        const par = (index) % 2 === 0
        const linkDestino = lobo.adotado ? "#" : `show_lobinho.html?id=${lobo.id}`
        const htmlButton = `
        <a href = "${linkDestino}" id="destination">
            <button class="wolf-adopt-button ${lobo.adotado ? 'adotado' : ''}">${lobo.adotado ? 'Adotado' : 'Adotar'}
            </button>
        </a>`
        let html = ""

        if (!lobo.adotado) {
            if (par) {
                html =`
                <li class="wolf-list-item"> 
                    <div class="square"><img src="${lobo.imagem}" class="wolf-img"></div>
                    <div class="wolf-info"> 
                        <div class="wolf-name-button">
                            <div class="wolf-title-age"> 
                                <h2>${lobo.nome}</h2>
                                <p>Idade: ${lobo.idade} anos</p> 
                            </div>
                            ${htmlButton}
                        </div>
                        <p class="description-text">${lobo.descricao}</p>
                    </div>
                </li>`;
            }
            
            else {
                html = `
                <li class="wolf-list-item"> 
                    <div class="wolf-info"> 
                        <div class="wolf-name-button">
                            ${htmlButton}
                            <div class="wolf-title-age"> 
                                <h2>${lobo.nome}</h2>
                                <p>Idade: ${lobo.idade} anos</p> 
                            </div>
                        </div>
                        <p class="description-text">${lobo.descricao}</p>
                    </div>
                    <div class="square"><img src="${lobo.imagem}" class="wolf-img-right"></div>
                </li>`;
            }

        } else {
            
            if (par) {
                html =`
                <li class="wolf-list-item"> 
                    <div class="square"><img src="${lobo.imagem}" class="wolf-img"></div>
                    
                    <div class="wolf-info"> 
                        <div class="wolf-name-button">
                            <div class="wolf-title-age"> 
                                <h2>${lobo.nome}</h2>
                                <p>Idade: ${lobo.idade} anos</p> 
                            </div>
                            ${htmlButton}
                        </div>
                        <p class="description-text">${lobo.descricao}</p>
                        
                        <p class="owner-text">Adotado por: ${lobo.nomeDono}</p>
                    
                    </div>
                
                </li>`;
            }
            
            else {
                html = `
                <li class="wolf-list-item"> 
                    <div class="wolf-info"> 
                        <div class="wolf-name-button">
                            ${htmlButton}
                            <div class="wolf-title-age"> 
                                <h2>${lobo.nome}</h2>
                                <p>Idade: ${lobo.idade} anos</p> 
                            </div>
                        </div>
                        <p class="description-text">${lobo.descricao}</p>

                        <p class="owner-text">Adotado por: ${lobo.nomeDono}</p>
                    </div>
                    <div class="square"><img src="${lobo.imagem}" class="wolf-img-right"></div>
                </li>`;
            }
        }

        listaElement.innerHTML += html;
    });
}

function criarBotãoPaginacao(texto, onClick, desabilitado) {
    const btn = document.createElement('button');
    btn.innerText = texto;
    btn.className = 'pagination-button';
    btn.disabled = desabilitado;
    btn.addEventListener('click', onClick);
    paginationElement.appendChild(btn);
    return btn
}

function changePage(newPage) {
    pageStatus.pagina = newPage;
    startPage();
    document.querySelector('.search').scrollIntoView({behavior: "smooth"})
}

function renderPage(totalPaginas) {
    paginationElement.innerHTML = ""
    if (totalPaginas<=1) {return};
    
    criarBotãoPaginacao ("<",() => changePage(pageStatus.pagina - 1), pageStatus.pagina===1);
    let start = Math.max(1, pageStatus.pagina -2);
    let end = Math.min(totalPaginas, start + 4);
    if (end - start <4) { start = Math.max(1, end - 4)}

    for (let i = start; i <= end; i++) {
        const bttn = criarBotãoPaginacao(i, () => changePage(i), false)
        if (i === pageStatus.pagina) bttn.classList.add('active');       
    }
    criarBotãoPaginacao(">",() => changePage(pageStatus.pagina + 1), pageStatus.pagina===totalPaginas)
}

function pesquisaNome () {
    pageStatus.busca = inputSearch.value;
    pageStatus.pagina = 1;
    startPage();
}
inputSearchButton.addEventListener('click', () => {
    pesquisaNome();
});

inputSearch.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
        pesquisaNome()
    }
});  
inputCheck.addEventListener('change', (e) =>{
    pageStatus.adotados = e.target.checked;
    pageStatus.pagina = 1;
    startPage();
});

startPage();