
$(document).ready(init);

function init() {
  $('.addName').click(addName);
  var names = getNames();  // read and parse
  renderNames(names);
}

function addName() {
  var $input = $('.newName');

  var name = $input.val();
  $input.val('');

  var names = getNames(); // read, parse
  names.push(name);  // modify
  writeNames(names);  // stringify, write
  renderNames(names); // re-render DOM
}

function getNames() {
  // retrieve array from localStorage
  var str = localStorage.names;
  try {
    // 'risky' code
    var names = JSON.parse(str);
  } catch(err) {
    // runs if the try block throws an error
    var names = [];
  }
  return names;
}

function writeNames(names) {
  // stringify array, and write to storage
  var namesStr = JSON.stringify(names);
  localStorage.names = namesStr;
}

function renderNames(names) {
  // input array of names
  // create element for each name
  // empty the list
  // append elements to list

  var $lis = names.map(name => $('<li>').text(name));
  $('ul.names').empty().append($lis);
}











