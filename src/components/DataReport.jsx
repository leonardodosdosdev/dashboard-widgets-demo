import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(() => ({
    hidden: {
        display: 'none',
    }
}))

const DataReport = ({ colConfig, data }) => {

    const classes = useStyles()

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
                        {data.query.data.map((row, index) => {
                            const meta = data.query.meta[index]
                            return (
                                <tr key={index}>
                                    <td>{meta.title}</td>
                                    {row.map(col => {
                                        const config = colConfig.find(config => config.key === col.k)
                                        return (
                                            <td key={col.k} className={config && config.isHidden ? classes.hidden : ''}>
                                                {col.v}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )

}

export default DataReport