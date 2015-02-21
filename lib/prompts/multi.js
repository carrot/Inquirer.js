/**
 * `multi` type prompt
 */

var util = require("util");
var Base = require("./base");
var utils = require("../utils/utils");
var observe = require("../utils/events");


/**
 * Module exports
 */

module.exports = Prompt;


/**
 * Constructor
 */

function Prompt() {
  Base.apply( this, arguments );
  this.opts = [];
  return this;
}
util.inherits( Prompt, Base );


/**
 * Start the Inquiry session
 * @param  {Function} cb      Callback when prompt is done
 * @return {this}
 */

Prompt.prototype._run = function( cb ) {
  this.done = cb;

  // Save user answer and update prompt to show selected option.
  var events = observe(this.rl);
  this.lineObs = events.line.forEach( this.onSubmit.bind(this) );

  // Init the prompt
  this.render();

  return this;
};


/**
 * Render the prompt to screen
 * @return {Prompt} self
 */

Prompt.prototype.render = function() {

  // Render question
  var message = this.getQuestion();

  message += "\n  (submit X to end input session)\n";
  message += "\n  Answer: ";

  utils.writeMessage( this, message );

  return this;
};


/**
 * When user press `enter` key
 */

Prompt.prototype.onSubmit = function( input ) {
  if ( input == null || input === "" ) {
    input = this.rawDefault;
  }

  // end prompting when user inputs "x"
  if ( input && input.toLowerCase() === 'x' ) {
    return this.done( this.opts );
  }

  this.opts.push(input);

  // Re-render prompt
  this.write("  Answer: ");

};
