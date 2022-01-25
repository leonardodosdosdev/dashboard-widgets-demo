import { useEffect, useState } from 'react'
import apiWrapper from '../config/api-wrapper'
import config from '../config/env-config'

const Dashboard = () => {

    const [data, setData] = useState()

    useEffect(() => {
        if (!data) {
            apiWrapper.get(`${config.SERVER_URI}/frontend-test-data.json`)
                .then(response => {
                    const { data } = response
                    setData(data)
                })
        }
    }, [data])

    console.log(data)

    return (
        <div>
        </div>
    )

}

export default Dashboard