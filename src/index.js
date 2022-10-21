const axios = require("axios");
const fs = require('fs');

async function rip() {
    //change this to the url of the page you want to rip, make sure you have the #foto-1 at the end
    const result = await axios.get("https://www.funda.nl/koop/verkocht/oosterhout-nb/huis-42532678-klinkenberg-9/#foto-1")

    //find the biggest images.
    const imageUrls = result.data.match(/.*2160x1440.jpg/g).map(match => {
        match = match.trim()
        match = match.split(" ")
        return match[match.length - 1]
    });

    // download the images
    for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const result = await axios({method: 'get', url, responseType: 'stream'})
        result.data.pipe(fs.createWriteStream(`./images/${i}.jpg`))
    }
}

rip()


