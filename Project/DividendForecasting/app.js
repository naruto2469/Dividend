// Imports
const chalk = require('chalk')
const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const url = require('url')

//const errorMsg = chalk.bgKeyword('white').redBright;;
//const successMsg = chalk.bgKeyword('green').white;

const app = express()
const port = 5000

const func = require("./data/config.js") // Подключение модуля config.js
const check = require("./data/checks.js") // Подключение модуля checks.js


app.use(express.static('public')) // Настройка статических файлов в папке 'public'



app.use(expressLayouts) // Использование модуля express-ejs-layouts для шаблонизации
app.set('layout', './layouts/full-width') // Установка макета по умолчанию
app.set('view engine', 'ejs')
var curUserName = ""
var curUserRole = ""

// GET
app.get('', (req, res) => {
	res.render('index', { title: 'Home Page', userName: curUserName, userRole: curUserRole })
})


app.get('/modifyUser', (req, res) => {
	var idUser = req.query.id;
	var loginUser = req.query.login;
	var messageUser = req.query.message;
	console.info(req.query.login);
	res.render('modifyUser', { title: 'Modify User', id: idUser, login: loginUser, message: messageUser, userName: curUserName, userRole: curUserRole })
})


app.get('/modifyPapersForm', (req, res) => {
	var date1 = req.query.date_in; // Получение параметра 'date_in' из запроса
	date1 = date1.split(".");
	var date1M = date1.reverse().join("-");

	var date2 = req.query.date_out;
	date2 = date2.split(".");
	var date2M = date2.reverse().join("-");

	var id_ = req.query.id;
	var company_ = req.query.company;
	var property_form_ = req.query.property_form;
	var char_revers_ = req.query.char_revers;
	var existanse_form_ = req.query.existanse_form;
	var date_in_ = date1M;
	var date_out_ = date2M;
	var sum_ = req.query.sum;
	var procent_ = req.query.procent;
	res.render('ModifyPaper', {
		title: 'Modify Paper', idd: id_, company: company_, property_form: property_form_, char_revers: char_revers_, existanse_form: existanse_form_,
		date_in: date_in_, date_out: date_out_, sum: sum_, procent: procent_, userName: curUserName, userRole: curUserRole
	})
})


app.get('/_avto', (req, res) => {
	var name = req.query.userName;
	var role = req.query.userRole;
	res.render('index', { title: 'Home Page', userName: name, userRole: role })
})


app.get('/paper', (req, res) => {
	func.getPapers("", function (result) {
		papersBuf = result; // 
		if (papersBuf.length) //
		{
			func.getModifyLogs("", function (result) { // Вызов функции getModifyLogs с пустыми аргументами и обратным вызовом
				divBuf = result; // Присвоение переменной divBuf результата функции
				res.render('paper', { title: 'Papers Page', papers: papersBuf, divBuff: divBuf, userName: curUserName, userRole: curUserRole })
			});
		}
		else {
			res.render('paper', { title: 'Papers Page', papers: papersBuf, userName: curUserName, userRole: curUserRole })
		}

	});
})


app.get('/users', (req, res) => {
	func.getUsers("", function (result) {
		usersBuf = result;
		if (usersBuf.length) {
			func.getRoles("", function (result) {
				roleslist = result;
				if (roles.length) {
					console.info(roleslist.indexOf(0));
					res.render('users', { title: 'Home Page', users: usersBuf, roles: roleslist, userName: curUserName, userRole: curUserRole })
				}
				else {
					res.render('message', { title: 'Message', data: "Таблица ролей пуста" })
				}
			});
		}
		else {
			res.render('message', { title: 'Message', data: "Таблица пользователей пуста" })
		}

	});
})

app.get('/exit', (req, res) => {
	app.set('layout', './layouts/full-width'); // Установка шаблона 'full-width' для макета страницы
	curUserName = ""; // Сброс значения переменной curUserName
	curUserRole = 0; // Сброс значения переменной curUserRole
	res.render('index', { title: 'Стартовая страница', userName: curUserName, userRole: curUserRole }) // Отображение шаблона 'index' с передачей параметров
})

app.get('/contacts', (req, res) => {
	console.info(curUserRole);
	res.render('contacts', { title: 'Контакты', userName: curUserName, userRole: curUserRole }) //
})

app.get('/about', (req, res) => {
	res.render('about', { title: 'О программе', userName: curUserName, userRole: curUserRole })
})

app.get('/avt', (req, res) => {
	res.render('avt', { title: 'Avtorize', error: '' })
})

app.get('/avt_error', (req, res) => {
	var errorMes = req.query.message;
	res.render('avt', { title: 'Avtorize', error: errorMes })
})

app.get('/reg', (req, res) => {
	res.render('reg', { title: 'Register' })
})

app.get('/message_reg', (req, res) => {
	var mes = req.query.message;
	res.render('message', { title: 'Message', data: mes })
})

app.get('/add_paper', (req, res) => {
	var mes = req.query.message;
	res.render('AddPaper', { title: 'Add Paper', userName: curUserName, userRole: curUserRole })
})

//POST
const urlencodedParser = bodyParser.urlencoded({ extended: false });


app.post('/avt_input', urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);

	func.checkUser(request.body.username, request.body.password, function (result) {
		usersBuf = result;
		if (usersBuf.length) {
			curUserName = request.body.username;
			console.info(usersBuf[0].RoleId);

			curUserRole = usersBuf[0].RoleId;
			app.set('layout', './layouts/full-avto'); // Установка шаблона 'full-avto' для макета страницы
			response.redirect(url.format({
				pathname: "/_avto",
				query: {
					"userName": request.body.username,
					"userRole": usersBuf.RoleId //
				}
			}));
		}
		else {
			response.redirect(url.format({
				pathname: "/avt_error",
				query: {
					"message": "Неправильный логин или пароль"
				}
			}));
		}

	});
});

// Обработка POST-запроса на регистрацию
app.post('/reg_input', urlencodedParser, function (request, response) {

	if (!request.body) return response.sendStatus(400);
	if (check.checkPassword(request.body.password, request.body.password_)) {
		func.addUser(request.body.username, request.body.password, function (result) {
			res = result;
			response.redirect(url.format({
				pathname: "/message_reg",
				query: {
					"message": "Регистрация пройдена успешно. Осуществите вход под созданной учетной записью."
				}
			}));
		});
	}
	else {
		response.redirect(url.format({
			pathname: "/message_reg",
			query: {
				"message": "Введенные пароли не совпадают между собой."
			}
		}));
	}

});

app.post('/del_user', urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);
	console.info(request.body);
	func.deleteUser(request.body.id, function (result) {
		res = result;
		if (result) {
			response.redirect("/users");
		}
		else {
			response.redirect(url.format({
				pathname: "/message_reg",
				query: {
					"message": "Ошибка в ходе удаления пользователя."
				}
			}));
		}
	});
});

app.post('/modifyUserPost', urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);
	response.redirect(url.format({
		pathname: "/modifyUser",
		query: {
			"id": request.body.idUser,
			"login": request.body.username,
			"message": ""
		}
	}));
});

app.post('/modifyUserPost2', urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);
	console.info(request.body);
	func.updateUser(request.body.idUser, request.body.username, request.body.role, function (result) {
		res = result;
		if (result) {
			response.redirect(url.format({
				pathname: "/modifyUser",
				query: {
					"id": request.body.idUser,
					"login": request.body.username,
					"message": ""
				}
			}));
		}
		else {
			response.redirect(url.format({
				pathname: "/message_reg",
				query: {
					"message": "Ошибка в ходе изменении информации о пользователе."
				}
			}));
		}
	});
});

app.post('/resetPassword', urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);
	console.info(request.body);
	func.resetPassword(request.body.idUser, function (result) {
		res = result;
		if (result) {
			response.redirect(url.format({
				pathname: "/modifyUser",
				query: {
					"id": request.body.idUser,
					"login": request.body.username,
					"message": "Пароль успешно сброшен."
				}
			}));
		}
		else {
			response.redirect(url.format({
				pathname: "/message_reg",
				query: {
					"message": "Ошибка в ходе сброса пароля."
				}
			}));
		}
	});
});

app.post('/addPaper', urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);
	response.redirect(url.format({
		pathname: "/add_Paper",
		query: {

		}
	}));
});

app.post('/addPaperDB', urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);
	func.addPaper(request.body.company, request.body.property_form, request.body.char_revers, request.body.existanse_form, request.body.date_in, request.body.date_out, request.body.sum, request.body.procent, function (result) {
		res = result;
		if (res) {
			response.redirect("/paper");
		}
		else {
			response.redirect(url.format({
				pathname: "/message_reg",
				query: {
					"message": "Ошибка добавления ценных бумаг."
				}
			}));
		}
	});
});


app.post('/modifyPapersPost', urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);
	console.info(request.body.sum);
	response.redirect(url.format({
		pathname: "/modifyPapersForm",
		query: {
			"id": request.body.id,
			"company": request.body.company,
			"property_form": request.body.property_form,
			"char_revers": request.body.char_revers,
			"existanse_form": request.body.existanse_form,
			"date_in": request.body.date_in,
			"id": request.body.id,
			"date_out": request.body.date_out,
			"sum": request.body.sum[0],
			"procent": request.body.procent
		}
	}));
});

app.post('/modifyPaperDB', urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);
	func.addModifyLog(request.body.id, request.body.sum, function (result) {
		res = result;
	});

	func.modifyPaper(request.body.id, request.body.company, request.body.property_form,
		request.body.char_revers, request.body.existanse_form, request.body.date_in, request.body.date_out, request.body.sum, request.body.procent, function (result) {
			res = result;
			if (res) {
				response.redirect("/paper");
			}
			else {
				response.redirect(url.format({
					pathname: "/message_reg",
					query: {
						"message": "Ошибка изменения данных ценных бумаг."
					}
				}));
			}
		});
});

app.post('/deletePaper', urlencodedParser, function (request, response) {
	if (!request.body) return response.sendStatus(400);
	console.info(request.body.id);
	func.deletePaper(request.body.id, function (result) {
		res = result;
		if (result) {
			response.redirect("/paper");
		}
		else {
			response.redirect(url.format({
				pathname: "/message_reg",
				query: {
					"message": "Ошибка в ходе удаления ценных бумаг."
				}
			}));
		}
	});
});

app.listen(port, () => console.info(`App listening on port ${port}`))
