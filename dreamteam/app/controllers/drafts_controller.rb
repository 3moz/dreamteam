class DraftsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @drafts = Draft.all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @drafts}
    end
  end

  def show
    @draft = Draft.find_by_sql(params[:id])
    if @draft
      render json: @draft
    else
      render status: 400, nothing: true
    end
  end
end