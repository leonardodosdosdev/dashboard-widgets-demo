import { useEffect, useState } from "react"

const Plot = ({ plotValue }) => {

    const [loc, setLoc] = useState(0)

    useEffect(() => {
        const bar = document.getElementById('bar')
        if (bar && plotValue) {
            const w = bar.offsetWidth
            const loc = w * plotValue
            setLoc(loc)
            console.log(`loc`, w + ': ' + loc)
        }
    }, [])

    const styles = useStyles(loc)
    // const styles = useStyles()

    return (
        <div style={styles.plot} id="bar">
            <span style={styles.circle}></span>
        </div>
    )
}

export default Plot

const useStyles = loc => ({
    plot: {
        flex: 1,
        backgroundColor: 'blue',
    },
    circle: {
        height: '10px',
        width: '10px',
        backgroundColor: 'red',
        borderRadius: '50%',
        display: 'inline-block',
        marginLeft: `${loc}px`,
    }
})