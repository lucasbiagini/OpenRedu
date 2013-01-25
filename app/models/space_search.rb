class SpaceSearch < Search
  def initialize
    super(Space)
  end

  def self.perform(query, format, page = nil, per_page = 10)
    searcher = SpaceSearch.new
    # Instant search não necessita dos includes
    format == "json" ? includes = [] : includes = [:users, :teachers, :owner,
                                                   :tags, { :course => :environment }]
    searcher.search({ :query => query, :page => page,
                      :per_page => per_page, :include => includes })
  end
end
