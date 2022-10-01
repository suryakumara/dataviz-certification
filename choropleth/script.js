const countyURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

const width = 1000;
const height = 700;
const range = [15, 30, 45, 60];

const svg = d3.select("#main").append("svg").attr("width", width).attr("height", height);

svg
  .append("text")
  .attr("id", "title")
  .attr("x", 160)
  .attr("y", 40)
  .text("United States Educational Attainment")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "30px");

svg
  .append("text")
  .attr("id", "description")
  .attr("x", 150)
  .attr("y", 70)
  .text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "15px")
  .style("font-weight", "100");

let tooltip = d3
  .select("#tooltip")
  .attr("class", "tooltip")
  .style("visibility", "hidden")
  .style("position", "absolute");

const legend = svg
  .append("g")
  .attr("id", "legend")
  .attr("class", "legend-label")
  .attr("transform", `translate(10, ${height - 30})`);

legend
  .selectAll("rect")
  .data(range)
  .enter()
  .append("rect")
  .attr("width", "20")
  .attr("height", "20")
  .attr("fill", (percentage) => {
    if (percentage <= range[0]) {
      return "#E5F5E0";
    } else if (percentage <= range[1]) {
      return "#74C476";
    } else if (percentage <= range[2]) {
      return "#41AB5D";
    } else {
      return "#238B45";
    }
  })
  .attr("x", (val, i) => {
    return 20 + (i + 1) * 30;
  });

legend
  .selectAll("text")
  .data(range)
  .enter()
  .append("text")
  .text((val) => {
    if (val === 60) {
      return ">45";
    }
    return val;
  })
  .attr("x", (val, i) => {
    return 20 + (i + 1.1) * 30;
  })
  .attr("y", 15)
  .style("font-size", "10px");

const onDrawMap = (countyData, educationData) => {
  if (!countyData) return;
  svg
    .selectAll("path")
    .data(countyData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (countyDataItem) => {
      let id = countyDataItem["id"];
      let county = educationData.find((item) => item["fips"] === id);
      let percentage = county["bachelorsOrHigher"];

      if (percentage <= range[0]) {
        return "#E5F5E0";
      } else if (percentage <= range[1]) {
        return "#74C476";
      } else if (percentage <= range[2]) {
        return "#41AB5D";
      } else {
        return "#238B45";
      }
    })
    .attr("data-fips", (countyDataItem) => countyDataItem["id"])
    .attr("data-education", (countyDataItem) => {
      let id = countyDataItem["id"];
      let county = educationData.find((item) => item["fips"] === id);
      return (percentage = county["bachelorsOrHigher"]);
    })
    .attr("transform", "translate(30, 70)")
    .on("mouseover", (e, countyDataItem) => {
      tooltip.transition().style("visibility", "visible");
      const coords = d3.pointer(e);
      const xPost = coords[0];
      const yPost = coords[1];
      tooltip.style("left", `${xPost}px`).style("top", `${yPost}px`);

      let id = countyDataItem["id"];
      let county = educationData.find((item) => item["fips"] === id);
      let percentage = county["bachelorsOrHigher"];

      tooltip.text(
        county["fips"] +
          " - " +
          county["area_name"] +
          ", " +
          county["state"] +
          ":" +
          county["bachelorsOrHigher"] +
          "%"
      );
      tooltip.attr("data-education", percentage);
      tooltip.attr("id", "tooltip");
    })
    .on("mouseout", () => {
      tooltip.transition().style("visibility", "hidden");
    });
};

onDrawMap();

d3.json(countyURL).then((data, error) => {
  if (error) console.log(error);
  const countyData = topojson.feature(data, data.objects.counties).features;
  d3.json(educationURL).then((data, error) => {
    if (error) console.log(error);
    onDrawMap(countyData, data);
  });
});
