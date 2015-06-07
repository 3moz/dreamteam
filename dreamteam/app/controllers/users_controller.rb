class UsersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate, except: [:create]

  def index
    @users = User.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @users}
    end
  end

  def create
    @user = User.create(user_name: params[:user_name], password: params[:password])

    if @user.save
      session[:user_id] = @user.id
      redirect_to "/comparisons"
    else
      @sign_up_errors = "Username already in use - choose another."
      render "sessions/new"
    end
  end
end