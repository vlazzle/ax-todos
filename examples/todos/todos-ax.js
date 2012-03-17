var TodoAx = function() {
};

_.extend(TodoAx.prototype, {
  inlineLabel: function($elem, labelText) {
    $elem.attr('aria-label', labelText);
  },

  label: function($elem, labelText, labelId) {
    $elem.$label = $('<label>', {
      id: labelId || 'AX-lbl--' + $elem.attr('id'),
      text: $.isFunction(labelText) ? labelText($elem) : labelText,
      'aria-role': 'label',
    });
    this.getLabelsContainer().append($elem.$label);

    $elem.attr('aria-labelledby', $elem.$label.attr('id'));
  },

  getLabelsContainer: function() {
    if (!this.$labelsContainer) {
      this.$labelsContainer = $('<div>', {
        id: 'AX-container--labels',
        css: {
          display: 'none'
        }
      });
      $('body').append(this.$labelsContainer);
    }
    return this.$labelsContainer;
  },

  placeholders: function() {
    var $newTodoField = $('#new-todo');
    this.label($newTodoField, $newTodoField.attr('placeholder'));
  },

  todoPronunciation: function() {
    // TODO VO speaks h1 content instead of label
    var $title = $('.title h1');
    this.inlineLabel($title, 'To Dos');
  },

  todoList: function() {
    this.label($('#todo-list'), 'tasks');
  }

});

$(function() {
  var todoAx = new TodoAx;
  todoAx.placeholders();
  // todoAx.todoPronunciation();
  todoAx.todoList();
});