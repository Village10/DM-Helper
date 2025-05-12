import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function SearchWiki(search) {

    const final = []
    const deepLinks = [
        "Unearthed Arcana",
        "Feats",
        "All Spells",
        "All Species",
        "All Backgrounds"
    ];

    async function fetchLinks(link) {
        let temp = []
        await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent("http://dnd2024.wikidot.com" + link)}`)
            .then(res => {
                const cheerioData = cheerio.load(res.data.contents);
                cheerioData('.main-content a').each((index, element) => {
                    const href = cheerioData(element).attr('href');
                    if (href && href.startsWith('/') && !href.startsWith('/home')) {
                        temp.push({
                            name: cheerioData(element).text().trim(),
                            href: href,
                        });
                    }
                })
            })
        final.push(...temp)
    }

    await fetchLinks("")
    for (let link of final) {
        if (deepLinks.includes(link["name"])) {
            await fetchLinks(link["href"]);
        }
    }

    return Array.from(new Map(final.map(obj => [obj.name, obj])).values());
}
