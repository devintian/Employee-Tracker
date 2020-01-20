var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "twj521604",
    database: "EmployeeDB"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
        .prompt({
        name: "Home",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View All Employees", 
            "View All Role", 
            "View All Department", 
            "Add Employee", 
            "Add Role", 
            "Add Department", 
            "Remove Employee", 
            "Update Employee Role"]
    })
    .then(function(answer) {
        switch(answer.Home){
        case "View All Employees":
            Allemp();
            break;
            
        case "View All Role":
            Allrole();
            break;
            
        case"View All Department":
            Alldep();
            break;

        case"Add Employee":
            Add_name();
            //Add_a_manager();
            break;

        case"Add Role":
            Add_role();
            break;

        case"Add Department":
            Add_dep();
            break;

        case"Remove Employee":
            Remove_emp();
            break;

        case"Update Employee Role":
            Update_empRole();
            break;         
        }
    });
}

function Allemp(){
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employees", function(err,res){
        if(err) throw err;
        //console.log(res);
        console.table(res);
    });
}

function Allrole(){
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM roles", function(err,res){
        if(err) throw err;
        //console.log(res);
        console.table(res);
    });
}

function Alldep(){
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM departments", function(err,res){
        if(err) throw err;
        //console.log(res);
        console.table(res);
    });
}





function Add_name(){
    connection.query("SELECT * FROM roles", function(err,results){
        inquirer
            .prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "What's the employee's first name?"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What's the employee's last name?"
                },
                {
                    name: "roles",
                    type: "rawlist",
                    choices: function(){
                        var roleArray = [];
                        for (var i = 0; i < results.length; i++){
                            roleArray.push(results[i].title);
                        }
                        return roleArray;
                    },
                    message: "What's the employee's role?"
                }

            ])
            .then(function(answer){
                connection.query(
                    "INSERT INTO employees SET ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        
                    }
                );
                connect.query(
                    "???????????????"
                )
            }); 
    });
}

function Add_role(){
    connection.query("SELECT * FROM departments", function(err,results){
        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What's the title of the role?"
                },
                {
                    name: "departments",
                    type: "rawlist",
                    choices: function(){
                        var departArray = [];
                        for (var i = 0; i< results.length; i++){
                            departArray.push(results[i].name);
                        }
                        return departArray;
                    },
                    message: "Which department of this role?"
                }
            ])
            .then(function(answer){
                connection.query(
                    "INSERT INTO roles SET ?",
                    {
                        title: answer.title,
                    }
                )
                connection.query(
                    "?????????"
                )
            })
    })
}


function Add_dep(){
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What's the departement's name?"
            }
        ])
        .then(function(answer){
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    name: answer.name
                },
                function(err,res){
                    if (err) throw err;
                    console.log(res.affectedRow + " department inserted!\n");

                }
            );
        });
}

function Remove_emp(){
    connection.query("SELECT * FROM employees", function(err,results){
        if(err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function(){
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++){
                            choiceArray.push(results[i].first_name);
                        }
                        return choiceArray;
                    },
                    message: "Which employee do you want to remove?"
                }
            ])
            .then(function(answer){
                console.log("Deleting a employee...\n");
                var query = connection.query(
                    "DELETE FROM employees WHERE ?",
                    {
                        last_name: answer
                    },
                    function(err,res){
                        if(err) throw err;
                        console.log(res.affectedRow + " employee deleted!\n");
                    }
                )
            })
    })
}