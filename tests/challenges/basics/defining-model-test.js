import { module, test } from 'qunit';
import { setupTest } from 'practice-challenges/tests/helpers';

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

const EXPECTED_RELATIONSHIPS = {
  parent:   { kind: 'belongsTo', type: 'file' },
  children: { kind: 'hasMany', type: 'file' },
};

module('Challenges | basics.defining-model', function (hooks) {
  setupTest(hooks);

  test('it has the expected attributes', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('file', {});
    model.eachAttribute((_name, { type='raw', name }) => {
      assert.ok(Object.keys(EXPECTED_ATTRS).includes(name), `attribute ${name} found which was expected`);
      assert.equal(type, EXPECTED_ATTRS[name], `attribute ${name} had expected type: ${EXPECTED_ATTRS[name]}`);
    });
  });

  test('it has the expected relationships', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('file', {});
    model.eachRelationship((_name, { name, kind, type }) => {
      const expected = EXPECTED_RELATIONSHIPS[name];
      assert.ok(!!expected, `relationship ${name} found which was expected`);
      assert.equal(kind, expected.kind, `relationship ${name} had expected kind: ${expected.kind}`);
      assert.equal(type, expected.type, `relationship ${name} had expected type: ${expected.type}`);
    });
  });

  test('it has a correctly functioning "path" getter property', function (assert) {
    const store = this.owner.lookup('service:store');
    const parent = store.createRecord('file', { name: 'parent' });
    const child1 = store.createRecord('file', { name: 'child1', parent });
    const child2 = store.createRecord('file', { name: 'child2', parent });
    const grandchild = store.createRecord('file', { name: 'grandchild', parent: child1 });
    assert.equal(parent.path, '/parent');
    assert.equal(child1.path, '/parent/child1');
    assert.equal(child2.path, '/parent/child2');
    assert.equal(grandchild.path, '/parent/child1/grandchild');
  });

  test('it has a correctly functioning "isDirectory" getter property', function (assert) {
    const store = this.owner.lookup('service:store');
    const parent = store.createRecord('file', { name: 'parent' });
    const child1 = store.createRecord('file', { name: 'child1', parent });
    const child2 = store.createRecord('file', { name: 'child2', parent });
    const grandchild = store.createRecord('file', { name: 'grandchild', parent: child1 });
    assert.equal(parent.isDirectory, true);
    assert.equal(child1.isDirectory, true);
    assert.equal(child2.isDirectory, false);
    assert.equal(grandchild.isDirectory, false);
  });

  test('it has a correctly functioning "permissions" getter property', function (assert) {
    const store = this.owner.lookup('service:store');

    let file = store.createRecord('file', { name: 'some-file' });
    assert.equal(file.permissions, '----------', 'the file has no permissions to start');

    file = store.createRecord('file', { name: 'some-file' });
    const child = store.createRecord('file', { name: 'child-file', parent: file });
    assert.equal(file.permissions, 'd---------', 'directory');

    file = store.createRecord('file', { name: 'some-file', userRead: true });
    assert.equal(file.permissions, '-r--------', 'user read');

    file = store.createRecord('file', { name: 'some-file', userWrite: true });
    assert.equal(file.permissions, '--w-------', 'user write');

    file = store.createRecord('file', { name: 'some-file', userExecute: true });
    assert.equal(file.permissions, '---x------', 'user execute');

    file = store.createRecord('file', { name: 'some-file', groupRead: true });
    assert.equal(file.permissions, '----r-----', 'group read');

    file = store.createRecord('file', { name: 'some-file', groupWrite: true });
    assert.equal(file.permissions, '-----w----', 'group write');

    file = store.createRecord('file', { name: 'some-file', groupExecute: true });
    assert.equal(file.permissions, '------x---', 'group execute');

    file = store.createRecord('file', { name: 'some-file', otherRead: true });
    assert.equal(file.permissions, '-------r--', 'other read');

    file = store.createRecord('file', { name: 'some-file', otherWrite: true });
    assert.equal(file.permissions, '--------w-', 'other write');

    file = store.createRecord('file', { name: 'some-file', otherExecute: true });
    assert.equal(file.permissions, '---------x', 'other execute');
  });

  test('the chmod method correctly sets permissions when given a string', function (assert) {
    const store = this.owner.lookup('service:store');
    const file = store.createRecord('file', { name: 'some-file' });
    file.chmod('rwxr--r--');
    assert.equal(file.permissions, '-rwxr--r--', 'the file permissions are correct');
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
    assert.equal(file.permissions, '-rwxrwxrwx', 'the file permissions are correct');
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
