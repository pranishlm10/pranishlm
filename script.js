function get_user_data_from_github()
{	
	var username_info = document.getElementById("username").value;
	
	user_profile_api().then(
	  function(value) {display_user_info(value);},
	  function(error) {display_user_info(error);}
	);
	
	display_repo_api().then(
	  function(value) {display_repo_information(value);},
	  function(error) {display_repo_information(error);}
	);
	
	async function user_profile_api() 
	{
		try
		{	
			const api_response = await fetch("https://api.github.com/users/" + username_info);
			let all_github_info = await api_response.json();
			
			var user_github_info_array = new Array(all_github_info.avatar_url, all_github_info.name, all_github_info.login, all_github_info.email, all_github_info.location, all_github_info.public_gists);
		
			return user_github_info_array;
		}
		
		catch (e) 
		{
			console.log(e);
		}
	}
	
	
	async function display_repo_api() 
	{
		try
		{	
			const repo_api = await fetch("https://api.github.com/users/" + username_info + "/repos");
			let user_repo_info = await repo_api.json();
			
			var repo_information_array = new Array();
			
			for(i = 0; i < user_repo_info.length; i++)
			{
				repo_information_array.push(user_repo_info[i].name);
				repo_information_array.push(user_repo_info[i].description);
			}
			
			return repo_information_array;

		}
		
		catch (e) 
		{
			console.log(e);
		}
	}
	
}

get_user_data_from_github();

function display_user_info(github_info_from_users_array) {
	document.getElementById("avatar").innerHTML = '<img src="' + github_info_from_users_array[0] + '" height=200px />' + "";
	document.getElementById("first_name").innerHTML = github_info_from_users_array[1] + "";
	document.getElementById("uname").innerHTML = github_info_from_users_array[2] + "";
	document.getElementById("email").innerHTML = github_info_from_users_array[3] + "";
	document.getElementById("location").innerHTML = github_info_from_users_array[4] + "";
	document.getElementById("no_of_gists").innerHTML = github_info_from_users_array[5] + "";
}


function display_repo_information(repo_info_from_users_array) {
	
	var j = 0;
	
	var repo_html_table = document.getElementById('user_repo_table').getElementsByTagName('thead')[0];
	
	repo_html_table.innerHTML = "";

	var new_row_added = repo_html_table.insertRow(repo_html_table.rows.length);
	
	for(i = 0; i < repo_info_from_users_array.length; i++)
	{
		if (typeof repo_info_from_users_array[j] == "undefined")
		{
			break;
		}
		
		else
		{
			new_row_added = repo_html_table.insertRow(repo_html_table.rows.length);
			new_row_added.innerHTML = "Name: " + repo_info_from_users_array[j];
			
			j++;
			
			new_row_added = repo_html_table.insertRow(repo_html_table.rows.length);
			new_row_added.innerHTML = "Description: " + repo_info_from_users_array[j];
			
			j++;
		}
		
	}
}