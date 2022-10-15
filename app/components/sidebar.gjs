import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { array, component, hash } from '@ember/helper';
import challenges from '../challenges';

import Button from './ui/button';

const join = (segments) => segments.join('.');

const SidebarItem = <template>
  <li class="p-1">
    <LinkTo @route={{if @route @route "index"}} @query={{hash id=(join (array @prefix @id))}}>{{@title}}</LinkTo>
  </li>
</template>

class SidebarCategory extends Component {
  @tracked collapsed = true;

  @action toggle() {
    this.collapsed = !this.collapsed;
  }

  <template>
    <li class="font-bold pt-2">
      <Button @style="link" @onClick={{this.toggle}}>
        {{@title}}
        {{if this.collapsed "[+]" "[-]"}}
      </Button>
    </li>
    {{#unless this.collapsed}}
      {{yield (component SidebarItem prefix=@id)}}
    {{/unless}}
  </template>
}

export default <template>
  <ul class="w-64 p-2">
    {{#each-in challenges as |catId category|}}
      <SidebarCategory @title={{category.title}} @id={{catId}} as |Item|>
        {{#each-in category.challenges as |cid challenge index|}}
          <Item @id={{cid}} @title={{challenge.title}} @route={{challenge.route}} /> 
        {{/each-in}}
      </SidebarCategory>
    {{/each-in}}
  </ul>
</template>
