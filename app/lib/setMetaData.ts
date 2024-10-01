import { Metadata } from "next";

type seoType = {    
    opengraphTitle: string;
    opengraphDescription: string;
    opengraphUrl: string;
    opengraphSiteName: string;
    opengraphImage: {
        sourceUrl: string;
    };
};
export default function setMetaData(params: seoType): Metadata {
    
    let metadata: Metadata = {        
        openGraph: {
            title: params.opengraphTitle,
            description: params.opengraphDescription,
            url: params.opengraphUrl,
            siteName: params.opengraphSiteName,
            type: 'website',            
            images: [
                {
                    url: params.opengraphImage ? params.opengraphImage.sourceUrl : '',
                    width: 800,
                    height: 600,
                },
            ],
            locale: "en_US",
        },
    };
    
    return metadata;
}