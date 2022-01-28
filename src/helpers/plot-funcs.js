export const getPlotValue = (arr, v) => {
    arr.sort((a, b) => a - b)
    const first = arr[0]
    const last = arr[arr.length - 1]
    return (v - first) / (last - first)
}

export const kFormat = (num, decimal = 0) => {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(decimal)) + 'k' : Math.sign(num) * Math.abs(num)
}

export const pFormat = (num, decimal = 0) => {
    return num.toFixed(decimal) + '%'
}