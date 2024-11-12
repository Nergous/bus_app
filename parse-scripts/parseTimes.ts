import axios from 'axios';
const cheerio = require('react-native-cheerio');

export interface StopTime {
    hour: string;
    minutes: string;
}

const parseTimes = async (url: string): Promise<StopTime[] | null> => {
    try {
        const response = await axios.get(url);
        const html = response.data;

        const $ = cheerio.load(html);
        const times = $('.timetable-row');

        const routes: StopTime[] = times.map((index: number, element: any) => {
            const hour = $(element).find('.timetable-row-title').text().trim();
            const minutes = $(element).find('.timetable-row-container').text().trim();
            return { hour, minutes };
        }).get();
        return routes;

    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
        return null;
    }
};


export default parseTimes;