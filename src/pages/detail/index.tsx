import PokemonCard from "@/components/PokemonCard";
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { pokemonDetailServices, pokemonListServices } from "@/services";
import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom';

type pokemonType = {
    data: IPokemonDetailResponse | undefined
    loading: boolean
    error: null | any
}

const DetailPage = () => {

    const { name } = useParams()

    const [pokemon, setPokemon] = useState<pokemonType>({
        data: undefined,
        loading: true,
        error: null
    })

    const callData = async (name: string) => {
        const response = await pokemonDetailServices.getPokemonDetail(name)
        if (response.status === 200) {

            setPokemon({
                data: response.data,
                loading: false,
                error: null
            })

        } else {
            setPokemon({
                data: undefined,
                loading: false,
                error: response.error,
            })
        }

    }

    useEffect(() => {
        if (name) callData(name)

    }, [name])

    return (
        <div className=" w-[90%] m-[auto] max-w-[1100px]">
            <div className="flex justify-center">
                <img src="/images/logo.webp" alt="logo" className="max-h-[80px] mt-[20px]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[40px]">

                <PokemonCard name={pokemon.data?.name} image={pokemon.data?.image || ''} id={pokemon.data?.id} types={pokemon.data?.types} />

            </div>
        </div>
    )
}

export default DetailPage;

// function setFetchPokemonList(arg0: { data: never[]; loading: boolean; error: null; }) {
//     throw new Error("Function not implemented.");
// }
