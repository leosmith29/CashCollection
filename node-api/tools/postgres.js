
const return_test = (obj) =>{
	return obj
}
const insert_query = (obj) =>{
	let vals ='',table ='',keys = ''
	console.log(obj)

if(typeof obj == 'object')
{
	//get Table
	table = obj.table != undefined ? obj.table : ''
	delete obj.table

	
	Object.entries(obj).forEach((value,ind) =>
	{
		keys += `${value[0]},`;
		vals += `'${value[1]}',`;	
	})
}

	keys = keys.substring(0,keys.length - 1)
	vals = vals.substring(0,vals.length - 1)
	return `insert into ${table} (${keys}) values (${vals})`

}

const update_query = (obj,col='id') =>{
	let vals ='',table ='',id = ''
	

if(typeof obj == 'object'){
	//get Table
		table = obj.table != undefined ? obj.table : ''
		// delete obj.table	
		id =  obj.edit != undefined ? obj.edit : ''
		// delete obj.edit
	
	
	Object.entries(obj).forEach((value,ind) =>
	{
		vals += value[0] != 'table' && value[0] != 'edit' ? `${value[0]} = '${value[1]}',` : '';

	})
}
	vals = vals.substring(0,vals.length - 1)	
	return `update  ${table} set ${vals} where ${col} = '${id}' `
}
// let database = {}
module.exports = {
	// database,
	update_query,
	insert_query,
	return_test,
}