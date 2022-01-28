import { style } from "@mui/system"
import { useEffect, useState } from "react"
import Plot from "./Plot"

const DataReport = ({ colConfig, data }) => {

    const styles = useStyles()

    const [dataRows, setDataRows] = useState()

    useEffect(() => {
        if (colConfig && data) {
            const { query: { meta, headers, data: rows } } = data

            const plot = new Map()
            rows.forEach(row => {
                row.forEach(col => {
                    const config = colConfig.find(config => config.key === col.k)
                    if (config.showPlot && !config.isHidden) {
                        let arr = plot.get(col.k)
                        if (!arr) {
                            arr = []
                            plot.set(col.k, arr)
                        }
                        arr.push(col.v)
                    }
                })
            })
            const dataRows = rows.map((row, index) => {
                const dataCol = row.map(col => {
                    const config = colConfig.find(config => config.key === col.k)
                    const header = headers.find(header => header.key === col.k)

                    let plotValue
                    if (config.showPlot && !config.isHidden) {
                        plotValue = getPlotValue(plot.get(col.k), col.v)
                    }
                    return {
                        ...col,
                        plotValue,
                        ...config,
                        ...header,
                    }
                })
                return {
                    meta: meta[index],
                    cols: [...dataCol]
                }
            })
            setDataRows(dataRows)
        }
    }, [colConfig, data])

    console.log('dataRows', dataRows)

    return (
        <div>
            {data && colConfig && (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {data.query.headers.map(header => {
                                const config = colConfig.find(config => config.key === header.key)
                                return (
                                    <th key={header.key} style={config && config.isHidden ? styles.hidden : styles.header}>
                                        <span style={!config ? styles.hidden : undefined}>{header.title}</span>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {dataRows && dataRows.map((row, index) => (
                            <tr key={index}>
                                <td style={styles.metaTitle}>{row.meta.title}</td>
                                {row.cols.map(col => {
                                    return (
                                        <td key={col.k} style={col.isHidden ? styles.hidden : styles.col}>
                                            <div style={styles.colDisplay}>
                                                <div style={styles.colValue}>{col.suffix === '%' ? pFormat(col.v) : kFormat(col.v)}</div>
                                                {col.showPlot && (
                                                    <Plot plotValue={col.plotValue} />
                                                )}
                                            </div>
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

const getPlotValue = (arr, v) => {
    arr.sort((a, b) => a - b)
    const first = arr[0]
    const last = arr[arr.length - 1]
    return (v - first) / (last - first)
}

const kFormat = num => {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

const pFormat = num => {
    return num.toFixed(1) + '%'
}

const useStyles = () => ({
    hidden: {
        display: 'none',
    },
    table: {
        width: '100%',
    },
    header: {
        textAlign: 'left',
    },
    colValue: {
        minWidth: '70px',
        textAlign: 'right',
        paddingRight: '8px',
    },
    colDisplay: {
        display: 'flex',
        flexDirection: 'row',
    },
    metaTitle: {
        width: '19%',
        // width: '200px',
        minWidth: '200px',
    },
    col: {
        width: '27%',
        // width: '100px',
    }
})