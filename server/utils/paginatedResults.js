const { newError } = require("./Errors")

exports.paginatedResults = (model) => async(req,res,next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    let sortBy = req.query.sortBy
    let filter = req.query.filter 
    let filterObject = {}
    if(filter) {
        const [key,value] = filter.split(',')
        filterObject= {[key]: value}
    }

    sortBy = sortBy.split(',')                  //
    sortBy[1] = sortBy[1] === "desc" ? 1 : -1   // convert "sortBy=rating,desc" to => {rating: 1}
    const obj = {}                              //
    obj[sortBy[0]] = sortBy[1]                  //

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const result = {}

    if (endIndex < await model.countDocuments(filterObject).exec()){
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
        result.list = await model.find(filterObject).sort(obj).limit(limit).skip(startIndex)
        const pages = await model.countDocuments(filterObject).exec() / limit
        result.pages = Math.ceil(pages)
        res.pagination = result
        next()
    } catch (error) {
        return next(newError(500, error.message))
    }
}