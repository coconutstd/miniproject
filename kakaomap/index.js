const container = document.getElementById('map');
const options = {
  center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 3
};

const map = new kakao.maps.Map(container, options);
const $button = document.getElementById('button');

const positions = [
  {
      title: '카카오',
      content: '<div style="padding:5px;">카카오<br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>',
      latlng: new kakao.maps.LatLng(33.450705, 126.570677)
  },
  {
      title: '생태연못', 
      content: '<div style="padding:5px;">생태연못<br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>',
      latlng: new kakao.maps.LatLng(33.450936, 126.569477)
  },
  {
      title: '텃밭', 
      content: '<div style="padding:5px;">텃밭<br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>',
      latlng: new kakao.maps.LatLng(33.450879, 126.569940)
  },
  {
      title: '근린공원',
      content: '<div style="padding:5px;">근린공원<br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>',
      latlng: new kakao.maps.LatLng(33.451393, 126.570738)
  }
];

const createMarkerImage = () => {
  const markerImageSrc = 'assets/markerStar.png'
  const imageSize = new kakao.maps.Size(24, 35)
  const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize)
  return markerImage;
}

const createMarker = () => {
  positions.map(({title, latlng}) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: latlng,
      title: title,
      image: createMarkerImage()
    })
    createInfoWindow(marker)
  })
}

const createInfoWindow = (marker) => {
  positions.map(({position, content}) => {
    const infoWindow = new kakao.maps.InfoWindow({
      position: position,
      content: content
    })
    infoWindow.open(map, marker)
  })
}

const success = (position) => {
  const {latitude, longitude} = position.coords;
  const latlng = new kakao.maps.LatLng(latitude, longitude);
  map.panTo(latlng);
  new kakao.maps.Marker({
    map: map,
    position: latlng,
    title: '현재위치',
    image: createMarkerImage()
  })
}

const error = (error) => {
  if (error.value === 1) {
    alert('위치 접근 권한을 허용해 주십시오')
  } else if (error.value === 2) {
    alert('위치를 찾을 수 없습니다.')
  } else if (error.value === 3) {
    alert('오류입니다.')
  }
}

const createGeolocation = () => {
  if (!navigator.geolocation) {
    alert('현재 위치를 가져 올 수 없습니다.')
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function init () {
  createMarker()
  $button.addEventListener('click', () => { createGeolocation()});
}

init()




