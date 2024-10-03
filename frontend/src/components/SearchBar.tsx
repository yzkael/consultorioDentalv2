import { ManejarSearch } from "../types/app-types";
import { useForm } from 'react-hook-form'

type searchBarProps = {
    handleSearch: (data: ManejarSearch) => void;
    options: any[];
}

const SearchBar = ({ handleSearch, options }: searchBarProps) => {

    const { handleSubmit, register } = useForm<ManejarSearch>();

    const onSubmit = (handleSubmit((data: ManejarSearch) => {
        handleSearch(data);
    }))

    return (
        <div className='w-full flex h-10 bg-slate-400 mx-auto'>
            <form className="flex w-full justify-center gap-10 items-center" onSubmit={onSubmit}>
                <input type="text" className="rounded-md flex-1 max-w-[30%] border border-blue-600" placeholder="Buscar...." {...register("searchValue")} />
                <select className="opacity-65" {...register("searchParams")}>
                    {options.map(option => (
                        <option value={option.value} >{option.description}</option>
                    ))}
                </select>
                <button className="btn" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar
