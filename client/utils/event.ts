export const TAB_EVENT = 'new_tab';

export const emitTabEvent = ({ schema = '', type = 'sql' }) => {
  const event = new CustomEvent(TAB_EVENT, { detail: { schema, type } });
  document.dispatchEvent(event);
};
