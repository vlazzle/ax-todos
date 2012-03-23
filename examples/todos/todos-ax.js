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

  description: function($elem, descText, descId) {
    $elem.$desc = $('<div>', {
      id: descId || 'AX-desc--' + $elem.attr('id'),
      text: $.isFunction(descText) ? descText($elem) : descText,
      'aria-role': 'description',
    });
    this.getLabelsContainer().append($elem.$desc);

    $elem.attr('aria-describedby', $elem.$desc.attr('id'));
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
    // FIXME if condition should be "screen reader speaks placeholder attribute"
    if (navigator.appVersion.match(/chrome/i)) {
      var $newTodoField = $('#new-todo');
      this.label($newTodoField, $newTodoField.attr('placeholder'));
    }
  },
});

$(function() {
  window.todoAx = new TodoAx;
  todoAx.placeholders();
});