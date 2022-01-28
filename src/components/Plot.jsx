import { useEffect, useState } from "react"

const CIRCLE_DIM = 8

const Plot = ({ plotValue }) => {

    const [loc, setLoc] = useState(0)

    const millis = new Date().getTime()

    useEffect(() => {
        const bar = document.getElementById(`bar_${millis}`)
        if (bar && plotValue) {
            let barWidth = bar.offsetWidth
            
            if (plotValue === 1) {
                barWidth = barWidth - CIRCLE_DIM
            }
            const loc = barWidth * plotValue
            setLoc(loc)
        }
    }, [plotValue, millis])

    const styles = useStyles(loc)

    return (
        <div style={styles.plot} id={`bar_${millis}`}>
            <span style={styles.circle}></span>
        </div>
    )
}

export default Plot

const useStyles = loc => ({
    plot: {
        flex: 1,
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
    },
    circle: {
        height: `${CIRCLE_DIM}px`,
        width: `${CIRCLE_DIM}px`,
        backgroundColor: '#1e88e5',
        borderRadius: '50%',
        display: 'inline-block',
        marginLeft: `${loc}px`,
    }
})