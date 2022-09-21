module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Category = mongoose.model('Category')

    const Item = mongoose.model('Item')
    router.get('/items/list', async (req, res) => {
        const item = await Item.find()
        res.send(item)
    });
    router.get('/2021-01/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-01',
        })
        res.send(date)
    })
    router.get('/2021-02/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-02',
        })
        res.send(date)
    })
    router.get('/2021-03/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-03',
        })
        res.send(date)
    })
    router.get('/2021-04/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-04',
        })
        res.send(date)
    })
    router.get('/2021-05/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-05',
        })
        res.send(date)
    })
    router.get('/2021-06/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-06',
        })
        res.send(date)
    })
    router.get('/2021-07/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-07',
        })
        res.send(date)
    })
    router.get('/2021-08/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-08',
        })
        res.send(date)
    })
    router.get('/2021-09/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-09',
        })
        res.send(date)
    })
    router.get('/2021-10/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-10',
        })
        res.send(date)
    })
    router.get('/2021-11/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-11',
        })
        res.send(date)
    })
    router.get('/2021-12/list', async (req, res) => {
        const date = await Item.find({
            month: '2021-12',
        })
        res.send(date)
    })
    // ----------------Organs-------------------------------
    router.get('/adrenals/list', async (req, res) => {
        const adrenal = await Category.find({
            name: '肾上腺'
        }).populate({
            path: `adrenals`
        }).lean()
        res.send(adrenal)
    })
    router.get('/hearts/list', async (req, res) => {
        const heart = await Category.find({
            name: '心脏'
        }).populate({
            path: 'hearts'
        }).lean()
        res.send(heart)
    })
    router.get('/chests/list', async (req, res) => {
        const chest = await Category.find({
            name: '胸部'
        }).populate({
            path: 'chests'
        }).lean()
        res.send(chest)
    })

    router.get('/colons/list', async (req, res) => {
        const colon = await Category.find({
            name: '结肠'
        }).populate({
            path: 'colons'
        }).lean()
        res.send(colon)
    })
    router.get('/genitourinarys/list', async (req, res) => {
        const genitourinary = await Category.find({
            name: '泌尿生殖器'
        }).populate({
            path: 'genitourinarys'
        }).lean()
        res.send(genitourinary)
    })
    router.get('/kidneys/list', async (req, res) => {
        const kidney = await Category.find({
            name: '肾脏'
        }).populate({
            path: 'kidneys'
        }).lean()
        res.send(kidney)
    })

    router.get('/livers/list', async (req, res) => {
        const liver = await Category.find({
            name: '肝脏'
        }).populate({
            path: 'livers'
        }).lean()
        res.send(liver)
    })
    router.get('/musculoskeletals/list', async (req, res) => {
        const musculoskeletal = await Category.find({
            name: '肌肉骨骼'
        }).populate({
            path: 'musculoskeletals'
        }).lean()
        res.send(musculoskeletal)
    })
    router.get('/neuros/list', async (req, res) => {
        const neuro = await Category.find({
            name: '神经'
        }).populate({
            path: 'neuros'
        }).lean()
        res.send(neuro)
    })

    router.get('/pancreass/list', async (req, res) => {
        const pancreas = await Category.find({
            name: '胰腺'
        }).populate({
            path: 'pancreass'
        }).lean()
        res.send(pancreas)
    })
    router.get('/smallBowels/list', async (req, res) => {
        const smallBowel = await Category.find({
            name: '小肠'
        }).populate({
            path: 'smallBowels'
        }).lean()
        res.send(smallBowel)
    })
    router.get('/spleens/list', async (req, res) => {
        const spleen = await Category.find({
            name: '脾脏'
        }).populate({
            path: 'spleens'
        }).lean()
        res.send(spleen)
    })

    router.get('/stomachs/list', async (req, res) => {
        const stomach = await Category.find({
            name: '胃'
        }).populate({
            path: 'stomachs'
        }).lean()
        res.send(stomach)
    })
    router.get('/traumas/list', async (req, res) => {
        const trauma = await Category.find({
            name: '创伤'
        }).populate({
            path: 'traumas'
        }).lean()
        res.send(trauma)
    })
    router.get('/vasculars/list', async (req, res) => {
        const vasculars = await Category.find({
            name: '血管'
        }).populate({
            path: 'vasculars'
        }).lean()
        res.send(vasculars)
    })

    app.use('/web/api', router)
}