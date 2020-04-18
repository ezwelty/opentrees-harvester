module.exports = [
  {
    id: 'fingal',
    country: 'Ireland',
    short: 'Fingal',
    long: 'Fingal County',
    download: 'http://data.fingal.ie/datasets/csv/Trees.csv',
    info: 'https://data.smartdublin.ie/dataset/tableview/ebf9151e-fd30-442e-93cb-fa88c2affc93',
    format: 'csv',
    crosswalk: {
      ref: x => Math.round(x.TREE_ID),
      scientific: 'Species_Desc',
      common: 'Common_Name',
      maturity: 'Age_Desc',
      height: 'Height',
      spread: 'Spread',
      dbh: x => (x['Actual_Trunk'] || '').replace('cm', ''),
      health: 'Condition'
    }
  }
].map(s => ({ ...s, country: 'Ireland' }))
