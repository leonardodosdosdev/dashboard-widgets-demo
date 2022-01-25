import { makeStyles } from "@mui/styles"
import { useEffect, useState } from "react"

const DataReport = ({ colConfig, data }) => {

    const classes = useStyles()

    const [dataRows, setDataRows] = useState()

    useEffect(() => {
        if (colConfig && data) {
            const { query: { meta, headers, data: rows } } = data
            const dataRows = rows.map((row, index) => {
                const dataCol = row.map(col => {
                    const config = colConfig.find(config => config.key === col.k)
                    const header = headers.find(header => header.key === col.k)
                    return {
                        ...col,
                        ...config,
                        ...header,
                    }
                })
                return {
                    meta: meta[index],
                    cols: [...dataCol]
                }
            })
            console.log('dataRows', dataRows)
            setDataRows(dataRows)
        }
    }, [colConfig, data])

    return (
        <div>
            {data && colConfig && (
                <table>
                    <thead>
                        <tr>
                            {data.query.headers.map(header => {
                                const config = colConfig.find(config => config.key === header.key)
                                return (
                                    <th key={header.key} className={config && config.isHidden ? classes.hidden : ''}>
                                        <span className={!config ? classes.hidden : ''}>{header.title}</span>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {dataRows && dataRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.meta.title}</td>
                                {row.cols.map(col => {
                                    return (
                                        <td key={col.k} className={col.isHidden ? classes.hidden : ''}>
                                            {col.v}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )

}

export default DataReport

const useStyles = makeStyles(() => ({
    hidden: {
        display: 'none',
    }
}))