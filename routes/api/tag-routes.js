const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags, including their associated Product data
router.get('/', async (req, res) => {

  try {
    const tag = await Tag.findAll({
      include: [ { model: Product, as: 'product'} ]
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`, incldues their associated Product data
router.get('/:id', async (req, res) => {
  
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [ { model: Product, as: 'product' } ]
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
