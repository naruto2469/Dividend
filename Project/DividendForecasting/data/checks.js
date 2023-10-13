	function checkPassword(password,password1)
	{
		if(password==password1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	module.exports = { checkPassword };	