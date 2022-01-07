exports.res500 = (req,res,err)=>{
    //Update log
    req['api_log'].status = "error"
    req['api_log'].response_date = new Date().toLocaleString()
    console.log(`API-REQUEST-LOG: [${req['api_log'].response_date}] --DATA ${JSON.stringify(req.api_log)}`)
    return res.status(500).json(err)
}

exports.res400 = (req,res,err)=>{
    //Update log
    req['api_log'].status = "error"
    req['api_log'].response_date = new Date().toLocaleString()
    console.log(`API-REQUEST-LOG: [${req['api_log'].response_date}] --DATA ${JSON.stringify(req.api_log)}`)
    return res.status(200).json(err)
}

exports.res200 = (req,res,data)=>{
    //Update log
    req['api_log'].status = "success"
    req['api_log'].response_date = new Date().toLocaleString()
    // console.log(req.api_log)
    console.log(`API-REQUEST-LOG: [${req['api_log'].response_date}] --DATA ${JSON.stringify(req.api_log)}`)
    return res.status(200).json(data)
}