const formAdicionar = document.getElementById("formAdicionar");
const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const idade = document.getElementById("idade");

formAdicionar.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
        nome: nome.value,
        idade: idade.value,
        cpf: cpf.value,
    };

    postCliente(data)
        .then((x) => window.location.href = '/clientes')
        .catch((err) => console.log(err));
});
