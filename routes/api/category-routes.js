const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(categoryRes => res.json(categoryRes))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(categoryRes => {
      if (!categoryRes) {
        res.status(404).json({ message: 'No category found with this id'}); 
        return; 
      }
      res.json(categoryRes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then(categoryRes => res.json(categoryRes))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(categoryRes => {
        if (!categoryRes[0]) {
            res.status(404).json({ message: 'No category found with this id'});
            return;
        }
        res.json(categoryRes);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(categoryRes => {
        if (!categoryRes) {
            res.status(404).json({ message: 'No category found with this id'});
            return;
        }
        res.json(categoryRes);
  })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

module.exports = router;