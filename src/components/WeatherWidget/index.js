// import PropTypes from 'prop-types';
import './style.scss';

export default function WeatherWidget({ props }) {
    return (
		<div className="widget">
			<div className="widget__infos">
				<p className="widget__city">Paris</p>
				<p className="widget__desc">Poussièreux</p>
			</div>
			<p className="widget__temperature">15<sup>°C</sup></p>
            <input type="text" placeholder="Ville" />
		</div>
	);
}

// WeatherWidget.propTypes = {
// props: PropTypes.number|string|bool|func|array|object|node.isRequired,
// };

// WeatherWidget.defaultProps = {
// props: '',
// };
