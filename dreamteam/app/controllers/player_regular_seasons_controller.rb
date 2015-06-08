class PlayerRegularSeasonsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @playerregularseasons = PlayerRegularSeason.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @playerregularseasons}
    end
  end

  def show
    @playerregularseasons = PlayerRegularSeason.find_by_sql(params[:id])
    if @playerregularseasons
      render json: @playerregularseasons
    else
      render status: 400, nothing: true
    end
  end
end