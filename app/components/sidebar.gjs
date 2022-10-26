import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { array, component, hash } from '@ember/helper';
import challenges from '../challenges';

import Button from './ui/button';

const join = (segments) => segments.join('.');

const SidebarItem = <template>
  <LinkTo
    id="sidebar-item"
    class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
    @route={{if @route @route "index"}}
    @query={{hash id=(join (array @prefix @id))}}
  >
    {{~@title~}}
  </LinkTo>
</template>

class SidebarCategory extends Component {
  @tracked collapsed = false;

  @action toggle() {
    this.collapsed = !this.collapsed;
  }

  <template>
    <div class="text-md font-medium text-gray-500 py-1">
      <Button @style="link" @onClick={{this.toggle}}>
        {{#if this.collapsed}}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        {{else}}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        {{/if}}
        <span class="font-semibold">
          {{@title}}
        </span>
      </Button>
      {{#unless this.collapsed}}
        <div class="pl-4 pt-1">
          {{yield (component SidebarItem prefix=@id)}}
        </div>
      {{/unless}}
    </div>
  </template>
}

export default <template>
  <nav class="w-64 p-2">
    {{#each-in challenges as |catId category|}}
      <SidebarCategory @title={{category.title}} @id={{catId}} as |Item|>
        {{#each-in category.challenges as |cid challenge index|}}
          <Item @id={{cid}} @title={{challenge.title}} @route={{challenge.route}} /> 
        {{/each-in}}
      </SidebarCategory>
    {{/each-in}}
  </nav>
</template>
