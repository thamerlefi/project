const { newError } = require("./Errors")

exports.paginatedResults = (model) => async(req,res,next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const result = {}

    if (endIndex < await model.countDocuments().exec()){
        result.next ={
            page: page + 1,
            limit
        }
    }

    if(startIndex > 0) {
        result.previous ={
            page: page - 1,
            limit
        }
    }
    try {
        result.list = await model.find().limit(limit).skip(startIndex).sort({createdAt: -1})
        const reslt = await model.countDocuments().exec() / limit
        result.pages = Math.ceil(reslt)
        res.pagination = result
        next()
    } catch (error) {
        return next(newError(500, error.message))
    }
}