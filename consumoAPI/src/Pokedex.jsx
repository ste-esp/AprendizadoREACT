import React from 'react';


function Pokedex() {

    const [pokemon, setPokemon] = React.useState(null)
    const [pesquisa, alteraPesquisa] = React.useState("")


    async function buscarPokemon(pesquisa) {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pesquisa)
        const data = await response.json()
        console.log(data)
        setPokemon(data)
    }



    

    return ( 
        <div>
            <h1>Pokédex</h1>
            <p>Consulte um Pokemon</p>

            <input onChange={(e) => alteraPesquisa(e.target.value)} placeholder="Digite o nome do Pokemon..."/>
            <button onClick={() => buscarPokemon(pesquisa)}>🔎 Pesquisar</button>

            <hr/>
            {pokemon == null ?
                <p>Lista vazia</p>
                :
                <>  
                    <h2>Nome: {pokemon.name}</h2>
                    <p>Tipo: {pokemon.types[0].type.name}</p>
                    <img src={pokemon.sprites.other.showdown.front_default}/>
                </>
            }


        </div>
     );
}

export default Pokedex;