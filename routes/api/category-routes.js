const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const category = await Category.findAll({
      include: [ { model: Product, as: 'products' } ]
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find one category by its `id` value, including associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [ { model: Product, as: 'products' } ]
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  console.log('This happended', req);
  try {
    const category = await Category.update(
      // Denotes what will be replaced
      { category_name: req.body.category_name},
      // Denotes the location based on the /:id
      { where: req.params}
      );
    console.log('This happended', category);
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
