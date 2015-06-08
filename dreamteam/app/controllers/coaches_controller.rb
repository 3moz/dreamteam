class CoachesController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @coaches = Coach.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @coaches}
    end
  end

  def show
    @coach = Coach.find_by_sql(params[:id])
    if @coach
      render json: @coach
    else
      render status: 400, nothing: true
    end
  end
end