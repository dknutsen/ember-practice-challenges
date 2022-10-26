export const classes = (...params) => {
  return params.filter(s => s && s.constructor === String && s.length > 0).join(' ');
};

// it's best if we use the full static class names so they don't get purged
const themes = Object.freeze({
  primary: {
    color: 'blue',
    default: 'bg-blue-500 text-white',
    hover: 'hover:bg-blue-600',
  },
  success: {
    color: 'green',
    default: 'bg-green-500 text-white',
    hover: 'hover:bg-green-600',
  },
  warning: {
    color: 'orange',
    default: 'bg-orange-500 text-white',
    hover: 'hover:bg-orange-600',
  },
  danger: {
    color: 'red',
    default: 'bg-red-500 text-white',
    hover: 'hover:bg-red-600',
  },
  boring: {
    color: 'gray',
    default: 'bg-gray-500 text-white',
    hover: 'hover:bg-gray-600',
  },
});
export const themed = name => `${themes[name].default} ${themes[name].hover}`;

export const or = (arg, defaultValue) => (arg ? arg : defaultValue);

// This helper simply tells us if the imported component is valid
// which we need to do in this app to maintain stability because
// some of the components haven't been defined yet
export const isRealComponent = component => !!component?.moduleName;
