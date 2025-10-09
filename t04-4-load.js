/* Stub: will draw the chart in T04-5 */
const createBarChart = (data) => {
    // --- Sizes (logical vs display) ---
    const viewW = 500;
    const viewH = Math.max(220, data.length * 28);
    const displayW = 640;
    const displayH = Math.min(480, data.length * 24 + 40);

    // --- SVG root ---
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
            .attr("viewBox", `0 0 ${viewW} ${viewH}`)
            .attr("width", displayW)
            .attr("height", displayH)
            .style("border", "1px solid #ccc");

    // --- Scales ---
    const xMax = d3.max(data, d => d.count);
    const labelX = 100; // reserve left space for labels
    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, viewW - labelX - 10]); // leave margin on right

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    // OLD rectangle-only drawing block (kept for reference)
    /*
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");
    */

    // --- NEW: group per row (bar + labels move together) ---
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // Bar rectangle inside the group (y = 0 because group sets vertical position)
    barAndLabel
        .append("rect")
        .attr("x", labelX)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

    // Category text (left of bar, right-aligned at x = labelX)
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", labelX)
        .attr("y", yScale.bandwidth() / 2 + 4) // vertically center-ish
        .attr("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "13px");

    // Value text (just past the end of each bar)
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => labelX + xScale(d.count) + 4)
        .attr("y", yScale.bandwidth() / 2 + 4)
        .style("font-family", "sans-serif")
        .style("font-size", "13px");
};

/* Load CSV, Convert Type, Quick Check */
d3.csv("data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
})).then(data => {
    // Quick check
    console.log(data); // whole array
    console.log("rows:", data.length);
    console.log("max:", d3.max(data, d => d.count));
    console.log("min:", d3.min(data, d => d.count));
    console.log("extent:", d3.extent(data, d => d.count)); // [min, max]
    //Optional: sort for easier reading (descending by count)
    data.sort((a, b) => d3.descending(a.count, b.count));
    // Hand off to the chart builder (implemented next exercise)
    createBarChart(data);
});