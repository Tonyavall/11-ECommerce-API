const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const dbResponse = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ]
    })

    const allCategories = dbResponse.map(category => {
      return category.get({plain: true})
    })

    res.status(200).json(allCategories)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbResponse = await Category.findByPk(req.params.id, {
      include: [{ all: true, nested: true }],
    })
    const oneCategory = dbResponse.get({plain:true})
    res.status(200).json(oneCategory)
  } catch(err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const dbResponse = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    })
    res.status(200).json(dbResponse);
  } catch(err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const dbResponse = await Category.update({
      id: req.body.id,
      category_name: req.body.category_name,
    })
    res.status(200).json(dbResponse);
  } catch(err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const dbResponse = await Category.destroy({
      where: { id: req.params.id }
    })
    res.status(200).json({message: 'Success', res: dbResponse})
  } catch(err) {
    res.status(400).json(err)
  }
});

module.exports = router;
