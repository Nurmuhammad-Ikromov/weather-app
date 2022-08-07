import { useEffect, useState } from 'react';
import axios from 'axios';
import Bookmark from '../../components/Bookmark/Bookmark';
import './Home.css';
import Spiner from '../../assets/Spinner.svg';
function Home() {
	const [weather, setWeather] = useState([]);
	const [state, setState] = useState([]);
	const [value, setValue] = useState('tashkent');
	const [bookmark, setBookmark] = useState([]);

	useEffect(() => {
		value.length &&
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=4cb49bcfb8c93820602a307894a6e9fd&units=metric`,
				)
				.then(function (response) {
					setWeather(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
	}, [value]);

	return (
		<>
			<div className='city-searchBox'>
				<input
					className='city-search'
					placeholder='Search city...'
					onKeyUp={(evt) => {
						if (evt.code === 'Enter') {
							setValue(evt.target.value);
							setState([...state, evt.target.value]);
							evt.target.value = '';
						}
					}}
					type='text'
				/>

				{state.length ? (
					<div className='recently'>
						<h2 className='recently__title'>Recently</h2>
						{state.length > 5
							? state
									.slice(state.length - 5, state.length)
									.map((e) => (
										<div>
											<button
												className='city-btn'
												data-button-id={e}
												onClick={(evt) =>
													setValue(
														evt.target.dataset
															.buttonId,
													)
												}>
												{e}
											</button>
											<span
												className='city-span'
												data-span-id={e}
												onClick={(evt) =>
													setBookmark([
														...bookmark,
														evt.target.dataset
															.spanId,
													])
												}>
												{/* 🖤 */}
											</span>
										</div>
									))
							: state.map((e) => (
									<div>
										<button
											className='city-btn'
											data-button-id={e}
											onClick={(evt) =>
												setValue(
													evt.target.dataset.buttonId,
												)
											}>
											{e}
										</button>
										<span
											className='city-span'
											data-span-id={e}
											onClick={(evt) =>
												setBookmark([
													...bookmark,
													evt.target.dataset.spanId,
												])
											}>
											{/* 🖤 */}
										</span>
									</div>
							  ))}
					</div>
				) : (
					''
				)}
			</div>
			<div className='main'>
				{weather ? (
					<h2 className='city-name'>{weather.name}</h2>
				) : (
					<img src={Spiner} alt='loading icon' />
				)}

				{weather.coord && (
					<a
						className='city-location'
						target='blank'
						href={`https://www.google.com/maps/place/${weather.coord.lat},${weather.coord.lon}`}>
						Location
					</a>
				)}

				{weather.weather ? (
					weather.weather.length &&
					weather.weather.map((e) => (
						<div className='city-weatherBox'>
							<div className='city-weather-info'>
								<span className='city-weather-main'>
									{e.main}
								</span>
								<span className='city-weather-description'>
									{e.description}
								</span>
							</div>
							<img
								width='250px'
								height='250px'
								src={`https://openweathermap.org/img/wn/${e.icon}@2x.png`}
								alt='weather icon'
							/>
						</div>
					))
				) : (
					<img src={Spiner} alt='loading icon' />
				)}

				{weather.main
					? weather.main.temp && (
							<span className='city-temp'>
								{' '}
								{Math.round(weather.main.temp)}℃
							</span>
					  )
					: ''}

				{weather.wind && (
					<div className='city-weather-speedBox'>
						<span className='city-weather-deg'>
							{' '}
							Deg: {weather.wind.deg}°
						</span>
						<span className='city-weather-speed'>
							{' '}
							Speed: {weather.wind.speed} m/s
						</span>
					</div>
				)}
			</div>

			{bookmark.length ? (
				<div className='favorite-box'>
					<div className='city-favorites'>
						<h2 className='city-favorites__title'>
							Favorite cities
						</h2>
						<ul className='city-favorites__list'>
							{bookmark.map((e) => (
								<Bookmark
									item={e}
									setValue={setValue}
									bookmark={bookmark}
									setBookmark={setBookmark}
								/>
							))}
						</ul>
					</div>
				</div>
			) : (
				''
			)}
		</>
	);
}

export default Home;
