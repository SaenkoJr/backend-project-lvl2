import _ from 'lodash';

export default (before, after) => {
  const iter = (dataBefore = {}, dataAfter = {}) => {
    const keys = _.union(Object.keys(dataBefore), Object.keys(dataAfter));

    return keys.map((key) => {
      const oldValue = dataBefore[key];
      const newValue = dataAfter[key];

      if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
        return {
          type: 'nodesList',
          name: key,
          status: 'unchanged',
          oldValue,
          newValue,
          children: iter(oldValue, newValue),
        };
      }

      if (!_.has(dataBefore, key)) {
        return {
          type: _.isPlainObject(newValue) ? 'nodesList' : 'node',
          name: key,
          status: 'added',
          oldValue: null,
          newValue,
          children: _.isPlainObject(newValue) ? iter({}, newValue) : [],
        };
      }

      if (!_.has(dataAfter, key)) {
        return {
          type: _.isPlainObject(oldValue) ? 'nodesList' : 'node',
          name: key,
          status: 'removed',
          oldValue,
          newValue: null,
          children: _.isPlainObject(oldValue) ? iter(oldValue, {}) : [],
        };
      }

      if (oldValue !== newValue) {
        return {
          type: _.isPlainObject(newValue) ? 'nodesList' : 'node',
          name: key,
          status: 'changed',
          oldValue,
          newValue,
          children: _.isPlainObject(newValue) ? iter({}, newValue) : [],
        };
      }

      return {
        type: 'node',
        name: key,
        status: 'unchanged',
        oldValue,
        newValue,
        children: [],
      };
    });
  };

  return {
    type: 'root',
    children: iter(before, after),
  };
};
