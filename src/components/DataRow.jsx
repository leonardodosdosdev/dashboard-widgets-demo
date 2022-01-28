import { makeStyles } from "@mui/styles"
import { kFormat, pFormat } from "../helpers/plot-funcs"
import Plot from "./Plot"

const DataRow = ({ row }) => {

    const classes = useStyles()

    return (
        <>
            {!row.isHidden && (
                <div className={classes.cell}>
                    {row.title && <div>{row.title}</div>}
                    {row.v && (
                        <div className={classes.colDisplay}>
                            <div className={classes.colValue}>
                                {row.suffix === '%' ? pFormat(row.v, row.decimals) : kFormat(row.v, row.decimals)}
                            </div>
                            {row.showPlot && (
                                <Plot plotValue={row.plotValue} />
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default DataRow

const useStyles = makeStyles(() => ({
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