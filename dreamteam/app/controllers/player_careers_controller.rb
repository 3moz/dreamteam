class PlayerCareersController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @playercareers = PlayerCareer.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @playercareers}
    end
  end

  def show
    @playercareer = PlayerCareer.find_by_sql(params[:id])
    if @playercareer
      render json: @playercareer 
    else
      render status: 400, nothing: true
    end
  end
end