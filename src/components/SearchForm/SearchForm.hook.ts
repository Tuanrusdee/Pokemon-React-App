import { pokemonDetailServices, pokemonListServices } from "@/services";
import { usePokemonListStore } from "@/store/pokemonList";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";


const useSearchForm = () => {

    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const keyword = watch("keyword")
    const { setFetchPokemonList, fetchPokemon, setPokemonList } = usePokemonListStore()


    const callData = async () => {
        const responseList = await pokemonListServices.getPokemonList()
        const pokeList = []
        setFetchPokemonList({
            data: [],
            loading: true,
            error: null
        })
        if (responseList.status === 200) {
            const responseResults = responseList.data?.results || []
            for (const pokemon of responseResults) {
                const response = await pokemonDetailServices.getPokemonDetail(pokemon.name)
                const pokeData = response.data
                pokeList.push({ ...pokeData, image: pokeData.sprites.other.home.front_default || pokeData.sprites.other.dream_world.front_default })
            }
            setFetchPokemonList({
                data: pokeList,
                loading: false,
                error: null
            })
        } else {
            setFetchPokemonList({
                data: [],
                loading: false,
                error: responseList.error,
            })
        }

    }

    useEffect(() => {
        callData();

    }, [])

    useEffect(() => {
        const data = fetchPokemon.data.filter((item) =>
            item.name.toLowerCase().includes(keyword?.toLowerCase())
        )
        setPokemonList({
            data: data,
            loading: false,
            error: null,
        })
    }, [keyword]);


    return {
        fieldKeyword: register('keyword'),
    }
}

export { useSearchForm }