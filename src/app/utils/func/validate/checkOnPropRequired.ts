const checkOnElemAdding = (
  props: object,
  propName: string,
  isExistedPropName: boolean | undefined,
  componentName: string
): Error | undefined => {
  // @ts-ignore
  if (isExistedPropName && !props[propName]) {
    return new Error(
      `The prop ${propName} is required when isAdditionEnabled is set to true in ${componentName}.`
    );
  }
};

export default checkOnElemAdding;
