import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

// NOTE: do not edit these components
import FileExplorer from './defining-model/file-explorer';
import fixtures from './defining-model/fixtures';

export default class DefiningModel extends Component {
  @service store;

  home = null;

  constructor() {
    super(...arguments);
    // load our fixtures and add them here to pass to the explorer
    this.home = fixtures(this.store);
  }

  <template>
    <FileExplorer @rootFile={{this.home}} />
  </template>
}
