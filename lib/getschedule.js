async function GetSchedule() {

    console.log('fetching new data');
    const response = await fetch('https://app.splatoon2.nintendo.net/api/schedules', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Host': 'app.splatoon2.nintendo.net',
            'x-unique-id': '32449507786579989234',
            'x-requested-with': 'XMLHttpRequest',
            'x-timezone-offset': '480',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Mobile Safari/537.36',
            'Accept': '*/*',
            'Referer': 'https://app.splatoon2.nintendo.net/home',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US',
            Cookie: 'iksm_session=108572e6e5fea7d56d3788575aec6f5a17acd7eb',
        },
    });


    return response.json();

}

module.exports = { GetSchedule };