

export async function adicionar_lobinho(lobinho) {

    fetch("http://localhost:3000/lobinhos", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body:JSON.stringify(lobinho)


    })
        .then( Response => Response.text())
        .then(text => {
            alert("Lobinho Salvo com sucesso.")
            console.log(text)
        }

        )
        .catch(erro =>alert("erro ao adicionar lobinho.") )
}
