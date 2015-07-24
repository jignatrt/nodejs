'use strict';

angular.module('lookup.version', [
  'lookup.version.interpolate-filter',
  'lookup.version.version-directive'
])

.value('version', '0.1');
