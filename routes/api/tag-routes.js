const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(tagRes => res.json(tagRes))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(tagRes => {
      if (!tagRes) {
        res.status(404).json({ message: 'No tag found with this id'});
        return;
      }
      res.json(tagRes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then(tagRes => res.json(tagRes))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(tagRes => {
        if (!tagRes[0]) {
            res.status(404).json({ message: 'No tag found with this id'});
            return;
        }
        res.json(tagRes);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(tagRes => {
        if (!tagRes) {
            res.status(404).json({ message: 'No tag found with this id'});
            return;
        }
        res.json(tagRes);
  })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

module.exports = router;
