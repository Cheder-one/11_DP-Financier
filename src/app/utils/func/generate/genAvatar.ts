const genAvatar = (): string => {
  return `https://avatars.dicebear.com/api/avataaars/${(
    Math.random() + 1
  )
    .toString(36)
    .substring(7)}.svg`;
};

export default genAvatar;
