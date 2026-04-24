function normalizeValue(value) {
  if (typeof value === 'string') {
    return value.trim().toLowerCase();
  }

  return value;
}

export function checkAccess(policy, userAttributes) {
  if (!policy || !userAttributes) {
    return false;
  }

  
  for (const [key, requiredValue] of Object.entries(policy)) {
    const actualValue = userAttributes[key];

    if (actualValue === undefined) {
      return false;
    }

    if (normalizeValue(actualValue) !== normalizeValue(requiredValue)) {
      return false; 
    }
  }

  return true; 
}
