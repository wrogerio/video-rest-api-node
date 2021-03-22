const bodyClientes = document.getElementById("bodyClientes");

getClientes().then((dados) => {
    bodyClientes.innerHTML = "";
    dados.map(x => {
        bodyClientes.innerHTML += `
            <tr>
                <td>${x.nome}</td>
                <td>${x.cpf}</td>
                <td>${x.idade}</td>
                <td>
                    <a href='/clientes/editar/${x._id}'>
                        <img src='/imagens/edit.svg' />
                    </a>
                    <img onclick='removerCliente("${x._id}")' src='/imagens/remove.svg' />
                </td>
            </tr>
        `
    })
});


function removerCliente(id) {
    const resp = confirm('Deseja realmente exlcluir o cliente?')
    if(resp){
        deleteCliente(id)
        .then(x => window.location.reload())
        .catch(err => console.log(err))
    }
}
