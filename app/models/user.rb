class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, if: :password_required?
  validates :password_confirmation, presence: true, if: :password_required?

  def role
    roles.first&.name
  end

  def as_json(options = {})
    options = options.merge(
      except: [ :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at ],
      methods: [ :role ]
    )
    super(options)
  end

  def admin?
    has_role?(:admin)
  end

  def super_admin?
    has_role?(:super_admin)
  end

  def user?
    has_role?(:user)
  end

  private

  def password_required?
    new_record? || password.present? || password_confirmation.present?
  end
end
