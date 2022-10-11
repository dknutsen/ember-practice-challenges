import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { inject as service } from '@ember/service';

// NOTE: do not edit this components
const LinkyButton = <template>
  <a {{on "click" @onClick}} class="text-blue-500 cursor-pointer underline">
    {{#if @label}}{{@label}}{{else}}{{yield}}{{/if}}
  </a>
</template>

export default class ClassicToGlimmer extends Component {
  @tracked currentFile = this.args.rootFile;

  @action
  onFileClicked(file) {
    this.currentFile = file;
  }

  <template>
    <div>Current file: {{this.currentFile.path}}</div>
    <table>
      <thead>
        <tr>
          <th class="w-64">Name</th>
          <th class="w-16">Permissions</th>
          <th>Owner</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        {{#if this.currentFile.parent}}
          <tr>
            <td><LinkyButton @onClick={{fn this.onFileClicked this.currentFile.parent}}>..</LinkyButton></td>
            <td>{{this.currentFile.parent.permissions}}</td>
            <td>{{this.currentFile.parent.owner.email}}</td>
            <td>{{this.currentFile.parent.updatedAt}}</td>
          </tr>
        {{/if}}
        {{#each this.currentFile.children as |child|}}
          <tr>
            <td>
              {{#if child.isDirectory}}
                <LinkyButton @onClick={{fn this.onFileClicked child}}>{{child.name}}</LinkyButton>
              {{else}}
                {{child.name}}
              {{/if}}
            </td>
            <td>{{child.permissions}}</td>
            <td></td>
            <td></td>
          </tr>
        {{/each}}
      </tbody>
    </table>
  </template>
}
