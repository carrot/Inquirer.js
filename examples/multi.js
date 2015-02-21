/**
 * Multi prompt example
 */

"use strict";
var inquirer = require("../lib/inquirer");

inquirer.prompt([
  {
    type: "multi",
    name: "order",
    message: "What do you want to eat?",
  }
], function( answers ) {
    console.log( JSON.stringify(answers, null, "  ") );
  });
