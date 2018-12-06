function log(message) {
    const now = new Date();
    console.log('[' + now.getFullYear() + '/' + now.getMonth() + '/' + now.getDay() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '] ' + message);
}

module.exports = {
    log
}