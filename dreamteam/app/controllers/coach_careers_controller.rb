class CoachCareersController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @coachcareers = CoachCareer.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @coachcareers}
    end
  end

  def show
    @coachcareers = CoachCareer.find_by_sql(params[:id])
    if @coachcareers
      render json: @coachcareers
    else
      render status: 400, nothing: true
    end
  end
end