export async function excluirLobo(id) {
    try {
        const response = await fetch(`http://localhost:3000/lobinhos/${id}`,{
            method:'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        if(!response.ok){
            throw new Error('Lobo não excluído');
        }
        
    }catch (error){
        console.error('Erro ao excluir lobo:', error);
        throw error;
    }
        
}