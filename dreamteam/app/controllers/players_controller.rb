class PlayersController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @players = Player.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @players}
    end
  end

  def show
    @players = Player.find_by_sql(params[:id])
    if @players
      render json: @players
    else
      render status: 400, nothing: true
    end
  end
end