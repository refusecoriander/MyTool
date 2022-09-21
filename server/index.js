const express = require("express")

const app = express()

app.set('secret', 'i2u34y12oi3u4y8')

app.use(require('cors')())

app.use(express.json())

// 静态文件托管到根路径
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)

require('./routes/admin')(app)

require('./routes/web')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
});