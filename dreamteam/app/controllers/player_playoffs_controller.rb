class PlayerPlayoffsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @playerplayoffs = PlayerPlayoff.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @playerplayoffs}
    end
  end

  def show
    @playerplayoffs = PlayerPlayoff.find_by_sql(params[:id])
    if @playerplayoffs
      render json: @playerplayoffs
    else
      render status: 400, nothing: true
    end
  end
end