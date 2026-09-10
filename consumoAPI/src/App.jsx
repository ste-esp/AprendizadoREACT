import React from 'react';
import { useEffect, useState } from 'react';

function App() {

    const [usuarios, alterarDados] = React.useState([])
    const [pesquisa, alteraPesquisa] = React.useState("")


    async function buscarTodos() {

        const response = await fetch("https://dummyjson.com/users")
        const data = await response.json()
        console.log(data)
        alterarDados(data.users)
    }

    async function buscarNome() {
        const response = await fetch("https://dummyjson.com/users/search?q=" + pesquisa)
        const nome = await response.json()
        console.log(nome)
        alterarDados(nome.users)
    }

    function mostrarInformacoes(usuario){
        alert("telefone: "+ usuario.phone +"\nEmail "+ usuario.email + "\nEndereço: " + usuario.address.state)
    }

    useEffect(() => {
        buscarTodos()
    }
    , [])
    return (
        <div>

            <h1>Consumo de API</h1>
            <p>Buscando dados de API DummyJSON</p>
            
            <hr/>
            <input onChange={(e) => alteraPesquisa(e.target.value)} placeholder="Digite um nome..." />
            <button onClick={() => buscarNome(pesquisa)}>🔎 Pesquisar </button>

            <ul>{
                usuarios.length == 0 ?
                    <p>Lista vazia...</p>
                    :
                    usuarios.map(
                        i => <li>
                        <img src={`https://ui-avatars.com/api/?name=${i.firstName}+${i.lastName}`} alt="Avatar" /> 
                        {i.gender == "male" ?  "   Sr. " : "   Sra. "}
                        {i.firstName} {i.lastName} tem {i.age} anos.
                        Mora em {i.address.city} <button onClick={() => mostrarInformacoes(i)}>Ver informações</button> </li>
                    )
            }

            </ul>
            

        </div>
    );

}
export default App;