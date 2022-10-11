const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model:Tag,
        through: ProductTag,
      },
    ],
  })
  .then((tags)=> res.status(200).json(tags))
  .catch((err)=> res.status(500).json(err))
  // find all tags
  // be sure to include its associated tag data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      Category,
      {
        model: Product,
        through: ProductTag,
      },
    ],
    
   })
  .then((tag)=> res.status(200).json(tag))
  .catch((err)=> res.status(400).json(err))
  // find a single tag by its `id`
  // be sure to include its associated tag data
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag)=> res.status(200).json(tag))
  .catch((err)=> res.status(400).json(err))
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then((tag)=> res.status(200).json(tag))
  .catch((err)=> res.status(400).json(err))
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then((tag)=> res.status(200).json(tag))
  .catch((err)=> res.status(400).json(err))
  // delete on tag by its `id` value
});

module.exports = router;
