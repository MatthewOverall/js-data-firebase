describe('firebaseAdapter#create', function () {
  it('should create a user in firebase', function (done) {
    var id;
    firebaseAdapter.create(User, { name: 'John' }).then(function (user) {
      id = user.id;
      assert.equal(user.name, 'John');
      assert.isString(user.id);
      return firebaseAdapter.find(User, user.id);
    })
      .then(function (user) {
        assert.equal(user.name, 'John');
        assert.isString(user.id);
        assert.deepEqual(user, { id: id, name: 'John' });
        return firebaseAdapter.destroy(User, user.id);
      })
      .then(function (destroyedUser) {
        assert.isFalse(!!destroyedUser);
        done();
      })
      .catch(done);
  });
});
