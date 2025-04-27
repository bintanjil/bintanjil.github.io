fetch('https://codeforces.com/api/user.info?handles=tanjill')
    .then(response => response.json())
    .then(data => {
        const user = data.result[0];
        document.getElementById('cf-rating').textContent = 
            `${user.rating} (${user.rank})`;
    })
    .catch(err => console.log('Error fetching CF data:', err));