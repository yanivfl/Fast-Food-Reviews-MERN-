//Using Field-Level Validation
export function required(value) {
  return value ? undefined : 'Required';
} 

export function maxLength10(value) { 
  return value && value.length > 10 ? `Must be 10 characters or less` : undefined;
}

export function maxLength30(value) { 
  return value && value.length > 30 ? `Must be 30 characters or less` : undefined;
}

export function isUserExist(value, allValues, props, name) {
  console.log('test isUserExist')
  console.log('test props.user_names')
  console.log(props.user_names)
  console.log('test allValues.user_name')
  console.log(allValues.new_user_name)
  if (allValues && props.user_names.includes(allValues.new_user_name)){
    return 'User name already exist';
  }
  if (allValues && props.user_names.includes(allValues.user_name)){
    return 'User name already exist';
  }
}

export function validateImage(allValues) {
  // 1) check for correct type
  const types =  "image/jpeg, image/png , image/jpg";
  if (allValues && allValues.type) { 
    if (!types.includes(allValues.type)) {
      return `Picture type must be jpeg/png/jpg`;
    }
  }
  // 2) check for correct size
  if (allValues && allValues.size) { 
    const imageFileKb = allValues.size / 1024;   // Get image size in kilobytes
    const maxWeight = 50 * 1000 * 1000; // 50MB;
    if (imageFileKb > maxWeight) {
      return `Picture size must be less or equal to ${maxWeight}kb`;
    }
  }
}