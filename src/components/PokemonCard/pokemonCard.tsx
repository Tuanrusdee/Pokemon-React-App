import { Type } from '@/interface/pokemonDetail'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'
import { Link } from 'react-router-dom'

interface PokemonCardProps {
    name: string, image: string, id: number, types: Type[]
}


const PokemonCard = ({ name, image, id, types }: PokemonCardProps) => {
    return (

        <div className="max-w-[275px]  overflow-hidden rounded-[20px] shadow  dark:bg-gray-700 dark:border-gray-700  p-[16px] m-[auto]">
            <div className="bg-[url('/images/poke-card-bg.png')] bg-center aspect-square bg-cover w-full rounded-[20px]" >
                <Link to={`/detail/${name}`} className="bg-[url('/images/poke-card-bg.png')]" >
                    <img className="rounded-t-lg h-[218px] p-[30px] mx-auto" src={image} alt="img" />
                </Link>

            </div>
            <div className="py-5">

                <div className='flex justify-between'>
                    <h5 className=" capitalize mb-2 text-xl font-bold tracking-tight  text-white">{name}</h5>
                    <h5 className="mb-2 text-xl font-bold tracking-tight   text-white">#{id}</h5>
                </div>

                <div className='flex gap-2 justify-end mt-[16px]'>
                    {types.map((item: { type: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined } }) => {
                        return <span className={`badge-type-${item.type.name} capitalize px-[14px] py-1 rounded-[16px]`}>{item.type.name}</span>
                    })}
                    <span className="">

                    </span>
                </div>


            </div>
        </div >

    )
}

export default PokemonCard