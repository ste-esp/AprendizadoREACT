import { useState } from "react"

function Formulario() {

    let [nome, setNome] = useState("")
    let [idade, setIdade] = useState("")
    let [cidade, setCidade] = useState("")
    let [estado, setEstado] = useState("")

    function salvar() {

        if (nome.length < 3) {
            alert("Nome não informado")
            return
        }

        if (idade.length < 1) {
            alert("Idade não informada")
            return
        }

        if (cidade.length < 2) {
            alert("Cidade não informada")
            return
        }

        if (estado.length < 2) {
            alert("Estado não informado")
            return
        }

        alert("Seja Bem-vinda(o), " + nome + " de " + idade + " anos, que mora em " + cidade + ", " + estado)
        

    }

    return (

        <div>
            <h1>Página de Formulário</h1>
            <p>Aprendendo a usar o input no React</p>

            <p>Digite seu nome: </p>
            <input onChange={e => setNome(e.target.value)} />
            <br /><br />
            <br />
            <p>Digite sua idade: </p>
            <input onChange={e => setIdade(e.target.value)} />
            <br />
            <p>Onde você mora?</p>
            <input onChange={e => setCidade(e.target.value)} />

            <input onChange={e => setEstado(e.target.value)} />

            <button onClick={salvar}>Salvar</button>

        </div>
    )

}

export default Formulario