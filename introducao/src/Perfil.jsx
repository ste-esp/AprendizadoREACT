import { useState } from 'react'


function Perfil() {

    let [perfilExibido, setPerfilExibido] = useState(false)

    let usuario = {
        nome: "Stephanie",
        email: "stephanie@exemplo.com",
        senha: "123123"
    }

    return (
        <div>
            <h1>Perfil de usuário</h1>
            <p>Veja aqui suas informações do perfil</p>
            <button onClick={() => setPerfilExibido(!perfilExibido)}>Carregar Perfil</button>

            {
                perfilExibido == true ?
                    <div>
                        <p>Nome: {usuario.nome}</p>
                        <p>Email: {usuario.email}</p>
                        <button>Alterar senha: </button>
                    </div>
                :
                    <p></p>
            }





        </div>
    )
}















export default Perfil