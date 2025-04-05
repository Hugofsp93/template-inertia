class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 6 }, if: :password_required?
  validates :password_confirmation, presence: true, if: :password_required?

  def as_json(options = {})
    super(options.merge(
      except: [ :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at ],
      methods: []
    ))
  end

  private

  def password_required?
    !persisted? || !password.nil? || !password_confirmation.nil?
  end
end
