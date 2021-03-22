const getClientes = async () => {
    const res = await fetch("http://localhost:3000/api/getClientes");
    const dados = await res.json();
    return dados;
};

const getClienteById = async (id) => {
    const res = await fetch("http://localhost:3000/api/getCliente/" + id);
    const cliente = await res.json();
    return cliente[0];
};

const postCliente = async (cliente) => {
    fetch("http://localhost:3000/api/postCliente", {
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(cliente),
    })
        .then((x) => {
            return x;
        })
        .catch((err) => {
            return err;
        });
};

const putCliente = async (cliente) => {
    fetch("http://localhost:3000/api/putCliente/" + cliente._id, {
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(cliente),
    })
        .then((x) => {
            return x;
        })
        .catch((err) => {
            return err;
        });
};

const deleteCliente = async (id) => {
    fetch("http://localhost:3000/api/removeCliente/" + id, {
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json",
        },
        method: "DELETE"
    })
        .then((x) => {
            return x;
        })
        .catch((err) => {
            return err;
        });
};