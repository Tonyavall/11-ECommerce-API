const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const dbResponse = await Tag.findAll({
      include: [{ all: true, nested: true }]
    })
    const allTags = dbResponse.map(tag => {
      return tag.get({ plain: true })
    })

    res.status(200).json(allTags)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const dbResponse = await Tag.findByPk(req.params.id, {
      include: [{ all: true, nested: true }]
    })
    const oneTag = dbResponse.get({ plain: true })

    res.status(200).json(oneTag)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const dbResponse = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json({
      message: 'success',
      db: dbResponse
    })
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const dbResponse = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    )
    res.status(200).json({
      message: 'success',
      db: dbResponse
    })
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const dbResponse = await Tag.destroy({
      where: { id: req.params.id }
    })
    res.status(200).json({
      message: 'success',
      db: dbResponse
    })
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
