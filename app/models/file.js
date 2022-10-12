import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

// define some bitmasks for translating permissions e.g. 7 => rwx
const READ    = 0b100; // also 1 << 2
const WRITE   = 0b010; // also 1 << 1
const EXECUTE = 0b001; // also 1 << 0

export default class FileModel extends Model {
  // basic attributes
  @attr name;

  // metadata attributes
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // permissions attributes
  @attr('boolean') userRead;
  @attr('boolean') userWrite;
  @attr('boolean') userExecute;
  @attr('boolean') groupRead;
  @attr('boolean') groupWrite;
  @attr('boolean') groupExecute;
  @attr('boolean') otherRead;
  @attr('boolean') otherWrite;
  @attr('boolean') otherExecute;

  // relationships
  @belongsTo('user', { inverse: null }) owner;
  @belongsTo('file', { inverse: 'children' }) parent;
  @hasMany('file', { inverse: 'parent' }) children;

  get isDirectory() {
    return !!this.hasMany('children').value()?.length;
  }

  get path() {
    return `${this.belongsTo('parent').value() ? this.get('parent.path') : ''}/${this.name}`;
  }

  get permissions() {
    return [
      this.isDirectory  ? 'd' : '-',
      this.userRead     ? 'r' : '-',
      this.userWrite    ? 'w' : '-',
      this.userExecute  ? 'x' : '-',
      this.groupRead    ? 'r' : '-',
      this.groupWrite   ? 'w' : '-',
      this.groupExecute ? 'x' : '-',
      this.otherRead    ? 'r' : '-',
      this.otherWrite   ? 'w' : '-',
      this.otherExecute ? 'x' : '-',
    ].join('');
  }

  set permissions(newPermissions) {
    this.chmod(newPermissions);
  }

  /**
   * Sets the permission attributes given either a permission string or a number
   *
   * @param {String|Number} newPermissions The new permissions to set on the model, e.g. 644 or 'rw-r--r--'
   */
  chmod(newPermissions) {
    // there are 100 ways to do this, probably more elegant and performant
    if (typeof newPermissions === 'string') {
      let perm = newPermissions;
      if (perm.length === 10) perm = perm.slice(1);
      if (perm.length !== 9) return;
      if (perm[0] === 'r') this.userRead = true;
      if (perm[1] === 'w') this.userWrite = true;
      if (perm[2] === 'x') this.userExecute = true;
      if (perm[3] === 'r') this.groupRead = true;
      if (perm[4] === 'w') this.groupWrite = true;
      if (perm[5] === 'x') this.groupExecute = true;
      if (perm[6] === 'r') this.otherRead = true;
      if (perm[7] === 'w') this.otherWrite = true;
      if (perm[8] === 'x') this.otherExecute = true;
    } else if (typeof newPermissions === 'number') {
      const digits = newPermissions.toString().split('').map(d => parseInt(d));
      if (digits[0] & READ) this.userRead = true;
      if (digits[0] & WRITE) this.userWrite = true;
      if (digits[0] & EXECUTE) this.userExecute = true;
      if (digits[1] & READ) this.groupRead = true;
      if (digits[1] & WRITE) this.groupWrite = true;
      if (digits[1] & EXECUTE) this.groupExecute = true;
      if (digits[2] & READ) this.otherRead = true;
      if (digits[2] & WRITE) this.otherWrite = true;
      if (digits[2] & EXECUTE) this.otherExecute = true;
    }
  }
}
