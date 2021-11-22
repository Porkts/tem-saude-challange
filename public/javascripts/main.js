const currentScriptTag = document.getElementById('mainScript');

const APPLICATION_URL = window.location.href;
const MAPBOX_API_KEY = currentScriptTag.getAttribute('mapboxapi');
const GOOGLE_GEOCODING_API_KEY = currentScriptTag.getAttribute('googleApi');

var map = null; // global map variable
var markers = []; // global makers array
var marker = null; // global marker to new clinic

window.onload = () => {
  map = initMap(); // initialize map

  getAllClinics().then((clinics) => {
    drawAllClinics(clinics);
  });

  registerEvents();
};

function registerEvents() {
  document.getElementById('searchAddress').addEventListener('click', searchAddress);

  document.getElementById('clinicForm').addEventListener('submit', submitClinicForm);
}

async function searchAddress(e) {
  e.preventDefault();
  let address = document.getElementById('address').value;

  if (addressIsInvalid(address)) return alert('Digite um endereço válido');

  const location = await getLocation(address);

  if (notFoundAddress(location)) return alert('Endereço não encontrado');

  if (marker) map.removeLayer(marker);

  const lat = location.results[0].geometry.location.lat;
  const lng = location.results[0].geometry.location.lng;

  map.setView([lat, lng], 13);
  marker = L.marker([lat, lng]).addTo(map);

  document.getElementById('lat').value = lat;
  document.getElementById('lng').value = lng;

  parseToAddressObject(location.results[0]);
}

function addressIsInvalid(address) {
  return address === '';
}

function notFoundAddress(location) {
  return location.status !== 'OK' || location.results.length == 0;
}

async function submitClinicForm(e) {
  e.preventDefault();

  if (marker) map.removeLayer(marker);

  let nome = document.getElementById('nome').value;
  let cnpj = document.getElementById('cnpj').value;
  let logradouro = document.getElementById('logradouro').value;
  let numero = document.getElementById('numero').value;
  let bairro = document.getElementById('bairro').value;
  let complemento = document.getElementById('complemento').value;
  let cidade = document.getElementById('cidade').value;
  let estado = document.getElementById('estado').value;
  let pais = document.getElementById('pais').value;
  let latitude = document.getElementById('lat').value;
  let longitude = document.getElementById('lng').value;

  if (nome === '' || cnpj === '' || latitude === '' || longitude === '') return alert('Preencha todos os campos');

  const clinic = await registerClinic({
    nome,
    cnpj,
    logradouro,
    numero,
    bairro,
    complemento,
    cidade,
    estado,
    pais,
    latitude,
    longitude,
  });

  if (clinic) {
    alert('Clínica cadastrada com sucesso');
    resetForm();
  }

  getAllClinics().then((clinics) => {
    drawAllClinics(clinics);
  });
}

function drawAllClinics(clinics) {
  if (hasMarkers()) {
    clearMakers();
    clearClinicCards();
  }

  clinics.forEach((clinic) => {
    markers.push(L.marker([clinic.latitude, clinic.longitude]).addTo(map));
    drawClinic(clinic);
  });

  var group = L.featureGroup(markers).addTo(map);
  map.fitBounds(group.getBounds());
}

function clearClinicCards() {
  document.querySelectorAll('.clone').forEach((e) => e.remove());
}

function drawClinic(clinic) {
  var tagBase = document.getElementById('clinicTemplate');
  var clone = tagBase.cloneNode(true);
  clone.style.display = 'flex';
  clone.id = `clinic${clinic.id}`;
  clone.classList.add('clone');
  clone.childNodes[0].innerText = clinic.nome;
  clone.childNodes[1].innerText = `${clinic.logradouro}, ${clinic.numero}, ${clinic.bairro}, ${clinic.cidade}, ${clinic.estado}, ${clinic.pais}`;
  clone.childNodes[2].innerText = clinic.latitude + ', ' + clinic.longitude;

  tagBase.after(clone);
}

function hasMarkers() {
  return markers.length > 0;
}

function clearMakers() {
  markers.forEach((marker) => {
    map.removeLayer(marker);
  });
}

function parseToAddressObject(googleAddress) {
  let address = {};

  googleAddress.address_components.forEach((component) => {
    if (component.types.includes('street_number')) {
      document.getElementById('numero').value = component.long_name;
    } else if (component.types.includes('route')) {
      document.getElementById('logradouro').value = component.long_name;
    } else if (component.types.includes('sublocality')) {
      document.getElementById('bairro').value = component.long_name;
    } else if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
      document.getElementById('cidade').value = component.long_name;
    } else if (component.types.includes('administrative_area_level_1')) {
      document.getElementById('estado').value = component.long_name;
    } else if (component.types.includes('country')) {
      document.getElementById('pais').value = component.long_name;
    }
  });
}

async function registerClinic(clinicData) {
  let url = `${APPLICATION_URL}clinics`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clinicData),
  });

  const data = await response.json();
  return data;
}

function resetForm() {
  document.getElementById('clinicForm').reset();
}

function initMap() {
  var mymap = L.map('maps').setView([-09.5995, -37.7586], 13);
  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_API_KEY}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1IjoicG9ya3RzIiwiYSI6ImNrdzgzOGdrNjEyMW8ycW8wcHFqMDMydzYifQ.WFfGGaR4KXsPZpyvF7MYDQ',
  }).addTo(mymap);

  return mymap;
}

async function getLocation(address) {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_GEOCODING_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getAllClinics() {
  let url = `${APPLICATION_URL}clinics`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
