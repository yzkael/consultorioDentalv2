import { Hourglass } from "react-loader-spinner"

const LoadingMessageInput = () => {
    return (

        <div className="flex justify-center">
            <span className="text-sm text-gray-700 flex items-center">Revisando Disponibilidad... {
                <Hourglass
                    visible={true}
                    height="10"
                    width="10"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#2d517a', '#5c7fae']}
                />}</span>
        </div>
    )
}

export default LoadingMessageInput
