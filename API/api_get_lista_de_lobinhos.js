export async function listaDeLobos(pagina=1, limite=4, termoBusca, apenasAdotados) {
   
   try{
    let url =  `http://localhost:3000/lobinhos?_page=${pagina}&_limit=${limite}`
    if (termoBusca) {
        url += `&nome_like=${termoBusca}`;
        }
        if (apenasAdotados) {
        url += `&adotado=true`;
        }

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`)
        }
        const lobinhos = await response.json();
        const totalWolfs = response.headers.get('X-Total-Count')||0;
        return {
            listaLobos: lobinhos,
            totalItens: parseInt(totalWolfs),
            totalPaginas: Math.ceil(totalWolfs / limite)
        };
    } catch (error){
        console.error('Erro ao buscar lobinhos paginados:', error);
        throw error;
    }
}


export async function buscarLoboPorId(id){
    try{
        const response = await fetch(`http://localhost:3000/lobinhos/${id}`);
        if(!response.ok){
            throw new Error('Lobo não encontrado');
        }
        return await response.json();
    }catch (error){
        console.error('Erro ao buscar lobo:', error);
        throw error;
    }
}