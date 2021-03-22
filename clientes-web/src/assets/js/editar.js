const formUpdate = document.getElementById("formUpdate");
const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const idade = document.getElementById("idade");
const _id = document.getElementById("_id");

const id = window.location.href.split("editar/")[1];

getClienteById(id)
    .then((x) => {
        (nome.value = x.nome), (cpf.value = x.cpf), (idade.value = x.idade), (_id.value = x._id);
    })
    .catch((err) => console.log(err));

formUpdate.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        _id: _id.value,
        nome: nome.value,
        idade: idade.value,
        cpf: cpf.value,
    };

    putCliente(data)
        .then((x) => (window.location.href = "/clientes"))
        .catch((err) => console.log(err));
});
