
const TestPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-400">
            {/* Header */}
            <div className="h-[10vh] flex justify-center items-center text-white text-2xl font-bold bg-yellow-300">
                Pagina Pereira
            </div>
            {/* Main */}
            <div className="grid grid-cols-[1fr_5fr]">
                <div className="w-full h-screen bg-green-600">SEctio</div>
                <div className="bg-blue-500"></div>
            </div>
        </div>
    )
}

export default TestPage
