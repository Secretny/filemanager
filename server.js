var express = require('express')
const PORT = 3000
var path = require('path')
var formidable = require('formidable');
var app = express()
var bodyParser = require('body-parser')
var hbs = require('express-handlebars')

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: "views/partials",
}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/static'));


app.get('/', (req, res) => {
    res.render('filemanager.hbs')
})

app.get('/upload', (req, res) => {
    res.render('upload.hbs', { layout: "main.hbs" })
});

let data = { "files": [] }
app.post('/uploadSend', (req, res) => {
    let form = formidable({});
    form.keepExtensions = true
    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia
    form.multiples = true
    form.parse(req, function (err, x, file) {
        let id = 1
        for (var i = 0; i < file.upload.length; i++) {
            if (file.upload[i].type == 'image/jpeg') {
                image = 'img.png'
            }
            else if (file.upload[i].type == 'application/x-msdownload') {
                image = 'exe.png'
            }
            else if (file.upload[i].type == 'application/pdf') {
                image = 'pdf.png'
            }
            else if (file.upload[i].type == 'text/plain') {
                image = 'txt.png'
            }
            else {
                image = 'unknown.png'
            }
            data.files.push({
                id: id,
                image: image,
                name: file.upload[i].name,
                size: file.upload[i].size,
                type: file.upload[i].type,
                path: file.upload[i].path,
            })
            id += 1
        }

        res.render('upload.hbs', { layout: "main.hbs" })
    })
})

app.get('/filemanager/clicked', (req, res) => {
    did = false
    for (var i = 0; i < data.files.length; i++) {
        if (data.files[i].id == req.query.id) {
            data.files.splice(i, 1)
            did = true
        }
        if (did) {
            data.files[i].id -= 1
        }
    }
    res.redirect('/filemanager');
})

app.get('/reset', (req, res) => {
    res.render('reset.hbs', { layout: "main.hbs" })
})

app.get('/filemanager', (req, res) => {
    console.log(data);
    res.render('filemanager.hbs', data)
})

app.listen(PORT, (req, res) => {
    console.log('nasłuchiwanie na porcie' + PORT)
})