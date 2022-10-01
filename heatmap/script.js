let baseUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

let xScale, xAxis, yAxis, yScale;
const width = 1200;
const height = 600;
const margin = { top: 100, right: 50, bottom: 50, left: 70 };
const range = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4];

const svg = d3.select("main").append("svg").attr("width", width).attr("height", height);
svg
  .append("text")
  .attr("id", "title")
  .attr("x", 350)
  .attr("y", 40)
  .text("Monthly Global Land-Surface Temperature")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "30px")
  .style("font-weight", "100");
svg
  .append("text")
  .attr("id", "description")
  .attr("x", 470)
  .attr("y", 70)
  .text("1753 - 2015: base temperature 8.66℃")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "20px")
  .style("font-weight", "100");

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
  .attr("fill", (variance) => {
    if (variance <= range[0]) {
      return "#313695";
    } else if (variance <= range[1]) {
      return "#4575B4";
    } else if (variance <= range[2]) {
      return "#74ADD1";
    } else if (variance <= range[3]) {
      return "#ABD9E9";
    } else if (variance <= range[4]) {
      return "#E0F3F8";
    } else if (variance <= range[5]) {
      return "#FDFFBF";
    } else if (variance <= range[6]) {
      return "#FBE090";
    } else if (variance <= range[7]) {
      return "#F9AD61";
    } else if (variance <= range[8]) {
      return "#F46D43";
    } else if (variance <= range[9]) {
      return "#D73028";
    } else {
      return "#fff";
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
  .text((val) => val)
  .attr("x", (val, i) => {
    return 20 + (i + 1.2) * 30;
  })
  .attr("y", 15)
  .style("font-size", "10px");

let tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip")
  .style("visibility", "hidden")
  .style("position", "absolute");

const onDrawHeatMap = (datas) => {
  const values = datas["monthlyVariance"];
  const baseTemp = datas["baseTemperature"];

  const minYear = d3.min(values, (value) => value["year"]);
  const maxYear = d3.max(values, (value) => value["year"]);
  const numberOfYears = maxYear - minYear;
  // const arr1 = values.map((item) => item.variance);
  // console.log(Math.min(...arr1));
  // console.log(Math.max(...arr1));
  xScale = d3
    .scaleLinear()
    .domain([minYear, maxYear + 1])
    .range([margin.left, width - margin.right]);

  yScale = d3
    .scaleTime()
    .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
    .range([margin.top, height - margin.bottom]);

  xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%B"));

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
    .selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("fill", (value) => {
      const variance = value["variance"];
      if (variance <= range[0]) {
        return "#313695";
      } else if (variance <= range[1]) {
        return "#4575B4";
      } else if (variance <= range[2]) {
        return "#74ADD1";
      } else if (variance <= range[3]) {
        return "#ABD9E9";
      } else if (variance <= range[4]) {
        return "#E0F3F8";
      } else if (variance <= range[5]) {
        return "#FDFFBF";
      } else if (variance <= range[6]) {
        return "#FBE090";
      } else if (variance <= range[7]) {
        return "#F9AD61";
      } else if (variance <= range[8]) {
        return "#F46D43";
      } else if (variance <= range[9]) {
        return "#D73028";
      } else {
        return "#fff";
      }
    })
    .attr("data-month", (value) => value["month"] - 1)
    .attr("data-year", (value) => value["year"])
    .attr("data-temp", (value) => value + baseTemp)
    .attr("height", (height - margin.top - margin.bottom) / 12)
    .attr("y", (value) => {
      return yScale(new Date(0, value["month"] - 1, 0, 0, 0, 0, 0));
    })
    .attr("width", (value) => {
      return (width - margin.left - margin.right) / numberOfYears;
    })
    .attr("x", (value) => {
      return xScale(value["year"]);
    })
    .on("mouseover", (e, value) => {
      tooltip.transition().style("visibility", "visible");
      const coords = d3.pointer(e);
      const xPost = coords[0];
      const yPost = coords[1] + margin.top + margin.bottom;
      tooltip.style("left", `${xPost}px`).style("top", `${yPost}px`);
      tooltip.attr("data-year", value["year"]);
      tooltip.text("Year :" + value["year"] + " with variance:" + value["variance"]);
    })
    .on("mouseleave", (e, value) => {
      tooltip.transition().style("visibility", "hidden");
    });
};

const getData = async () => {
  const res = await fetch(baseUrl);
  const data = await res.json();
  onDrawHeatMap(data);
};

getData();
