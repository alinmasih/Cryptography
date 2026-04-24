export function checkAccess(policy, userAttributes) {
  if (!policy || !userAttributes) {
    return false;
  }

  
  for (const [key, requiredValue] of Object.entries(policy)) {
    if (userAttributes[key] !== requiredValue) {
      return false; 
    }
  }

  return true; 
}
