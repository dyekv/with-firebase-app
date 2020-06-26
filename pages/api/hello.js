// import fs from 'fs'

export default (req, res) => {
    // alert('req')

    return res.json({
        text: 'Hello',
        method: req.method,
    })
}