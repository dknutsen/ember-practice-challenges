import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { LinkTo } from '@ember/routing';
import { array, hash } from '@ember/helper';
import challenges from '../challenges';

import Button from './ui/button';

const join = (segments) => segments.join('.');

const SidebarItem = <template>
  <li>
    <LinkTo
      id="sidebar-item"
      @activeClass="menu-active"
      @route={{if @route @route "index"}}
      @query={{hash id=(join (array @prefix @id))}}
    >
      {{~@title~}}
    </LinkTo>
  </li>
</template>

const SidebarCategory = <template>
  <li>
    <details open>
    <summary>{{@title}}</summary>
      <ul>
        {{yield (component SidebarItem prefix=@id)}}
      </ul>
    </details>
  </li>
</template>

export default <template>
  <ul class="menu bg-base-200 rounded-box w-64">
    {{#each-in challenges as |catId category|}}
      <SidebarCategory @title={{category.title}} @id={{catId}} as |Item|>
        {{#each-in category.challenges as |cid challenge index|}}
          <Item @id={{cid}} @title={{challenge.title}} @route={{challenge.route}} />
        {{/each-in}}
      </SidebarCategory>
    {{/each-in}}
  </ul>
</template>
