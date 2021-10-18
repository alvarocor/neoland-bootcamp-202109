function map(array, callback) {
    var result = []

    for (let i = 0; i < array.length; i++) {
        var element = array[i]

        result[i] = callback(element, i)
    }
    return result
}