
let auth = require('../auth/auth')
let tool = require('../tools/tools')
let database = require('../tools/postgres')
module.exports = (app)=>{

//Add API JWT TOKEN VERIFIER MIDDLEWARE AND API LOGGER
app.use(auth)

//CollectionApi Routes
app.get('/cashcollect/customer/find',async (request,res)=>
{
	
	
	if(request['decoded']){
		user = request['decoded'].username
	
  		const client = await pool.connect()
 	 	
  
		if(!request.query.account_number){
			client.release()
			res.status(500).json({error:"please provide a value for parameter account_number"})		
		}
			
			// d = new Date();
			let api_log = request['api_log']

			//Fetch Customer
			sql = `Select * from stage_api where acc_no = '${request.query.account_number}'`				
			let res_json = {}
			await client.query(sql,(error,response)=>{
					
				if(error){					
					res_json = {error:"Internal Server Error"}
					client.release()
					return tool.res500(request,res,res_json)
					
				}				
				else if(!response.rows[0]){										
					res_json = {message:"No Customer Found"}
					client.release()
					return tool.res200(request,res,res_json)
				}
				else{				
					
					res_json = response.rows
					client.release()
					return tool.res200(request,res,res_json)
				}
											
			})
			
		}		
})

//CollectionApi POST Transaction Route
app.post('/cashcollect/post/collection',async (request,res)=>{
	//Authenticate User Token and Log Request

	let data = request.body
	//Expectation
	// {
	// 	accountNumber,
	// 	amount,
	// 	transactionRef,
	// 	paymentMode,
	// 	channel,
	//  billType
	// }

	if(request['decoded'])
	{
		user = request['decoded'].username
		bal = {}
        const client = await pool.connect()
		//Get Api User Balance
		let api_bal = `SELECT name,limit_amount as bal from tbl_cashcollect_users where username = '${user}'`
		await client.query(api_bal,(e_bal,r_bal)=>{
			if(e_bal){
                client.release()
                return tools.res500(request,res,{error:e_bal})
            }	
		bal = r_bal.rows

		if(!bal[0].bal)
		return tool.res500(request,res,{error:"User Not Found"})		
		if(!bal[0].bal > data.amount){
            return tool.res500(request,res,{error:"Not Enough Balance To Complete This Transaction"})
        }
		    
		let cus = `SELECT name,id from stage_api where acc_no = '${data.account_number}'`
		console.log(cus)
		 client.query(cus,(cus_err,r_cus)=>{
			if(cus_err){
                client.release()
				console.error(cus_err)
                return tool.res500(request,res,{error:"Internal Server Error"})
            }
				
			if(!r_cus.rows[0]){            
				client.release()
                return tool.res500(request,res,{error:"Customer Not Found"})
            }
			data['vendor'] = user
			data['request_api_id'] = request.api_log.api_id
			data['table'] = 'tbl_cashcollection_transactions'
			sql = database.insert_query(data)
			 client.query(sql,(t_err,t_res)=>{
				if(t_err){
                    client.release()
					console.error(t_err)
                    return tool.res500(request,res,{error:"Internal Server Error"})
                    }
				let vendor_bal = bal[0].bal - data.amount
							
				sql = database.update_query({table:'tbl_cashcollect_users',edit:user,limit_amount:vendor_bal},'username')
				client.query(sql,(ven_err,ven_res)=>{
					if(ven_err){
						console.log(ven_err)
                        client.release()
                        return tool.res500(request,res,{error:"Internal Server Error"})
                    }
					client.release()
                return tool.res200(request,res,{message:"successful",transactionRef:data['request_api_id'],vendorName:bal[0].name,VendorBal:vendor_bal})
				})
		
			})
		})	

})
	}

})

}