import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const LoadingSpinner = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-max h-max  flex justify-center items-center mb-10">
                <TailSpin
                    visible={true}
                    height="100%"
                    width="100%"
                    color="#D10056"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </div>
    )
}

export default LoadingSpinner
