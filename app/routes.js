var Food = require('./models/food');

function getFood(res) {
    Food.find(function (err, all_food) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(all_food); // return all food in JSON format
    });
}
;

function sumAllPrice(res){
    Food.find(function (err, all_food){
        sum = 0;
        for(index in all_food){
            sum += all_food[index].price;
        }
        sum *= 1.075
        res.json({"total_price": sum});
    });
}
;
module.exports = function (app) {

    // total price of food
    app.get('/api/total', function (req, res) {
        sumAllPrice(res);
    });

    // api ---------------------------------------------------------------------
    // get all food
    app.get('/api/food', function (req, res) {
        // use mongoose to get all food in the database
        getFood(res);
    });

    // create food and send back all food after creation
    app.post('/api/food', function (req, res) {

        // create a food, information comes from AJAX request from Angular
        Food.create({
            name: req.body.name,
            price: req.body.price,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the food after you create another
            getFood(res);
        });

    });

    // delete a food
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFood(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};