class CreateDefaultSuperAdmin < ActiveRecord::Migration[7.2]
  def up
    # Cria a role super_admin se não existir
    Role.find_or_create_by!(name: 'super_admin')

    # Verifica se o usuário já existe
    return if User.exists?(email: 'hugofsp10@gmail.com')

    # Cria o super_admin padrão
    super_admin = User.create!(
      email: 'hugofsp10@gmail.com',
      password: 'lklklklk',
      password_confirmation: 'lklklklk',
      name: 'Super Admin',
      role: :super_admin
    )

    # Adiciona a role super_admin usando Rolify
    super_admin.add_role :super_admin
  end

  def down
    # Remove o super_admin padrão se existir
    User.find_by(email: 'hugofsp10@gmail.com')&.destroy
    # Remove a role super_admin
    Role.find_by(name: 'super_admin')&.destroy
  end
end
