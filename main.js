
$(document).ready(init);

function init() {
  $('.addName').click(addName);

  var names = getNames();  // read and parse
  renderNames(names);

  $('.names').on('dblclick', 'li', deleteName);
  $('.names').on('click', '.edit', editName);
  
  $('.save').on('click', saveEdit);
  $('.cancel').on('click', cancelEdit);
}

function cancelEdit() {
  $('.editArea').hide();
  $('.editName').val('');
}

// make saveEdit function
//  - retrieve index from data
//  - update storage

function saveEdit() {
  var index = $('.editArea').data('editIndex');
  var newName = $('.editName').val();

  var names = getNames();

  names[index] = newName;

  writeNames(names);
  renderNames(names);
  cancelEdit();
}

function editName() {
   // show the editArea

  var name = $(this).siblings('.name').text();
  var index = $(this).parent().index();

  $('.editArea').data('editIndex', index);

  $('.editName').val(name)
  $('.editArea').show();
}


function deleteName(event) {
  cancelEdit();

  var name = $(this).text();
  var index = $(this).index();

  var names = getNames();

  names.splice(index, 1);

  writeNames(names);  // stringify, write
  renderNames(names); // re-render DOM 
}

function addName() {
  cancelEdit();
  
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

  var $lis = names.map(name => {
    var $li = $('.template').clone();
    $li.removeClass('template');
    $li.find('.name').text(name);

    return $li;
  });
  $('ul.names').empty().append($lis);
}









