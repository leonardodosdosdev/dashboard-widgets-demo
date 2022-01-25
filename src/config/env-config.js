const getEnv = (name, isInt = false) => {
    const env = process.env[name]
    if (env === null) {
        throw new Error(`Environment variable: ${name} is undefined.`)
    }
    return isInt ? parseInt(env) : env
}

const config = {
    SERVER_URI: getEnv('REACT_APP_SERVER_URI'),
}

export default config
