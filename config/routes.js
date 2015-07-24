module.exports.routes = {
    'post /login': 'AuthController.login',
    '/logout': 'AuthController.logout',
    'post /api/settings': 'UserController.settings',
    'get /api/search/matrix': 'MatrixController.getMatrixData'
};
