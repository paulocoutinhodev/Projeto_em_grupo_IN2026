 export async function atualizarLobinhoParcial(id, nome, idade, email){

  const dadosParciais = {
    adotado: true,
    nomeDono: nome,
    idadeDono: idade,
    emailDono: email
  };

  try{
    const response = await fetch(`http://localhost:3000/lobinhos/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosParciais)
    });

    if(!response.ok){
      throw new Error(`Erro http! Status: ${response.status}`);
  }
  const atualizado = await response.json();
  alert('Lobinho atualizado: ',atualizado)
  return atualizado;
  }
  
  catch(error){
    console.error(`Erro ao atualizar o lobinho: `,error);
    throw error;
  }
 }