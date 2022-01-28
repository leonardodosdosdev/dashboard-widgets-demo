import { makeStyles } from "@mui/styles"
import { kFormat, pFormat } from "../helpers/plot-funcs"

const PlotHeader = ({ plot, suffix }) => {

    const classes = useStyles()

    const first = plot[0]
    const last = plot[plot.length - 1]

    return (
        <div className={classes.header}>
            <span>{suffix === '%' ? pFormat(first) : kFormat(first)}</span>
            <span>{suffix === '%' ? pFormat(last) : kFormat(last)}</span>
        </div>
    )
}

export default PlotHeader

const useStyles = makeStyles(() => ({
    header: {
        fontWeight: 'normal',
        fontSize: '0.8em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0 0 0 70px',
        color: '#5c5c5c',
    },
}))