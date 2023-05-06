import { useState, useEffect } from 'react';

export default function useLocation() {
	const [location, setLocation] = useState<{ lat: number; lon: number }>();

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setLocation({
					lat: position.coords.latitude,
					lon: position.coords.longitude
				});
			});
		}
	}, []);

	return { location };
}
