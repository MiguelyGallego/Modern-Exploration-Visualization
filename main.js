const width = 800
const height = 400
const margin = {
    top: 10,
    bottom: 40,
    rigth: 10,
    left: 60

}

const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

const x = d3.scaleBand().range([0, width - margin.left - margin.rigth])
const y = d3.scaleLinear().range([height - margin.bottom - margin.top, 0])

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

d3.csv("WorldCup.csv").then(data =>{
    console.log(data)

    data.map(d => d.Year = +d.Year)

    let nest = d3.nest()
    .key(d => d.Winner)
    .entries(data)

    console.log(nest)

    x.domain(nest.map(d => d.key)).padding(0.2)
    y.domain([0, d3.max(nest.map(d => d.values.length))])

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis.ticks(y.domain()[1]))

    let elements = elementGroup.selectAll("rect").data(nest)
    elements.enter().append("rect")
        .attr("class", "band")
        .attr("x", d => x(d.key))
        .attr("y", d => y(d.values.length))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.top - margin.bottom - y(d.values.length))
})


// const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
// const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
// const axisGroup = svg.append("g").attr("id", "axisGroup")
// const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
// const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

// const y = d3.scaleBand().range([height - margin.top - margin.bottom, 0]).padding(0.1)
// const x = d3.scaleLinear().range([0, width - margin.left - margin.rigth])

// const xAxis = d3.axisBottom().scale(x)
// const yAxis = d3.axisLeft().scale(y)

// d3.csv("WorldCup.csv").then(data =>{
//     console.log(data)

//     data.map(d => d.Year = +d.Year)

//     let nest = d3.nest()
//     .key(d => d.Winner)
//     .entries(data)

//     console.log(nest)

//     x.domain([0, d3.max(nest.map(d => d.values.length))])
//     y.domain(nest.map(d => d.key))

//     xAxisGroup.call(xAxis.ticks(x.domain()[1]))
//     yAxisGroup.call(yAxis)

//     let elements = elementGroup.selectAll("rect").data(nest)
//     elements.enter().append("rect")
//         .attr("x", 0)
//         .attr("y", d => y(d.key))
//         .attr("width", d => x(d.values.length))
//         .attr("height", y.bandwidth())
// })