const engagementMessageOverTimeChartOptions = (messageCountList, channels) => {
	const data = channels
		.reduce((acc, channel) => {
			const messageCount = messageCountList.filter((message) => {
				return message.channelId === channel.id
			})
			if (messageCount.length > 1) {
				acc.push(messageCount)
			}
			return acc
		}, [])
		.flat(1)
		.map((channel) => {
			return [new Date(channel.timeBucket).getTime(), Number(channel.count)]
		})

	const options = {
		chart: {
			type: 'spline',
		},
		title: {
			text: 'Engagement Message Over Time',
		},
		xAxis: {
			type: 'datetime',
			title: {
				text: 'Date',
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Messages',
			},
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.name}</span><table>',
			pointFormat:
				'<div><div style="color:{series.color};padding:0">{series.name}</div>' +
				'<div style="padding:0">{point.y} messages on {point.x:%e. %b}</div></div>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true,
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
			},
		},
		series: [
			{
				name: 'general',
				data: data,
			},
		],
	}

	return options
}

const EngagementHelper = {
	engagementMessageOverTimeChartOptions: engagementMessageOverTimeChartOptions,
}

export default EngagementHelper
