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

  def new
  end

  def create
    @comparison = Comparison.new(comparison_params)

    @comparison.save
    redirect_to @comparison
  end

  def update
  end

  def destroy
  end

  private
  def comparison_params
    params.require(:comparison).permit(:search)
  end
end
