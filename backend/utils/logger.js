function log(message) {
    const now = new Date();
    console.log('[' + now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '] ' + message);
}

module.exports = {
    log
}