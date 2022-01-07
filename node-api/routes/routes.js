var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/config_key');
let database = require('../tools/postgres')

module.exports = (app)=>{
    
app.get('/',(request,res) => {
	
	return res.json({message:"Server Ready"})
})

//Vendor Signin Route
app.post('/signin',async (request,res)=> {
	let db = await pool.connect()
	let d = request.body
	console.log(d)
	let sql = `SELECT * from ${d.table} where username = '${d.username}' and password = '${d.password}'`

await db.query(sql,(err,result)=>{
		if(err){
			db.release();
			return res.json({error:"User not found"})
		}
			
		// console.log(result.rows)
		if(result.rows[0]){
			db.release();
			return res.json(result.rows[0])
		}		
		else
			{
				db.release();
				return res.json({error:"User not found"})
			}
	})
})

//Vendor Record Generating Route
app.get('/vendors', async (request,res) =>{
	let sql = 'select * from tbl_cashcollect_users'
	let db = await pool.connect()
	await db.query(sql,(err,result)=>{
		if(err){
			db.release();
			return res.status(500).json({error:"An Error Occured"})
		}
		db.release();
		return res.json(result.rows)
	})
})

//Vendor Creation Route
app.post('/signup',async (request,res) =>
{

	// console.log("hello")
	//Verify Password And Encrypt
	if(request.body.password)
		request.body['password_encrypt'] = bcrypt.hashSync(request.body.password,8)
	request.body['token'] = jwt.sign({username : request.body.username},config.secret)
	
	const dem = database.insert_query(request.body)
	console.log(dem)
	let db = await pool.connect()
	await db.query(dem,(err,result)=>{
	if(err)
	{
		console.log(err)
		db.release();
		return res.status(500).json({error:"Error"})
	}
	db.release();
	return res.status(200).json({message:"success",token:request.body['token']})
	
  })
})

//SQL Select Query Route for table views
app.get('/get/table',async (request,res) =>{
	sql = request.query.sql
	let db = await pool.connect()
	await db.query(sql,(err,result)=>{
		if(err)
			{
				db.release();
				return res.status(200).json([])
			}
			db.release();
		return res.json(result.rows);

	})
})

}