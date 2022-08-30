import { LinkTo } from '@ember/routing';
import { array, component, hash } from '@ember/helper';

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
    <SidebarCategory @title="Autotracking" @id="autotracking" as |Item|>
      <Item @id="e01" @title="01: basic autotracking" />
      <Item @id="e02" @title="02: deep autotracking" />
    </SidebarCategory>
    <SidebarCategory @title="Accessibility" @id="accessibility" as |Item|>
      <Item @id="e01" @title="01: basic accessibility test" />
    </SidebarCategory>
    <SidebarCategory @title="Ember Data" @id="ember-data" as |Item|>
      <Item @id="e01" @title="01: model attribute" />
    </SidebarCategory>
  </ul>
</template>
