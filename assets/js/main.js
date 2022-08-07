console.log('Website succesfully loaded ! made by %cGaspardLB', 'color: black;background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);font-family: Helvetica; padding: 10px; font-size: 15px; font-weight: 600; border-radius: 10px ');
console.log('Checkout my website : https://gaspard-lb.web.app/')


// Geolocation 


const succesCallback = (position) => {
  
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    console.log(latitude + ' ' + longitude)
    console.log('Check your location here : https://www.google.com/maps/search/' + latitude + '+' + longitude);
  
    const geoApiUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + latitude + '&longitude=' + longitude + '&localityLanguage=en'
  
    fetch(geoApiUrl)
    .then(res => res.json())
    .then(data => {
      let city = data.locality + ', ' + data.countryName
      console.log(city)
      getData(city) 
    })
    setTimeout(succesCallback, 60000);
  };
  
  const errorCallback = (error) => {
    console.error(error);
  }
  
  navigator.geolocation.getCurrentPosition(succesCallback, errorCallback);


// Weather Function 


function getData(value) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+value+'&appid=7d80c26b1809f3e46ec69871ca7a8da2')
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      document.getElementById('errorMessage').style.display = 'none';
      let temp = Math.round(weather.main.temp - 273.15);

      document.getElementById('temp').innerHTML = temp + '°C';
      console.log(temp + '°C');

      tempToRem = (temp / 45)*36
      document.getElementById('tempIndicator').style.height = tempToRem + 'rem';
      
      let circle = document.getElementById('circle')
      let tempIndicator = document.getElementById('tempIndicator')
      if (temp < 5) {
        tempIndicator.style.height = '4rem';
      } else if (temp < 11) {
        circle.classList.add('cold')
        tempIndicator.classList.add('cold')
      } else if (temp > 37) {
        circle.classList.add('hot')
        tempIndicator.classList.add('hot')
      } else if (temp > 44 ) {
        tempIndicator.style.height = '36rem';
      } else {
        circle.classList.add('normal')
        tempIndicator.classList.add('normal')
      }

    })
    .catch(function (err) {
      console.log(err);
      document.getElementById('errorMessage').style.display = 'block';
    });
  }