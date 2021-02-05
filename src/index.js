var express = require('express')
var multer = require ('multer')
var path = require('path')
var fs = require('fs')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var _path = path.join(__dirname, "../temp")
        if(!fs.existsSync(_path)){
            fs.mkdirSync(_path)
        }
        cb(null, _path)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
var app = express()

app.get('/', function(req, res) {
  res.send(`
    <form>
        <input type="file" name="photos" id="photos"/>
        <input type="button" value="submit" id="btn_submit">
    </form>
    <script>
        window.onload = function(){
            document.getElementById('btn_submit').onclick = function(){
                var myForm = new FormData()
                let files = document.querySelector('[type=file]').files
                for(var i = 0; i < files.length; i++){
                    myForm.append("photos", files[i])              
                }                
                var xhr = new XMLHttpRequest()
                xhr.open("POST", "/up")
                xhr.send(myForm)
            }
        }
    </script>  
  `)
})

app.post('/up', upload.array('photos', 12), function(req, res, next) {
    res.end('上传成功')
})

app.listen(3000)