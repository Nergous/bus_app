import axios from 'axios';
const cheerio = require('react-native-cheerio');

export interface BusRoute {
    name: string;
    link: string;
    num: string;
}

const parseAllBuses = async (url: string): Promise<BusRoute[] | null> => {
    try {
        const response = await axios.get(url);
        const html = response.data;

        const $ = cheerio.load(html);
        const buses = $('a.zone-route');

        const routes: BusRoute[] = buses.map((index: number, element: any) => {
            const name = $(element).find('.zone-route-text').text().trim();
            const link = $(element).attr('href') || "";
            const num = $(element).find('.zone-route-label').text().trim();
            return { name, link, num };
        }).get();
        return routes;

    } catch (error) {
        console.error('Error fetching or parsing HTML:', error);
        return null;
    }
};

export default parseAllBuses;