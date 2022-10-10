export const classes = (...params) => {
  return params.filter(s => s && s.constructor === String && s.length > 0).join(' ');
}

const themes = Object.freeze({
  primary: 'blue',
  success: 'green',
  warning: 'orange',
  danger:  'red',
  boring:  'gray'
});
export const theme = (name) => `bg-${themes[name]}-500 hover:bg-${themes[name]}-600`;

export const or = (arg, defaultValue) => arg ? arg : defaultValue;


