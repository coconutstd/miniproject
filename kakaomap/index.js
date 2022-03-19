const container = document.getElementById('map');
const options = {
  center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 3
};

const map = new kakao.maps.Map(container, options);

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

function init () {
  createMarker()
}

init()




