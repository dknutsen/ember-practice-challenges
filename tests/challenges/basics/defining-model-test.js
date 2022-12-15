import { module, test } from 'qunit';
import { setupTest } from 'ember-practice-challenges/tests/helpers';

// prettier-ignore
const EXPECTED_ATTRS = {
  name:         'raw',
  createdAt:    'date',
  updatedAt:    'date',
  userRead:     'boolean',
  userWrite:    'boolean',
  userExecute:  'boolean',
  groupRead:    'boolean',
  groupWrite:   'boolean',
  groupExecute: 'boolean',
  otherRead:    'boolean',
  otherWrite:   'boolean',
  otherExecute: 'boolean',
};

// prettier-ignore
const EXPECTED_RELATIONSHIPS = {
  owner:    { kind: 'belongsTo', type: 'user' },
  parent:   { kind: 'belongsTo', type: 'file' },
  children: { kind: 'hasMany', type: 'file' },
};

module('Challenges | basics.defining-model', function (hooks) {
  setupTest(hooks);

  /* eslint-disable qunit/require-expect */
  test('it has the expected attributes', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('file', {});
    model.eachAttribute((_name, { type = 'raw', name }) => {
      assert.ok(
        Object.keys(EXPECTED_ATTRS).includes(name),
        `attribute ${name} found which was expected`
      );
      assert.strictEqual(
        type,
        EXPECTED_ATTRS[name],
        `attribute ${name} had expected type: ${EXPECTED_ATTRS[name]}`
      );
    });
  });

  test('it has the expected relationships', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('file', {});
    model.eachRelationship((_name, { name, kind, type }) => {
      const expected = EXPECTED_RELATIONSHIPS[name];
      assert.ok(!!expected, `relationship ${name} found which was expected`);
      assert.strictEqual(
        kind,
        expected.kind,
        `relationship ${name} had expected kind: ${expected.kind}`
      );
      assert.strictEqual(
        type,
        expected.type,
        `relationship ${name} had expected type: ${expected.type}`
      );
    });
  });
  /* eslint-enable qunit/require-expect */

  test('it has a correctly functioning "path" getter property', function (assert) {
    const store = this.owner.lookup('service:store');
    const parent = store.createRecord('file', { name: 'parent' });
    const child1 = store.createRecord('file', { name: 'child1', parent });
    const child2 = store.createRecord('file', { name: 'child2', parent });
    const grandchild = store.createRecord('file', { name: 'grandchild', parent: child1 });
    assert.strictEqual(parent.path, '/parent');
    assert.strictEqual(child1.path, '/parent/child1');
    assert.strictEqual(child2.path, '/parent/child2');
    assert.strictEqual(grandchild.path, '/parent/child1/grandchild');
  });

  test('it has a correctly functioning "isDirectory" getter property', function (assert) {
    const store = this.owner.lookup('service:store');
    const parent = store.createRecord('file', { name: 'parent' });
    const child1 = store.createRecord('file', { name: 'child1', parent });
    const child2 = store.createRecord('file', { name: 'child2', parent });
    const grandchild = store.createRecord('file', { name: 'grandchild', parent: child1 });
    assert.true(parent.isDirectory);
    assert.true(child1.isDirectory);
    assert.false(child2.isDirectory);
    assert.false(grandchild.isDirectory);
  });

  test('it has a correctly functioning "permissions" getter property', function (assert) {
    const store = this.owner.lookup('service:store');

    let file = store.createRecord('file', { name: 'some-file' });
    assert.strictEqual(file.permissions, '----------', 'the file has no permissions to start');

    file = store.createRecord('file', { name: 'some-file' });
    store.createRecord('file', { name: 'child-file', parent: file });
    assert.strictEqual(file.permissions, 'd---------', 'directory');

    file = store.createRecord('file', { name: 'some-file', userRead: true });
    assert.strictEqual(file.permissions, '-r--------', 'user read');

    file = store.createRecord('file', { name: 'some-file', userWrite: true });
    assert.strictEqual(file.permissions, '--w-------', 'user write');

    file = store.createRecord('file', { name: 'some-file', userExecute: true });
    assert.strictEqual(file.permissions, '---x------', 'user execute');

    file = store.createRecord('file', { name: 'some-file', groupRead: true });
    assert.strictEqual(file.permissions, '----r-----', 'group read');

    file = store.createRecord('file', { name: 'some-file', groupWrite: true });
    assert.strictEqual(file.permissions, '-----w----', 'group write');

    file = store.createRecord('file', { name: 'some-file', groupExecute: true });
    assert.strictEqual(file.permissions, '------x---', 'group execute');

    file = store.createRecord('file', { name: 'some-file', otherRead: true });
    assert.strictEqual(file.permissions, '-------r--', 'other read');

    file = store.createRecord('file', { name: 'some-file', otherWrite: true });
    assert.strictEqual(file.permissions, '--------w-', 'other write');

    file = store.createRecord('file', { name: 'some-file', otherExecute: true });
    assert.strictEqual(file.permissions, '---------x', 'other execute');
  });

  test('the chmod method correctly sets permissions when given a string', function (assert) {
    const store = this.owner.lookup('service:store');
    const file = store.createRecord('file', { name: 'some-file' });
    file.chmod('rwxr--r--');
    assert.strictEqual(file.permissions, '-rwxr--r--', 'the file permissions are correct');
    assert.ok(file.userRead, 'user read');
    assert.ok(file.userWrite, 'user write');
    assert.ok(file.userExecute, 'user execute');
    assert.ok(file.groupRead, 'group read');
    assert.notOk(file.groupWrite, 'group write');
    assert.notOk(file.groupExecute, 'group execute');
    assert.ok(file.otherRead, 'other read');
    assert.notOk(file.otherWrite, 'other write');
    assert.notOk(file.otherExecute, 'other execute');
  });

  test('the chmod method correctly sets permissions when given a number', function (assert) {
    const store = this.owner.lookup('service:store');
    const file = store.createRecord('file', { name: 'some-file' });
    file.chmod(777);
    assert.strictEqual(file.permissions, '-rwxrwxrwx', 'the file permissions are correct');
    assert.ok(file.userRead, 'user read');
    assert.ok(file.userWrite, 'user write');
    assert.ok(file.userExecute, 'user execute');
    assert.ok(file.groupRead, 'group read');
    assert.ok(file.groupWrite, 'group write');
    assert.ok(file.groupExecute, 'group execute');
    assert.ok(file.otherRead, 'other read');
    assert.ok(file.otherWrite, 'other write');
    assert.ok(file.otherExecute, 'other execute');
  });

  test('the "permissions" setter correctly sets permissions when given a string', function (assert) {
    const store = this.owner.lookup('service:store');
    const file = store.createRecord('file', { name: 'some-file' });
    file.permissions = 'rwxr--r--';
    assert.strictEqual(file.permissions, '-rwxr--r--', 'the file permissions are correct');
    assert.ok(file.userRead, 'user read');
    assert.ok(file.userWrite, 'user write');
    assert.ok(file.userExecute, 'user execute');
    assert.ok(file.groupRead, 'group read');
    assert.notOk(file.groupWrite, 'group write');
    assert.notOk(file.groupExecute, 'group execute');
    assert.ok(file.otherRead, 'other read');
    assert.notOk(file.otherWrite, 'other write');
    assert.notOk(file.otherExecute, 'other execute');
  });

  test('the "permissions" setter correctly sets permissions when given a number', function (assert) {
    const store = this.owner.lookup('service:store');
    const file = store.createRecord('file', { name: 'some-file' });
    file.permissions = 777;
    assert.strictEqual(file.permissions, '-rwxrwxrwx', 'the file permissions are correct');
    assert.ok(file.userRead, 'user read');
    assert.ok(file.userWrite, 'user write');
    assert.ok(file.userExecute, 'user execute');
    assert.ok(file.groupRead, 'group read');
    assert.ok(file.groupWrite, 'group write');
    assert.ok(file.groupExecute, 'group execute');
    assert.ok(file.otherRead, 'other read');
    assert.ok(file.otherWrite, 'other write');
    assert.ok(file.otherExecute, 'other execute');
  });
});
