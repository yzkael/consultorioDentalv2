
const DisplayError = ({ message }: { message: string }) => {
    return (
        <div className="flex justify-center">
            <span className="text-sm text-red-600">{message}</span>
        </div>
    )
}

export default DisplayError
