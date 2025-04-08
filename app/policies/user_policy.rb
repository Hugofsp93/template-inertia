class UserPolicy < ApplicationPolicy
  def index?
    user.admin? || user.super_admin?
  end

  def show?
    user.admin? || user.super_admin? || user == record
  end

  def create?
    user.admin? || user.super_admin?
  end

  def new?
    create?
  end

  def new_user?
    user.admin? || user.super_admin?
  end

  def create_user?
    new_user?
  end

  def update?
    if user.super_admin?
      # Super admin pode editar qualquer usuário
      true
    elsif user.admin?
      # Admin só pode editar usuários comuns e ele mesmo
      record.user? || user == record
    else
      # Usuário comum só pode editar ele mesmo
      user == record
    end
  end

  def edit?
    update?
  end

  def destroy?
    if user.super_admin?
      # Super admin não pode se excluir
      user != record
    elsif user.admin?
      # Admin só pode excluir usuários comuns
      record.user?
    else
      false
    end
  end

  class Scope < Scope
    def resolve
      if user.super_admin?
        scope.joins(:roles).where.not(roles: { name: "super_admin" }).order(name: :asc)
      elsif user.admin?
        # Admin não vê super_admins e admins
        scope.joins(:roles).where.not(roles: { name: [ "super_admin", "admin" ] }).order(name: :asc)
      else
        # Usuário comum só vê ele mesmo
        scope.where(id: user.id)
      end
    end
  end
end
