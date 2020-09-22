/**
 * NotesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// var Notes = require("../models/Notes");

module.exports = {
	list:function(req, res){
        Notes.find({}).exec(function(err, notes){
            if(err){
                res.send(500, {error: 'DB Error'});
            }
            res.view('list', {notes:notes});
        });
    },
    add: function(req, res){
        res.view('add');
    },
    create:function(req, res){
        var title = req.body.title;
        var description = req.body.description;

        Notes.create({title:title, description:description}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/notes/list');
        });
    },
    delete: function(req, res){
        Notes.destroy({id:req.params.id}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/notes/list');
        });

        return false;
    },
    edit: function(req, res){
        Notes.findOne({id:req.params.id}).exec(function(err, note){
            if(err){
                res.send(500, {error: 'DB Error'});
            }

            res.view('edit', {note:note});
        });
    },
    update: function(req, res){
        var title = req.body.title;
        var description = req.body.description;

        Notes.update({id: req.params.id},{title:title, description:description}).exec(function(err){
            if(err){
                res.send(500, {error: 'DB Error'});
            }
            res.redirect('/notes/list');
        });

        return false;
    }
}

