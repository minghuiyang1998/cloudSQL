export const TAB_EVENT = 'new_tab';

export const emitTabEvent = (body) => {
  const event = new CustomEvent(TAB_EVENT, { detail: body });
  document.dispatchEvent(event);
};
