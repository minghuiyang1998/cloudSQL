export const NEW_TAB_EVENT = 'new_tab';
export const NEW_MSG_EVENT = 'new_msg';
export const REMOVE_MSG_EVENT = 'remove_msg';

export const emitEvent = (event, body) => {
  const custom = new CustomEvent(event, { detail: body });
  document.dispatchEvent(custom);
};
