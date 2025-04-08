class UserMailer < ApplicationMailer
  def reset_password_instructions(user, token)
    @user = user
    @token = token
  mail(to: @user.email, subject: "Instruções para redefinição de senha")
  end
end
