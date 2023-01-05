const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll();
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // find one category by its `id` value
router.get('/:id', async (req, res) => {
  try{
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    if(!categoriesData) {
      res.status(404).json({ message: 'No categories found with this id'});
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // create a new category
router.post('/', async (req, res) => {
  try{
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch(err) {
    res.status(400).json(err);
  }
});




  // update a category by its `id` value

router.put('/:id', (req, res) => {
  // update product data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      // find all associated tags from ProductTag
     res.json(category)
    })
});  


 // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
 try{
  const categoriesData = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).end();
 } catch(err) {
  res.status(500).json(err);
 }
});

module.exports = router;
