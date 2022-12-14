const videoGameSales =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const heightCanvas = 750;
const width = 1000;
const height = 600;

let videoGameData;

let range;

const colorsArray = [
  "rgb(76, 146, 195)",
  "rgb(255, 201, 147)",
  "rgb(222, 82, 83)",
  "rgb(209, 192, 221)",
  "rgb(233, 146, 206)",
  "rgb(210, 210, 210)",
  "rgb(190, 210, 237)",
  "rgb(86, 179, 86)",
  "rgb(255, 173, 171)",
  "rgb(163, 120, 111)",
  "rgb(249, 197, 219)",
  "rgb(201, 202, 78)",
  "rgb(255, 153, 62)",
  "rgb(173, 229, 161)",
  "rgb(169, 133, 202)",
  "rgb(208, 176, 169)",
  "rgb(153, 153, 153)",
  "rgb(226, 226, 164)",
];

const svg = d3.select("#main").append("svg").attr("width", width).attr("height", heightCanvas);

svg
  .append("text")
  .attr("id", "title")
  .attr("x", 400)
  .attr("y", 40)
  .text("Video Game Sales")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "30px");

svg
  .append("text")
  .attr("id", "description")
  .attr("x", 350)
  .attr("y", 70)
  .text("Top 100 Most Sold Video Games Grouped by Platform")
  .attr("class", "text")
  .style("font-family", "sans-serif")
  .style("font-size", "15px")
  .style("font-weight", "100");

let tooltip = d3
  .select("#tooltip")
  .attr("class", "tooltip")
  .style("visibility", "hidden")
  .style("position", "absolute");

const drawLegned = () => {
  const legend = svg
    .append("g")
    .attr("id", "legend")
    .attr("class", "legend-label")
    .attr("transform", `translate(0, ${heightCanvas - height - 40})`);

  legend
    .selectAll("rect")
    .data(range)
    .enter()
    .append("rect")
    .attr("width", "20")
    .attr("height", "20")
    .attr("class", "legend-item")
    .attr("fill", (category) => {
      if (category === range[0]) {
        return colorsArray[0];
      }
      if (category === range[1]) {
        return colorsArray[1];
      }
      if (category === range[2]) {
        return colorsArray[2];
      }
      if (category === range[3]) {
        return colorsArray[3];
      }
      if (category === range[4]) {
        return colorsArray[4];
      }
      if (category === range[5]) {
        return colorsArray[5];
      }
      if (category === range[6]) {
        return colorsArray[6];
      }
      if (category === range[7]) {
        return colorsArray[7];
      }
      if (category === range[8]) {
        return colorsArray[8];
      }
      if (category === range[9]) {
        return colorsArray[9];
      }
      if (category === range[10]) {
        return colorsArray[10];
      }
      if (category === range[11]) {
        return colorsArray[11];
      }
      if (category === range[12]) {
        return colorsArray[12];
      }
      if (category === range[13]) {
        return colorsArray[13];
      }
      if (category === range[14]) {
        return colorsArray[14];
      }
      if (category === range[15]) {
        return colorsArray[15];
      }
      if (category === range[16]) {
        return colorsArray[16];
      }
      if (category === range[17]) {
        return colorsArray[17];
      }
      return "#ffffff";
    })
    .attr("x", (val, i) => {
      return 20 + (i + 1) * 50;
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
      return 40 + (i + 1.1) * 50;
    })
    .attr("y", 15)
    .style("font-size", "10px");
};

const onDrawTreeMap = () => {
  let hierarchy = d3
    .hierarchy(videoGameData, (node) => {
      return node["children"];
    })
    .sum((node) => {
      return node["value"];
    })
    .sort((node1, node2) => {
      return node2["value"] - node1["value"];
    });

  let createTreeMap = d3.treemap().size([width, height]);
  createTreeMap(hierarchy);

  let videoGameTiles = hierarchy.leaves();

  const categories = videoGameTiles.map((vg) => vg.data.category);
  range = [...new Set(categories)];

  const tiles = svg
    .selectAll("g")
    .data(videoGameTiles)
    .enter()
    .append("g")
    .attr("transform", (videGame) => {
      return `translate(${videGame["x0"]}, ${videGame["y0"] + (heightCanvas - height)})`;
    });

  tiles
    .append("rect")
    .attr("class", "tile")
    .attr("fill", (videoGame) => {
      const category = videoGame["data"]["category"];

      if (category === range[0]) {
        return colorsArray[0];
      }
      if (category === range[1]) {
        return colorsArray[1];
      }
      if (category === range[2]) {
        return colorsArray[2];
      }
      if (category === range[3]) {
        return colorsArray[3];
      }
      if (category === range[4]) {
        return colorsArray[4];
      }
      if (category === range[5]) {
        return colorsArray[5];
      }
      if (category === range[6]) {
        return colorsArray[6];
      }
      if (category === range[7]) {
        return colorsArray[7];
      }
      if (category === range[8]) {
        return colorsArray[8];
      }
      if (category === range[9]) {
        return colorsArray[9];
      }
      if (category === range[10]) {
        return colorsArray[10];
      }
      if (category === range[11]) {
        return colorsArray[11];
      }
      if (category === range[12]) {
        return colorsArray[12];
      }
      if (category === range[13]) {
        return colorsArray[13];
      }
      if (category === range[14]) {
        return colorsArray[14];
      }
      if (category === range[15]) {
        return colorsArray[15];
      }
      if (category === range[16]) {
        return colorsArray[16];
      }
      if (category === range[17]) {
        return colorsArray[17];
      }
      return "#ffffff";
    })
    .attr("data-name", (videGame) => {
      return videGame["data"]["name"];
    })
    .attr("data-category", (videGame) => {
      return videGame["data"]["category"];
    })
    .attr("data-value", (videGame) => {
      return videGame["data"]["value"];
    })
    .attr("width", (videoGame) => {
      return videoGame["x1"] - videoGame["x0"];
    })
    .attr("height", (videoGame) => {
      return videoGame["y1"] - videoGame["y0"];
    })
    .attr("stroke", "white")
    .attr("stroke-width", "1.5px")
    .on("mouseover", (e, videoGame) => {
      tooltip.transition().style("visibility", "visible");

      const bodyHeight = document.body.offsetHeight;
      const bodyWidth = document.body.offsetWidth;
      console.log(bodyHeight);
      tooltip.style("left", `${bodyWidth / 2 + 300}px`).style("top", `${bodyHeight / 4 - 100}px`);
      tooltip.text(videoGame["data"]["name"] + videoGame["data"]["value"]);
      console.log(videoGame["data"]["value"]);
      tooltip.attr("data-value", videoGame["data"]["value"]);
    })
    .on("mouseout", () => {
      tooltip.transition().style("visibility", "hidden");
    });

  tiles
    .append("text")
    .text((videGame) => {
      return videGame["data"]["name"];
    })
    .attr("x", 5)
    .attr("y", 22)
    .style("font-size", "10px");

  drawLegned();
};

d3.json(videoGameSales).then((data, error) => {
  if (error) console.error(error);

  videoGameData = data;

  onDrawTreeMap();
});
