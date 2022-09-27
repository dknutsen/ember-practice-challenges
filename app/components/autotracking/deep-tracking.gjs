import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { component, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import pick from 'ember-composable-helpers/helpers/pick';
import set from 'ember-set-helper/helpers/set';

const isEmpty = (it) => it === '' || it === undefined || it === null;

class NewItemForm extends Component {
  @tracked newTitle = '';

  @action
  onNewTodo(event) {
    event.preventDefault();
    this.args.onNewTodo?.(this.newTitle);
    this.newTitle = '';
  }

  <template>
    {{!-- FIXME: replace with ui form --}}
    <form {{on "submit" this.onNewTodo}}>
      {{!-- FIXME: replace with ui input --}}
      <input
        data-test-input="newItemTitle"
        value={{this.newTitle}}
        {{on "change" (pick "target.value" (set this "newTitle"))}}
      />
      {{!-- FIXME: replace with ui button --}}
      <button
        data-test-action="newItem"
        type="submit"
        disabled={{isEmpty this.newTitle}}
      >
        Add
      </button>
    </form>
  </template>
}

const ListItem = <template>
  <li data-test-list-index={{@index}} data-test-list-item={{@item}}>
    {{!-- FIXME: replace with ui button --}}
    <button
      data-test-action="done"
      type="button"
      {{on "click" @onDoneClicked}}
    >
      Done
    </button>
    <span data-test-item-attribute="title">{{@item}}</span>
  </li>
</template>

export default class DeepTrackingComponent extends Component {
  @tracked todos = [];

  @action
  onNewTodo(title) {
    this.todos.push(title);
  }

  @action
  markDone(index) {
    this.todos.splice(index, 1);
  }

  <template>
    <NewItemForm @onNewTodo={{this.onNewTodo}} />
    <ul>
      {{#each this.todos as |item index|}}
        <ListItem @item={{item}} @index={{index}} @onDoneClicked={{fn this.markDone index}} />
      {{/each}}
    </ul>
  </template>
}

