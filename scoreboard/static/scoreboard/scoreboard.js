document.addEventListener('DOMContentLoaded', function () {

	// Use buttons to toggle between views
	$('#index').click(function () {
		location.href = '/';
	});

	$('#settings_list').click(function () {
		location.href = `${this.dataset.url}`
	});

	$('#settings_create').click(function () {
		location.href = `${this.dataset.url}`
	});

	$('#admin').click(function () {
		location.href = `${this.dataset.url}`
	});

	$('.game-time p').each(function () {
		this.innerText = new Date(this.dataset.datetime).toLocaleTimeString();
	});

	$('#settingsform > label:nth-child(6)').html("");

	// Add's JSON config to modal when profile is clicked on Profile Page.
	// TODO: Allow users to edit and save form here. MUST BE VALIDATED!
	$(document).on("click", ".modal-link", function () {
		var data = this.dataset.json
		$("#prettyJSON").text(data);
   	});

	$('button#activate').click(function () {
		const csrftoken = Cookies.get('csrftoken');
		fetch(`${this.dataset.editurl}`, {
			headers: {'X-CSRFToken': csrftoken},
			method: 'PUT',
			body: JSON.stringify({
				"activated": true
			})
		})
		.then(response => response.json())
		.then(result => {
			console.log(result);
			if (result.activated != true) {
				document.querySelector('#message').innerHTML = `
					<div class="alert alert-error alert-dismissible fade show">
						<strong>Error!</strong> Profile activation unsuccessful.
						<button type="button" class="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>  
				`;
			} else {
				location.reload();
			};			
		});
	});

});