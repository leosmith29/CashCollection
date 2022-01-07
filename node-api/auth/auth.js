const jwt = require('jsonwebtoken')
const config = require("../config/config_key")
const TokenGenerator = require('uuid-token-generator');
var tokenRand = new TokenGenerator()

module.exports  = (req,res,next) =>{

 let auth = req.headers['authorization']
	if(!auth)
		return res.status(401).json({error:"Authorization Failed"})
	jwt.verify(auth.replace("Bearer ",""),config.secret, (err,decoded)=>{
			if(err)
				return res.status(401).json({error:"Authorization Key Not Found"})
			if(!decoded)
				return res.status(401).json({error:"Authorization Key Not Found"})
			//Pass verified data to request	
			 req['decoded'] = decoded
			 api_id = tokenRand.generate()
			 req['api_id'] = api_id
			 d = new Date();
			 //Log Request
			 req['api_log'] = {request_type:req.method,request_time: `[${d.toLocaleString()}]`, status:'pending',api_id:api_id,url_encode:req.url,username:req['decoded'].username,requestip:req.headers['x-forwarded-for'] || req.socket.remoteAddress || null}
				// console.log(req)

	})
	next()
}

