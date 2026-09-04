import { useState } from 'react'


function App() {

  let [cliques, setCliques] = useState(0)
  let[nome, setNome] = useState("Aguardando...")

  
  function carregarNome() {
    setNome("Stephanie")
  }

  function aumentarClique() {

    setCliques(cliques + 1)
    
  }
  return (
    <div>
      <h1>Olá mundo!</h1>
      <p>Estou aprendendo React XD</p>

      <p>Meu nome é: {nome} </p>
      <button onClick={carregarNome} >Carregar nome</button>
      
      <hr/>

      <p>Você clicou {cliques} vezes</p>
      <button onClick={aumentarClique}>Clique aqui</button>
    </div>
  )
}

export default App
