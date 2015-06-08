class PlayerPlayoffsCareersController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @playerplayoffscareers = PlayerPlayoffsCareer.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @playerplayoffscareers}
    end
  end

  def show
    @playerplayoffscareers = PlayerPlayoffsCareer.find_by_sql(params[:id])
    if @playerplayoffscareers
      render json: @playerplayoffscareers
    else
      render status: 400, nothing: true
    end
  end
end