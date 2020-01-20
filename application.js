var mysql = require("mysql");
var inquirer = require("inquirer");

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
        type: "RAWlist",
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
            Add_emp();
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
        console.log(res);
        connection.end();
    });
}

function Allrole(){
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM roles", function(err,res){
        if(err) throw err;
        console.log(res);
        connection.end();
    });
}

function Alldep(){
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM departments", function(err,res){
        if(err) throw err;
        console.log(res);
        connection.end();
    });
}

function Add_emp(){
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
        ])
        .then(function(answer){
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                }
            );
        });
        connection.query("SELECT * FROM roles", function(err,results){
            if(err) throw err;
            inquirer
                .prompt([
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
                    var id = "SELECT id WHERE ?"//results[i]
                    connection.query()
                })
        })
    
}

function Remove_emp(){
    
}