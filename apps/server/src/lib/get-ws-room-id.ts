type Props = {
  role: string;
  scope: string;
  scopeId: string;
};
export const getWsRoomId = ({ role, scope, scopeId }: Props): string => {
  return `${role}:${scope}:${scopeId}`;
};
