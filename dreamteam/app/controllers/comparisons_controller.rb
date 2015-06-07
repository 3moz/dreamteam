class ComparisonsController < ApplicationController
  protect_from_forgery with: :null_session

  
  def index
    @comparisons = Comparison.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @comparisons}
    end
  end

  def show
    @comparison = Comparison.find_by(id: params[:id])
    if @comparison
      render json: @comparison
    else
      render status: 400, nothing: true
    end
  end

  def create
    #here the text of the query that will obtain the stats data will be saved in the DB
    @comparison = Comparison.new(search: params[:comparison])

    if @comparison.save
    redirect_to '/comparisons'
    end
  end

  def update
  end

  def destroy
    @comparison = Comparison.find_by(id: params[:id])
    if @comparison.destroy
      render json: {}
    else
      render status: 400, nothing: true
    end
  end

  private
  def comparison_params
    params.require(:comparison)
  end
end
