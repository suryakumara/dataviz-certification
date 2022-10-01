const videoGameSales =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const width = 800;
const height = 500;
const range = [15, 30, 45, 60];

const svg = d3.select("#main").append("svg").attr("width", width).attr("height", height);

svg
  .append("text")
  .attr("id", "title")
  .attr("x", 270)
  .attr("y", 40)
  .text("Video Game Sales")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "30px");

svg
  .append("text")
  .attr("id", "description")
  .attr("x", 200)
  .attr("y", 70)
  .text("Top 100 Most Sold Video Games Grouped by Platform")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "15px")
  .style("font-weight", "100");

d3.json(videoGameSales).then((data, error) => {
  if (error) console.error(error);

  console.log(data);
});
