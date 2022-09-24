const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

let xScale, xAxisScale, yAxisScale, yScale;
const width = 800;
const height = 500;
const margin = { top: 50, right: 50, bottom: 50, left: 70 };

const svg = d3.select("main").append("svg").attr("width", width).attr("height", height);
svg
  .append("text")
  .attr("id", "title")
  .attr("x", 250)
  .attr("y", 50)
  .text("United States GDP")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "2.5em")
  .style("font-weight", "100");

let tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip")
  .style("visibility", "hidden")

  .style("position", "absolute");

const onLoad = async () => {
  const res = await fetch(url);
  const data = await res.json();
  onDrawChart(data.data);
};
onLoad();

const onDrawChart = (values) => {
  yScale = d3
    .scaleLinear()
    .domain([0, d3.max(values, (item) => item[1])])
    .range([0, height - margin.top - margin.bottom]);

  xScale = d3
    .scaleLinear()
    .domain([0, values.length - 1])
    .range([margin.left, width - margin.right]);

  const datesArray = values.map((value) => new Date(value[0]));
  xAxisScale = d3
    .scaleTime()
    .domain([d3.min(datesArray), d3.max(datesArray)])
    .range([margin.left, width - margin.right]);

  yAxisScale = d3
    .scaleLinear()
    .domain([0, d3.max(values, (value) => value[1])])
    .range([height - margin.bottom, margin.top]);

  // Axis
  let xAxis = d3.axisBottom(xAxisScale);
  let yAxis = d3.axisLeft(yAxisScale);

  svg
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - margin.top})`);

  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", `translate(${margin.left} , 0)`);

  // draw bar
  svg
    .selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", (width - margin.left - margin.right) / values.length)
    .attr("data-date", (value) => {
      return value[0];
    })

    .attr("data-gdp", (value) => {
      return value[1];
    })
    .attr("height", (value) => {
      return yScale(value[1]);
    })
    .attr("x", (value, index) => {
      return xScale(index);
    })
    .attr("y", (value) => {
      return height - margin.top - yScale(value[1]);
    })
    .on("mouseover", (e, value) => {
      tooltip.transition().style("visibility", "visible");
      tooltip.text(`$${value[1]} Billion`);
      tooltip.attr("data-date", value[0]);

      const coords = d3.pointer(e);
      const xPost = coords[0];
      const yPost = coords[1] + height - margin.top - margin.bottom;
      tooltip.style("left", `${xPost}px`).style("top", `${yPost}px`);
    })
    .on("mouseleave", (e, value) => {
      tooltip.transition().style("visibility", "hidden");
    });
};
