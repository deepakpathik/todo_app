'use client';

import { useState, useEffect } from 'react';
import styles from '../glass.module.css';

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [greeting, setGreeting] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Set greeting based on time
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        // Get location and weather
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const response = await fetch(
                            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                        );
                        const data = await response.json();
                        setWeather({
                            temp: data.current_weather.temperature,
                            code: data.current_weather.weathercode,
                        });
                    } catch (err) {
                        setError('Unable to fetch weather');
                    } finally {
                        setLoading(false);
                    }
                },
                (err) => {
                    console.error(err);
                    setError('Location access denied');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation not supported');
            setLoading(false);
        }
    }, []);

    const getWeatherIcon = (code) => {
        // Simple mapping for WMO Weather interpretation codes (0-99)
        if (code === 0) return '☀️';
        if (code >= 1 && code <= 3) return 'tj☁️';
        if (code >= 45 && code <= 48) return '🌫️';
        if (code >= 51 && code <= 67) return '🌧️';
        if (code >= 71 && code <= 77) return '❄️';
        if (code >= 80 && code <= 82) return '🌧️';
        if (code >= 95 && code <= 99) return '⛈️';
        return '🌡️';
    };

    return (
        <div className={styles.weatherContainer}>
            <h2 className={styles.greeting}>{greeting}!</h2>
            {loading && <div className={styles.weatherInfo}>Loading weather...</div>}
            {error && <div className={styles.weatherInfo}>{error}</div>}
            {weather && (
                <div className={styles.weatherInfo}>
                    <span>{getWeatherIcon(weather.code)}</span>
                    <span>{weather.temp}°C</span>
                </div>
            )}
        </div>
    );
}
