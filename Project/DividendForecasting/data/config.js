	
	class User {

	  constructor(login,password) {
		this.Login = login;
		this.Password = password;
	  }
	}
	
	function getUsers(data, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "SELECT * FROM Users";

		  connection.query(sql, function(err, results){
				if (err){ 
				  throw err;
				}
				usersBuf = results;  // Scope is larger than function
				return callback(results);
		})
		connection.end();
	}
	
	function getRoles(data, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "SELECT * FROM Roles";

		  connection.query(sql, function(err, results){
				if (err){ 
				  throw err;
				}
				roles = results;  // Scope is larger than function
				return callback(results);
		})
		connection.end();
	}
	
	function checkUser(userName, password, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "SELECT * FROM Users WHERE Login = '"+userName+"' AND Password = '"+password+"'";

		  connection.query(sql, function(err, results){
				if (err){ 
				  throw err;
				}
				usersBuf = results;  // Scope is larger than function
				return callback(results);
		})
		connection.end();
	}
	
	function addUser(userName, password, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "INSERT INTO Users (Login,Password,RoleID) VALUES ('"+userName+"', '"+password+"',3)";

		  connection.query(sql, function(err, results){
				if (err){return callback(err);}
				return callback(true);
		})
		connection.end();
	}
	
	function deleteUser(userId, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "DELETE FROM Users WHERE ID = "+userId+"";

		  connection.query(sql, function(err, results){
				if (err){return callback(err);}
				return callback(true);
		})
		connection.end();
	}
	
	function updateUser(userId,username,role, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var roleId = 0;
		  if(role == "admin")
		  {
			  roleId = 1;
		  }
		  if(role == "user+")
		  {
			  roleId = 2;
		  }
		  if(role == "user")
		  {
			  roleId = 3;
		  }
		  
		  var sql = "UPDATE Users SET Login = '"+username+"', RoleId = "+roleId+" WHERE ID = "+userId+"";

		  connection.query(sql, function(err, results){
				if (err){return callback(err);}
				return callback(true);
		})
		connection.end();
	}
	
	function resetPassword(userId, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "UPDATE Users SET Password = 'Qwer1234' WHERE ID = "+userId+"";

		  connection.query(sql, function(err, results){
				if (err){return callback(err);}
				return callback(true);
		})
		connection.end();
	}
	
	function getPapers(data, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "SELECT * FROM Papers";

		  connection.query(sql, function(err, results){
				if (err){ 
				  throw err;
				}
				paperBuf = results;  // Scope is larger than function
				return callback(results);
		})
		connection.end();
	}
	
	function addPaper(company, property_form, char_revers, existanse_form, date_in, date_out, sum, procent, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "INSERT INTO Papers (company, property_form, char_revers, existanse_form, date_in, date_out, sum, procent) " + 
		  " VALUES ('"+company+"', '"+property_form+"', '"+char_revers+"', '"+existanse_form+"', '"+date_in+"', '"+date_out+"', '"+sum+"', '"+procent+"')";

		  connection.query(sql, function(err, results){
				if (err){return callback(err);}
				return callback(true);
		})
		connection.end();
	}
	
	function modifyPaper(id,company, property_form, char_revers, existanse_form, date_in, date_out, sum, procent, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "UPDATE Papers SET company = '"+company+"',property_form = '"+property_form+"',char_revers = '"+char_revers+"',existanse_form = '"+existanse_form+"'," +
		  "date_in = '"+date_in+"',date_out = '"+date_out+"', sum = "+sum+", procent = "+procent+" WHERE ID = "+id+"";

		  connection.query(sql, function(err, results){
				if (err){return callback(err);}
				return callback(true);
		})
		connection.end();
	}
	
	function deletePaper(id, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "DELETE FROM Papers WHERE ID = "+id+"";

		  connection.query(sql, function(err, results){
				if (err){return callback(err);}
				return callback(true);
		})
		connection.end();
	}
	
	
	function addModifyLog(id, sum, callback){
		  
		  var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			
			today = yyyy + '-' + mm + '-' + dd;
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
			
		  var sql = "INSERT INTO ModifyLog (DATE, Sum, Paper_Id) VALUES ('"+today+"', "+sum+", "+id+")";

		  connection.query(sql, function(err, results){
				if (err){return callback(err);}
				return callback(true);
		})
		connection.end();
	}
	
	function getModifyLogs(data, callback){
		  
		  const mysql = require("mysql2");

			const connection = mysql.createConnection({
				host: "localhost",
				port:"3306",
				user: "User",
				database: "forecast",
				password: "Qwer1234"
			});
		  
		  var sql = "SELECT * FROM ModifyLog";

		  connection.query(sql, function(err, results){
				if (err){ 
				  throw err;
				}
				divBuf = results;  // Scope is larger than function
				return callback(results);
		})
		connection.end();
	}
	

	module.exports = { checkUser, addUser, getUsers, getRoles, deleteUser, updateUser, resetPassword, getPapers, addPaper, modifyPaper, deletePaper, addModifyLog, getModifyLogs };



	