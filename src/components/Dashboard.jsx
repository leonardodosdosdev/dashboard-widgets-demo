import { makeStyles } from '@mui/styles'
import { useEffect, useState } from 'react'
import apiWrapper from '../config/api-wrapper'
import config from '../config/env-config'
import DataWidget from './DataWidget'

const Dashboard = () => {

    const classes = useStyles()

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

    return (
        <div className={classes.container}>
            <div className={classes.widget}>
                <DataWidget
                    colConfig={apiData?.config1}
                    data={apiData?.data}
                />
            </div>
            <div className={classes.widget}>
                <DataWidget
                    colConfig={apiData?.config2}
                    data={apiData?.data}
                />
            </div>
        </div>
    )
}

export default Dashboard

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    widget: {
        margin: '0 0 16px 0',
    },
}))