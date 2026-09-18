import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import "./Empresas.css"


function App() {

  const [produtos, alteraProdutos] = useState([])

  const [nome, alteraNome] = useState("")
  const [preco, alteraPreco] = useState("")
  const [tamanho, alteraTamanho] = useState("")
  const [descricao, alteraDescricao] = useState("")

  async function inserir() {
    const obj = {
      nome: nome,
      preco: preco,
      tamanho: tamanho,
      descricao: descricao
    }
    const { data, error } = await supabase.from('produtos').insert(obj)
    alert("Produto cadastrado com sucesso! :D ")
    document.location.reload()
  }



  async function buscaTodos() {
    const { data, error } = await supabase.from('produtos').select()
    console.log(data);
    alteraProdutos(data)
  }

  useEffect(() => {
    buscaTodos()
  }, [])

  return (
    <div>
      <h1>Conexão Supabase</h1>
      <input onChange={e => alteraNome(e.targer.value)} placeholder='Nome do Produto...' />
      <br />
      <input onChange={e => alteraPreco(e.targer.value)} placeholder='Preço...' />
      <br />
      <input onChange={e => alteraTamanho(e.targer.value)} placeholder='Tamanho...' />
      <br />
      <input onChange={e => alteraDescricao(e.targer.value)} placeholder='Descrição (opcional)' />
      <button onClick={inserir}>Salvar</button>


      {produtos.map(i => <p>{i.nome} - R$ {i.preco}| {i.descricao}</p>)}

    </div>
  );
}

export default App;

