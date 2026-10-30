const test = require('node:test');
const assert = require('node:assert/strict');
const { normaliseFashion, validateFashion } = require('../indes');

test('normaliseFashion trims fields and creates a creation date', () => {
  const fashion = normaliseFashion({
    style: '  Street style ',
    fashion_subject: '  Autumn coat ',
    fashion_detail: '<p>Warm layers</p>',
    fashion_image: 'images/b1.png',
  }, 7);

  assert.equal(fashion.style, 'Street style');
  assert.equal(fashion.fashion_subject, 'Autumn coat');
  assert.equal(fashion.IdF, 7);
  assert.equal(fashion.slug, 'autumn-coat-p7');
  assert.ok(fashion.creation_date instanceof Date);
  assert.equal(validateFashion(fashion), null);
});

test('validateFashion rejects incomplete data', () => {
  const error = validateFashion(normaliseFashion({ style: 'Street style' }));
  assert.equal(error, 'Style, subject, detail and image are required.');
});
