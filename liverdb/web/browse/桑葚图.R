library(d3Network)
edges = data.frame(N1 = paste0(rep(LETTERS[1:4], each = 4), rep(1:5, each = 16)),
                   N2 = paste0(rep(LETTERS[1:4], 4), rep(2:6, each = 16)),
                   Value = runif(80, min = 2, max = 5) * rep(c(1, 0.8, 0.6, 0.4, 0.3), each = 16),
                   stringsAsFactors = F)
# 筛选80%的记录，以免每个点都对应到4个点
sedges = edges[sample(c(TRUE, FALSE), nrow(edges), replace = TRUE, prob = c(0.8, 0.2)),]
head(edges)
d3links <- edges
d3nodes <- data.frame(name = unique(c(edges$N1, edges$N2)), stringsAsFactors = FALSE)
d3nodes$seq <- 0:(nrow(d3nodes) - 1)

d3links <- merge(d3links, d3nodes, by.x="N1", by.y="name")
names(d3links)[4] <- "source"

d3links <- merge(d3links, d3nodes, by.x="N2", by.y="name")
names(d3links)[5] <- "target"
names(d3links)[3] <- "value"

d3links <- subset(d3links, select=c("source", "target", "value"))
d3nodes <- subset(d3nodes, select=c("name"))

# 画图并保存为html文件
d3Sankey(Links = d3links, Nodes = d3nodes, Source = "source",
         Target = "target", Value = "value", NodeID = "name",
         fontsize = 12, nodeWidth = 30, file = "TestSankey.html")
