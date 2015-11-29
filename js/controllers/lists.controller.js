'use strict';
// Lists Controller
function ListsController(){
  this.$addListForm = $('#add_list');
  this.$listTitleInput = $('#list_title');
  this.$selectListMenu = $('#select_list');
  this.$addTaskForm = $('#add_task');
  this.$wrapper = $('#wrapper');
}

ListsController.prototype.hideTaskForm = function(){
  this.$addTaskForm.hide();
}

ListsController.prototype.addListFormListener = function() {
  var self = this;
  this.$addListForm.submit(function(e) {
    e.preventDefault();
    new List(self.$listTitleInput.val()).build();
    self.$addTaskForm.show();
    self.$listTitleInput.val('');
  });
};

ListsController.prototype.destroyListLiveEventListener = function(){
  var self = this;
  this.$wrapper.on('click', '.destroy-list', function(){ 
    var listId = parseInt($(this).parents('h2').next('ul').data('id'));
    List.all.splice(listId, 1, null);
    self.$selectListMenu.find('option[value="'+listId+'"]').remove();
    $(this).parents('.list').remove();
  });
};

ListsController.prototype.init = function() {
  this.hideTaskForm();
  this.addListFormListener();
  this.destroyListLiveEventListener();
};
