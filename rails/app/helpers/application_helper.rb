module ApplicationHelper
  def webpack_asset_path(path)
    if Rails.env.development?
      "http://localhost:3500/#{path}"
    else
      "/#{path}"
    end
  end
end
