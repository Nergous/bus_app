import axios from 'axios';
const cheerio = require('react-native-cheerio');

export interface Stop {
    id: number;
    link: string;
    name: string;
}

const parseStops = async (url: string): Promise<Stop[] | null> => {
    try {
        const response = await axios.get(url);
        const html = response.data;

        const $ = cheerio.load(html);
        const buses = $('a.trip-row');

        const routes: Stop[] = buses.map((index: number, element: any) => {
            const name = $(element).find('.trip-label').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
            const link = $(element).attr('href') || "";
            const id = index + 1;
            return { id, name, link };
        }).get();
        return routes;

    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
        return null;
    }
};

const main = async () => {
    const url = "https://route51.ru/komi/timetable/syktyvkar/bus_54m?direction=1";
    const result = await parseStops(url);
    console.log(result);
};

main();
export default parseStops;