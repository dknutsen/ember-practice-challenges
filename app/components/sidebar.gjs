import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';
import { array, component, hash } from '@ember/helper';
import challenges from '../challenges';

const join = (segments) => segments.join('.');

const SidebarItem = <template>
  <li class="p-1">
    <LinkTo @query={{hash id=(join (array @prefix @id))}}>{{@title}}</LinkTo>
  </li>
</template>

const SidebarCategory = <template>
  <li class="font-bold pt-2">{{@title}}</li>
  {{yield (component SidebarItem prefix=@id)}}
</template>

export default <template>
  <ul class="w-64 p-2">
    {{#each-in challenges as |catId category|}}
      <SidebarCategory @title={{category.title}} @id={{catId}} as |Item|>
        {{#each-in category.challenges as |cid challenge index|}}
          <Item @id={{cid}} @title={{challenge.title}} /> 
        {{/each-in}}
      </SidebarCategory>
    {{/each-in}}
  </ul>
</template>
