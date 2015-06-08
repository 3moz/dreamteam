class TeamSeasonsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @teamseasons = TeamSeason.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @teamseasons}
    end
  end

  def show
    @teamseasons = TeamSeason.find_by_sql(params[:id])
    if @teamseasons
      render json: @teamseasons
    else
      render status: 400, nothing: true
    end
  end
end