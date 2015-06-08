class TeamsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @teams = Team.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @teams}
    end
  end

  def show
    @teams = Team.find_by_sql(params[:id])
    if @teams
      render json: @teams
    else
      render status: 400, nothing: true
    end
  end
end