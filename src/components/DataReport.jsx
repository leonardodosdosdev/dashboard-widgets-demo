import { useMediaQuery } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Fragment, useEffect, useState } from "react"
import { getPlotValue, kFormat, pFormat } from "../helpers/plot-funcs"
import Plot from "./Plot"
import PlotHeader from "./PlotHeader"

const DataReport = ({ colConfig, data }) => {

    const isLargeScreen = useMediaQuery('(min-width:1024px)')

    const classes = useStyles()

    const [dataRows, setDataRows] = useState()
    const [headerTitles, setHeaderTitles] = useState()

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
            const headerTitles = headers.map(header => {
                const config = colConfig.find(config => config.key === header.key)
                return {
                    ...header,
                    isHidden: config && config.isHidden,
                    isShowPlot: config && config.showPlot,
                    isHideHeader: !config,
                    plot: plot.get(header.key),
                }
            })
            setHeaderTitles(headerTitles)

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
                        ...config,
                        plotValue,
                        decimals: header.decimals,
                        key: header.key,
                        prefix: header.prefix,
                        suffix: header.suffix,
                    }
                })
                dataCol.push(meta[index])
                return [...dataCol]
            })
            setDataRows(dataRows)
        }
    }, [colConfig, data])

    return (
        <div>
            {data && colConfig && headerTitles && (
                <div className={isLargeScreen ? classes.flexRow : classes.flexCol}>
                    {headerTitles.map(header => {
                        return (
                            <Fragment key={header.key}>
                                {!header.isHidden && (
                                    <div className={`${classes.box} ${header.isShowPlot && classes.flexBox}`}>
                                        <div className={classes.header}>
                                            {!header.isHideHeader && (
                                                <>
                                                    <div>{header.title}</div>
                                                    {header.plot && (
                                                        <PlotHeader plot={header.plot} suffix={header.suffix} />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        {dataRows.map((rows, index) => {
                                            const row = rows.find(row => row.key === header.key)
                                            return (
                                                <Fragment key={index}>
                                                    {!row.isHidden && (
                                                        <div className={classes.cell}>
                                                            {row.title && <div>{row.title}</div>}
                                                            {row.v && (
                                                                <div className={classes.colDisplay}>
                                                                    <div className={classes.colValue}>{row.suffix === '%' ? pFormat(row.v, row.decimals) : kFormat(row.v, row.decimals)}</div>
                                                                    {row.showPlot && (
                                                                        <Plot plotValue={row.plotValue} />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </Fragment>
                                            )
                                        })}
                                    </div>
                                )}
                            </Fragment>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default DataReport

const useStyles = makeStyles(() => ({
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
    },
    box: {
        minWidth: '220px',
    },
    flexBox: {
        flex: 1,
    },
    header: {
        textAlign: 'left',
        minHeight: '45px',
        fontWeight: 'bold',
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
    cell: {
        minHeight: '30px',
    },
}))