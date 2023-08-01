const checkOnElemAdding = (
  props,
  propName,
  isExistedPropName,
  componentName
) => {
  if (isExistedPropName && !props[propName]) {
    return new Error(
      `The prop ${propName} is required when isAdditionEnabled is set to true in ${componentName}.`
    );
  }
};

export default checkOnElemAdding;
