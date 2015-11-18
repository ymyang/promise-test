/**
 * Created by yang on 2015/8/25.
 */
var Promise = require('bluebird');
var _ = require('lodash');

describe('test Promise', function() {

    it('all', function(done) {
        this.timeout(0);
        var tasks = [];
        for(var i = 0; i < 10; i++) {
            tasks.push(p1(i));
        }
        Promise.all(tasks).then(function(r) {
            console.log('all done:', r);
            done();
        }).catch(done);

    });

    it('map', function(done) {
        this.timeout(0);
        Promise.map(_.range(10), function(i) {
            return p1(i);
        }).then(function(r) {
            console.log('all done:', r);
            done();
        }).catch(done);
    });

    it.only('reduce', function(done) {
        this.timeout(0);
        var a = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        Promise.reduce(a, function(previous, current, index, length) {
            console.log('previous:', previous, ', current:', current);
            return p1(current);
        }, 0).then(function(r) {
            console.log('all done:', r);
            done();
        }).catch(done);
    });

    it('each', function(done) {
        this.timeout(0);

    });

    it('test props', function(done) {
        Promise.props({
            view: Promise.resolve('this is view'),
            thumb: Promise.resolve('this is thumb')
        }).then(function(result) {
            console.log(result);
            done();
        }).catch(done);
    });

    it('test finally', function(done) {
        var p = Promise.resolve('test finaly').finally(function() {
            console.log('function finally');
        });
        p.then(function(r) {
            console.log('then:', r);
            done();
        }).catch(done);
    });
});

function p1(id) {
    return new Promise(function(resolve, reject) {
        var t = Math.floor(Math.random() * 10) * 1000;
        setTimeout(function(){
            console.log(id, ' done:', t);
            resolve(id);
        }, t);
    });
}
