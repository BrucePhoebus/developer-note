# 自动初始化 Gitalk 和 Gitment 评论配置：https://draveness.me/git-comments-initialize
username = "BrucePhoebus" # GitHub 用户名
new_token = ""  # GitHub Token
repo_name = "github-comments-repo" # 存放 issues
kind = "Gitalk" # "Gitalk" or "gitment"
urls = ["http://localhost:3000/#/%E7%9F%A5%E8%AF%86%E7%AC%94%E8%AE%B0/"]	# 不想要创建评论的页面地址

require 'open-uri'
require 'faraday'
require 'active_support'
require 'active_support/core_ext'

conn = Faraday.new(:url => "https://api.github.com/repos/#{username}/#{repo_name}/issues") do |conn|
  conn.basic_auth(username, token)
  conn.adapter  Faraday.default_adapter
end

urls.each_with_index do |url, index|
  title = open(url).read.scan(/<title>(.*?)<\/title>/).first.first.force_encoding('UTF-8')
  response = conn.post do |req|
    req.body = { body: url, labels: [kind, url[0,48]], title: title }.to_json
  end
  puts response.body
  sleep 15 if index % 20 == 0
end