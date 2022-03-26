"use strict";

var model = require("./model.js");

module.exports.query = query;
module.exports.save = save;
module.exports.show = show;
module.exports.update = update;
module.exports.getCategories = getCategories;

function query(req, res) {
    model.load("games", function(entities) {
        if(req.query.filter){
            try {
                req.query.filter = JSON.parse(req.query.filter);
            } catch(e) {
                console.log('invalid query');
            }
            console.log(req.query);
            var categories = req.query.filter.categories;
            if(categories !== undefined) {
                entities = entities.filter(function(obj) {
                    return obj.categories.indexOf(categories.toString().toLowerCase()) > -1;
                });
            }
            var minRating = parseFloat(req.query.filter.minRating, 10);
            if(minRating !== undefined  && !isNaN(minRating)) {
                entities = entities.filter(function(obj) {
                    return parseFloat(obj.rating, 10) >= minRating;
                });
            }
            var maxRating = parseFloat(req.query.filter.maxRating, 10);
            if(maxRating !== undefined && !isNaN(maxRating)) {
                entities = entities.filter(function(obj) {
                    return parseFloat(obj.rating, 10) <= maxRating;
                });
            }
        }
        var count = entities.length;
        entities = pagination(entities, req.query.page, req.query.pageSize);

        res.status(200).json({count: count, games: entities});
    });
}

function save(req, res) {
    // console.log(req);
    model.load("games", function(entities) {
        var lastId = 1
        if(entities.length > 0){
            lastId = parseInt(entities[entities.length - 1]._id);
        }
        req.body._id = lastId + 1;
        entities.push(req.body);
        model.save("games", entities);
        res.status(200).json(req.body);
    });
}

function show(req, res) {
    model.load("games", function(entities) {
        for(var i = 0, n = entities.length; i < n; i++) {
            var elem = entities[i];
            if(req.params.id === elem._id.toString()) {
                res.status(200).json(elem);
                return;
            }
        }
        res.status(404).json({});
    });
}

function update(req, res) {
    model.load("games", function(entities) {
        for(var i = 0, n = entities.length; i < n; i++) {
            var elem = entities[i];
            if(req.params.id === elem._id.toString()) {
                entities[i] = req.body;
                model.save("games", entities);
                res.status(200).json(elem);
                return;
            }
        }
        res.status(404).json({});
    });
}

function pagination(array, pageNumber, pageSize) {
    pageNumber = pageNumber || 1
    pageSize = pageSize || 50;

    var endIndex = pageSize * pageNumber,
        startIndex = endIndex - pageSize;
    if(endIndex > array.length) {
        return array.slice(startIndex);
    }
    return array.slice(startIndex, endIndex);
}

function getCategories(req, res) {
    res.status(200).json(["wargames", "strategy", "thematic", "abstract", "cooperative"])
}