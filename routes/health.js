const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');

const pnum = 10;


function check(req,res) {
    if (req.session.login == null) {
      req.session.back = '/health';
      res.redirect('/users/login');
      return true;
    } else {
      return false;
    }
  }
  
  router.get('/', (req, res, next)=> {
    if (check(req,res)){ return };
    db.Health.findAll({
      where:{userId: req.session.login.id},
      limit:pnum,
      order: [
        ['createdAt', 'DESC']
      ]
    }).then(health=> {
      var data = {
        title: 'ヘルスケアアプリ',
        login: req.session.login,
        message: '最近の投稿データ',
        form: {find:''},
        content:health
      };
      res.render('health/index', data);    
    });
  });

  router.get('/add', (req, res, next) => {
    if (check(req,res)){ return };
    res.render('health/add', { title: '健康状態' });
  });
  router.post('/add', (req, res, next) => {
    if (check(req,res)){ return };
    db.sequelize.sync()
    .then(() => db.Health.create({
      userId: req.session.login.id,
      begin: req.body.begin,
      weight: req.body.weight,
      state: req.body.state,
      temp: req.body.temp,
    })
    .then(model => {
       res.redirect('/health');
    })
    );
  });

router.get('/edit',(req, res, next)=> {
  db.Health.findByPk(req.query.id)
  .then(health => {
    var data = {
      title: '健康状態の編集',
      form: health
    }
    res.render('health/edit', data);
  });
});

router.post('/edit',(req, res, next)=> {
  db.Health.findByPk(req.body.id)
  .then(health => {
    health.begin = req.body.begin;
    health.weight = req.body.weight;
    health.state = req.body.state;
    health.temp = req.body.temp;
    health.save().then(()=>res.redirect('/health'));
  });
});

router.get('/delete',(req, res, next)=> {
  db.Health.findByPk(req.query.id)
  .then(health => {
    var data = {
      title: '健康状態の削除',
      form: health
    }
    res.render('health/delete', data);
  });
});

router.post('/delete',(req, res, next)=> {
  db.Health.findByPk(req.body.id)
  .then(health => {
    health.destroy().then(()=>res.redirect('/health'));
  });
});


module.exports = router;