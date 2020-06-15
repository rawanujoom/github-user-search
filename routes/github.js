'use strict';

const express = require('express');
const superagent = require('superagent');
require('dotenv').config();

const router = express.Router();

const endpoints = {
    base: 'https://api.github.com',
    usersUrl: '/search/users'
};
router.get('/user', (req, res, next)=> {
    let query = req.query.keyword;
    let page = req.query.page || 1;
    if (query && query.trim()) {
        let token = process.env.USER_SEARCH_OAUTH || ''; 
        token = token ? `token ${token}`: '';
        superagent
            .get('https://api.github.com/search/users')
            .query({ q: query })
            .query({ page: page })
            .set('User-Agent', 'rawan-nujoom/1.0')
            .set('Authorization', token)
            .then(result => {
                res.status(200).json(result.body);
            }).catch(err=> {
                next(err);
            });
    } else {
        res.status(500).send({err: 'Empty Search'})
    }
});

module.exports = router;