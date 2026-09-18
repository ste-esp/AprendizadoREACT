import { use, useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./Empresas.css"

function Empresas() {


    const [empresas, setEmpresas] = useState([])
    const [funcionarios, setFuncionarios] = useState([])

    const [exibeEmpresas, setExibeEmpresas] = useState(true)
    const [exibeFuncionarios, setExibeFuncionarios] = useState(false)

    const [exibeMobal, setEixibeMobal] = useState(false)

    const [idEmpresa, setIdEmpresa] = useState("")
    const [nome, setNome] = useState("")
    const [contato, setContato] = useState("")
    const [cargo, setCargo] = useState("1")

    async function inserirFuncionario() {
        const obj = {
            id: idEmpresa,
            nome: nome,
            contato: contato,
            cargo: cargo
        }

        const {error} = await supabase.from("funcionarios").insert(obj)

        if(error == null) {
            alert("Funcionário cadastrado com sucesso!")
            setEixibeMobal(false)
            
        }else{
            alert("Erro ao cadastrar funcionário. Entre em contato com o suporte técnico")
            console.log(error)
        }

    }

    


    async function buscaTodasEmpresas() {
        const { error, data } = await supabase.from("empresas").select()
        //console.log(data)
        setEmpresas(data)

    }

    async function buscaTodosFuncionarios() {
        const { error, data } = await supabase.from("funcionarios").select(` 
                id,
                nome,
                cargo,
                contato, 
                empresas
                ( nome, endereco ) 
             `);
        console.log(data)
        setFuncionarios(data)
    }


    async function buscaFuncionarioPorEmpresas(id_empresas) {
        const { error, data } = await supabase.from("funcionarios").select("*, empresas(*)").eq("id_empresa", id_empresas)
        console.log(data)
        setFuncionarios(data)
        setIdEmpresa(idEmpresa)
        setFuncionarios(data)
        setVisualizacao()

    }

    function setVisualizacao() {

        if (exibeEmpresas == true) {
            setExibeEmpresas(false)
            setExibeFuncionarios(true)
        } else {
            setExibeEmpresas(true)
            setExibeFuncionarios(false)
        }
    }

    useEffect(() => {
        buscaTodasEmpresas()
        buscaTodosFuncionarios()
    }, [])

    return (
        <div>

            {
                exibeMobal == true ?
                    <div>

                        <div onClick={() => setEixibeMobal(false)} className="fundoPreto" > </div>

                        <div className="modal">
                            <h2>Novo Funcionário</h2>
                            <input onCharge={(e) => setNome(e.target.value)} placeholder="Nome"></input>
                            <br />
                            <input onCharge = {(e) => setContato(e.target.value)} placeholder="Contato"></input>
                            <br />
                            <select onChange={(e) => setCargo(e.target.value)} >
                                <option value="1" >Funcionário comum</option>
                                <option value="0" >Administrador</option>
                            </select>
                            <br /><br />
                            <button onClick={inserirFuncionario}>Salvar</button>
                        </div>
                    </div>
                    :
                    <></>
            }
            <h1>Relacionamento de Tabelas</h1>
            <p>Consulta na tabela empresas  e funcionários</p>

            {
                exibeEmpresas == true ?


                    <div>

                        <h2>Empresas</h2>

                        <table border="true">
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>CNPJ</td>
                                <td>Endereço</td>
                                <td>Ações</td>

                            </tr>
                            {
                                empresas.map(i => <tr>
                                    <td>{i.id}</td>
                                    <td>{i.nome}</td>
                                    <td>{i.cnpj}</td>
                                    <td>{i.endereco}</td>
                                    <td><button onClick={() => buscaFuncionarioPorEmpresas(i.id)} >Ver funcionários</button></td>
                                </tr>
                                )
                            }
                        </table>
                    </div>
                    :
                    <></>
            }



            {
                exibeFuncionarios == true ?

                    <div>
                        <h2>Funcionários</h2>

                        <button onClick={() => { setVisualizacao(); setIdEmpresa("") } } >Voltar</button>
                        <br /><br />
                        <button onClick={() => setEixibeMobal(true)}>Adicionar novo</button>
                        <br /><br />

                        <table border="true">
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>Nome da Empresas</td>
                                <td>Endereço da Empresas</td>
                                <td>Cargo</td>
                                <td>Contato</td>
                            </tr>


                            {
                                funcionarios.map(i =>
                                    <tr key={i.id}>
                                        <td>{i.id}</td>
                                        <td>{i.nome}</td>
                                        <td>{i.empresas.nome}</td>
                                        <td>{i.empresas.endereco}</td>
                                        <td>{i.cargo == 0 ? "Administrador" : "Funcionário comum"}</td>
                                        <td>{i.contato}</td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                    :
                    <></>
            }







        </div >
    );
}

export default Empresas;