'use strict';
var empty = false;
var password = "",chk_password = "", value_empty = false;
var table = "";

var xhr = new XMLHttpRequest();

var form = new FormData();
var message = "";

function _(id)
{	
	if(document.getElementById(id) == null)
		console(id);
	else
		return document.getElementById(id);
}

function hrm_alert(text,header="Good job!",type="success")
{	
	if(text != "VALUE INSERTED" || text != "UPDATE WAS SUCCESSFUL")
	{
		type = "warning"
		header="Error!"
	}
	
	if(text.includes('LOGIN WAS SUCCESSFUL'))
	{
		type = "success"
		header="SUCCESSFUL"
	}
	
	swal(header, text, type);
}

function alert(text,header="Error!",type="warning")
{
	if(text == "VALUE INSERTED" || text == "UPDATE WAS SUCCESSFUL")
	{
		type = "success"
		header="Good job!"
	}
	swal(header, text, type);
}

function hrm_prompt(text)
{

		let value = false
	swal({
                    title: "Are you sure?",
                    text: text,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                    	//// alert(willDelete)
                        this.value = willDelete
                    } else {
                        this.value = willDelete
                    }
                });
                return value
}

function load()
{
// 	$.get("/active_customer",function(data){
		

// 		console.log(data)
// // data = JSON.parse(data)
// 	$(".userdetails").each(function(e){
// try{
// 	console.log(data[$(this).attr("data-name")])
// 	$(this).html(data[$(this).attr("data-name")])
// }
// catch(err)
// {
// 	console.log(err)
// }
		
// 	})
	

// console.log(recieved)
// })

	$(".load_options").each(function(e)
	{
		$(this).append("<i class=\"fa fa-spinner fa-spin loader\" style=\"font-size:24px\"></i>");
		alert("one Read");
	});

	  $(".table_search").on("keyup",function(e)
    {
        
      $(".tr_data").each(function(e)
      {
              
          $(this).show();


      });
      
      $(".tr_data").each(function(e)
      {
        var find = $(this).attr("name").toLowerCase();
          //alert()
        var mix = new RegExp($(".table_search").val().toLowerCase());
                
        if(!find.match(mix))
        {
          $(this).hide();
        }

        //console.log(find.match(mix));
        //console.log(mix);
      });
      //search = _("search_item").value;
      //Userfolder = _("User_folder").value;
      //Userfile = _("User_files").value;
      //$.post("upload_php_search.php", {"file": Userfile,"folder": Userfolder,"search": search} , Search_Result);
    });

	console.log("APP LOADED");
//NEW FUNCTIONS

$(".select-text").on("click",(e)=>{	
	$(this).select();
	console.log("WELCOME");
});


$(".feed").on('change',(e)=>{
	let rec = $($(this).attr("sub"))
	$.get($(this).attr('url')+"/"+$(this).val(),(data)=>{
		rec.html("")

		console.log(data.length)
// data = JSON.parse(data)
data.transformer.map((item)=>{	
	rec.append('<option value=' + item.id + '>' + item.name + '</option>');
})
	// for (var i = data.length - 1; i >= 0; i--) {
	// 	console.log(data[i])		

	// }	
})
})

$(".controller").on('change',(e)=>{
	let sel = $(this)
	console.log($(this).attr('value'));
	let values = JSON.parse($(this).attr('value'))
	values.forEach((item)=>{
		try{
			console.log(item.option)
			console.log(sel.val())
			if (item.option == sel.val()){
				//classes to show
				for (var i = item.show.length - 1; i >= 0; i--) {
					$('.'+item.show[i]).show()
				}
				//classes to hide
				for (var i = item.hide.length - 1; i >= 0; i--) {
					$('.'+item.hide[i]).hide()
				}
			}
			else
			{
				for (var i = sel.attr('show').split(',').length - 1; i >= 0; i--) {
					console.log(sel.attr('show').split(',')[i])
				}
				//classes to hide
				for (var i = sel.attr('hide').split(',').length - 1; i >= 0; i--) {
					console.log(sel.attr('show').split(',')[i])
				}
			}
		}
		catch(err) {
			console.log(err.message)
		} 
	})

})

$(".multi_load").on("click",function(e){
	console.log("CAMED")
	let main = $($(this).attr("head"));
	console.log(main)
	let sub = $($(this).attr("subhead"));
	console.log(sub)
	main.append("<div class='multi_load multi_load"+$(".multi_load").length+"' ><hr/><a onclick=\"close_panel('.multi_load"+$(".multi_load").length+"')\" style='cursor:pointer;font-size:0.65em'>close</a>"+sub.html()+"</div>");
})

// $(".close_this").on
$(".upload").on("change", function(e)
{
	console.log("CAME HERE");
	$(this).append("<i class=\"fa fa-spinner fa-spin loader\" style=\"font-size:24px\"></i>");

					var reader = new FileReader();
var loaded = 0;
var load_class = $(this).attr("loader");
$(load_class).css("width",loaded+"%");
					$(load_class).html(loaded+"%");
					var output = document.getElementById($(this).attr("output"));
					var output_text = document.getElementById($(this).attr("output_text"));

					reader.addEventListener("load", function(){					
					output.src = reader.result;
					output_text.value = reader.result;
					$(load_class).css("width","100%");
					$(load_class).html(Math.round(100)+"%");
				});
					reader.addEventListener("progress", function(evt){					
					loaded = (evt.loaded / evt.total) * 100;
					console.log(loaded);
					$(load_class).css("width",loaded+"%");
					$(load_class).html(Math.round(loaded)+"%");
				});

				reader.readAsDataURL(e.target.files[0]);				
});






//############CREATE DATE VLUE FOR DATE DROP DOWN
	var date = new Date();


var year = date.getFullYear();

var year_up = year;
var year_down = year - 6;
//alert(year);

var year_val_up = "";
var year_val_down = "";


for(var i = 0; i < 5; ++i)
{
	var val = ++year_up;
	year_val_up += "<option value=" + val + ">" + val + "</option>";
}

for(var i = 0; i < 5; ++i)
{
	var val = ++year_down;
	year_val_down += "<option value=" + val + ">" + val + "</option>";
}
var year_sel = "<option selected value="+year+">"+year+"</option>"
$(".years").html(year_val_down+year_sel+year_val_up);




//#########################################################################
//Edit Form
if(document.getElementById("edit") != null)
{	
	var counter = 0, datas = "", table = "", id = $("#edit").val();	

	$(".input").each(function(e)
	{
		$(this).addClass("fa");
		$(this).addClass("fa-spin");
		$(this).addClass("fa-spinner");
		if(counter > 0)
		{
			if($(this).attr("data-name"))
			datas += $(this).attr("data-name")+",";
		}
		else
		{			
			table += $(this).val();	
		}
	//
		++counter;		
	});

	let url = "/";
	if($("#edit").attr("url") != undefined)
		url = $("#edit").attr("url");
	// $.post(url,{"formdata": datas, "table": $('input[data-name="table"]').val(), "id": id,"csrfmiddlewaretoken":$('input[name="csrfmiddlewaretoken"]').val()}, function(data)
	$.post(url,{"formdata": datas, "table": $('input[data-name="table"]').val(), "id": id}, function(data)
	{
		var num = 0;	
		var number = 0;
		//
		//alert(data);
		var data_array = data;		
		
		$(".input").each(function(e)
		{
			$(this).removeClass("fa");
		$(this).removeClass("fa-spin");
		$(this).removeClass("fa-spinner");
			if(number > 0)
			{
				if($(this).attr("type") == "password" || $(this).attr("data-name") == "table" || $(this).attr("noupdate") != undefined)
				{

				}												
				else
				{
					if($(this).attr("type") == "html")
				{
					$(this).html(data_array[$(this).attr("data-name")]);	
				}
				else
				{
					var is_element_sel = $(this).is("select");

					//// alert($(this).is("select"))
					if(is_element_sel)
					{
							//// alert(data_array[$(this).attr("data-name")]);
							$(this).parent().find(".select-dropdown").val(data_array[$(this).attr("data-name")])
					}
					let view = data_array[$(this).attr("data-name")];
					if (typeof view == 'boolean'){
						view = view.toString();
					}
					$(this).val(view);	
				}
							
			}
			++num;
			}
			++number;

		});
	});
}
//########################################
$("input").each(function(e)
{
	if($(this).attr("data-name") == "table")
		{
			table = $(this).val();
		}

	if($(this).attr("type") == "date")
	{
		$(this).attr("placeholder","mm/dd/yyyy");
	}

	if($(this).attr("type") == "number")
	{
		
	}
});

	$(".media-sel").on("change", function(e)
	{		
		switch(($(".media-sel").val()).toLowerCase())
		{
			case "announcement":
				$(".annouce").show();
				$(".media-file").hide();
			break;

			default:
			$(".annouce").hide();
			$(".media-file").show();
			break;
		}
	});

$("input").on("keyup mousedown",function(e)
{


	if($(this).attr('count') != undefined)
	{
		var str = $(this).val();
//		alert(str.length);
		document.getElementById($(this).attr('count')).innerHTML = str.length;
	}
	if($(this).attr("required") != undefined)
	{
		if($(this).val() == "")
		{
			$(this).css("border-bottom","1px solid red");
		}
		else
			$(this).css("border-bottom","1px solid #e0e0e0");
	}

	
		if($(this).attr("unique") != undefined)
{
	var field = $(this).attr("data-name");
	var data = $(this).val();
	var place = $(this);

	$.post("/classes/unique_field",{"field": field, "data": data, "table": table },function(data)
	{	
		//alert(data);
		if(parseInt(data) > 0)
		{
			place.attr("unique","Not Unique");
		//	console.log("Not In Unique");
		}
		else
		{	
		place.attr("unique","Unique");		
		}		
	},true);
	//console.log("Not Unique");
}		
});

$("textarea").on("keyup mousedown",function(e)
{
	//console.log($(this).val());
	if($(this).attr("required") != undefined)
	{
		if($(this).val() == "")
		{
			$(this).css("border","1px solid red");
		}
		else
			$(this).css("border","1px solid #e0e0e0");
	}
});


$(".signup").on("click",function(e)
{

	empty = false;
	validate();
	if(!empty)
	{					
	form.append("signup","bonus");

	$(".signup").val("Loading.....");
$(this).append("<i class=\"fa fa-spinner fa-spin loader\" style=\"font-size:24px\"></i>");

	xhr.addEventListener("load",function(e)
	{
	//	//hr.responseText);
		
		if(parseInt(xhr.responseText) == 1)
		{
			$(".loader").remove();
			document.getElementById("click").click();		
			$("body").append("<div class=\"modal-backdrop fade in\"></div>");
			$("#myModal").addClass("in");
			$("#myModal").css("display","block");
			$("#myModal").css("padding-right","14px");
			$(".modal-body").html("SIGN UP WAS SUCCESSFUL...<br/> <a href=\"crypto-dashboard\">click here</a> if page doesn't redirects");
			location.replace("/");
			console.log(xhr.responseText);
			$(".signup").val("Register");
		}
		else
		{
			$(".loader").remove();
			document.getElementById("click").click();		
			$("body").append("<div class=\"modal-backdrop fade in\"></div>");
			$("#myModal").addClass("in");
			$("#myModal").css("display","block");
			$("#myModal").css("padding-right","14px");
			$(".modal-body").html(xhr.responseText);
			//location.replace("../my_p_o/paymentoption.php");
			console.log(xhr.responseText);
			$(".si/gnup").val("Register");
		}
	
	});
	
	xhr.open("post","/",true);
	xhr.send(form);		


	//if(true)
	//		//hr.responseText);
	//	else			
	////hr.status);
	}

if(value_empty)
alert(message + "<br>Some Required Field's Are Empty");

});



$(".login").on("click",function(e)
{

	empty = false;
	validate();
	let login = $(this);
	if(!empty)
	{	
		form.append("login","bonus");
		
		$(".login").val("loading.......");
	$(this).append("<i class=\"fa fa-spinner fa-spin loader\" style=\"font-size:24px\"></i>");

	xhr.addEventListener("load",function(e)
	{
		$(".loader").remove();
		
		//hr.responseText);
		if(xhr.responseText == parseInt(1))
		{
			$(".login").val("login");
			xhr.responseText
		// $(".modal-body").html("LOGIN WAS SUCCESSFUL...<br/> <a href=\"crypto-dashboard/\">click here</a> if page doesn't redirects");
		hrm_alert("LOGIN WAS SUCCESSFUL...<br/> <a href=\"/account/\">click here</a> if page doesn't redirects");
		console.log(xhr.responseText);
		 location.replace("/dashboard");
		}
		else
		{
			$(".login").val("login");
		//hr.responseText);
		// $(".modal-body").html(xhr.responseText);
		alert(xhr.responseText);
	}
	});
	if(login.attr("data-ajax") != undefined)
	{
		xhr.open("post",login.attr("data-ajax"),true);
	}
	else
	{
		xhr.open("post","/",true);	
	}
	
	xhr.send(form);		


	//if(true)
	//		//hr.responseText);
	//	else			
	////hr.status);
	}

if(value_empty)
alert(message + "<br>Some Required Field's Are Empty");

});

$(".submit").on("click",function(e)
{
	//alert(empty);


		
	empty = false;
	var confirm_submit = true;
if($(this).attr("prompt") != undefined)
{	
	confirm_submit = confirm($(this).attr("prompt"));

}

//alert(empty);
if(confirm_submit)
{

	if($(this).attr("special-form") != undefined)
{
	var s_class = $(this).attr("s_class");
	//alert("CAME");
	s_validate(s_class);
}
else
{
	validate()
}
if(!empty)
	{
			$(this).append("<i class=\"fa fa-spinner fa-spin loader\" style=\"font-size:24px\"></i>");

if($(this).attr("special-form") != undefined)
{
	
	var myform = special_form(s_class);
			//$(".submit")
			console.log(myform.pop);
	if($(this).attr("edit") != undefined)
	{
		myform.append("edit","true");
		myform.append("id",$(this).attr("edit"));
	}

	xhr.addEventListener("load",function(e)
	{
		console.log(xhr.responseText)
		
		////hr.responseText);
		$(".loader").remove();
		//document.getElementById("click").click();				

		$("#myModal").addClass("in");
		$("#myModal").addClass("show");
		$(".modal-backdrop").fadeIn(500);
	$("#myModal").fadeIn(500);	
		$("#myModal").css("padding-right","14px");


		if($(this).attr("new") == undefined)
		{
			console.log(xhr.responseText)

			//$(".modal-body").html(xhr.responseText);

			if(xhr.responseText.trim() =="VALUE INSERTED"){

				hrm_alert(xhr.responseText)			
				if($(this).attr("sweetalert") != undefined){
					hrm_alert(xhr.responseText)
				}
				$(s_class).each((e)=>{
					if(!$(this).attr("type") == "hidden")
					{
							$(this).val("");
					}
				});							
				location.reload();
		}

		if(xhr.responseText.trim() =="UPDATE WAS SUCCESSFUL"){			
			hrm_alert(xhr.responseText)			
			if($(this).attr("sweetalert") != undefined){
				hrm_alert(xhr.responseText)
			}

			$(s_class).each((e)=>{
			if(!$(this).attr("type") == "hidden"){
					$(this).val("");
				}
			});							
			location.reload();
		}
		}
		else
		{
			var link = $(this).attr("new");			
		
			if(xhr.responseText.trim() =="VALUE INSERTED")
		{

			hrm_alert(xhr.responseText)
			
			if($(this).attr("sweetalert") != undefined)
						{
							hrm_alert(xhr.responseText)
						}
			$(s_class).each((e)=>{
						if(!$(this).attr("type") == "hidden")
						{
								$(this).val("");
						}
				});							
			// location.reload();
					location.replace(link);
		}

		if(xhr.responseText.trim() =="UPDATE WAS SUCCESSFUL")
		{			
						hrm_alert(xhr.responseText)
			
			if($(this).attr("sweetalert") != undefined)
						{
							hrm_alert(xhr.responseText)
						}

				$(s_class).each((e)=>{
						if(!$(this).attr("type") == "hidden")
						{
								$(this).val("");
						}
				});							
			// location.reload();
			location.replace(link);
		}
		
		}
		alert(xhr.responseText)
		console.log(xhr.responseText);
		
	});
	
	if($(this).attr("data-ajax") != undefined)
		xhr.open("post",$(this).attr("data-ajax"),true);
		else	
	xhr.open("post","/",true);
	xhr.send(myform);		
}
else
{
	if(document.getElementById("edit") != null)
	{
		form.append("edit","true");
		form.append("id",$("#edit").val());
	}
	if($(this).attr('multi_app') != undefined)
	{

	let val = []
   $('.app').each((e)=>{
      let appli =$(this).find('.appli').val()
      let number =$(this).find('.number').val()
      let watt =$(this).find('.watt').val()
      let inputs = {'table':'appliances_table','new_customer_ids':$("#edit").val(),'app_light_point':appli,'app_number':number,'app_watt':watt}
      val.push(inputs);


   })
   console.log(val)
	form.append($(this).attr('multi_app'),JSON.stringify(val));
	}
	xhr.addEventListener("load",(e)=>{
		console.log(xhr.responseText)
		
		////hr.responseText);
		$(".loader").remove();
		// document.getElementById("click").click();				

		$("#myModal").addClass("in");
		$("#myModal").addClass("show");
		$(".modal-backdrop").fadeIn(500);
	$("#myModal").fadeIn(500);	
		$("#myModal").css("padding-right","14px");


		if(document.getElementById("new") == null)
		{
			console.log(xhr.responseText)
			// $(".modal-body").html(xhr.responseText);
			
			// if($(this).attr("sweetalert") != undefined)
			// 			{
			// 				hrm_alert(xhr.responseText)
			// 			}
				//	alert("images/thumbs-up.png","Success",xhr.responseText) 

			if(xhr.responseText.trim() =="VALUE INSERTED")
		{
			hrm_alert(xhr.responseText)
			$(".input").each((e)=>{
						if(!$(this).attr("type") == "hidden")
						{
								$(this).val("");
						}
				});							
			location.reload();

		}
		if(xhr.responseText.trim() =="UPDATE WAS SUCCESSFUL")
		{
			hrm_alert(xhr.responseText)
			$(".input").each((e)=>{
						if(!$(this).attr("type") == "hidden")
						{
								$(this).val("");
						}
				});							
			location.reload();
		}
		alert(xhr.responseText)
		}
		else
		{
			console.log(xhr.responseText)
						$(".modal-body").html(xhr.responseText);
						hrm_alert(xhr.responseText)

						if($(this).attr("sweetalert") != undefined)
						{
							hrm_alert(xhr.responseText)
						}
				//	alert("images/thumbs-up.png","Success",xhr.responseText) 

			if(xhr.responseText.trim() =="VALUE INSERTED")
		{
		
			if($(this).attr("success-text") != undefined)
			{
				hrm_alert($(this).attr("success-text"));
			}
			else
			{
				hrm_alert(xhr.responseText)
			}
			$(".input").each(function(e)
				{
						if(!$(this).attr("type") == "hidden")
						{
								$(this).val("");
						}
				});							
			var link = document.getElementById("new").value;			
			location.replace(link);			

		}
		if(xhr.responseText.trim() =="UPDATE WAS SUCCESSFUL")
		{
			if($(this).attr("success-text") != undefined)
			{
				hrm_alert($(this).attr("success-text"));
			}
			else{
				hrm_alert(xhr.responseText)
			}

			$(".input").each(function(e)
				{
						if(!$(this).attr("type") == "hidden")
						{
								$(this).val("");
						}
				});							
			var link = document.getElementById("new").value;			
			location.replace(link);			
		}

			alert(xhr.responseText)
			
					//alert("images/thumbs-up.png","Success",xhr.responseText + "<p><a class=\"success \" style=\"margin: 20px; font-size: 1.3em;\" href=\""+link+"> Next</a></p>");
			//$(".modal-body").html(xhr.responseText + "<p><a class=\"success \" style=\"margin: 20px; font-size: 1.3em;\" href=\""+link+"> Next</a></p>");
		}
		console.log(xhr.responseText);
		
	});
	if($(this).attr("data-ajax") != undefined)
		xhr.open("post",$(this).attr("data-ajax"),true);
		else	
	xhr.open("post","/",true);
	xhr.send(form);		


	//if(true)
	//		//hr.responseText);
	//	else			
	////hr.status);
}
	}
}

if(value_empty)
{
	if($(this).attr("sweetalert") != undefined)
						{
							alert(message + "<br>Some Required Field's Are Empty","ERROR...","info")
						}
						empty = true;
// alert(message + "<br>Some Required Field's Are Empty");
alert(message + "<br>Some Required Field's Are Empty","ERROR...","info")
}


//alert(data.church_email);
/*$.post("churchub.php",data,function(dat)
{
	alert(dat);
});*/
		//alert(JSON.parse(data));	

});

$(".warning").on("click",function(e)
{
	//alert("images/warning.png","Warning","Currently Not Avialable");
});

$(".delete").on("click",function(e)
{
	//alert(empty);



	empty = false;
	//validate();

	//Check For Unique Fields
	//alert(document.getElementsByClassName("input").length);

//alert(empty);
if(!empty)
	{
		if($(this).attr("data-table") != undefined)
		{
		var run = confirm("ARE YOU SURE YOU WANT TO DELETE");
		if(run)
		{
			$(this).append("<i class=\"fa fa-spinner fa-spin loader\" style=\"font-size:24px\"></i>");
		
	
	form.append("delete","delete");
		form.append("table",$(this).attr("data-table"));
		form.append("id",$(this).attr("data-id"));
	

	xhr.addEventListener("load",function(e)
	{
		
		////hr.responseText);
		$(".loader").remove();
		document.getElementById("click").click();				
hrm_alert(xhr.responseText)
			if($(this).attr("sweetalert") != undefined)
						{
							hrm_alert(xhr.responseText)
						}

		$(".modal-body").html(xhr.responseText);
		$("#myModal").addClass("in");
		$(".modal-backdrop").fadeIn(500);
	$("#myModal").fadeIn(500);	
		$("#myModal").css("padding-right","14px");


			
		console.log(xhr.responseText);

		if(xhr.responseText.trim() == "DATA WAS SUCCESSFULLY DELETED")
		location.reload();
	});
	
	xhr.open("post","/",true);
	xhr.send(form);		


	//if(true)
	//		//hr.responseText);
	//	else			
	////hr.status);
}
	}

if(value_empty)
alert(message + "<br>Some Required Field's Are Empty");
}
});

}

function validate(){
	message = "";
	value_empty = false;
var data = {
	table : "tbl_church",
	church: "SMHOS"
};
$(".input").each(function(e)
	{	
		if($(this).attr("unique") != undefined)
{
		if($(this).attr("unique") == "Not Unique")
		{
			value_empty = true;
			alert($(this).attr("label") + " already exist");
			message += $(this).attr("label") + " already exist" + "<br>";
		}
				
		}
	});

	$(".input").each(function()
	{
		if($(this).attr("data-name") == "table")
		{
			table = $(this).val();
		}
		//alert($(this).attr("required"));
if($(this).attr("required") != undefined)
{
	if($(this).val() == "")
	{
		empty = true;
		value_empty = true;
		$(this).css("border-bottom","1px solid red");
	}	
}

if($(this).attr("password") != undefined)
{
	password = $(this).val();	
}
//
if($(this).attr("chk_password") != undefined)
{
	chk_password = $(this).val();
}

//Validate For Numeric figures
if($(this).attr("type") == "number")
{
	var reg = /\d/;
	if(!reg.test($(this).val()))
	{
		var label = $(this).attr("label");
		alert(label +" is not a valid Number");
		message += label +" is not a valid Number" + "<br>";
		//console.log(label +" is not a valid Number");

	empty = true;		
	}
	else
	{
		if($(this).attr("min") != undefined)
		{
			if(parseInt($(this).attr("min")) > parseInt($(this).val()))
			{
				var label = $(this).attr("label");
		alert(label +" Must Not Be More Than "+ $(this).attr("min"));		
		message += label +" Must Not Be More Than "+ $(this).attr("min") + "<br>";
				

	empty = true
			}
		}
		if($(this).attr("max") != undefined)
		{
			if(parseInt($(this).attr("max")) < parseInt($(this).val()))
			{
				var label = $(this).attr("label");
		alert(label +" Must Not Be Lesser Than  "+ $(this).attr("max"));		
		message += label +" Must Not Be Lesser Than "+ $(this).attr("max") + "<br>";

	empty = true
			}
		}
	}

}

//Validate For Email figures
if($(this).attr("type") == "email")
{
	var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;/^[a-zA-Z0-9]+$/
	if(!reg.test($(this).val()))
	{
		var label = $(this).attr("label");
		alert(label +" is not a valid email adddress");
		message += label +" is not a valid email adddress" + "<br>";
		console.log(label +" is not a valid email address");

	empty = true;		
	}
	else
	{
		if($(this).attr("min") != undefined)
		{
			if(parseInt($(this).attr("min")) > parseInt($(this).val()))
			{
				var label = $(this).attr("label");
		alert(label +" Must Not Be Lesser Than "+ $(this).attr("min"));		
		message += label +" Must Not Be Lesser Than "+ $(this).attr("min") + "<br>";

	empty = true
			}
		}
	}

}

//Validate For Email figures
if($(this).attr("type") == "username")
{
	var reg = /^[a-zA-Z0-9]+$/;
	if(!reg.test($(this).val()))
	{
		var label = $(this).attr("label");
		alert(label +" is not a valid username");
		message += label +" is not a valid username" + "<br>";
		console.log(label +" is not a valid username");

	empty = true;		
	}
	else
	{
		if($(this).attr("min") != undefined)
		{
			if(parseInt($(this).attr("min")) > parseInt($(this).val()))
			{
				var label = $(this).attr("label");
		alert(label +" Must Not Be Lesser Than "+ $(this).attr("min"));		
		message += label +" Must Not Be Lesser Than "+ $(this).attr("min") + "<br>";

	empty = true
			}
		}
	}

}

//Validate For Min Character
if($(this).attr("min-len") != undefined)
		{
			if(parseInt($(this).attr("min-len")) > $(this).val().length)
			{
				var label = $(this).attr("label");
		alert(label +" Must Not Be Lesser Than "+ $(this).attr("min-len") + " Character");		
		message += label +" Must Not Be Lesser Than "+ $(this).attr("min-len") + " Character" + "<br>";

	empty = true
			}
		}

//Validate For Current Password
if($(this).attr("match") != undefined)
{
	var label = $(this).attr("label");

	if($(this).attr("match") != $(this).val())
	{
		alert(label +" is An Incorrect Pin");
		hrm_alert(label +" is An Incorrect Pin","error","ERROR Message");
		console.log(label +" is An Incorrect Pin");
		message += label +" is An Incorrect Pin" + "<br>";
	empty = true;		
	}
}

//Validate For length Of password
if($(this).attr("length") != undefined)
{
	var label = $(this).attr("label");

	//alert($(this).val().length);
	if(parseInt($(this).attr("length")) != $(this).val().length)
	{
		alert(label +" is must not be less than " + parseInt($(this).attr("length")) + " Character");
		console.log(label +" is must not be less than " + parseInt($(this).attr("length")) + " Character");

		message += label +" is must not be less than " + parseInt($(this).attr("length")) + " Character" + "<br>";

	empty = true;		
	}
}
	//Validate For Dates
if($(this).attr("type") == "date")
{
	var label = $(this).attr("label");
	if(label == undefined)
		label = $(this).attr("placeholder");
	var reg = /\d{4}\/\d{2}\/\d{2}/;
	if(!reg.test($(this).val()))
	{
		
		// alert(label +" is not a valid Date " + $(this).val());
		console.log(label +" is not a valid Date");

		// message += label +" is not a valid Date" + "<br>";

	empty = false;		
	}
	else
	{
				var date = $(this).val().split("/");

//					alert(parseInt(date[0]));
				if(parseInt(date[0]) > 12)
				{
					alert("Month is not a valid ");
					message += "Month is not a valid " + "<br>";
					empty = true;
				}
				if(parseInt(date[1]) > 31)
				{
					alert("Day is not a valid");
					message += "Day is not a valid" + "<br>";
					empty = true;	
				}
				if(parseInt(parseInt(date[0])) == 2 && parseInt(date[1]) > 29)
				{					
					alert("Day is not a valid");
					message += "Day is not a valid" + "<br>";
					empty = true;		
				}				
	}
}

// if($(this).attr("type") == "checkbox")
// {}
	// console.log($(this).attr("data-name"));
if($(this).attr("data-name") != undefined && $(this).attr("type") != "checkbox")
{
	form.append($(this).attr("data-name"),$(this).val());


}

if($(this).attr("data-name") != undefined && $(this).attr("type") == "checkbox")
form.append($(this).attr("data-name"),$(this).is(":checked"));
	});

// form.append('csrfmiddlewaretoken',$('input[name="csrfmiddlewaretoken"]').val());
console.log("Expected "+ $('input[name="csrfmiddlewaretoken"]').val())


	if(password != chk_password)
	{
		alert(password);
		alert(chk_password);
		alert("PASSWORD DOESN'T MATCH");
		message += "PASSWORD DOESN'T MATCH" + "<br>";
		empty = true;
		value_empty = true;
	}

}

function s_validate(s_class)
{			
	value_empty = false;
var data = {
	table : "tbl_church",
	church: "SMHOS"
};
$(s_class).each(function(e)
	{	
		if($(this).attr("unique") != undefined)
{
		if($(this).attr("unique") == "Not Unique")
		{
			empty = true;
			alert($(this).attr("label") + " already exist");
		}
				
		}
	});

	$(s_class).each(function()
	{
		if($(this).attr("data-name") == "table")
		{
			table = $(this).val();
		}
		//alert($(this).attr("required"));
if($(this).attr("required") != undefined)
{
	if($(this).val() == "")
	{
		empty = true;
		value_empty = true;
		$(this).css("border-bottom","1px solid red");
	}	
}

if($(this).attr("password") != undefined)
{
	password = $(this).val();	
}
//
if($(this).attr("chk_password") != undefined)
{
	chk_password = $(this).val();
}

//Validate For Numeric figures
if($(this).attr("type") == "number")
{
	var reg = /\d/;
	if(!reg.test($(this).val()))
	{
		var label = $(this).attr("label");
		alert(label +" is not a valid Number");
		console.log(label +" is not a valid Number");

	empty = true;		
	}
	else
	{
		if($(this).attr("min") != undefined)
		{
			if(parseInt($(this).attr("min")) > parseInt($(this).val()))
			{
				var label = $(this).attr("label");
		alert(label +" Must Not Be Lesser Than "+ $(this).attr("min"));		

	empty = true
			}
		}
	}

}

//Validate For Email figures
if($(this).attr("type") == "email")
{
	var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;/^[a-zA-Z0-9]+$/
	if(!reg.test($(this).val()))
	{
		var label = $(this).attr("label");
		alert(label +" is not a valid email adddress");
		console.log(label +" is not a valid email address");

	empty = true;		
	}
	else
	{
		if($(this).attr("min") != undefined)
		{
			if(parseInt($(this).attr("min")) > parseInt($(this).val()))
			{
				var label = $(this).attr("label");
		alert(label +" Must Not Be Lesser Than "+ $(this).attr("min"));		

	empty = true
			}
		}
	}

}

//Validate For Email figures
if($(this).attr("type") == "username")
{
	var reg = /^[a-zA-Z0-9]+$/;
	if(!reg.test($(this).val()))
	{
		var label = $(this).attr("label");
		alert(label +" is not a valid username");
		console.log(label +" is not a valid username");

	empty = true;		
	}
	else
	{
		if($(this).attr("min") != undefined)
		{
			if(parseInt($(this).attr("min")) > parseInt($(this).val()))
			{
				var label = $(this).attr("label");
		alert(label +" Must Not Be Lesser Than "+ $(this).attr("min"));		

	empty = true
			}
		}
	}

}

//Validate For Current Password
if($(this).attr("match") != undefined)
{
	var label = $(this).attr("label");

	if($(this).attr("match") != $(this).val())
	{
		alert(label +" is An Incorrect Pin");
		console.log(label +" is An Incorrect Pin");

	empty = true;		
	}
}

//Validate For length Of password
if($(this).attr("length") != undefined)
{
	var label = $(this).attr("label");

	//alert($(this).val().length);
	if(parseInt($(this).attr("length")) != $(this).val().length)
	{
		alert(label +" is must not be less than " + parseInt($(this).attr("length")) + " Character");
		console.log(label +" is must not be less than " + parseInt($(this).attr("length")) + " Character");

	empty = true;		
	}
}
	//Validate For Dates
if($(this).attr("type") == "date")
{
	var label = $(this).attr("label");
	var reg = /\d{2}\/\d{2}\/\d{4}/;
	if(!reg.test($(this).val()))
	{
		
		alert(label +" is not a valid Date");
		console.log(label +" is not a valid Date");

	empty = true;		
	}
	else
	{
				var date = $(this).val().split("/");

//					alert(parseInt(date[0]));
				if(parseInt(date[0]) > 12)
				{
					alert("Month is not a valid ");
					empty = true;
				}
				if(parseInt(date[1]) > 31)
				{
					alert("Day is not a valid");
					empty = true;	
				}
				if(parseInt(parseInt(date[0])) == 2 && parseInt(date[1]) > 29)
				{
					alert("Day is not a valid");
					empty = true;		
				}				
	}

}
if($(this).attr("data-name") != undefined)
form.append($(this).attr("data-name"),$(this).val());
	});

	if(password != chk_password)
	{
		alert(password);
		alert(chk_password);
		alert("PASSWORD DOESN'T MATCH");
		empty = true;
		value_empty = true;
	}

}

function special_form(class_name)
{
	var s_form = new FormData();
	$(class_name).each(function()
	{
			if($(this).attr("data-name") != undefined)
s_form.append($(this).attr("data-name"),$(this).val());
	});

	return s_form;	
}
function _(id)
{
	if(document.getElementsByClassName(id) == null)
		console.log(id);
	else
		return document.getElementsByClassName(id);
}

function submited(id)
{
	_(id).onkeyup = function(e)
	{
		for(var i = 0; _(id).length < i; ++i)
		{
			if(_(id)[i].getAttribute("required") != undefined)
			{
				if(_(id)[i].value == "")
				{
					_(id)[i].style.border = "1px solid red";
				}
				else
					_(id)[i].style.border = "1px solid #e0e0e0";	
			}
		}


	};




var form = new FormData();

for(var i = 0; _(id).length > i; ++i)
	{
			if(_(id)[i].getAttribute("required") != undefined)
			{
				if(_(id)[i].value == "")
				{
					_(id)[i].style.border = "1px solid red";
				}
				else
					_(id)[i].style.border = "1px solid #e0e0e0";	
	}
}

for (var i = 0; _(id).length > i; ++i) {

	if(_(id)[i].getAttribute("required") != undefined)
			{
				if(_(id)[i].value == "")
				{
					_(id)[i].style.border = "1px solid red";
					empty = true;
				}				
}
form.append(_(id)[i].getAttribute("data-name"),_(id)[i].value);
}

if(!empty)
{
	xhr.open("post","../classes/churchub_insert.php",true);
	xhr.send(form);
				
}
else
alert(message + "<br>Some Required Field's Are Empty");

}

function reset(id)
{
	
	for (var i = 1; _(id).length > i; ++i) {
		//alert(_(id)[i].value);
		_(id)[i].value = "";
}
	
	

}

function updateId(e)
{
	if(document.getElementById("edit") != null)
{
	alert(e.value);
	var counter = 0, datas = "", table = "", id = e.value;	
	$(".input").each(function(e)
	{
		if(counter > 0)
		{
			if($(this).attr("data-name"))
			datas += $(this).attr("data-name")+",";
		}
		else
		{			
			table += $(this).val();	
		}
	//
		++counter;		
	});

	$.post("../classes/editform.php",{"formdata": datas, "table": table, "id": id}, function(data)
	{
		var num = 0;	
		var number = 0;
		//
		//alert(data);
		var data_array = JSON.parse(data);		
		//
		//alert(typeof data_array);		
		//
		$(".input").each(function(e)
		{
			if(number > 0)
			{
				if(data_array != null)
				$(this).val(data_array[num]);
				++num;
			}
			++number;

		});
	});
}
}

function count()
{

	setInterval(function()
	{
		$("h9").each(function()
		{

			var time = $(this).attr("data-count") - 1;

//			console.log(time);

var h = Math.floor(time / (60 * 60));


var min = Math.floor((time - (h * 60 * 60)) / 60);

var sec = Math.floor((time - (h * 60 * 60))) - (min * 60);

//console.log(Math.floor((time - (h * 60 * 60)) - 60));

//	console.log(min);
//	console.log(sec);

if(min < 0)
	min = 0;

if(sec < 0)
	sec = 0;

if(min < 10)
min = "0" + min;

if(h < 0)
	h = h;


if(h < 10 && h > -1)
h = "0" + h;


if(sec < 10)
sec = "0" + sec;

if(time > 0)
{
	//console.log(h);
	//console.log(min);
	//console.log(sec);
			
			
				$(this).html( h + "hr(s):" + min  + "min(s):" + sec + "sec");			
		}
		else
		$(this).html( "00" + "hr(s):" + "00"  + "min(s):" + "00" + "sec");				

			$(this).attr("data-count", time);
		});
	}, 1000);
}


function upload()
{
	document.getElementById("file").click();

}


function updatePic()
{
	
	var former = new FormData();

		former.append("edit",$("#edit").val());
		former.append("id",$("#edit").val());
		former.append("table","tbl_user");
			
			former.append("picture",document.getElementById('output').src);

	xhr.addEventListener("load",function(e)
	{
		

		$(".modal-body").html(xhr.responseText);

			location.reload();
		////hr.responseText);
		//console.log(xhr.responseText);
	});
	
	xhr.open("post","/",true);
	xhr.send(former);		

}

function extendView(id)
{
	
	var former = new FormData();

		former.append("transact_id",id);
			former.append("extend","true");					

	xhr.addEventListener("load",function(e)
	{
		
		$(".modal-body").html(xhr.responseText);
		////hr.responseText);
		//console.log(xhr.responseText);
	});
	
	xhr.open("post","../classes/dpclass.php",true);
	xhr.send(former);		


}

function upload(id)
{

            var file = document.getElementById('file').files[0];

            var form = new FormData();

            form.append("action","upload_pop");
            form.append("id",$("#file").attr("data-cir-id")); 

           // alert(id);           
            form.append("img",$(".fileinput-preview img").attr('src'));
            form.append("gh_to", $("#file").attr("data-gh-to"));

//e.target.innerHTML = "loading";

            _("loader_upload").style.display = 'block';
            

            
            form.append("file",file);


            var xml = new XMLHttpRequest();

                xml.addEventListener("progress",function(data)
            {
            	_("loader_upload").style.display = 'block';
             console.log(xml.responseText);
            },false);
            xml.addEventListener("load",function(data)
            {
                console.log(xml.responseText);
                _("loader_upload").style.display = 'none';                
               // alert(xml.responseText);
                close_alert();

            },false);

            xml.open("post","circleData.php",false);            
            xml.send(form);

}

function close_panel(class_var){
	$(class_var).remove();
}
function upload_pop(cir_id)
{
	//this.innerHTML = "loading";

	$(".alert-bar").fadeIn(1000);
	$(".alert-panel").fadeIn(1000);
            
            $(".upload-btn").attr("edit",cir_id);



}

var churchub = {

	file : function(file){

	},
	
};

window.addEventListener('load',function(e)
{
	load();
	//// alert("WE ARE HERE");
});
