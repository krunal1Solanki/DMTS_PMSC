const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});
const apiKey = 'AIzaSyC_mmyHAnkTF9dUjcTngzxG9eHfS3oMbfM';

async function calculateDistance(lat1, lon1, lat2, lon2) {
    try {
        const response = await client.distancematrix({
            params: {
                origins: [{ lat: lat1, lng: lon1 }],
                destinations: [{ lat: lat2, lng: lon2 }],
                mode: 'driving',
                units: 'metric',
                key: apiKey,
            },
        });

        const distance = response.data.rows[0].elements[0].distance.text;
        const distanceInMeters = parseFloat(distance.replace(' m', ''));
        console.log(distance, distanceInMeters)
        return distanceInMeters;
    } catch (error) {
        console.error(error.message);
        throw error; // rethrow the error to handle it outside of the function
    }
}

export default calculateDistance;