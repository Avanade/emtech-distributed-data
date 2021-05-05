
//

async function fetchBaconJson() {
  const response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1');
  const bacon = await response.json();
  return bacon;
}



export default (req, res) => {
  fetchBaconJson().then( bacon => {
    res.status(200).json(bacon)
  });

}
