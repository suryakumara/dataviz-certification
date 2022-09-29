const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

let xScale, xAxisScale, yAxisScale, yScale;
const width = 800;
const height = 500;
const margin = { top: 100, right: 50, bottom: 50, left: 70 };

const svg = d3.select("#main").append("svg").attr("width", width).attr("height", height);

svg
  .append("text")
  .attr("id", "title")
  .attr("x", 160)
  .attr("y", 40)
  .text("Doping in Professional Bicycle Racing")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "30px")
  .style("font-weight", "100");

svg
  .append("text")
  .attr("id", "title")
  .attr("x", 250)
  .attr("y", 65)
  .text("35 Fastest times up Alpe d'Huez")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "20px")
  .style("font-weight", "100");

let tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip")
  .style("visibility", "hidden")

  .style("position", "absolute");

const onLoadData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  drawScatterPot(data);
};

const drawScatterPot = (values) => {
  const margin = { top: 100, right: 50, bottom: 50, left: 70 };

  xScale = d3
    .scaleLinear()
    .domain([d3.min(values, (value) => value.Year) - 1, d3.max(values, (value) => value.Year) + 1])
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleTime()
    .domain([
      d3.min(values, (value) => new Date(value.Seconds * 1000)),
      d3.max(values, (value) => new Date(value.Seconds * 1000)),
    ])
    .range([margin.bottom, height - margin.bottom]);

  // axis
  let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  let yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  svg
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`);

  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", `translate(${margin.left}, 0)`);

  svg
    .selectAll("circle")
    .data(values)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", "5")
    .attr("data-xvalue", (value) => {
      return value.Year;
    })
    .attr("data-yvalue", (value) => {
      return new Date(value.Seconds * 1000);
    })
    .attr("cx", (value) => {
      return xScale(value.Year);
    })
    .attr("cy", (value) => {
      return yScale(new Date(value.Seconds * 1000));
    })
    .attr("fill", (value) => {
      if (value.Doping == "") {
        return "#F99A50";
      } else {
        return "#4A94C3";
      }
    })
    .attr("stroke", "black")
    .on("mouseover", (e, value) => {
      console.log(value);
      tooltip.transition().style("visibility", "visible");
      const coords = d3.pointer(e);
      const xPost = coords[0];
      const yPost = coords[1] + height - margin.top - margin.bottom;
      tooltip.style("left", `${xPost}px`).style("top", `${yPost}px`);
      tooltip.attr("data-year", value.Year);

      if (value.Doping == "") {
        tooltip.text(value.Year + " - " + value.Name + " - " + value.Time);
      } else {
        tooltip.text(value.Doping + " - " + value.Year + " - " + value.Name + " - " + value.Time);
      }
    })
    .on("mouseleave", (e, value) => {
      tooltip.transition().style("visibility", "hidden");
    });

  const legend1 = svg
    .append("g")
    .attr("class", "legend-label")
    .attr("transform", "translate(700, 230)");

  legend1.append("rect").attr("fill", "#4A94C3").style("width", "18px").style("height", "18px");
  legend1
    .append("text")
    .attr("id", "legend")
    .attr("transform", "translate(-95, 14)")
    .style("font-size", "10px")
    .text("No doping allegations");

  const legend2 = svg
    .append("g")
    .attr("class", "legend-label")
    .attr("transform", "translate(700, 210)");

  legend2.append("rect").attr("fill", "#F99A50").style("width", "18px").style("height", "18px");
  legend2
    .append("text")
    .attr("id", "legend")
    .attr("transform", "translate(-128, 14)")
    .style("font-size", "10px")
    .text("Riders with doping allegations");
};

onLoadData(url);
