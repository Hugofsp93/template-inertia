export const translateRole = (role) => {
  const translations = {
    'super_admin': 'SuperAdmin',
    'admin': 'Administrador',
    'user': 'Usuário'
  }
  return translations[role] || role
} 