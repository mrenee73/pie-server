module.exports = (req, res, next) => {
    res.header('access-control-allow-origin', '*');  // 1
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); // 2
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, accept, Authorization'); // 3
    next()
}
//! CORS
/* 
* Cross-Origin Resource Sharing
    - mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin access to selected resources from a different origin.
    1:  a response header that tells the browser to allow code from any origin.
    2:  a response header that specifies the method or methods allowed when accessing the resources to a preflight request.
    3.  a response header that's used in response to a preflight request that indicates which HTTP headers can be used during the actual request.
* Preflight Requests:
    - A preflight request is a CORS request that checks to see if the CORS protocol is understood.
    - automatically issued by a browser.
    ex: client might ask a server if it would allow a DELETE request before actually sending the DELETE request.
*/