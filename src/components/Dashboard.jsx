import { useEffect, useState } from 'react'
import apiWrapper from '../config/api-wrapper'
import config from '../config/env-config'
import DataReport from './DataReport'

const Dashboard = () => {

    const [apiData, setApiData] = useState()

    useEffect(() => {
        if (!apiData) {
            apiWrapper.get(`${config.SERVER_URI}/frontend-test-data.json`)
                .then(response => {
                    const { data } = response
                    setApiData(data)
                })
        }
    }, [apiData])

    // console.log(apiData)

    return (
        <div>
            <div>
                <DataReport
                    colConfig={apiData?.config1}
                    data={apiData?.data}
                />
            </div>
            <div>
                <DataReport
                    colConfig={apiData?.config2}
                    data={apiData?.data}
                />
            </div>
        </div>
    )

}

export default Dashboard