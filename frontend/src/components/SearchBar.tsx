import { searchDentistaOpciones as options } from "../config/config-files"

type searchBarProps = {
    handleSearch: () => void;
}

const SearchBar = ({ handleSearch }: searchBarProps) => {
    return (
        <div className='w-full flex h-10 bg-slate-400 mx-auto'>
            <form className="flex w-full justify-center gap-10 items-center" onSubmit={handleSearch}>
                <input type="text" className="rounded-md flex-1 max-w-[30%] border border-blue-600" placeholder="Buscar...." />
                <select className="opacity-65">
                    {options.map(option => (
                        <option value={option.value} >{option.description}</option>
                    ))}
                </select>
                <button className="py-1 px-2 rounded-lg bg-purple-600 hover:bg-purple-400" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar
