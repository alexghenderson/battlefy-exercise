import React from 'react';

function useField(defaultValue) {
  const [value, setValue] = React.useState(defaultValue);

  const onChange = React.useCallback(e => {
    if (typeof e === 'object' && 'target' in e && 'value' in e.target) {
      // Treat e as an event
      setValue(e.target.value);
    } else {
      // Treat e as a raw value
      setValue(e);
    }
  }, []);

  return {
    field: {
      value,
      onChange
    }
  };
}

export default useField;
