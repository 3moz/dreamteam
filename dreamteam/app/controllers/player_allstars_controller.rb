class PlayerAllstarsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @playerallstars = PlayerAllstar.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @playerallstars}
    end
  end

  def show
    @playerallstar = PlayerAllstar.find_by_sql(params[:id])
    if @playerallstar
      render json: @playerallstar 
    else
      render status: 400, nothing: true
    end
  end
end