import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import Storage from '../../util/Storage';

export default function AxiosCall(props) {
    const [htmlContent, setHtmlContent] = useState(null)
    const wikiData = Storage("get", null, "wikiData")

    useEffect(() => {
        if (props.search) {
            let link = wikiData.find(item => item["name"].toLowerCase() === props.search.toLowerCase());
            if (link) {
                try {
                    axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent("http://dnd2024.wikidot.com" + link["href"])}`)
                        .then(res => {
                            const cheerioData = cheerio.load(res.data.contents);
                            cheerioData(".main-content .breadcrumbs").remove();

                            cheerioData(".page-title").attr("style", "font-size: 32px; border-bottom: 3px solid;");
                            cheerioData("table").each((index, table) => {
                                cheerioData(table).attr(
                                    "style",
                                    "border-collapse: collapse; width: 100%; margin: 20px 0; font-size: 14px;"
                                );
                            });

                            cheerioData("table th").each((index, th) => {
                                cheerioData(th).attr(
                                    "style",
                                    "border: 1px solid #ddd; padding: 8px; text-align: left;"
                                );
                            });

                            cheerioData("table td").each((index, td) => {
                                cheerioData(td).attr(
                                    "style",
                                    "border: 1px solid #ddd; padding: 8px; text-align: left;"
                                );
                            });

                            setHtmlContent(cheerioData(".main-content").html());
                            props.setLoading(false);
                        })
                } catch (error) {
                    console.log(error);
                    setHtmlContent('<h1>Error. Please try again.</h1>')
                }
            } else {
                setHtmlContent('<h1>"' + props.search + '" does not exist.</h1>')
                props.setLoading(false);
            }
        }
    }, [props.search]);

    return (
        <>
            <div
                className="custom-style"
                dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
            ></div>
        </>
    );
}
