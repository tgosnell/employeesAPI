
//mock authentication because it's faster to put together this way
//and replace it with real auth a some point in the future
module.exports.checkAuth = (key) => {
    return key === 'E53E6B35EC8FC218315FB68574E76';
}