module.exports = [
    {
        id: 'antwerpen_be',
        country: 'Belgium',
        short: 'Antwerp',
        download: 'https://opendata.arcgis.com/datasets/0293af55ca454b44ba789ee14c82543a_676.zip',
        info: 'https://portaal-stadantwerpen.opendata.arcgis.com/datasets/boom/data',
        crosswalk: {
            scientific: 'LATBOOMSOO',
            dbh: 'STAMOMTREK',
            ref: 'ANTW_ID'
        }
    },
    {
        id: 'wallonie_bruxelles_be',
        short: 'Wallonie-Bruxelles',
        download: 'https://www.odwb.be/explore/dataset/arbustum/download/?format=shp',
        info: 'https://www.odwb.be/explore/dataset/arbustum/information/'
    },
    {
        id: 'roosendaal_be',
        short: 'Roosendaal',
        long: 'Gemeente Roosendaal',
        download: 'https://opendata.arcgis.com/datasets/f97b4a30ac914a73aa7552a96f0ae82d_0.zip',
        info: 'https://opendata.roosendaal.nl/datasets/gbi-boom-public'
    },
    {
        id: 'gent_be',
        short: 'Gent',
        long: 'Stad Gent',
        download: 'https://datatank.stad.gent/4/milieuennatuur/bomeninventaris.json',
        info: 'https://datatank.stad.gent/4/milieuennatuur/bomeninventaris',
        srs: {epsg: 3857},
        license: {
          name: 'Modellicentie Gratis Hergebruik - v1.0',
          url: 'https://overheid.vlaanderen.be/sites/default/files/documenten/ict-egov/licenties/hergebruik/modellicentie_gratis_hergebruik_v1_0.html'
        }
    }
].map(s => ({...s, country: 'Belgium'}))
