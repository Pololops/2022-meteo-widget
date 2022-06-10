import { useState, useEffect } from 'react';
import WeatherSpinner from '../WeatherSpinner';
import './style.scss';

export default function WeatherWidget({ props }) {
	const [city, setCity] = useState('');
	const [desc, setDesc] = useState('');
	const [temperature, setTemperature] = useState();
	const [inputValue, setInputValue] = useState('');
	const [submitCity, setSubmitCity] = useState('');

	const baseUrl = process.env.REACT_APP_BASE_URL;
	const apiKey = process.env.REACT_APP_API_KEY;

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitCity(inputValue);
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position.coords.latitude, position.coords.longitude);
			fetch(
				`${baseUrl}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&lang=fr&appid=${apiKey}`,
			)
				.then((response) => response.json())
				.then((json) => {
					setCity(json.name);
					setTemperature(Math.round(json.main.temp));
					setDesc(json.weather[0].description);
					setInputValue('');
				})
				.catch((error) => {
					setCity();
					setTemperature();
					setDesc('Ville non trouvée');
					console.log(error);
				});
		});
	}, []);

	useEffect(() => {
		if (submitCity !== '') {
			fetch(`${baseUrl}?q=${submitCity}&units=metric&lang=fr&appid=${apiKey}`)
				.then((response) => response.json())
				.then((json) => {
					setCity(json.name);
					setTemperature(Math.round(json.main.temp));
					setDesc(json.weather[0].description);
					setInputValue('');
				})
				.catch((error) => {
					setCity();
					setTemperature();
					setDesc('Ville non trouvée');
					console.log(error);
				});
		}
	}, [submitCity]);

	return (
		<div className="widget">
			{city === '' && <WeatherSpinner />}
			<div className="widget__infos">
				<p className="widget__city">{city}</p>
				<p className="widget__desc">{desc}</p>
			</div>
			<p className="widget__temperature">
				{temperature}
				<sup>{temperature ? '°C' : '  '}</sup>
			</p>
			<form className="widget__form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Ville"
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)}
				/>
			</form>
		</div>
	);
}
