	const loginError = document.GetElementById("login-error-msg");
	
	function notPassword()
	{
		loginError.style.opacity = 1;
	}

	module.exports = { notPassword };

$(document).ready(function(){
	$('.table tr').hover(function(){
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});
 
	$('.table tr').click(function(){
		$('.table tr').removeClass('active');
		$(this).addClass('active');
	});
});