'use strict';

 var errorCB = function(){
        console.log("Error in operation");
    },
    successCB = function(){
        console.log("Success in operation");
    };

/* First of all call init module to setup necessary tables*/
function _setUpApplication(){
    var
    _success = function(tx, results){
        console.log('succes in setup');
    },

    _fail = function(tx, results){
        console.log('setup failed');
    },
    populateDB_setup = function (tx)
    {
        tx.executeSql('CREATE TABLE IF NOT EXISTS play_log(id INTEGER PRIMARY KEY, round_id INTEGER, prediction_id INTEGER, choice_id INTEGER, expiry_date date, create_date varchar(30), question_txt varchar(500), ans_text varchar(100)); ', [], _success, _fail);
    },

    db = window.openDatabase(_config.db_name, _config.db_version, _config.inner_db_name, _config.db_storage);
    db.transaction(populateDB_setup, errorCB, successCB);

}
